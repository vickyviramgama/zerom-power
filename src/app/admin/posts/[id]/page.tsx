'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { PostForm } from '@/components/PostForm'

export default function EditPostPage() {
  const { id } = useParams()
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then(r => r.ok ? r.json() : Promise.reject('Not found'))
      .then(setPost)
      .catch(() => setError('Post not found'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <div className="w-8 h-8 border-2 border-solar/30 border-t-solar rounded-full animate-spin" />
    </div>
  )
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>
  return <PostForm initial={post} />
}
