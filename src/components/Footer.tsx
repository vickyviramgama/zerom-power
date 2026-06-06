import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react'

const services = ['Solar EPC', 'O&M Services', 'Hybrid Solar', 'Solar Financing', 'Energy Audit', 'PMC Services']
const pages = ['About Us', 'Services', 'Projects', 'Blog', 'Contact']

export default function Footer() {
  return (
    <footer className="relative bg-slate-900 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-solar/5 blur-[80px] pointer-events-none" />

      <div className="section-inner pt-16 pb-8 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center mb-5">
              <Image
                src="/logo.svg"
                alt="ZEROM Power"
                width={160}
                height={48}
                className="h-8 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              India's trusted solar EPC & O&M partner — delivering clean energy solutions from rooftops to utility-scale plants.
            </p>
            <div className="flex gap-3">
              {['in', 'f', 'ig', 'wp'].map((icon, i) => {
                const hrefs = ['#', '#', '#', 'https://wa.me/919429767516']
                const labels = ['LinkedIn', 'Facebook', 'Instagram', 'WhatsApp']
                return (
                  <a key={i} href={hrefs[i]} aria-label={labels[i]} target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-white/40 hover:text-solar hover:border-solar/40 transition-all text-xs font-bold">
                    {icon}
                  </a>
                )
              })}
            </div>
          </div>

          {/* Pages */}
          <div>
            <div className="label mb-5">Navigation</div>
            <ul className="space-y-3">
              {pages.map(p => (
                <li key={p}>
                  <Link href={`/${p.toLowerCase().replace(' us', '').replace(' ', '-')}`}
                    className="text-white/40 hover:text-solar text-sm transition-colors flex items-center gap-1 group">
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <div className="label mb-5">Services</div>
            <ul className="space-y-3">
              {services.map(s => (
                <li key={s}>
                  <Link href="/services" className="text-white/40 hover:text-solar text-sm transition-colors flex items-center gap-1 group">
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="label mb-5">Contact</div>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm">
                <MapPin size={14} className="text-solar shrink-0 mt-0.5" />
                <span className="text-white/40">026, Sai Flora Society, Sarkhej-dholka Road, Kashindra, Ahmedabad -382210</span>
              </li>
              <li>
                <a href="tel:+919429767516" className="flex gap-3 text-sm text-white/40 hover:text-solar transition-colors">
                  <Phone size={14} className="text-solar shrink-0 mt-0.5" /> +91-9429767516
                </a>
              </li>
              <li>
                <a href="mailto:info@zerompower.com" className="flex gap-3 text-sm text-white/40 hover:text-solar transition-colors break-all">
                  <Mail size={14} className="text-solar shrink-0 mt-0.5" /> info@zerompower.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between gap-4 text-xs text-white/25">
          <span>© {new Date().getFullYear()} ZEROM Power. All rights reserved.</span>
          <span>Powering India with clean energy ☀️</span>
        </div>
      </div>
    </footer>
  )
}
