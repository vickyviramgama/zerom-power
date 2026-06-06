'use client'

import { useState } from 'react'
import { PlusIcon, MinusIcon } from '@/components/HeroIcons'
const Plus = PlusIcon

const faqs = [
  { q: 'What is a Solar EPC contract?', a: "EPC (Engineering, Procurement & Construction) means we handle everything — design, sourcing equipment, and building the plant — giving you a single point of accountability." },
  { q: 'How long does a rooftop solar installation take?', a: "A typical 100 kW rooftop system takes 2–4 weeks from kick-off to commissioning. Larger ground-mounted plants are 3–6 months depending on scale." },
  { q: 'What is the ROI on a solar system?', a: "Most commercial and industrial installations pay back in 4–6 years and generate free electricity for the remaining 19–21 years of the panel's life." },
  { q: 'Do you handle net metering and government subsidies?', a: "Yes — we manage all regulatory filings, DISCOM applications, net metering connections, and help you claim any applicable government subsidies." },
  { q: 'What does your O&M contract include?', a: "Our O&M packages cover preventive maintenance, SCADA monitoring, corrective fault resolution (4hr SLA), annual cleaning, and monthly energy yield reports." },
  { q: 'Can you upgrade my existing solar system?', a: "Absolutely. Our Solar Retrofitting service upgrades panels, inverters, and monitoring on existing systems to restore or improve peak performance." },
]

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="space-y-3">
      {faqs.map((f, i) => (
        <div key={i} className={`card-light rounded-2xl overflow-hidden transition-all duration-300 ${open === i ? 'border-solar/30' : ''}`}>
          <button
            className="w-full flex items-center justify-between p-6 text-left"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className={`font-semibold text-sm pr-4 ${open === i ? 'text-solar' : 'text-navy'}`}>{f.q}</span>
            <Plus size={16} className={`text-solar shrink-0 transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`} />
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${open === i ? 'max-h-40' : 'max-h-0'}`}>
            <p className="px-6 pb-6 text-slate-500 text-sm leading-relaxed">{f.a}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
