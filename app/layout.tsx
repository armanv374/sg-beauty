import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import '@/styles/globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://sgbeautywa.com'),
  title: 'SG Beauty | Lash Extensions in Vancouver, WA',
  description:
    'Professional lash extensions in Vancouver, WA. Classic, Hybrid, Volume & Mega Volume sets by certified artist Lilit. Russian technique. Book online.',
  keywords: [
    'lash extensions Vancouver WA',
    'lash salon Vancouver Washington',
    'Russian volume lashes',
    'brow lamination Vancouver WA',
    'SG Beauty',
  ],
  openGraph: {
    title: 'SG Beauty — Lash Extensions in Vancouver, WA',
    description:
      'Custom lash extensions by Lilit. Classic, Hybrid, Volume & Mega Volume. Book online.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    type: 'website',
    url: 'https://sgbeautywa.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SG Beauty — Lash Extensions in Vancouver, WA',
    images: ['/og-image.jpg'],
  },
  alternates: { canonical: 'https://sgbeautywa.com' },
  robots: { index: true, follow: true },
}

const salonJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BeautySalon',
  name: 'SG Beauty',
  description:
    'Professional lash extension salon specializing in classic, hybrid, and volume lash extensions. Russian technique by certified artist Lilit.',
  url: 'https://sgbeautywa.com',
  telephone: '+19715213365',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '911 Main St, Ste 110 Room 14',
    addressLocality: 'Vancouver',
    addressRegion: 'WA',
    postalCode: '98660',
    addressCountry: 'US',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '10:30',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '12:00',
      closes: '17:00',
    },
  ],
  priceRange: '$$',
  image: 'https://sgbeautywa.com/og-image.jpg',
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long do lash extensions last?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Lash extensions typically last 4–6 weeks with proper care. Because they shed with your natural lashes, most clients return every 2–3 weeks for a fill to keep their set looking full.',
      },
    },
    {
      '@type': 'Question',
      name: 'How should I prepare for my appointment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Arrive with clean, makeup-free lashes. Avoid waterproof mascara or oil-based products for 24 hours beforehand, and skip your contact lenses if you wear them — you will need to keep your eyes closed throughout the service.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I wear makeup with lash extensions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, though you will rarely need mascara. Avoid oil-based makeup removers near the eye area, as oil breaks down the adhesive. Water-based formulas and gentle cleansing are fine.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between Classic, Hybrid, and Volume?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Classic applies one extension per natural lash for a defined, natural look. Volume uses handmade fans of 2–6 extensions per lash for density. Hybrid blends both techniques for texture with a natural finish.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do lash extensions damage natural lashes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Applied correctly, lash extensions do not damage natural lashes. Lilit performs a full consultation before every appointment to ensure the weight and style chosen are safe for your natural lash health.',
      },
    },
    {
      '@type': 'Question',
      name: 'How often should I come in for fills?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Every 2–3 weeks is ideal. A 2-week fill takes 45–60 minutes and keeps your set looking fresh. Waiting longer than 3 weeks usually means more extensions have shed, which may require a full new set.',
      },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <meta name="theme-color" content="#536357" media="(max-width: 768px)" />
        <meta name="theme-color" content="#FFFFFF" media="(min-width: 769px)" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(salonJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
