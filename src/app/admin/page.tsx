'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FileText, CheckCircle, Edit3, MessageSquare, PlusCircle, ArrowRight, TrendingUp } from 'lucide-react'

type Stats = { total: number; published: number; drafts: number; enquiries: number }

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ total: 0, published: 0, drafts: 0, enquiries: 0 })
  const [recentPosts, setRecentPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [allRes, enquiriesRes] = await Promise.all([
          fetch('/api/posts?status=all&limit=5'),
          fetch('/api/contact'),
        ])
        const allData = await allRes.json()
        const enquiriesData = enquiriesRes.ok ? await enquiriesRes.json() : []
        const published = allData.posts?.filter((p: any) => p.status === 'published').length || 0
        const drafts = allData.posts?.filter((p: any) => p.status === 'draft').length || 0
        setStats({ total: allData.total || 0, published, drafts, enquiries: Array.isArray(enquiriesData) ? enquiriesData.length : 0 })
        setRecentPosts(allData.posts?.slice(0, 5) || [])
      } catch { /* ignore */ }
      finally { setLoading(false) }
    }
    load()
  }, [])

  const statCards = [
    { label: 'Total Posts', value: stats.total, icon: FileText, color: 'bg-blue-500', href: '/admin/posts' },
    { label: 'Published', value: stats.published, icon: CheckCircle, color: 'bg-green-500', href: '/admin/posts?status=published' },
    { label: 'Drafts', value: stats.drafts, icon: Edit3, color: 'bg-amber-500', href: '/admin/posts?status=draft' },
    { label: 'Enquiries', value: stats.enquiries, icon: MessageSquare, color: 'bg-solar', href: '/admin/enquiries' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-navy text-2xl">Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">Welcome back! Here's what's happening.</p>
        </div>
        <Link href="/admin/posts/new" className="btn-primary btn-sm">
          <PlusCircle size={15} /> New Post
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {statCards.map((s) => (
          <Link key={s.label} href={s.href} className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-solar/30 hover:shadow-sm transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-11 h-11 ${s.color} rounded-xl flex items-center justify-center`}>
                <s.icon size={18} className="text-white" />
              </div>
              <TrendingUp size={14} className="text-slate-300 group-hover:text-solar transition-colors" />
            </div>
            <div className="font-display font-extrabold text-3xl text-navy mb-1">
              {loading ? <span className="inline-block w-8 h-7 bg-slate-100 rounded animate-pulse" /> : s.value}
            </div>
            <div className="text-slate-400 text-sm">{s.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Posts */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-bold text-navy">Recent Posts</h2>
            <Link href="/admin/posts" className="text-solar text-sm font-medium flex items-center gap-1 hover:gap-1.5 transition-all">
              View All <ArrowRight size={13} />
            </Link>
          </div>
          {loading ? (
            <div className="space-y-3">
              {[1,2,3].map(i => <div key={i} className="h-12 bg-slate-100 rounded-xl animate-pulse" />)}
            </div>
          ) : recentPosts.length === 0 ? (
            <div className="text-center py-10 text-slate-400">
              <FileText size={32} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">No posts yet. <Link href="/admin/posts/new" className="text-solar">Create one</Link></p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentPosts.map((post) => (
                <div key={post._id} className="flex items-center gap-4 py-3 border-b border-slate-50 last:border-b-0">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${post.status === 'published' ? 'bg-green-400' : 'bg-amber-400'}`} />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-navy text-sm truncate">{post.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{new Date(post.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${post.status === 'published' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
                    {post.status}
                  </span>
                  <Link href={`/admin/posts/${post._id}`} className="text-slate-300 hover:text-solar transition-colors">
                    <Edit3 size={14} />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <h2 className="font-display font-bold text-navy mb-5">Quick Actions</h2>
          <div className="space-y-3">
            {[
              { href: '/admin/posts/new', icon: PlusCircle, label: 'Write New Post', desc: 'Create blog content', color: 'text-solar bg-solar/10' },
              { href: '/admin/enquiries', icon: MessageSquare, label: 'View Enquiries', desc: 'Check contact messages', color: 'text-blue-500 bg-blue-50' },
              { href: '/api/seed', icon: FileText, label: 'Seed Sample Posts', desc: 'Add demo blog data', color: 'text-purple-500 bg-purple-50' },
              { href: '/', icon: ArrowRight, label: 'View Live Site', desc: 'Open public website', color: 'text-green-500 bg-green-50' },
            ].map((a) => (
              <Link
                key={a.href}
                href={a.href}
                target={a.href.startsWith('/') && !a.href.startsWith('/admin') ? '_blank' : undefined}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
              >
                <div className={`w-10 h-10 rounded-xl ${a.color} flex items-center justify-center shrink-0`}>
                  <a.icon size={16} />
                </div>
                <div>
                  <div className="font-medium text-navy text-sm">{a.label}</div>
                  <div className="text-xs text-slate-400">{a.desc}</div>
                </div>
                <ArrowRight size={13} className="ml-auto text-slate-200 group-hover:text-solar transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
