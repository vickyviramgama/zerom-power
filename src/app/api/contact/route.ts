import { NextRequest, NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import connectDB from '@/lib/mongodb'
import Enquiry from '@/models/Enquiry'
import { sessionOptions } from '@/lib/session'
import type { SessionData } from '@/lib/session'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, message } = body
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email and message are required.' }, { status: 400 })
    }
    await connectDB()
    await Enquiry.create(body)
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to save enquiry' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions)
    if (!session.isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    await connectDB()
    const enquiries = await Enquiry.find().sort({ createdAt: -1 }).lean()
    return NextResponse.json(JSON.parse(JSON.stringify(enquiries)))
  } catch {
    return NextResponse.json({ error: 'Failed to fetch enquiries' }, { status: 500 })
  }
}
