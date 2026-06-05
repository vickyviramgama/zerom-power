'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Sun, Lock, CheckCircle } from 'lucide-react'

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token') || ''

  const [form, setForm] = useState({ password: '', confirm: '' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirm) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password: form.password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Reset failed')
      setDone(true)
      setTimeout(() => router.push('/admin/login'), 3000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="text-center">
        <p className="text-red-400 text-sm">Invalid reset link. Please request a new one.</p>
        <Link href="/admin/forgot-password" className="text-solar text-sm mt-4 inline-block">
          Request new link
        </Link>
      </div>
    )
  }

  return (
    <>
      {done ? (
        <div className="text-center">
          <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={24} className="text-green-400" />
          </div>
          <h2 className="font-display font-bold text-white text-xl mb-2">Password Updated</h2>
          <p className="text-white/50 text-sm">Redirecting to login…</p>
        </div>
      ) : (
        <>
          <h2 className="font-display font-bold text-white text-xl mb-2">Set New Password</h2>
          <p className="text-white/40 text-sm mb-6">Choose a strong password for your admin account.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">New Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="password" required minLength={6}
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="Min. 6 characters"
                  className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/20 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-solar transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="password" required minLength={6}
                  value={form.confirm}
                  onChange={e => setForm({ ...form, confirm: e.target.value })}
                  placeholder="Repeat password"
                  className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/20 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-solar transition-all"
                />
              </div>
            </div>
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}
            <button
              type="submit" disabled={loading}
              className="w-full bg-solar hover:bg-solar/90 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Updating…</>
              ) : 'Update Password'}
            </button>
          </form>
        </>
      )}
    </>
  )
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-[#080f20] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-solar rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow">
            <Sun size={28} className="text-white" />
          </div>
          <h1 className="font-display font-bold text-white text-2xl">ZEROM Power</h1>
          <p className="text-white/40 text-sm mt-1">Admin Panel</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur">
          <Suspense fallback={<p className="text-white/40 text-sm">Loading…</p>}>
            <ResetPasswordForm />
          </Suspense>
        </div>
        <p className="text-center text-white/20 text-xs mt-6">© 2024 ZEROM Power. All rights reserved.</p>
      </div>
    </div>
  )
}
