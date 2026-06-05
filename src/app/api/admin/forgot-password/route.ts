import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import connectDB from '@/lib/mongodb'
import Admin from '@/lib/models/Admin'
import { sendPasswordResetEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    await connectDB()
    const admin = await Admin.findOne({ email })

    // Always return success to avoid user enumeration
    if (!admin) {
      return NextResponse.json({ success: true })
    }

    // Generate secure token
    const token = crypto.randomBytes(32).toString('hex')
    const expiry = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    admin.resetToken = token
    admin.resetTokenExpiry = expiry
    await admin.save()

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const resetUrl = `${baseUrl}/admin/reset-password?token=${token}`

    await sendPasswordResetEmail(email, resetUrl)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Forgot password error:', err)
    return NextResponse.json({ error: 'Failed to send reset email' }, { status: 500 })
  }
}
