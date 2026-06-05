// Static demo blog posts — used as fallback when MongoDB is unavailable
// Also used by the seed script (scripts/seed.ts)

export const demoPosts = [
  {
    _id: 'demo-1',
    title: 'How Solar EPC Projects Are Transforming Gujarat\'s Energy Landscape',
    slug: 'solar-epc-gujarat-energy-transformation',
    excerpt: 'Gujarat has become India\'s solar capital. We break down how large-scale EPC projects are driving the state\'s renewable revolution and what it means for businesses and homeowners.',
    content: `<h2>Gujarat's Solar Story</h2>
<p>Gujarat accounts for nearly 20% of India's total installed solar capacity — and that number is climbing. The state's abundant sunshine (300+ sunny days per year), progressive policy framework, and investor-friendly environment make it the ideal ground for solar EPC projects of every scale.</p>

<h2>What Is Solar EPC?</h2>
<p>EPC stands for Engineering, Procurement, and Construction. A solar EPC company handles the entire project lifecycle — from site assessment and system design, through equipment sourcing and installation, to commissioning and handover. For clients, this means a single point of accountability and a faster path from concept to clean energy.</p>

<h2>Why Gujarat Leads</h2>
<ul>
  <li><strong>Policy support:</strong> Gujarat's solar policy offers attractive feed-in tariffs and net metering benefits.</li>
  <li><strong>Land availability:</strong> Vast semi-arid regions like Kutch and Saurashtra offer low-cost land for utility-scale plants.</li>
  <li><strong>Grid infrastructure:</strong> A robust transmission network makes power evacuation straightforward.</li>
</ul>

<h2>The ZEROM Power Approach</h2>
<p>At ZEROM Power, we combine deep local expertise with engineering rigour. Every EPC project starts with a detailed solar resource assessment, followed by bankable design, tier-1 equipment procurement, and a construction process that prioritises safety and quality.</p>

<p>Whether you're a farmer installing a 10 kW rooftop system or an industrial unit commissioning a 5 MW ground-mount plant, the fundamentals are the same: the right design, the right equipment, and the right team.</p>

<h2>Looking Ahead</h2>
<p>With India targeting 500 GW of renewable capacity by 2030, Gujarat is set to be at the centre of the action. There has never been a better time to invest in solar — and ZEROM Power is here to make that journey seamless.</p>`,
    category: 'Solar EPC',
    author: 'ZEROM Power Team',
    status: 'published',
    createdAt: new Date('2024-11-15').toISOString(),
    updatedAt: new Date('2024-11-15').toISOString(),
  },
  {
    _id: 'demo-2',
    title: 'O&M Best Practices: Keeping Your Solar Plant at Peak Performance',
    slug: 'solar-om-best-practices-peak-performance',
    excerpt: 'A solar plant is only as good as its maintenance regime. Discover the O&M protocols that top-performing plants swear by — and how proactive monitoring can add years to your system\'s life.',
    content: `<h2>Why O&M Matters</h2>
<p>Installing a solar plant is just the beginning. Without a structured Operations & Maintenance (O&M) programme, even the best-designed systems lose output over time. Studies show that plants with proactive O&M deliver 5–10% more energy annually than those running reactive maintenance only.</p>

<h2>Key O&M Activities</h2>
<h3>1. Panel Cleaning</h3>
<p>Dust, bird droppings, and industrial fallout can reduce panel output by up to 30% in India's conditions. Regular dry/wet cleaning — frequency depending on location — is the single highest-ROI maintenance task.</p>

<h3>2. Performance Monitoring</h3>
<p>Real-time SCADA and string-level monitoring lets technicians spot underperforming strings, inverter faults, and soiling losses before they become costly problems. Remote monitoring reduces on-site visits while improving response time.</p>

<h3>3. Inverter Servicing</h3>
<p>Inverters are the workhorses of a solar plant. Scheduled inspections of cooling fans, capacitors, and firmware updates extend inverter life and prevent catastrophic failures.</p>

<h3>4. Electrical Inspections</h3>
<p>Thermographic (IR) scans of junction boxes, DC cables, and AC panels identify hotspots that indicate loose connections or degraded components — before they become fire risks.</p>

<h2>The ZEROM Power O&M Package</h2>
<p>Our AMC (Annual Maintenance Contract) covers all of the above, with monthly performance reports, guaranteed response times, and spare parts availability. We currently manage over 10 MW of installed capacity across Gujarat.</p>`,
    category: 'O&M',
    author: 'ZEROM Power Team',
    status: 'published',
    createdAt: new Date('2024-11-08').toISOString(),
    updatedAt: new Date('2024-11-08').toISOString(),
  },
  {
    _id: 'demo-3',
    title: 'Hybrid Solar + BESS: The Future of 24×7 Clean Energy',
    slug: 'hybrid-solar-bess-24x7-clean-energy',
    excerpt: 'Battery Energy Storage Systems are changing the economics of solar. Learn how hybrid configurations can deliver round-the-clock clean power and reduce your grid dependency to near zero.',
    content: `<h2>Beyond Daytime Power</h2>
<p>Traditional solar systems generate electricity only when the sun shines. For businesses that operate at night or require uninterruptible power, this has historically been a limitation. Battery Energy Storage Systems (BESS) change that equation entirely.</p>

<h2>How Hybrid Solar Works</h2>
<p>A hybrid solar + BESS system combines PV generation with a battery bank and a smart energy management controller. During the day, solar powers loads and charges the battery. At night — or during grid outages — the battery discharges to maintain supply. Any surplus is exported to the grid or held for peak-hour use.</p>

<h2>Financial Case</h2>
<ul>
  <li><strong>Peak shaving:</strong> Discharge during peak tariff hours (6–10 PM) to avoid expensive grid power.</li>
  <li><strong>Demand charge reduction:</strong> Keep peak demand below contract limits, reducing monthly fixed charges.</li>
  <li><strong>Backup value:</strong> Eliminate losses from power cuts — critical for cold chains, hospitals, and data centres.</li>
</ul>

<h2>Technology Choices</h2>
<p>Today's BESS market is dominated by Lithium Iron Phosphate (LFP) chemistry — chosen for its safety, cycle life (3,000–6,000 cycles), and thermal stability. At ZEROM Power, we work with tier-1 battery suppliers to size systems correctly for your load profile and budget.</p>

<h2>Is Hybrid Right for You?</h2>
<p>Hybrid systems make strong financial sense when: your grid power is unreliable, your peak tariff is 2×+ your off-peak tariff, or you have sustainability commitments requiring 24×7 renewable energy. Talk to us for a free feasibility study.</p>`,
    category: 'Technology',
    author: 'ZEROM Power Team',
    status: 'published',
    createdAt: new Date('2024-10-28').toISOString(),
    updatedAt: new Date('2024-10-28').toISOString(),
  },
  {
    _id: 'demo-4',
    title: 'PM Surya Ghar Yojana: Free Electricity for 1 Crore Homes',
    slug: 'pm-surya-ghar-yojana-free-electricity-scheme',
    excerpt: 'The central government\'s PM Surya Ghar Muft Bijli Yojana offers up to ₹78,000 in subsidies for rooftop solar. Here\'s everything you need to know to apply and benefit.',
    content: `<h2>What Is PM Surya Ghar Yojana?</h2>
<p>Launched in February 2024, PM Surya Ghar Muft Bijli Yojana (PMSGMBY) is the Indian government's flagship rooftop solar scheme. Its goal: install rooftop solar on 1 crore (10 million) households and provide up to 300 units of free electricity per month.</p>

<h2>Subsidy Structure</h2>
<table>
  <thead><tr><th>System Size</th><th>Central Subsidy</th></tr></thead>
  <tbody>
    <tr><td>Up to 2 kW</td><td>₹30,000 per kW (₹60,000 max)</td></tr>
    <tr><td>2–3 kW</td><td>₹18,000 per kW for the additional kW</td></tr>
    <tr><td>Above 3 kW</td><td>Capped at ₹78,000</td></tr>
  </tbody>
</table>

<h2>How to Apply</h2>
<ol>
  <li>Visit the national portal: <strong>pmsuryaghar.gov.in</strong></li>
  <li>Register with your electricity consumer number and state</li>
  <li>Apply for rooftop solar through an empanelled vendor</li>
  <li>Get the system installed and inspected</li>
  <li>Submit net metering application and bank details</li>
  <li>Subsidy is credited directly to your bank account</li>
</ol>

<h2>ZEROM Power Is an Empanelled Vendor</h2>
<p>We are registered under the scheme and can handle your entire application process — from portal registration to installation and net metering. Our team has helped dozens of households in Porbandar and Saurashtra region claim their full subsidy. Contact us for a free site visit and cost estimate.</p>`,
    category: 'Policy & Finance',
    author: 'ZEROM Power Team',
    status: 'published',
    createdAt: new Date('2024-10-15').toISOString(),
    updatedAt: new Date('2024-10-15').toISOString(),
  },
  {
    _id: 'demo-5',
    title: 'Case Study: 500 kW Industrial Rooftop in Rajkot — 0 to Commissioning in 45 Days',
    slug: 'case-study-500kw-industrial-rooftop-rajkot',
    excerpt: 'How ZEROM Power designed, procured, and commissioned a 500 kW rooftop solar plant for a textile manufacturer in Rajkot — delivering ₹42 lakh in annual savings from day one.',
    content: `<h2>Project Overview</h2>
<p>A mid-sized textile manufacturer in Rajkot was facing escalating electricity bills — monthly consumption of 1.2 lakh units at ₹7.80/unit, totalling ₹9.36 lakh per month. With a large factory roof and a long planning horizon, they approached ZEROM Power for a comprehensive solar solution.</p>

<h2>The Challenge</h2>
<ul>
  <li>Aging roof structure requiring load analysis before mounting</li>
  <li>Three-phase supply with complex load distribution</li>
  <li>45-day commissioning deadline before the peak summer season</li>
  <li>Requirement for zero downtime during installation</li>
</ul>

<h2>Our Solution</h2>
<p><strong>System Design:</strong> 500 kW DC / 450 kW AC configuration using 1,250 × 400 Wp mono-PERC panels on a ballasted mounting structure (no roof penetrations). Five 90 kW string inverters with remote monitoring.</p>

<p><strong>Procurement:</strong> Tier-1 panels from Waaree, inverters from SMA — all sourced within 12 days leveraging our supplier relationships.</p>

<p><strong>Construction:</strong> 35-person crew working in two shifts. Roof strengthening completed in Week 1; mounting and cabling in Weeks 2–3; electrical and commissioning in Week 4.</p>

<h2>Results</h2>
<ul>
  <li><strong>Annual generation:</strong> 6.75 lakh units</li>
  <li><strong>Annual saving:</strong> ₹52.65 lakh (at ₹7.80/unit)</li>
  <li><strong>Simple payback:</strong> 4.2 years</li>
  <li><strong>25-year NPV:</strong> ₹3.2 crore</li>
  <li>Commissioned on Day 43 — two days ahead of schedule</li>
</ul>

<h2>Client Testimonial</h2>
<blockquote>"ZEROM Power delivered exactly what they promised — on time, on budget, with zero disruption to our production. The monitoring dashboard makes it easy to track savings in real time."</blockquote>`,
    category: 'Case Studies',
    author: 'ZEROM Power Team',
    status: 'published',
    createdAt: new Date('2024-09-20').toISOString(),
    updatedAt: new Date('2024-09-20').toISOString(),
  },
  {
    _id: 'demo-6',
    title: 'Energy Audit 101: How to Slash Your Electricity Bill Before Going Solar',
    slug: 'energy-audit-reduce-electricity-bill-before-solar',
    excerpt: 'A proper energy audit before installing solar can reduce your system size by 20–30% — saving lakhs on capital cost. Here\'s what an audit covers and why it should be your first step.',
    content: `<h2>What Is an Energy Audit?</h2>
<p>An energy audit is a systematic review of how your facility consumes electricity. It identifies wasteful loads, inefficient equipment, and operational patterns that can be improved — often at low or no cost — before a solar system is sized and designed.</p>

<h2>Why Audit Before Going Solar?</h2>
<p>Solar system size (and cost) is directly proportional to your energy consumption. If an audit reveals that 25% of your consumption can be eliminated through efficiency measures, you can install a smaller, cheaper solar plant while still achieving the same bill reduction.</p>

<p>Example: A factory consuming 50,000 units/month might size a 400 kW solar plant. After an audit reducing consumption to 38,000 units, a 300 kW system achieves the same offset — saving ₹20–25 lakh on installation cost alone.</p>

<h2>What Does an Audit Cover?</h2>
<h3>Lighting</h3>
<p>Replacing T8 fluorescent tubes with LED equivalents typically cuts lighting load by 50–60% with a payback under 2 years.</p>

<h3>HVAC & Cooling</h3>
<p>Air conditioning is often the single largest load in commercial premises. Audit findings commonly include: incorrect thermostat settings, chilled water system inefficiencies, and poor insulation.</p>

<h3>Motors & Drives</h3>
<p>Industrial motors running at full speed for variable loads are major energy wasters. Variable Frequency Drives (VFDs) on pumps and fans typically save 20–40% of motor energy.</p>

<h3>Power Factor</h3>
<p>Poor power factor increases your apparent power demand and attracts utility penalties. Capacitor bank installation corrects this, often with a 6–12 month payback.</p>

<h2>Book a Free Energy Audit</h2>
<p>ZEROM Power offers free preliminary energy audits for commercial and industrial clients considering solar. Our engineers walk your facility, review your electricity bills, and provide a written report with prioritised recommendations. Contact us to schedule yours.</p>`,
    category: 'Solar EPC',
    author: 'ZEROM Power Team',
    status: 'published',
    createdAt: new Date('2024-09-05').toISOString(),
    updatedAt: new Date('2024-09-05').toISOString(),
  },
]
