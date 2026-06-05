import { NextRequest, NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import connectDB from '@/lib/mongodb'
import Post from '@/models/Post'
import { sessionOptions } from '@/lib/session'
import type { SessionData } from '@/lib/session'

type Ctx = { params: { id: string } }

export async function GET(_req: NextRequest, { params }: Ctx) {
  try {
    await connectDB()
    const post = await Post.findById(params.id).lean()
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(JSON.parse(JSON.stringify(post)))
  } catch {
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: Ctx) {
  try {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions)
    if (!session.isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    await connectDB()
    const body = await req.json()
    const post = await Post.findByIdAndUpdate(params.id, body, { new: true, runValidators: true })
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(JSON.parse(JSON.stringify(post)))
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to update' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  try {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions)
    if (!session.isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    await connectDB()
    await Post.findByIdAndDelete(params.id)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
