'use client'

import { useEffect, useState } from 'react'
import { Mail, Phone, Calendar, Tag, Inbox } from 'lucide-react'

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<any>(null)

  useEffect(() => {
    fetch('/api/contact')
      .then(r => r.ok ? r.json() : [])
      .then(setEnquiries)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display font-bold text-navy text-2xl">Enquiries</h1>
        <p className="text-slate-400 text-sm mt-1">{enquiries.length} total enquiries received</p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => <div key={i} className="h-20 bg-white rounded-2xl border border-slate-100 animate-pulse" />)}
        </div>
      ) : enquiries.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-2xl border border-slate-100">
          <Inbox size={40} className="mx-auto text-slate-200 mb-4" />
          <p className="font-medium text-slate-500 mb-1">No enquiries yet</p>
          <p className="text-sm text-slate-400">Enquiries from the contact form will appear here.</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-5">
          {/* List */}
          <div className="space-y-3">
            {enquiries.map((enq) => (
              <button
                key={enq._id}
                onClick={() => setSelected(enq)}
                className={`w-full text-left bg-white rounded-2xl border p-5 transition-all hover:border-solar/30 hover:shadow-sm ${selected?._id === enq._id ? 'border-solar shadow-sm' : 'border-slate-100'}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="font-semibold text-navy text-sm">{enq.name}</div>
                  <div className="text-xs text-slate-400">{new Date(enq.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</div>
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-1 mb-2">
                  <Mail size={11} /> {enq.email}
                </div>
                {enq.subject && (
                  <span className="text-xs bg-solar/10 text-solar px-2 py-0.5 rounded-full font-medium">{enq.subject}</span>
                )}
                <p className="text-sm text-slate-500 mt-2 line-clamp-2">{enq.message}</p>
              </button>
            ))}
          </div>

          {/* Detail */}
          {selected ? (
            <div className="bg-white rounded-2xl border border-slate-100 p-7 sticky top-24 h-fit">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-bold text-navy">Enquiry Detail</h3>
                <button onClick={() => setSelected(null)} className="text-slate-300 hover:text-slate-500 text-lg leading-none">✕</button>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {selected.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-semibold text-navy">{selected.name}</div>
                    <div className="text-xs text-slate-400">{new Date(selected.createdAt).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-slate-50 rounded-xl p-3">
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1"><Mail size={11} /> Email</div>
                    <a href={`mailto:${selected.email}`} className="text-solar font-medium truncate block hover:underline">{selected.email}</a>
                  </div>
                  {selected.phone && (
                    <div className="bg-slate-50 rounded-xl p-3">
                      <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1"><Phone size={11} /> Phone</div>
                      <a href={`tel:${selected.phone}`} className="text-solar font-medium hover:underline">{selected.phone}</a>
                    </div>
                  )}
                  {selected.subject && (
                    <div className="bg-slate-50 rounded-xl p-3 col-span-2">
                      <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1"><Tag size={11} /> Subject</div>
                      <div className="text-navy font-medium text-sm">{selected.subject}</div>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-slate-400 mb-2">Message</div>
                <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{selected.message}</div>
              </div>
              <div className="flex gap-3 mt-6">
                <a
                  href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject || 'Your Enquiry')}`}
                  className="btn-primary btn-sm flex-1 justify-center"
                >
                  <Mail size={14} /> Reply via Email
                </a>
                {selected.phone && (
                  <a
                    href={`tel:${selected.phone}`}
                    className="btn-dark btn-sm flex items-center gap-1.5"
                  >
                    <Phone size={14} /> Call
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-2xl border border-slate-100 p-8 flex flex-col items-center justify-center text-center hidden lg:flex">
              <Mail size={40} className="text-slate-200 mb-4" />
              <p className="text-slate-400 text-sm">Select an enquiry to view details</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
