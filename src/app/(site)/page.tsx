import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Zap, Shield, TrendingUp, Settings, CheckCircle, Phone, Building2, Wrench } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'
import Counter from '@/components/Counter'
import FaqAccordion from '@/components/FaqAccordion'
import ParallaxHero from '@/components/ParallaxHero'
import Tilt3D from '@/components/Tilt3D'
import connectDB from '@/lib/mongodb'
import Post from '@/models/Post'

export const metadata: Metadata = {
  title: 'ZEROM Power — Solar EPC & O&M Solutions',
  description: "ZEROM Power: Leading renewable energy solutions company specialising in Solar EPC, O&M, PMC and end-to-end project management. Powering a sustainable future.",
}

async function getLatestPosts() {
  try {
    await connectDB()
    const posts = await Post.find({ status: 'published' }).sort({ createdAt: -1 }).limit(3).lean()
    return JSON.parse(JSON.stringify(posts))
  } catch { return [] }
}

const services = [
  { icon: Zap,         title: 'Solar EPC',          desc: 'Complete Engineering, Procurement & Construction solutions covering feasibility studies, detailed engineering, procurement, construction management, testing and commissioning.', tags: ['Design','Procurement','Install'], img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80' },
  { icon: Settings,    title: 'Installation & C&C', desc: 'Comprehensive civil, mechanical and electrical construction services — from site preparation and foundation works to module installation, cable laying and commissioning support.', tags: ['Civil','Mechanical','Electrical'], img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80' },
  { icon: Shield,      title: 'Operation & Maintenance', desc: 'Professional O&M services maximising plant availability and energy generation through preventive maintenance, corrective actions, performance monitoring and detailed reporting.', tags: ['SCADA','Preventive','Yield'], img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=80' },
  { icon: TrendingUp,  title: 'PMC Services',        desc: 'Project Management Consultancy providing clients complete visibility and control — effective planning, coordination, risk management, quality control and schedule adherence.', tags: ['Oversight','Risk','Control'], img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80' },
  { icon: CheckCircle, title: 'Project Management',  desc: 'End-to-end project delivery focused on safe, efficient, and on-budget execution — from planning and scheduling to contractor coordination, progress monitoring and reporting.', tags: ['Planning','Coordination','Delivery'], img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80' },
  { icon: Settings,    title: 'End-to-End Solutions', desc: 'Integrated renewable energy solutions spanning the entire project lifecycle — from concept development and engineering design to construction, commissioning and long-term asset management.', tags: ['Lifecycle','Asset Mgmt','Integration'], img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80' },
]

const stats = [
  { value: 500, suffix: '+',   label: 'Projects Completed' },
  { value: 50,  suffix: ' MW', label: 'Capacity Installed' },
  { value: 300, suffix: '+',   label: 'Happy Clients' },
  { value: 7,   suffix: '+',   label: 'States Covered' },
]

const process = [
  { num: '01', title: 'Site Assessment',      desc: 'We evaluate your site, load profile, and solar potential to design the optimal system.' },
  { num: '02', title: 'Custom Design',        desc: 'Our engineers craft a precision layout optimised for maximum yield and minimum cost.' },
  { num: '03', title: 'Procurement & Build',  desc: 'We source Tier-1 equipment and execute installation with zero compromise on quality.' },
  { num: '04', title: 'Commission & Support', desc: 'Grid integration, testing, and ongoing O&M to ensure 25 years of peak performance.' },
]

export default async function HomePage() {
  const posts = await getLatestPosts()

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <ParallaxHero
        src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1920&q=90"
        speed={0.35}
        overlayStyle="hero"
        className="min-h-screen flex items-center"
      >
        <div className="container mx-auto w-full pt-32 pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — copy */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-2 mb-7 text-xs text-white font-medium text-shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-solar animate-pulse" />
                Powering a Sustainable Future Through Engineering Excellence
              </div>
              <h1 className="font-display font-extrabold text-white leading-[1.08] mb-5 text-shadow-hero"
                style={{ fontSize: 'clamp(40px,5.5vw,80px)' }}>
                Clean Energy.<br />
                <span className="text-solar">Smarter Future.</span>
              </h1>
              <p className="text-white/80 text-lg leading-relaxed mb-9 max-w-lg text-shadow-sm">
                Leading renewable energy solutions specialising in Solar EPC, Installation &amp; Construction, O&amp;M, PMC and End-to-End Project Management — delivering innovative, reliable, and sustainable energy solutions.
              </p>
              <div className="flex flex-wrap gap-4 mb-12">
                <Link href="/contact" className="btn-primary text-sm px-7 py-3.5">
                  Get a Free Quote <ArrowRight size={15} />
                </Link>
                <Link href="/projects" className="btn-outline-white text-sm px-7 py-3.5">
                  View Projects
                </Link>
              </div>
              {/* Quick stats */}
              <div className="flex flex-wrap gap-8">
                {[['500+','Projects'],['50 MW','Installed'],['300+','Clients'],['25 yr','Warranty']].map(([v,l])=>(
                  <div key={l} className="border-l-2 border-solar pl-4">
                    <div className="font-display font-extrabold text-xl text-white leading-none">{v}</div>
                    <div className="text-white/40 text-xs mt-1">{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Creative Services Card */}
            <div className="hidden lg:block">
              <Tilt3D intensity={5}>
                <div className="relative rounded-3xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  {/* Top gradient bar */}
                  <div className="h-1 w-full bg-gradient-to-r from-solar-gold via-solar to-solar-dark" />

                  <div className="p-7">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-2 h-2 rounded-full bg-solar animate-pulse" />
                          <span className="text-xs font-bold text-solar uppercase tracking-widest">Our Expertise</span>
                        </div>
                        <p className="text-white/50 text-xs">End-to-end solar solutions</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-white/30 mb-0.5">Est.</div>
                        <div className="font-display font-bold text-white text-sm">2010</div>
                      </div>
                    </div>

                    {/* 2×2 Service Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      {[
                        { Icon: Zap,       num: '01', title: 'Solar EPC',       sub: 'Engineering, Procurement & Construction', color: 'from-solar/20 to-solar-dark/10' },
                        { Icon: Building2, num: '02', title: 'Installation',     sub: 'Civil, Mechanical & Electrical C&C',      color: 'from-blue-500/20 to-blue-700/10' },
                        { Icon: Wrench,    num: '03', title: 'O&M Services',     sub: 'Maximising plant yield & availability',   color: 'from-emerald-500/20 to-emerald-700/10' },
                        { Icon: TrendingUp,num: '04', title: 'PMC & Mgmt',       sub: 'End-to-end oversight & lifecycle',        color: 'from-purple-500/20 to-purple-700/10' },
                      ].map(({ Icon, num, title, sub, color }) => (
                        <div key={title} className={`relative rounded-2xl p-4 bg-gradient-to-br ${color} border border-white/8 group hover:border-white/20 transition-all duration-300 cursor-default`}>
                          <div className="flex items-start justify-between mb-3">
                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                              <Icon size={15} className="text-white/80" />
                            </div>
                            <span className="font-display font-bold text-white/15 text-xl leading-none group-hover:text-white/25 transition-colors">{num}</span>
                          </div>
                          <div className="font-semibold text-white text-xs leading-snug mb-1">{title}</div>
                          <div className="text-white/35 text-[10px] leading-snug">{sub}</div>
                        </div>
                      ))}
                    </div>

                    {/* Performance strip */}
                    <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/8 mb-5">
                      <div className="flex-1">
                        <div className="text-white/40 text-[10px] mb-1.5">Average Performance Ratio</div>
                        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-solar-gold to-solar" style={{ width: '82%' }} />
                        </div>
                      </div>
                      <div className="font-display font-bold text-solar text-lg leading-none">82%</div>
                    </div>

                    {/* CTA */}
                    <a href="tel:+919429767516" className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl font-semibold text-sm text-white transition-all duration-300 hover:shadow-glow hover:scale-[1.02]"
                      style={{ background: 'linear-gradient(135deg,#e9393c,#ad2351)' }}>
                      <Phone size={14} /> Call +91-9429767516
                    </a>
                  </div>
                </div>
              </Tilt3D>
            </div>
          </div>
        </div>
      </ParallaxHero>

      {/* ── MARQUEE ──────────────────────────────────────── */}
      <div className="overflow-hidden bg-solar py-3">
        <div className="marquee-wrap">
          <div className="marquee-track animate-marquee">
            {Array.from({length:2}).map((_,k)=>(
              <span key={k} className="flex items-center">
                {['Solar EPC','O&M Services','Hybrid BESS','Energy Audit','PMC Services','I&C Solutions','Net Metering','Grid Integration','SCADA Monitoring','Solar Financing'].map(t=>(
                  <span key={t} className="flex items-center gap-3 px-8 text-sm font-semibold text-white whitespace-nowrap">
                    <span className="opacity-50">✦</span>{t}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── ABOUT ─────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="section-inner">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <ScrollReveal direction="right">
              <Tilt3D intensity={6}>
                <div className="relative rounded-3xl overflow-hidden shadow-xl" style={{ aspectRatio: '4/3' }}>
                  <Image
                    src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=900&q=85"
                    alt="Solar panels installation" fill className="object-cover"
                    sizes="(max-width:768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                  <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-3.5 shadow-md animate-float">
                    <div className="text-xs text-slate-400 mb-0.5">System Uptime</div>
                    <div className="font-display font-extrabold text-xl text-solar">99%</div>
                  </div>
                  <div className="absolute bottom-5 right-5 bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-3.5 shadow-md animate-float-slow">
                    <div className="text-xs text-slate-400 mb-0.5">Panel Warranty</div>
                    <div className="font-display font-extrabold text-xl text-solar">25 yr</div>
                  </div>
                </div>
              </Tilt3D>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={150}>
              <div className="label mb-4">About ZEROM Power</div>
              <h2 className="font-display font-extrabold text-navy leading-tight mb-4" style={{ fontSize: 'clamp(30px,3.5vw,48px)' }}>
                Engineering Excellence for<br /><span className="text-solar">A Sustainable Future</span>
              </h2>
              <div className="divider" />
              <p className="text-slate-500 mb-4 leading-relaxed">
                <strong className="text-navy">ZEROM Power</strong> is a leading renewable energy solutions company specialising in Solar EPC, Installation &amp; Construction, Operation &amp; Maintenance, Project Management Consultancy, and End-to-End Project Management services.
              </p>
              <p className="text-slate-400 mb-7 leading-relaxed text-sm">
                Our expertise spans utility-scale solar power plants, commercial and industrial solar installations, and specialised renewable energy infrastructure projects — delivering quality, reliability, and performance through innovative engineering and disciplined execution.
              </p>
              <div className="grid grid-cols-2 gap-2.5 mb-8">
                {['Single Point of Accountability','Quality, Safety & Operational Excellence','End-to-End Project Lifecycle','Long-Term Asset Management'].map(t=>(
                  <div key={t} className="flex items-center gap-2 text-sm text-slate-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-solar shrink-0" />{t}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary">Get a Free Quote <ArrowRight size={15}/></Link>
                <Link href="/about" className="btn-outline">Our Story</Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────── */}
      <section className="py-16 bg-slate-50 border-y border-slate-100">
        <div className="section-inner">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 80}>
                <div className="py-4">
                  <div className="font-display font-extrabold text-4xl text-solar mb-1.5">
                    <Counter target={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-slate-500 text-sm">{s.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="section-inner">
          <ScrollReveal className="text-center mb-14">
            <div className="label mb-3 justify-center">What We Do</div>
            <h2 className="font-display font-extrabold text-navy mb-3" style={{ fontSize: 'clamp(30px,3.5vw,48px)' }}>
              Complete Solar <span className="text-solar">Solutions</span>
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto text-sm">From initial concept to long-term operations — we cover every aspect of your solar journey.</p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <ScrollReveal key={s.title} delay={Math.floor(i % 3) * 80}>
                <Tilt3D className="h-full" intensity={7}>
                  <div className="card-light group relative overflow-hidden h-full flex flex-col">
                    <div className="relative h-44 overflow-hidden rounded-t-[20px]">
                      <Image src={s.img} alt={s.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width:768px) 100vw, 33vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-solar scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                      <div className="absolute bottom-3 left-4">
                        <div className="w-9 h-9 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm">
                          <s.icon size={16} className="text-solar" />
                        </div>
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-display font-bold text-navy text-base mb-2">{s.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">{s.desc}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {s.tags.map(t=>(
                          <span key={t} className="text-xs font-medium text-solar bg-solar/8 px-2.5 py-0.5 rounded-full border border-solar/15">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Tilt3D>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="text-center mt-10">
            <Link href="/services" className="btn-outline">View All Services <ArrowRight size={15}/></Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── WHY US — parallax ─────────────────────────────── */}
      <ParallaxHero
        src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1920&q=85"
        speed={0.3}
        overlay="rgba(5,8,15,0.72)"
        className="py-24"
      >
        <div className="section-inner">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <ScrollReveal direction="right">
              <div className="label mb-4">Why ZEROM Power</div>
              <h2 className="font-display font-extrabold text-white leading-tight mb-4" style={{ fontSize: 'clamp(30px,3.5vw,48px)' }}>
                The Partner You Can<br /><span className="text-solar">Trust for the Long Term</span>
              </h2>
              <div className="divider" />
              <div className="space-y-4 mb-8">
                {[
                  ['Multidisciplinary Expertise','Extensive industry experience across engineering, construction, project management, and operations.'],
                  ['End-to-End Solutions','Integrated solutions under one roof — simplifying project execution and creating a seamless experience.'],
                  ['Quality & Safety Focus','Strong quality assurance and safety compliance ensuring every project meets the highest industry standards.'],
                  ['Sustainability at Core','Committed to reducing carbon emissions, improving energy efficiency, and promoting responsible resource utilisation.'],
                ].map(([t,d])=>(
                  <div key={t} className="flex gap-4">
                    <div className="w-8 h-8 rounded-lg bg-solar/20 border border-solar/30 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle size={14} className="text-solar" />
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm mb-0.5">{t}</div>
                      <div className="text-white/50 text-sm">{d}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/contact" className="btn-primary">Start Your Project <ArrowRight size={15}/></Link>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={100}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { val:'99%', label:'System Uptime',     icon:'⚡' },
                  { val:'4hr', label:'Fault Response',    icon:'🔧' },
                  { val:'80%+',label:'Performance Ratio', icon:'📈' },
                  { val:'25yr',label:'Panel Warranty',    icon:'🛡️' },
                ].map(item=>(
                  <Tilt3D key={item.label} intensity={8}>
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <div className="font-display font-extrabold text-3xl text-solar mb-1">{item.val}</div>
                      <div className="text-white/50 text-xs">{item.label}</div>
                    </div>
                  </Tilt3D>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </ParallaxHero>

      {/* ── PROCESS ───────────────────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="section-inner">
          <ScrollReveal className="text-center mb-14">
            <div className="label mb-3 justify-center">How We Work</div>
            <h2 className="font-display font-extrabold text-navy" style={{ fontSize: 'clamp(30px,3.5vw,48px)' }}>
              Our <span className="text-solar">Process</span>
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {process.map((p,i)=>(
              <ScrollReveal key={p.num} delay={i*100}>
                <Tilt3D className="h-full" intensity={6}>
                  <div className="card-light p-6 h-full">
                    <div className="font-display font-extrabold text-5xl text-solar/20 mb-3 leading-none">{p.num}</div>
                    <h3 className="font-display font-bold text-navy mb-2 text-base">{p.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </Tilt3D>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG ──────────────────────────────────────────── */}
      {posts.length > 0 && (
        <section className="py-24 bg-white">
          <div className="section-inner">
            <ScrollReveal className="flex items-end justify-between mb-12">
              <div>
                <div className="label mb-2">Latest Insights</div>
                <h2 className="font-display font-extrabold text-navy" style={{ fontSize: 'clamp(26px,3vw,42px)' }}>
                  Solar <span className="text-solar">Knowledge Hub</span>
                </h2>
              </div>
              <Link href="/blog" className="btn-outline hidden md:flex">All Posts <ArrowRight size={14}/></Link>
            </ScrollReveal>
            <div className="grid md:grid-cols-3 gap-5">
              {posts.map((p:any,i:number)=>(
                <ScrollReveal key={p._id} delay={i*80}>
                  <Tilt3D className="h-full" intensity={5}>
                    <Link href={`/blog/${p.slug}`} className="block card-light overflow-hidden group h-full flex flex-col">
                      {p.coverImage ? (
                        <div className="relative h-40 overflow-hidden shrink-0">
                          <Image src={p.coverImage} alt={p.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width:768px) 100vw, 33vw" />
                          <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent" />
                        </div>
                      ) : (
                        <div className="h-1 bg-solar shrink-0" />
                      )}
                      <div className="p-6 flex flex-col flex-1">
                        <div className="text-xs text-solar font-semibold mb-2">{p.category||'Solar EPC'}</div>
                        <h3 className="font-display font-bold text-navy text-sm mb-3 leading-snug group-hover:text-solar transition-colors">{p.title}</h3>
                        <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 mb-4 flex-1">{p.excerpt}</p>
                        <div className="flex items-center gap-1 text-solar text-xs font-semibold">
                          Read More <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform"/>
                        </div>
                      </div>
                    </Link>
                  </Tilt3D>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ───────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="section-inner">
          <div className="max-w-2xl mx-auto">
            <ScrollReveal className="text-center mb-12">
              <div className="label mb-3 justify-center">Got Questions?</div>
              <h2 className="font-display font-extrabold text-navy" style={{ fontSize: 'clamp(26px,3vw,42px)' }}>
                Frequently Asked <span className="text-solar">Questions</span>
              </h2>
            </ScrollReveal>
            <FaqAccordion />
          </div>
        </div>
      </section>

      {/* ── CTA PARALLAX ──────────────────────────────────── */}
      <ParallaxHero
        src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=85"
        speed={0.25}
        overlay="rgba(5,8,15,0.75)"
        className="py-24"
      >
        <div className="section-inner">
          <div className="max-w-2xl mx-auto text-center">
            <ScrollReveal>
              <div className="label mb-4 justify-center">Get Started Today</div>
              <h2 className="font-display font-extrabold text-white leading-tight mb-5" style={{ fontSize: 'clamp(34px,4.5vw,62px)' }}>
                Ready to Go <span className="text-solar">Solar?</span>
              </h2>
              <p className="text-white/60 text-base mb-9 max-w-md mx-auto">
                Our experts will assess your requirements and design a custom solar solution — completely free.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact" className="btn-primary px-8 py-3.5">
                  Get a Free Quote <ArrowRight size={15}/>
                </Link>
                <a href="tel:+919429767516" className="btn-outline-white px-8 py-3.5">
                  <Phone size={14}/> Call Us Now
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </ParallaxHero>
    </>
  )
}
