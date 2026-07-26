'use client'

import { type CSSProperties } from 'react'
import { FadeInOnScroll } from '@/components/ui/FadeInOnScroll'
import { Button } from '@/components/ui/Button'
import { BOOKING_URL, openExternal } from '@/lib/siteLinks'

export function BookingCTASection() {
  return (
    <section id="contact" className="bg-sg-ink py-24 lg:py-32 text-center">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <FadeInOnScroll>
          <h2 className="font-display font-semibold text-[2.5rem] md:text-[3rem] leading-tight text-fg-on-dark mb-4"
            style={{ textWrap: 'balance' } as CSSProperties}
          >
            Ready for Your Lashes?
          </h2>
          <p className="font-body text-[1.0625rem] text-fg-on-dark/75 mb-8 max-w-lg mx-auto leading-relaxed">
            Book your appointment online — Lilit sees clients Mon–Sat in Vancouver, WA.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <Button
              variant="sage"
              size="lg"
              onClick={() => openExternal(BOOKING_URL)}
            >
              Book Now
            </Button>
            <a
              href="tel:+19715213365"
              className="font-body font-medium text-fg-on-dark/80 hover:text-fg-on-dark transition-colors duration-base"
            >
              (971) 521-3365
            </a>
          </div>

          <address className="not-italic font-body text-sm text-fg-on-dark/55">
            911 Main St, Ste 110 Room 14, Vancouver, WA 98660
          </address>
        </FadeInOnScroll>
      </div>
    </section>
  )
}
