export const runtime = 'nodejs'

import { NextRequest, NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import { sessionOptions } from '@/lib/session'
import type { SessionData } from '@/lib/session'
import connectDB from '@/lib/mongodb'
import Admin from '@/lib/models/Admin'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()

    await connectDB()

    // Find admin in MongoDB
    let admin = await Admin.findOne({ username })

    // Auto-create admin from env vars on first login
    if (!admin) {
      const envUser = process.env.ADMIN_USERNAME
      const envPass = process.env.ADMIN_PASSWORD
      const envEmail = process.env.ADMIN_EMAIL || 'admin@zerompower.com'

      if (username === envUser && password === envPass) {
        const hash = await bcrypt.hash(envPass, 10)
        admin = await Admin.create({
          username: envUser,
          email: envEmail,
          passwordHash: hash,
        })
      } else {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
      }
    } else {
      // Verify password against stored hash
      const valid = await bcrypt.compare(password, admin.passwordHash)
      if (!valid) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
      }
    }

    const session = await getIronSession<SessionData>(cookies(), sessionOptions)
    session.isAdmin = true
    session.username = admin.username
    await session.save()

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
