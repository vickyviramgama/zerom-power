'use client'

import { useEffect, useRef } from 'react'

interface Props {
  src: string
  speed?: number
  className?: string
  children?: React.ReactNode
  overlay?: string
  overlayStyle?: 'default' | 'hero' | 'dark'
}

export default function ParallaxHero({ src, speed = 0.4, className = '', children, overlay = 'rgba(5,8,15,0.65)', overlayStyle = 'default' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    const img = imgRef.current
    if (!el || !img) return

    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const scrolled = -rect.top * speed
      img.style.transform = `translateY(${scrolled}px) scale(1.15)`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [speed])

  // Hero overlay: left side dark for text, right side lets image show through
  const heroOverlay = `
    linear-gradient(100deg, rgba(4,9,20,0.88) 0%, rgba(4,9,20,0.65) 42%, rgba(4,9,20,0.18) 100%),
    linear-gradient(180deg, rgba(4,9,20,0.15) 0%, rgba(4,9,20,0.05) 50%, rgba(4,9,20,0.55) 100%)
  `

  const defaultOverlay = `linear-gradient(180deg, ${overlay} 0%, rgba(5,8,15,0.5) 50%, rgba(5,8,15,0.9) 100%)`
  const darkOverlay = `linear-gradient(180deg, rgba(5,8,15,0.72) 0%, rgba(5,8,15,0.65) 50%, rgba(5,8,15,0.85) 100%)`

  const overlayCSS = overlayStyle === 'hero' ? heroOverlay : overlayStyle === 'dark' ? darkOverlay : defaultOverlay

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <div
        ref={imgRef}
        className="absolute inset-0 w-full h-full bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: `url(${src})`,
          transform: 'scale(1.15)',
          transition: 'transform 0.1s linear',
        }}
      />
      <div className="absolute inset-0" style={{ background: overlayCSS }} />
      <div className="relative z-10 w-full">{children}</div>
    </div>
  )
}
