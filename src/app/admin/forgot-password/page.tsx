'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sun, Mail, ArrowLeft } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Something went wrong')
      }
      setSent(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#080f20] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-solar rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow">
            <Sun size={28} className="text-white" />
          </div>
          <h1 className="font-display font-bold text-white text-2xl">ZEROM Power</h1>
          <p className="text-white/40 text-sm mt-1">Admin Panel</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur">
          {sent ? (
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={24} className="text-green-400" />
              </div>
              <h2 className="font-display font-bold text-white text-xl mb-2">Check your email</h2>
              <p className="text-white/50 text-sm mb-6">
                If that email is registered, a reset link has been sent. It expires in 1 hour.
              </p>
              <Link
                href="/admin/login"
                className="text-solar hover:text-solar/80 text-sm font-medium flex items-center justify-center gap-1.5"
              >
                <ArrowLeft size={14} /> Back to Sign In
              </Link>
            </div>
          ) : (
            <>
              <h2 className="font-display font-bold text-white text-xl mb-2">Forgot Password</h2>
              <p className="text-white/40 text-sm mb-6">
                Enter your admin email and we&apos;ll send you a reset link.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Email</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                      type="email" required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="admin@zerompower.com"
                      className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/20 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-solar focus:bg-white/8 transition-all"
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
                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending…</>
                  ) : 'Send Reset Link'}
                </button>
                <Link
                  href="/admin/login"
                  className="flex items-center justify-center gap-1.5 text-white/40 hover:text-white/70 text-sm transition-colors"
                >
                  <ArrowLeft size={14} /> Back to Sign In
                </Link>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-white/20 text-xs mt-6">© 2024 ZEROM Power. All rights reserved.</p>
      </div>
    </div>
  )
}
