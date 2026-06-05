import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'ZEROM Power – Solar EPC, O&M & PMC Solutions',
    template: '%s | ZEROM Power',
  },
  description:
    'ZEROM Power delivers end-to-end Solar EPC, O&M, PMC and I&C solutions for residential, commercial and utility-scale projects across India.',
  keywords: ['solar EPC', 'solar installation', 'rooftop solar', 'O&M services', 'ZEROM Power', 'Gujarat solar'],
  authors: [{ name: 'ZEROM Power' }],
  openGraph: {
    type: 'website',
    siteName: 'ZEROM Power',
    locale: 'en_IN',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
