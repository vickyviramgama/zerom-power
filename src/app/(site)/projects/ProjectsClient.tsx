'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon, MapPinIcon, BoltIcon } from '@/components/HeroIcons'
import ParallaxHero from '@/components/ParallaxHero'
import Tilt3D from '@/components/Tilt3D'
import ScrollReveal from '@/components/ScrollReveal'

const ArrowRight = ArrowRightIcon
const MapPin     = MapPinIcon
const Zap        = BoltIcon

const projects = [
  { id: 1, category: 'epc', sector: 'industrial', title: 'Industrial Solar Plant — Rajkot',      location: 'Rajkot, Gujarat',      capacity: '2 MW',    type: 'Ground Mounted EPC',    desc: 'End-to-end EPC delivery for a large manufacturing unit. Includes custom string inverter design and SCADA integration.',    tags: ['EPC','Industrial'], img: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&q=80' },
  { id: 2, category: 'om',  sector: 'commercial', title: 'Commercial Rooftop — Ahmedabad',       location: 'Ahmedabad, Gujarat',   capacity: '500 kW',  type: 'Rooftop O&M Contract',  desc: 'Annual O&M contract covering preventive maintenance, performance monitoring, and quarterly cleaning cycles.',               tags: ['O&M','Commercial'], img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80' },
  { id: 3, category: 'epc', sector: 'industrial', title: 'Textile Mill Solar — Surat',           location: 'Surat, Gujarat',       capacity: '1.5 MW',  type: 'Rooftop EPC',           desc: 'Large-scale rooftop installation for a textile processing facility — reducing grid dependence by 65%.',                    tags: ['EPC','Industrial'], img: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&q=80' },
  { id: 4, category: 'epc', sector: 'commercial', title: 'Retail Mall Solar — Vadodara',         location: 'Vadodara, Gujarat',    capacity: '300 kW',  type: 'Rooftop EPC',           desc: 'Grid-tied rooftop solar for a multi-level shopping complex. Integrated with building management system (BMS).',           tags: ['EPC','Commercial'], img: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=600&q=80' },
  { id: 5, category: 'om',  sector: 'industrial', title: 'Cement Plant O&M — Junagadh',          location: 'Junagadh, Gujarat',    capacity: '750 kW',  type: 'Annual O&M Contract',   desc: 'Comprehensive O&M program including remote SCADA monitoring, fault diagnosis, and spare parts management.',                tags: ['O&M','Industrial'], img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80' },
  { id: 6, category: 'epc', sector: 'commercial', title: 'Hotel Solar — Porbandar',              location: 'Porbandar, Gujarat',   capacity: '100 kW',  type: 'Rooftop EPC + Hybrid',  desc: 'Hybrid solar + battery system for a beachfront hotel ensuring uninterrupted power during grid outages.',                  tags: ['EPC','Hybrid'],    img: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80' },
  { id: 7, category: 'epc', sector: 'industrial', title: 'Pharma Plant Solar — Ankleshwar',      location: 'Ankleshwar, Gujarat',  capacity: '3 MW',    type: 'Ground Mounted EPC',    desc: 'Utility-scale ground-mounted plant for a pharmaceutical manufacturer. Features bifacial panels and central inverters.',   tags: ['EPC','Industrial'], img: 'https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?w=600&q=80' },
  { id: 8, category: 'om',  sector: 'commercial', title: 'School Campus Solar — Rajkot',         location: 'Rajkot, Gujarat',      capacity: '200 kW',  type: 'Rooftop O&M',           desc: 'O&M for a 200 kW rooftop system installed across 3 school buildings. Monthly reports provided to management.',            tags: ['O&M','Commercial'], img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80' },
  { id: 9, category: 'epc', sector: 'industrial', title: 'Agro Processing Unit — Amreli',        location: 'Amreli, Gujarat',      capacity: '400 kW',  type: 'Rooftop EPC',           desc: 'Solar installation for an agro-processing facility integrating net metering and government subsidy compliance.',          tags: ['EPC','Industrial'], img: 'https://images.unsplash.com/photo-1548337138-e87d889cc369?w=600&q=80' },
]

const filters = [
  { key: 'all',         label: 'All Projects' },
  { key: 'epc',        label: 'Solar EPC' },
  { key: 'om',         label: 'O&M' },
  { key: 'industrial', label: 'Industrial' },
  { key: 'commercial', label: 'Commercial' },
]

const stats = [
  { value: '500+', label: 'Projects Completed' },
  { value: '50 MW',label: 'Capacity Installed' },
  { value: '7+',   label: 'States Covered' },
  { value: '300+', label: 'Happy Clients' },
]

export default function ProjectsClient() {
  const [active, setActive] = useState('all')

  const filtered = active === 'all'
    ? projects
    : projects.filter(p => p.category === active || p.sector === active)

  return (
    <>
      {/* Hero */}
      <ParallaxHero
        src="https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?w=1920&q=80"
        className="min-h-[55vh] flex items-center"
        overlay="rgba(5,8,15,0.65)"
      >
        <div className="max-w-4xl mx-auto px-6 text-center py-36">
          <div className="flex items-center justify-center gap-2 text-white/40 text-sm mb-5">
            <Link href="/" className="hover:text-solar transition-colors">Home</Link>
            <span>›</span><span className="text-white/70">Projects</span>
          </div>
          <div className="label mx-auto mb-5 justify-center">Portfolio</div>
          <h1 className="font-display font-extrabold text-white text-5xl md:text-7xl leading-none mb-5">
            Our <span className="text-solar">Projects</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Real installations. Real impact. Browse our growing portfolio of solar EPC and O&M projects across India.
          </p>
        </div>
      </ParallaxHero>

      {/* Stats Bar */}
      <section className="py-10 bg-slate-50 border-b border-slate-100">
        <div className="section-inner grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-display font-extrabold text-3xl text-solar mb-1">{s.value}</div>
              <div className="text-slate-500 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-24 bg-white">
        <div className="section-inner">
          <ScrollReveal className="flex flex-wrap gap-3 justify-center mb-12">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActive(f.key)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                  active === f.key
                    ? 'bg-solar text-white border-solar shadow-sm'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-solar hover:text-solar'
                }`}
              >
                {f.label}
              </button>
            ))}
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <ScrollReveal key={p.id} delay={Math.floor(i % 3) * 80}>
                <Tilt3D intensity={7}>
                  <div className="card-light group overflow-hidden rounded-2xl relative">
                    <div className="relative h-48 overflow-hidden rounded-t-[20px]">
                      <Image src={p.img} alt={p.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-solar scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                      <div className="absolute top-3 right-3 flex gap-1.5 flex-wrap justify-end">
                        {p.tags.map((t) => (
                          <span key={t} className="text-xs font-semibold text-white bg-solar px-2.5 py-0.5 rounded-full">{t}</span>
                        ))}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display font-bold text-navy mb-2 leading-snug">{p.title}</h3>
                      <p className="text-slate-400 text-sm mb-5 leading-relaxed">{p.desc}</p>
                      <div className="flex items-center gap-5 text-sm border-t border-slate-100 pt-4">
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <MapPin size={13} className="text-solar" />
                          {p.location}
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <Zap size={13} className="text-solar" />
                          {p.capacity}
                        </div>
                      </div>
                    </div>
                  </div>
                </Tilt3D>
              </ScrollReveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-slate-400">No projects found for this filter.</div>
          )}
        </div>
      </section>

      {/* CTA */}
      <ParallaxHero
        src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1920&q=80"
        className="py-28"
        overlay="rgba(5,8,15,0.75)"
      >
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-display font-bold text-white text-4xl md:text-5xl mb-5">
            Ready to Start Your<br /><span className="text-solar">Solar Project?</span>
          </h2>
          <p className="text-white/60 mb-10 text-lg">Join 300+ businesses who trust ZEROM Power for their energy needs.</p>
          <Link href="/contact" className="btn-primary text-base px-10 py-4"><ArrowRight size={16} /> Get a Free Quote</Link>
        </div>
      </ParallaxHero>
    </>
  )
}
