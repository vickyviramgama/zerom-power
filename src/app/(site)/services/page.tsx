import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon, WrenchScrewdriverIcon, ClipboardDocumentListIcon, ChartBarIcon, BuildingStorefrontIcon, SparklesIcon, TrophyIcon } from '@/components/HeroIcons'
import ParallaxHero from '@/components/ParallaxHero'
import Tilt3D from '@/components/Tilt3D'
import ScrollReveal from '@/components/ScrollReveal'

const ArrowRight    = ArrowRightIcon
const HardHat       = WrenchScrewdriverIcon
const ClipboardList = ClipboardDocumentListIcon
const BarChart3     = ChartBarIcon
const Factory       = BuildingStorefrontIcon
const Leaf          = SparklesIcon
const Trophy        = TrophyIcon

export const metadata: Metadata = {
  title: 'Our Services — ZEROM Power',
  description: "ZEROM Power's complete renewable energy services: Solar EPC, Installation & Construction, O&M, PMC, and End-to-End Project Management for utility-scale, commercial and industrial projects.",
}

const additionalServices = [
  { id: 'ic',     Icon: HardHat,      title: 'Installation & Construction', desc: 'Comprehensive civil, mechanical, and electrical construction services — from site preparation and foundation works to module installation, cable laying, inverter integration, and commissioning support.', tags: ['Civil Works','Module Installation','Commissioning'], img: 'https://images.unsplash.com/photo-1581093577421-f561a654a353?w=600&q=80' },
  { id: 'pmc',    Icon: ClipboardList,title: 'PMC Services',                desc: 'Project Management Consultancy providing clients complete visibility and control throughout the project lifecycle — effective planning, coordination, risk management, quality control, and schedule adherence.', tags: ['Independent Oversight','Risk Management','Quality Control'], img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80' },
  { id: 'pm',     Icon: BarChart3,    title: 'Project Management',          desc: 'Successful projects require effective coordination, timely decision-making, and disciplined execution. We focus on delivering projects safely, efficiently, and within budget — from planning and scheduling to contractor coordination and reporting.', tags: ['Planning & Scheduling','Contractor Coordination','Progress Monitoring'], img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80' },
  { id: 'sectors',Icon: Factory,      title: 'Industries We Serve',         desc: 'ZEROM Power serves utility-scale power generation, industrial and manufacturing, commercial and retail, government, educational institutions, healthcare, mining operations, infrastructure developers, and agricultural projects.', tags: ['Utility-Scale','Industrial','Commercial'], img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80' },
  { id: 'sustain',Icon: Leaf,         title: 'Sustainability Commitment',   desc: 'Committed to supporting the global transition towards clean energy by developing solutions that reduce carbon emissions, improve energy efficiency, and promote responsible resource utilisation through innovation and engineering excellence.', tags: ['Carbon Reduction','Energy Efficiency','Clean Energy'], img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80' },
  { id: 'why',    Icon: Trophy,       title: 'Why Choose ZEROM Power',      desc: 'Multidisciplinary expertise across engineering, construction, project management and operations — end-to-end solutions under one roof, with strong quality assurance, safety compliance, and a commitment to delivering technically superior, economically viable results.', tags: ['End-to-End','Quality Assured','Expert Team'], img: 'https://images.unsplash.com/photo-1591964006776-90b2eb938b93?w=600&q=80' },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <ParallaxHero
        src="https://images.unsplash.com/photo-1548337138-e87d889cc369?w=1920&q=80"
        className="min-h-[55vh] flex items-center"
        overlay="rgba(5,8,15,0.65)"
      >
        <div className="max-w-4xl mx-auto px-6 text-center py-36">
          <div className="flex items-center justify-center gap-2 text-white/40 text-sm mb-5">
            <Link href="/" className="hover:text-solar transition-colors">Home</Link>
            <span>›</span><span className="text-white/70">Services</span>
          </div>
          <div className="label mx-auto mb-5 justify-center">What We Offer</div>
          <h1 className="font-display font-extrabold text-white text-5xl md:text-7xl leading-none mb-5">
            Our <span className="text-solar">Services</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            End-to-end solar solutions tailored for every scale — from residential rooftops to utility-scale power plants.
          </p>
        </div>
      </ParallaxHero>

      {/* Solar EPC */}
      <section id="epc" className="py-28 bg-white">
        <div className="section-inner grid lg:grid-cols-2 gap-20 items-center">
          <ScrollReveal direction="right">
            <div className="label mb-5">Solar EPC</div>
            <h2 className="font-display font-bold text-navy text-4xl md:text-5xl leading-tight mb-5">
              Engineering, Procurement<br /><span className="text-solar">&amp; Construction</span>
            </h2>
            <div className="divider" />
            <p className="text-slate-500 mb-8 leading-relaxed text-lg">
              ZEROM Power offers complete Engineering, Procurement, and Construction solutions for solar power projects of all scales — covering every aspect from feasibility studies and detailed engineering to procurement of high-quality equipment, construction management, testing, and commissioning.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-10">
              {['Feasibility Studies','Detailed Engineering & Design','Equipment Procurement','Construction Management','Testing & Commissioning','Grid Integration','Regulatory Compliance','Net Metering Applications'].map((item) => (
                <div key={item} className="flex gap-2 items-start text-sm text-slate-500">
                  <span className="text-solar font-bold shrink-0 mt-0.5">✓</span>{item}
                </div>
              ))}
            </div>
            <Link href="/contact" className="btn-primary"><ArrowRight size={16} /> Request EPC Quote</Link>
          </ScrollReveal>
          <ScrollReveal direction="left" delay={100}>
            <Tilt3D intensity={8}>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=900&q=85"
                  alt="Solar EPC Installation" fill className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-3">
                  {[['500+','Projects'],['50MW','Installed'],['99%','Uptime']].map(([v,l])=>(
                    <div key={l} className="bg-white/90 backdrop-blur-sm rounded-xl p-3 text-center shadow-sm">
                      <div className="font-display font-extrabold text-solar text-xl">{v}</div>
                      <div className="text-slate-500 text-xs">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Tilt3D>
          </ScrollReveal>
        </div>
      </section>

      {/* O&M */}
      <section id="om" className="py-28 bg-slate-50">
        <div className="section-inner grid lg:grid-cols-2 gap-20 items-center">
          <ScrollReveal direction="right">
            <Tilt3D intensity={6}>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=900&q=85"
                  alt="O&M Solar Maintenance" fill className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/30 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  {[['System Availability','99%'],['Response Time','4 hrs'],['Performance Ratio','80%+'],['Report Frequency','Monthly']].map(([label, val]) => (
                    <div key={label as string} className="flex justify-between items-center py-3 border-b border-white/10 last:border-b-0">
                      <span className="text-white/70 text-sm">{label}</span>
                      <span className="font-display font-extrabold text-solar text-lg">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Tilt3D>
          </ScrollReveal>
          <ScrollReveal direction="left" delay={100}>
            <div className="label mb-5">O&M Services</div>
            <h2 className="font-display font-bold text-navy text-4xl md:text-5xl leading-tight mb-5">
              Operation &amp;<br /><span className="text-solar">Management</span>
            </h2>
            <div className="divider" />
            <p className="text-slate-500 mb-8 leading-relaxed text-lg">
              The long-term success of a solar asset depends on its operational efficiency and reliability. ZEROM Power provides professional O&amp;M services designed to maximise plant availability, improve energy generation, and extend asset life through preventive maintenance, corrective actions, performance monitoring, and detailed reporting.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-10">
              {['Preventive Maintenance','Corrective Actions','Performance Monitoring','Remote SCADA Monitoring','Data-Driven Analytics','Asset Management','Energy Yield Reporting','Cleaning & Inspection'].map((item) => (
                <div key={item} className="flex gap-2 items-start text-sm text-slate-500">
                  <span className="text-solar font-bold shrink-0 mt-0.5">✓</span>{item}
                </div>
              ))}
            </div>
            <Link href="/contact" className="btn-primary">Enquire About O&amp;M</Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-28 bg-white">
        <div className="section-inner">
          <ScrollReveal className="text-center mb-14">
            <div className="label mx-auto mb-4 justify-center">More Services</div>
            <h2 className="font-display font-bold text-navy text-4xl md:text-5xl">
              Additional <span className="text-solar">Capabilities</span>
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((s, i) => (
              <ScrollReveal key={s.id} delay={Math.floor(i % 3) * 80}>
                <Tilt3D intensity={7}>
                  <div id={s.id} className="card-light group relative overflow-hidden rounded-2xl">
                    <div className="relative h-44 overflow-hidden rounded-t-[20px]">
                      <Image src={s.img} alt={s.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-solar scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                      <div className="absolute top-4 left-4 w-11 h-11 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-sm">
                        <s.Icon size={20} className="text-solar" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display font-bold text-navy text-lg mb-3">{s.title}</h3>
                      <p className="text-slate-400 text-sm mb-5 leading-relaxed">{s.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {s.tags.map((t) => (
                          <span key={t} className="text-xs font-medium text-solar bg-solar/8 px-3 py-1 rounded-full border border-solar/15">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Tilt3D>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Parallax */}
      <ParallaxHero
        src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=80"
        className="py-28"
        overlay="rgba(5,8,15,0.75)"
      >
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-display font-bold text-white text-4xl md:text-5xl mb-5">
            Ready to Transform Your<br /><span className="text-solar">Energy Future?</span>
          </h2>
          <p className="text-white/60 mb-10 text-lg">Partner with ZEROM Power to transform your energy vision into reality. Our team is ready to support you at every stage of your renewable energy journey.</p>
          <Link href="/contact" className="btn-primary text-base px-10 py-4">Talk to an Expert <ArrowRight size={15}/></Link>
        </div>
      </ParallaxHero>
    </>
  )
}
