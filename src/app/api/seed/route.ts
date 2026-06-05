import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { seed } from '@/lib/seed'

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 })
  }
  try {
    await connectDB()
    await seed()
    return NextResponse.json({ success: true, message: 'Database seeded with sample posts.' })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
