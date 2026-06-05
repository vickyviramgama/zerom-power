import type { Metadata } from 'next'
import ProjectsClient from './ProjectsClient'

export const metadata: Metadata = {
  title: 'Our Projects',
  description: "Explore ZEROM Power's solar project portfolio — EPC and O&M installations across industrial, commercial, and utility-scale sectors.",
}

export default function ProjectsPage() {
  return <ProjectsClient />
}
