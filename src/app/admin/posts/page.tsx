'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { PlusCircle, Edit3, Trash2, Eye, Search } from 'lucide-react'

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [deleting, setDeleting] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    const res = await fetch('/api/posts?status=all&limit=100')
    const data = await res.json()
    setPosts(data.posts || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    setDeleting(id)
    await fetch(`/api/posts/${id}`, { method: 'DELETE' })
    setPosts(prev => prev.filter(p => p._id !== id))
    setDeleting(null)
  }

  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    (p.category || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-navy text-2xl">Blog Posts</h1>
          <p className="text-slate-400 text-sm mt-1">{posts.length} total posts</p>
        </div>
        <Link href="/admin/posts/new" className="btn-primary btn-sm">
          <PlusCircle size={15} /> New Post
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4 mb-5 flex items-center gap-3">
        <Search size={16} className="text-slate-300" />
        <input
          type="text"
          placeholder="Search posts…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 text-sm text-navy placeholder:text-slate-300 focus:outline-none"
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-3">
            {[1,2,3,4].map(i => <div key={i} className="h-14 bg-slate-50 rounded-xl animate-pulse" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <div className="text-4xl mb-3">📝</div>
            <p className="font-medium text-slate-500 mb-2">{search ? 'No posts match your search' : 'No posts yet'}</p>
            {!search && <Link href="/admin/posts/new" className="text-solar text-sm font-medium">Create your first post →</Link>}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left">
                <th className="px-6 py-4 font-semibold text-slate-500 font-sans">Title</th>
                <th className="px-4 py-4 font-semibold text-slate-500 font-sans hidden md:table-cell">Category</th>
                <th className="px-4 py-4 font-semibold text-slate-500 font-sans hidden lg:table-cell">Date</th>
                <th className="px-4 py-4 font-semibold text-slate-500 font-sans">Status</th>
                <th className="px-6 py-4 font-semibold text-slate-500 font-sans text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((post) => (
                <tr key={post._id} className="border-b border-slate-50 last:border-b-0 hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-navy truncate max-w-xs">{post.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5 font-mono">{post.slug}</div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="text-xs bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full">{post.category || '—'}</span>
                  </td>
                  <td className="px-4 py-4 text-slate-400 hidden lg:table-cell">
                    {new Date(post.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${post.status === 'published' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <Link href={`/blog/${post.slug}`} target="_blank" className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-500 transition-colors" title="View post">
                        <Eye size={14} />
                      </Link>
                      <Link href={`/admin/posts/${post._id}`} className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-solar/10 hover:text-solar transition-colors" title="Edit">
                        <Edit3 size={14} />
                      </Link>
                      <button
                        onClick={() => handleDelete(post._id, post.title)}
                        disabled={deleting === post._id}
                        className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
