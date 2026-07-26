import Image from 'next/image'
import { BOOKING_URL, INSTAGRAM_URL } from '@/lib/siteLinks'

const NAV_COLS = [
  {
    heading: 'Services',
    links: [
      { label: 'Classic Lashes', href: '#services' },
      { label: 'Hybrid Lashes', href: '#services' },
      { label: 'Volume Lashes', href: '#services' },
      { label: 'Brow Lamination', href: '#services' },
      { label: 'Fills & Removal', href: '#services' },
    ],
  },
  {
    heading: 'Studio',
    links: [
      { label: 'About Lilit', href: '#about' },
      { label: 'Gallery', href: '#gallery' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Book', href: BOOKING_URL, external: true },
    ],
  },
  {
    heading: 'Sitemap',
    links: [
      { label: 'Home', href: '#top' },
      { label: 'Services', href: '#services' },
      { label: 'About', href: '#about' },
      { label: 'Gallery', href: '#gallery' },
      { label: 'Reviews', href: '#reviews' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact', href: '#contact' },
      { label: 'Book Now', href: BOOKING_URL, external: true },
    ],
  },
]

function SocialDot({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-full bg-white/10 hover:bg-sg-sage flex items-center justify-center transition-colors duration-base ease-soft"
    >
      <img src={`/icons/${icon}.svg`} width={16} height={16} alt="" />
    </a>
  )
}

export function FooterSection() {
  return (
    <footer className="bg-sg-ink text-fg-on-dark">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 pt-16 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10">
        {/* Brand column */}
        <div className="flex flex-col gap-5 max-w-xs">
          <a href="#top" aria-label="SG Beauty home">
            <Image
              src="/images/logo-transparent.png"
              alt="SG Beauty"
              width={220}
              height={78}
              className="h-[64px] md:h-[72px] w-auto object-contain"
            />
          </a>
          <p className="font-body text-sm text-fg-on-dark/70 leading-relaxed">
            Soft, precise lash extensions in Vancouver, WA.
            <br />
            Beautiful, long-lasting lashes that enhance your natural confidence.
          </p>
          <div className="flex flex-col gap-1.5 font-body text-[13px] text-fg-on-dark/60">
            <span>911 Main St, Ste 110 Room 14 · Vancouver, WA 98660</span>
            <a href="tel:+19715213365" className="hover:text-fg-on-dark transition-colors">(971) 521-3365</a>
          </div>

          {/* Hours */}
          <div className="font-body text-[13px] text-fg-on-dark/60 leading-relaxed">
            Mon–Fri 10:30 am – 6:00 pm
            <br />
            Sat 12:00 pm – 5:00 pm
            <br />
            Sun Closed
          </div>

          {/* Social */}
          <div className="flex gap-2 mt-1">
            <SocialDot href={INSTAGRAM_URL} icon="instagram" label="SG Beauty on Instagram" />
            <SocialDot href={`tel:+19715213365`} icon="phone" label="Call SG Beauty" />
            <SocialDot href={`mailto:info@sgbeautywa.com`} icon="mail" label="Email SG Beauty" />
            <SocialDot href="https://maps.google.com/?q=911+Main+St+Vancouver+WA" icon="map-pin" label="Directions" />
          </div>
        </div>

        {/* Nav columns */}
        {NAV_COLS.map((col) => (
          <div key={col.heading} className="flex flex-col gap-3">
            <h4 className="font-body font-bold text-[13px] tracking-[0.18em] uppercase text-fg-on-dark mb-1">
              {col.heading}
            </h4>
            {col.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={'external' in link && link.external ? '_blank' : undefined}
                rel={'external' in link && link.external ? 'noopener noreferrer' : undefined}
                className="py-1 md:py-0 font-body text-[14px] text-fg-on-dark/70 no-underline hover:text-sg-sage-soft transition-colors duration-base"
              >
                {link.label}
              </a>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom strip */}
      <div className="border-t border-white/8 px-6 lg:px-8 py-5">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 font-body text-[13px] text-fg-on-dark/45">
          <span>© 2025 SG Beauty. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-fg-on-dark/80 transition-colors">Privacy</a>
            <a href="#faq" className="hover:text-fg-on-dark/80 transition-colors">FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
