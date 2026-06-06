'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Bars3Icon, XMarkIcon, PhoneIcon } from '@/components/HeroIcons'
const Menu = Bars3Icon
const X = XMarkIcon
const Phone = PhoneIcon

const links = [
  { href: '/',         label: 'Home' },
  { href: '/about',    label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog',     label: 'Blog' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-2xl border-b border-slate-100 py-3 shadow-sm'
          : 'bg-transparent py-5'
      }`}>
        <nav className="section-inner flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            {/* On scroll: show full color logo; on hero: white-inverted logo */}
            <Image
              src="/logo.svg"
              alt="ZEROM Power"
              width={160}
              height={48}
              className={`h-20 w-auto transition-all duration-300 ${scrolled ? 'brightness-100' : 'brightness-0 invert'}`}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map(l => {
              const active = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href)
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'text-solar'
                      : scrolled ? 'text-slate-600 hover:text-navy' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {l.label}
                </Link>
              )
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:+919429767516"
              className={`flex items-center gap-2 text-sm transition-colors ${scrolled ? 'text-slate-500 hover:text-solar' : 'text-white/50 hover:text-white'}`}>
              <Phone size={13} /> +91 94297 67516
            </a>
            <Link href="/contact" className="btn-primary btn-sm">Contact Us</Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className={`lg:hidden p-2 transition-colors ${scrolled ? 'text-navy' : 'text-white'}`}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${open ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-navy/50 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`} onClick={() => setOpen(false)} />
        <div className={`absolute top-0 right-0 h-full w-72 bg-white shadow-2xl border-l border-slate-100 transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6 pt-6 flex flex-col gap-1">
            {/* Mobile logo */}
            <div className="mb-6 pb-4 border-b border-slate-100">
              <Image src="/logo.svg" alt="ZEROM Power" width={140} height={42} className="h-8 w-auto" />
            </div>
            {links.map(l => {
              const active = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href)
              return (
                <Link key={l.href} href={l.href}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${active ? 'bg-solar/10 text-solar' : 'text-slate-600 hover:text-navy hover:bg-slate-50'}`}>
                  {l.label}
                </Link>
              )
            })}
            <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
              <Link href="/contact" className="btn-primary w-full justify-center">Contact Us</Link>
              <a href="tel:+919429767516" className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-full border border-slate-200 text-sm font-medium text-slate-600 hover:border-solar hover:text-solar transition-all">
                <Phone size={14} />Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
