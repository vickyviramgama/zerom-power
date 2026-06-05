/**
 * MongoDB Seed Script
 * Run once MongoDB is running:
 *   npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/seed.ts
 * Or add to package.json: "seed": "ts-node --compiler-options '{\"module\":\"CommonJS\"}' scripts/seed.ts"
 */

import mongoose from 'mongoose'
import { demoPosts } from '../src/lib/seedPosts'
import Post from '../src/models/Post'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/xerom_power'

async function seed() {
  console.log('🌱 Connecting to MongoDB:', MONGODB_URI)
  await mongoose.connect(MONGODB_URI)
  console.log('✅ Connected')

  let inserted = 0
  let skipped = 0

  for (const post of demoPosts) {
    const { _id, createdAt, updatedAt, ...data } = post
    const exists = await Post.findOne({ slug: data.slug })
    if (exists) {
      console.log(`  ⏭  Skipped (already exists): ${data.title}`)
      skipped++
    } else {
      await Post.create(data)
      console.log(`  ✅ Inserted: ${data.title}`)
      inserted++
    }
  }

  console.log(`\n🎉 Done — ${inserted} inserted, ${skipped} skipped`)
  await mongoose.disconnect()
}

seed().catch(err => {
  console.error('❌ Seed failed:', err.message)
  process.exit(1)
})
