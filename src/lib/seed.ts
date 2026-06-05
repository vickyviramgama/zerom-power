/**
 * Seed script: npx ts-node --project tsconfig.json -e "require('./src/lib/seed')"
 * Or just use the /api/seed route in dev mode
 */
import connectDB from './mongodb'
import Post from '../models/Post'

const samplePosts = [
  {
    title: "Why Solar Energy is the Future of India's Power Grid",
    slug:  'solar-energy-future-india',
    excerpt: "India receives over 300 days of sunshine annually — here's how solar is reshaping the nation's energy landscape.",
    content: `<p>India's energy demands are growing at an unprecedented pace. With a population exceeding 1.4 billion and rapid industrialization, the country needs sustainable, cost-effective power solutions. Solar energy has emerged as the undisputed frontrunner.</p>
<h2>The Solar Opportunity</h2>
<p>India receives an average of 4–7 kWh per square meter of solar radiation daily, making it one of the most solar-rich countries on the planet. The government's ambitious target of 500 GW of renewable energy capacity by 2030 reflects the immense potential being harnessed.</p>
<h2>EPC: The Backbone of Solar Deployment</h2>
<p>Engineering, Procurement, and Construction (EPC) companies play a critical role in this transformation. From site feasibility assessments to grid integration, EPC contractors like ZEROM Power ensure projects are delivered on time, on budget, and at peak performance.</p>
<h2>O&M: Protecting Your Investment</h2>
<p>Once installed, a solar plant requires meticulous Operation & Maintenance to sustain output over its 25+ year lifespan. Regular preventive maintenance, remote monitoring, and timely corrective action can improve yield by 10–15%.</p>
<p>At ZEROM Power, we combine deep technical expertise with a customer-first philosophy to deliver solar solutions that truly power your growth.</p>`,
    category: 'Solar Industry',
    status:   'published' as const,
  },
  {
    title: 'Rooftop vs Ground-Mounted Solar: Which is Right for You?',
    slug:  'rooftop-vs-ground-mounted-solar',
    excerpt: 'Choosing between rooftop and ground-mounted installations depends on space, scale, and budget. We break down the key differences.',
    content: `<p>When planning a solar installation, one of the first decisions you'll face is: rooftop or ground-mounted? Both options have distinct advantages, and the right choice depends on your specific energy needs, available space, and long-term goals.</p>
<h2>Rooftop Solar</h2>
<p>Rooftop installations are ideal for commercial buildings, factories, and housing societies that want to utilize existing roof space. They require minimal additional land and offer a direct offset to your building's electricity consumption.</p>
<h2>Ground-Mounted Solar</h2>
<p>Ground-mounted systems are suited for utility-scale projects and industrial clients with large parcels of land. They offer greater flexibility in panel orientation and tilt angle optimization, often yielding higher efficiency.</p>
<h2>Key Factors to Consider</h2>
<p><strong>Space availability:</strong> Rooftop space is limited; ground systems need open land.<br><strong>Scale:</strong> For MW-scale projects, ground-mounted is usually preferred.<br><strong>Budget:</strong> Ground-mounted systems have higher civil and structural costs.</p>
<p>Our expert team at ZEROM Power will conduct a comprehensive site assessment and recommend the optimal solution for your situation.</p>`,
    category: 'Technology',
    status:   'published' as const,
  },
  {
    title: 'Understanding Solar EPC: From Feasibility to Commissioning',
    slug:  'understanding-solar-epc-process',
    excerpt: "A complete breakdown of the Solar EPC process — what happens at each stage and why it matters for your project's success.",
    content: `<p>The EPC (Engineering, Procurement, and Construction) model is the gold standard for delivering large-scale solar projects. It provides a single point of accountability, streamlining communication and reducing risk for project owners.</p>
<h2>Stage 1: Feasibility Study & Site Assessment</h2>
<p>Before a single panel is ordered, our engineers conduct a thorough site assessment including solar irradiance analysis, shadow mapping, structural load calculations, and grid connectivity evaluation.</p>
<h2>Stage 2: Engineering & Design</h2>
<p>Our design team creates optimised layouts using industry-leading simulation software, selecting the most efficient panel configurations, inverter types, and mounting structures.</p>
<h2>Stage 3: Procurement</h2>
<p>We leverage our supply chain relationships to source tier-1 components — solar modules, inverters, mounting structures — at competitive prices without compromising quality.</p>
<h2>Stage 4: Construction & Installation</h2>
<p>Our certified installation teams execute the project with precision, adhering to all safety protocols and quality benchmarks.</p>
<h2>Stage 5: Commissioning & Grid Integration</h2>
<p>The final stage involves rigorous testing, performance verification, and grid synchronisation — handing over a fully operational solar plant with comprehensive documentation.</p>`,
    category: 'EPC',
    status:   'published' as const,
  },
]

export async function seed() {
  await connectDB()
  const count = await Post.countDocuments()
  if (count === 0) {
    await Post.insertMany(samplePosts)
    console.log('✅ Seeded 3 sample posts')
  } else {
    console.log(`ℹ️  DB already has ${count} posts — skipping seed`)
  }
}
