import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/xerom_power'

declare global {
  // eslint-disable-next-line no-var
  var _mongooseConn: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null }
}

const cached = global._mongooseConn ?? { conn: null, promise: null }
global._mongooseConn = cached

// Suppress unhandled 'error' events on the connection so they don't
// crash the process or pollute the Next.js dev overlay when MongoDB is offline
mongoose.connection.on('error', () => {})

export default async function connectDB() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 3000, // fail fast — 3 s max
        connectTimeoutMS: 3000,
        socketTimeoutMS: 3000,
      })
      .catch(err => {
        cached.promise = null
        cached.conn = null
        throw err
      })
  }

  try {
    cached.conn = await cached.promise
  } catch {
    cached.promise = null
    cached.conn = null
    throw new Error('MongoDB unavailable')
  }

  return cached.conn
}
