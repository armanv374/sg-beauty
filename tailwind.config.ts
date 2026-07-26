import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* RGB format enables /opacity modifiers (e.g. bg-sg-ink/50) */
        'sg-sage':         'rgb(156 166 139 / <alpha-value>)',
        'sg-sage-deep':    'rgb(111 123 97  / <alpha-value>)',
        'sg-sage-darker':  'rgb(79  90  69  / <alpha-value>)',
        'sg-sage-soft':    'rgb(199 206 184 / <alpha-value>)',
        'sg-sage-mist':    'rgb(232 236 223 / <alpha-value>)',
        'sg-cream':        'rgb(255 243 228 / <alpha-value>)',
        'sg-blush':        'rgb(238 214 196 / <alpha-value>)',
        'sg-blush-strong': 'rgb(220 191 168 / <alpha-value>)',
        'sg-rose-text':    'rgb(107 79  79  / <alpha-value>)',
        'sg-ink':          'rgb(23  49  62  / <alpha-value>)',
        'sg-slate':        'rgb(65  94  114 / <alpha-value>)',
        'sg-fog':          'rgb(216 221 225 / <alpha-value>)',
        'sg-paper':        'rgb(255 255 255 / <alpha-value>)',
        'sg-lilac':        'rgb(188 160 199 / <alpha-value>)',
        'sg-coral':        'rgb(214 99  99  / <alpha-value>)',
        'sg-olive':        'rgb(182 187 121 / <alpha-value>)',
        /* Semantic tokens — referencing CSS vars (no /opacity support needed) */
        'fg-1':            'var(--fg-1)',
        'fg-2':            'var(--fg-2)',
        'fg-3':            'var(--fg-3)',
        'fg-on-dark':      'rgb(255 243 228 / <alpha-value>)',   /* = --sg-cream */
        'fg-on-sage':      'rgb(255 255 255 / <alpha-value>)',
        'fg-link':         'var(--fg-link)',
        'bg-page':         'var(--bg-page)',
        'bg-card':         'var(--bg-card)',
        'bg-section-warm': 'var(--bg-section-warm)',
        'bg-section-mist': 'var(--bg-section-mist)',
        'bg-dark':         'var(--bg-dark)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xs:   'var(--radius-xs)',
        sm:   'var(--radius-sm)',
        md:   'var(--radius-md)',
        lg:   'var(--radius-lg)',
        xl:   'var(--radius-xl)',
        pill: 'var(--radius-pill)',
      },
      boxShadow: {
        '1':     'var(--shadow-1)',
        '2':     'var(--shadow-2)',
        '3':     'var(--shadow-3)',
        'card':  'var(--shadow-card)',
        'focus': 'var(--shadow-focus)',
      },
      transitionTimingFunction: {
        'soft': 'var(--ease-soft)',
        'in':   'var(--ease-in)',
        'out':  'var(--ease-out)',
      },
      transitionDuration: {
        'fast': 'var(--dur-fast)',
        'base': 'var(--dur-base)',
        'slow': 'var(--dur-slow)',
      },
    },
  },
  plugins: [],
}

export default config
