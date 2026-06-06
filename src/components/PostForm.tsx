'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Eye, ImageIcon, X, Upload, Loader2 } from 'lucide-react'
import Image from 'next/image'

const categories = ['Solar EPC', 'O&M', 'Technology', 'Policy & Finance', 'Case Studies']

export function PostForm({ initial }: { initial?: any }) {
  const router = useRouter()
  const isEdit = !!initial

  const [form, setForm] = useState({
    title: initial?.title || '',
    excerpt: initial?.excerpt || '',
    content: initial?.content || '',
    coverImage: initial?.coverImage || '',
    category: initial?.category || '',
    author: initial?.author || 'ZEROM Power Team',
    status: initial?.status || 'draft',
  })
  const [imageError, setImageError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [error, setError] = useState('')
  const [preview, setPreview] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const set = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }))

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setUploadError('')
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload failed')
      set('coverImage', data.url)
      setImageError(false)
    } catch (err: any) {
      setUploadError(err.message)
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const handleSubmit = async (status = form.status) => {
    if (!form.title || !form.content) { setError('Title and content are required.'); return }
    setLoading(true); setError('')
    try {
      const payload = { ...form, status }
      const url = isEdit ? `/api/posts/${initial._id}` : '/api/posts'
      const res = await fetch(url, { method: isEdit ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || 'Failed to save') }
      router.push('/admin/posts'); router.refresh()
    } catch (err: any) { setError(err.message) }
    finally { setLoading(false) }
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/posts" className="text-slate-400 hover:text-navy transition-colors"><ArrowLeft size={18}/></Link>
        <div>
          <h1 className="font-display font-bold text-navy text-2xl">{isEdit ? 'Edit Post' : 'New Post'}</h1>
          <p className="text-slate-400 text-sm mt-0.5">{isEdit ? 'Update your blog post' : 'Write a new blog post'}</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button onClick={() => setPreview(!preview)} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all">
            <Eye size={14}/>{preview ? 'Edit' : 'Preview'}
          </button>
          <button onClick={() => handleSubmit('draft')} disabled={loading} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all disabled:opacity-60">
            Save Draft
          </button>
          <button onClick={() => handleSubmit('published')} disabled={loading} className="btn-primary btn-sm disabled:opacity-60">
            <Save size={14}/>{loading ? 'Saving…' : 'Publish'}
          </button>
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-5">{error}</div>}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">Post Title *</label>
              <input type="text" value={form.title} onChange={e => set('title', e.target.value)} placeholder="Enter a compelling title…"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-navy font-display font-bold text-xl placeholder:text-slate-300 placeholder:font-normal focus:outline-none focus:border-solar focus:ring-2 focus:ring-solar/10 transition-all"/>
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">Excerpt / Summary</label>
              <textarea rows={3} value={form.excerpt} onChange={e => set('excerpt', e.target.value)} placeholder="A short summary shown in blog listings…"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-600 text-sm placeholder:text-slate-300 focus:outline-none focus:border-solar focus:ring-2 focus:ring-solar/10 transition-all resize-none"/>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <label className="block text-sm font-semibold text-navy mb-3">Content * <span className="text-slate-400 font-normal">(HTML supported)</span></label>
            {preview ? (
              <div className="prose prose-slate max-w-none min-h-64 p-4 bg-slate-50 rounded-xl" dangerouslySetInnerHTML={{__html: form.content}}/>
            ) : (
              <textarea rows={20} value={form.content} onChange={e => set('content', e.target.value)} placeholder={`<h2>Introduction</h2>\n<p>Your content here…</p>`}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-600 text-sm font-mono placeholder:text-slate-300 focus:outline-none focus:border-solar focus:ring-2 focus:ring-solar/10 transition-all resize-none"/>
            )}
          </div>
        </div>
        <div className="space-y-5">
          {/* Cover Image */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <h3 className="font-semibold text-navy mb-4 text-sm flex items-center gap-2">
              <ImageIcon size={14} className="text-solar" /> Cover Image
            </h3>
            <div className="space-y-3">

              {/* Upload from device */}
              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                className="hidden"
                onChange={handleFileUpload}
              />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-dashed border-solar/30 bg-solar/5 text-solar text-sm font-medium hover:bg-solar/10 hover:border-solar/50 transition-all disabled:opacity-60"
              >
                {uploading
                  ? <><Loader2 size={14} className="animate-spin" /> Uploading…</>
                  : <><Upload size={14} /> Upload from Device</>
                }
              </button>

              {uploadError && (
                <p className="text-xs text-red-500">{uploadError}</p>
              )}

              {/* Divider */}
              <div className="flex items-center gap-2 text-slate-300">
                <div className="flex-1 h-px bg-slate-100" />
                <span className="text-xs">or paste URL</span>
                <div className="flex-1 h-px bg-slate-100" />
              </div>

              {/* URL input */}
              <div className="relative">
                <input
                  type="url"
                  value={form.coverImage}
                  onChange={e => { set('coverImage', e.target.value); setImageError(false) }}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-navy placeholder:text-slate-300 focus:outline-none focus:border-solar focus:ring-2 focus:ring-solar/10 transition-all pr-8"
                />
                {form.coverImage && (
                  <button onClick={() => { set('coverImage', ''); setImageError(false) }} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 hover:text-red-400 transition-colors">
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Preview */}
              {form.coverImage && !imageError ? (
                <div className="relative rounded-xl overflow-hidden aspect-video bg-slate-100 border border-slate-200">
                  <img
                    src={form.coverImage}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                </div>
              ) : form.coverImage && imageError ? (
                <div className="rounded-xl bg-red-50 border border-red-100 p-3 text-xs text-red-400 text-center">
                  Could not load image. Check the URL.
                </div>
              ) : (
                <div className="rounded-xl bg-slate-50 border border-dashed border-slate-200 aspect-video flex flex-col items-center justify-center gap-2 text-slate-300">
                  <ImageIcon size={24} />
                  <span className="text-xs">Image preview</span>
                </div>
              )}
              <p className="text-xs text-slate-400">Recommended: 1200×630px · Max 5 MB</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <h3 className="font-semibold text-navy mb-4 text-sm">Post Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Status</label>
                <select value={form.status} onChange={e => set('status', e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-navy focus:outline-none focus:border-solar transition-all bg-white">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Category</label>
                <select value={form.category} onChange={e => set('category', e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-navy focus:outline-none focus:border-solar transition-all bg-white">
                  <option value="">Select category…</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Author</label>
                <input type="text" value={form.author} onChange={e => set('author', e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-navy focus:outline-none focus:border-solar transition-all"/>
              </div>
            </div>
          </div>
          <div className="bg-navy rounded-2xl p-6">
            <h3 className="font-semibold text-white mb-3 text-sm">Publishing Tips</h3>
            <ul className="space-y-2 text-white/50 text-xs leading-relaxed">
              <li>✓ Write a clear, keyword-rich title</li>
              <li>✓ Add a compelling excerpt (150–160 chars)</li>
              <li>✓ Use H2/H3 headings for structure</li>
              <li>✓ Include internal links to your services</li>
              <li>✓ Save as draft first, then publish</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
