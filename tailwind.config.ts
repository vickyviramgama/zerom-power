import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        sm: '2rem',
        md: '2.5rem',
        lg: '3rem',
        xl: '4rem',
        '2xl': '5rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
    },
    extend: {
      colors: {
        navy:         '#0b0e15',
        'navy-mid':   '#0d1525',
        'navy-light': '#1a2540',
        // Brand palette from Xerom Power logo gradient
        solar:        '#e9393c',   // brand red (primary accent — replaces amber)
        'solar-light':'#f05a5c',   // lighter red for hovers
        'solar-dark': '#ad2351',   // deep maroon (gradient end)
        'solar-gold': '#edb173',   // warm orange (gradient start)
        cream:        '#f5f0e8',
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow':    '0 0 30px rgba(233,57,60,0.30)',
        'glow-lg': '0 0 70px rgba(233,57,60,0.45)',
        'glow-sm': '0 0 15px rgba(233,57,60,0.20)',
        'deep':    '0 40px 100px rgba(0,0,0,0.6)',
      },
      backgroundImage: {
        'gradient-solar': 'linear-gradient(135deg,#edb173,#e9393c,#ad2351)',
        'gradient-brand': 'linear-gradient(135deg,#e9393c,#ad2351)',
        'gradient-hero':  'linear-gradient(180deg,#0b0e15 0%,#150a0b 100%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
