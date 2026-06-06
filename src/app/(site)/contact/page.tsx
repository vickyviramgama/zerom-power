'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'
import ParallaxHero from '@/components/ParallaxHero'
import ScrollReveal from '@/components/ScrollReveal'

const contactInfo = [
 {
  icon: <MapPin size={20} />,
  title: 'Our Office',
  lines: ['026, Sai Flora Society, Sarkhej-Dholka Road, Kashindra, Ahmedabad - 382210']
},
  { icon: <Phone size={20} />,   title: 'Phone',          lines: ['+91-9429767516'],                   href: 'tel:+919429767516' },
  { icon: <Mail size={20} />,    title: 'Email',          lines: ['info@zerompower.com'],         href: 'mailto:info@zerompower.com' },
  { icon: <Clock size={20} />,   title: 'Working Hours',  lines: ['Mon – Sat: 9:00 AM – 6:00 PM', 'Sunday: Closed'] },
]

const subjects = ['Solar EPC Enquiry','O&M Services','Hybrid Solar / BESS','Energy Audit','Solar Financing','General Enquiry']

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error('Failed')
      setSuccess(true)
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch {
      setError('Something went wrong. Please try again or call us directly.')
    } finally {
      setLoading(false)
    }
  }

  const inputCls = "w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-navy placeholder:text-slate-300 focus:outline-none focus:border-solar focus:ring-2 focus:ring-solar/10 transition-all bg-white"

  return (
    <>
      {/* Hero */}
      <ParallaxHero
        src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
        className="min-h-[55vh] flex items-center"
        overlay="rgba(5,8,15,0.68)"
      >
        <div className="max-w-4xl mx-auto px-6 text-center py-36">
          <div className="flex items-center justify-center gap-2 text-white/40 text-sm mb-5">
            <Link href="/" className="hover:text-solar transition-colors">Home</Link>
            <span>›</span><span className="text-white/70">Contact</span>
          </div>
          <div className="label mx-auto mb-5 justify-center">Let's Connect</div>
          <h1 className="font-display font-extrabold text-white text-5xl md:text-7xl leading-none mb-5">
            Get in <span className="text-solar">Touch</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Ready to go solar? Have a question? We'd love to hear from you. Our team usually responds within 24 hours.
          </p>
        </div>
      </ParallaxHero>

      {/* Main */}
      <section className="py-28 bg-white">
        <div className="section-inner grid lg:grid-cols-2 gap-16 items-start">

          {/* Info */}
          <ScrollReveal direction="right">
            <div className="label mb-5">Contact Information</div>
            <h2 className="font-display font-bold text-navy text-4xl md:text-5xl leading-tight mb-5">
              Let's Build Something <span className="text-solar">Together</span>
            </h2>
            <div className="divider" />
            <p className="text-slate-500 mb-10 leading-relaxed text-lg">
              Whether you're planning a new solar installation, need O&M support, or just have questions about solar financing — we're here to help.
            </p>
            <div className="space-y-6">
              {contactInfo.map((info) => (
                <div key={info.title} className="flex gap-5 group">
                  <div className="w-12 h-12 rounded-xl bg-solar/10 border border-solar/20 flex items-center justify-center text-solar shrink-0 group-hover:bg-solar group-hover:text-white transition-all duration-300">
                    {info.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-navy text-sm mb-1">{info.title}</div>
                    {info.href ? (
                      info.lines.map((line) => (
                        <a key={line} href={info.href} className="block text-slate-500 text-sm hover:text-solar transition-colors">{line}</a>
                      ))
                    ) : (
                      info.lines.map((line) => <div key={line} className="text-slate-500 text-sm">{line}</div>)
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 pt-8 border-t border-slate-100">
              <p className="text-sm font-semibold text-navy mb-4">Follow Us</p>
              <div className="flex gap-3">
                {[['in','LinkedIn','#'],['f','Facebook','#'],['w','WhatsApp','https://wa.me/919429767516']].map(([icon,label,href])=>(
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="w-11 h-11 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 text-xs font-bold hover:border-solar hover:text-solar transition-all">
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Form */}
          <ScrollReveal direction="left" delay={100}>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10">
              {success ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} className="text-green-500" />
                  </div>
                  <h3 className="font-display font-bold text-navy text-2xl mb-3">Message Sent!</h3>
                  <p className="text-slate-500 mb-8">Thank you. Our team will get back to you within 24 hours.</p>
                  <button onClick={() => setSuccess(false)} className="btn-primary">Send Another Message</button>
                </div>
              ) : (
                <>
                  <h3 className="font-display font-bold text-navy text-xl mb-7">Send Us a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1.5">Full Name *</label>
                        <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="Your full name" className={inputCls} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1.5">Email Address *</label>
                        <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="you@example.com" className={inputCls} />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1.5">Phone Number</label>
                        <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" className={inputCls} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1.5">Subject</label>
                        <select name="subject" value={form.subject} onChange={handleChange} className={inputCls}>
                          <option value="">Select subject…</option>
                          {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-1.5">Message *</label>
                      <textarea name="message" required rows={5} value={form.message} onChange={handleChange} placeholder="Tell us about your project…" className={`${inputCls} resize-none`} />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60">
                      {loading ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Sending…</span> : <span className="flex items-center gap-2"><Send size={15} /> Send Message</span>}
                    </button>
                  </form>
                </>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Map */}
      <section className="bg-slate-50 py-16">
        <div className="section-inner">
          <ScrollReveal className="text-center mb-10">
            <div className="label mx-auto mb-4 justify-center">Find Us</div>
            <h2 className="font-display font-bold text-navy text-4xl">Our <span className="text-solar">Location</span></h2>
          </ScrollReveal>
          <ScrollReveal>
            <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1260.522465193801!2d72.48184546165248!3d22.895021829944426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e91415f3c896f%3A0xe0eac584c6d1e6fc!2sSai%20Flora%2063!5e0!3m2!1sen!2sin!4v1780724363778!5m2!1sen!2sin"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" title="ZEROM Power Location"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
