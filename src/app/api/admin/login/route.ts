import { NextRequest, NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import { sessionOptions } from '@/lib/session'
import type { SessionData } from '@/lib/session'

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()
    if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }
    const session = await getIronSession<SessionData>(cookies(), sessionOptions)
    session.isAdmin = true
    session.username = username
    await session.save()
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
