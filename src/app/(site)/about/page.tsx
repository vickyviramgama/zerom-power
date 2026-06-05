import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'
import ParallaxHero from '@/components/ParallaxHero'
import Tilt3D from '@/components/Tilt3D'

export const metadata: Metadata = {
  title: 'About Us — ZEROM Power',
  description: 'Learn about ZEROM Power — our vision to lead renewable energy, our mission of engineering excellence, and the values that drive our sustainable energy solutions.',
}

const values = [
  { icon: '🌱', title: 'Sustainability', desc: 'Sustainability is at the core of everything we do — supporting the global transition towards clean energy by reducing carbon emissions and promoting responsible resource utilisation.' },
  { icon: '💡', title: 'Innovation',     desc: 'Combining technical expertise with practical execution capabilities, utilising advanced monitoring systems and data-driven analytics to proactively resolve performance issues.' },
  { icon: '🤝', title: 'Customer-First', desc: 'Tailored solutions for the unique requirements of each client — from concept development through to long-term asset management and operational support.' },
  { icon: '🛡️', title: 'Integrity',      desc: 'Ethical business practices with complete transparency, quality assurance, safety compliance, and full accountability at every stage of the project lifecycle.' },
  { icon: '🏆', title: 'Excellence',     desc: 'Relentless focus on quality, safety, and operational excellence — delivering technically superior and economically viable renewable energy solutions.' },
]

const missions = [
  'Provide high-quality renewable energy solutions through engineering excellence, efficient project execution, and continuous innovation.',
  'Maximise energy generation, improve operational reliability, and support organisations in achieving their sustainability objectives.',
  'Deliver integrated solutions spanning the entire project lifecycle — from concept development and engineering design to construction, commissioning, and long-term asset management.',
  'Combine technical expertise with practical execution capabilities to help clients maximise energy generation and optimise operational performance.',
  'Contribute to a cleaner and greener future powered by renewable energy through commitment to quality, safety, and customer satisfaction.',
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <ParallaxHero
        src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1920&q=80"
        className="min-h-[55vh] flex items-center"
        overlay="rgba(5,8,15,0.68)"
      >
        <div className="max-w-4xl mx-auto px-6 text-center py-36">
          <div className="flex items-center justify-center gap-2 text-white/40 text-sm mb-5">
            <Link href="/" className="hover:text-solar transition-colors">Home</Link>
            <span>›</span><span className="text-white/70">About Us</span>
          </div>
          <div className="label mx-auto mb-5 justify-center">Our Story</div>
          <h1 className="font-display font-extrabold text-white text-5xl md:text-7xl leading-none mb-5">
            About <span className="text-solar">ZEROM Power</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Powering a Sustainable Future Through Engineering Excellence — delivering world-class solar energy solutions that contribute to economic growth while reducing environmental impact.
          </p>
        </div>
      </ParallaxHero>

      {/* Welcome */}
      <section className="py-28 bg-white">
        <div className="section-inner grid lg:grid-cols-2 gap-20 items-center">
          <ScrollReveal direction="right">
            <Tilt3D intensity={6}>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=900&q=85"
                  alt="ZEROM Power solar installation" fill className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-4 shadow-lg animate-float">
                  <div className="text-xs text-slate-500 mb-1">Bill Reduction</div>
                  <div className="font-display font-extrabold text-2xl text-solar">30%+</div>
                </div>
              </div>
            </Tilt3D>
          </ScrollReveal>
          <ScrollReveal direction="left" delay={100}>
            <div className="label mb-5">Welcome Note</div>
            <h2 className="font-display font-extrabold text-navy leading-tight mb-5" style={{ fontSize: 'clamp(28px,3.5vw,48px)' }}>
              Engineering Excellence for<br /><span className="text-solar">A Sustainable Future</span>
            </h2>
            <div className="divider" />
            <p className="text-slate-500 mb-4 leading-relaxed">
              <strong className="text-navy">ZEROM Power</strong> is a leading renewable energy solutions company specialising in Solar EPC, Installation &amp; Construction, Operation &amp; Maintenance, Project Management Consultancy, and End-to-End Project Management services.
            </p>
            <p className="text-slate-400 mb-8 leading-relaxed">
              We are committed to delivering innovative, reliable, and sustainable energy solutions that help businesses, industries, and utilities transition towards a cleaner and more energy-efficient future — with a strong focus on quality, safety, and operational excellence.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary"><ArrowRight size={16} /> Get a Free Quote</Link>
              <Link href="/projects" className="btn-outline">View Projects</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-28 bg-slate-50">
        <div className="section-inner">
          <ScrollReveal className="text-center mb-14">
            <div className="label mb-4 justify-center">Vision & Mission</div>
            <h2 className="font-display font-extrabold text-navy" style={{ fontSize: 'clamp(32px,4vw,52px)' }}>
              Guided by Purpose, <span className="text-solar">Driven by Impact</span>
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            <ScrollReveal direction="right">
              <Tilt3D intensity={5}>
                <div className="card-light p-10 h-full">
                  <div className="w-14 h-14 rounded-2xl bg-solar/10 border border-solar/20 mx-auto mb-6 flex items-center justify-center text-3xl">👁️</div>
                  <h3 className="font-display font-bold text-navy text-xl mb-4">Our Vision</h3>
                  <p className="text-slate-500 leading-relaxed">
                    To become a trusted leader in the renewable energy sector by delivering innovative and sustainable energy solutions that drive energy independence, environmental responsibility, and long-term value for our clients and communities.
                  </p>
                </div>
              </Tilt3D>
            </ScrollReveal>
            <ScrollReveal direction="left" delay={100}>
              <Tilt3D intensity={5}>
                <div className="card-light p-10 h-full">
                  <div className="w-14 h-14 rounded-2xl bg-solar/10 border border-solar/20 mx-auto mb-6 flex items-center justify-center text-3xl">🎯</div>
                  <h3 className="font-display font-bold text-navy text-xl mb-4">Our Mission</h3>
                  <ul className="space-y-3">
                    {missions.map((m, i) => (
                      <li key={i} className="flex gap-3 text-slate-500 text-sm">
                        <span className="text-solar mt-0.5 shrink-0 font-bold">✓</span>{m}
                      </li>
                    ))}
                  </ul>
                </div>
              </Tilt3D>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-28 bg-white">
        <div className="section-inner">
          <ScrollReveal className="text-center mb-14">
            <div className="label mb-4 justify-center">Core Values</div>
            <h2 className="font-display font-extrabold text-navy" style={{ fontSize: 'clamp(32px,4vw,52px)' }}>
              The Principles That <span className="text-solar">Drive Us</span>
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 70}>
                <Tilt3D intensity={7}>
                  <div className="card-light p-7 text-center group h-full">
                    <div className="w-14 h-14 rounded-2xl bg-solar/10 border border-solar/20 mx-auto mb-5 flex items-center justify-center text-2xl group-hover:bg-solar group-hover:border-solar transition-all">{v.icon}</div>
                    <h4 className="font-display font-bold text-navy mb-3">{v.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </Tilt3D>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <ParallaxHero
        src="https://images.unsplash.com/photo-1548337138-e87d889cc369?w=1920&q=80"
        className="py-28"
        overlay="rgba(5,8,15,0.75)"
      >
        <div className="max-w-2xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="font-display font-extrabold text-white mb-5" style={{ fontSize: 'clamp(32px,4vw,52px)' }}>
              Partner with <span className="text-solar">ZEROM Power</span>
            </h2>
            <p className="text-white/60 mb-10 text-lg">Transform your energy vision into reality. Whether planning a utility-scale solar project, seeking professional project management, or a reliable O&amp;M partner — our team is ready to support you at every stage.</p>
            <Link href="/contact" className="btn-primary text-base px-10 py-4">Contact Our Team <ArrowRight size={16}/></Link>
          </ScrollReveal>
        </div>
      </ParallaxHero>
    </>
  )
}
