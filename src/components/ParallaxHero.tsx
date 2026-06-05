'use client'

import { useEffect, useRef } from 'react'

interface Props {
  src: string
  speed?: number
  className?: string
  children?: React.ReactNode
  overlay?: string
}

export default function ParallaxHero({ src, speed = 0.4, className = '', children, overlay = 'rgba(5,8,15,0.65)' }: Props) {
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
      <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${overlay} 0%, rgba(5,8,15,0.5) 50%, rgba(5,8,15,0.9) 100%)` }} />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
