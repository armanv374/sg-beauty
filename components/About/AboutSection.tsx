'use client'

import Image from 'next/image'
import { FadeInOnScroll } from '@/components/ui/FadeInOnScroll'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { BOOKING_URL, openExternal } from '@/lib/siteLinks'

const BIO = [
  `Hi, I'm Lilit, a professional lash artist with more than nine years of experience in the beauty industry.`,
  `My journey began in Russia, where I completed advanced training in lash extensions and specialized in the Russian technique. That foundation shaped the precise, customized approach I still bring to every appointment today.`,
  `After continuing my career in Los Angeles, I moved to the Pacific Northwest and opened my own private studio in Vancouver. I created SG Beauty as a calm, welcoming space where every client receives a look designed specifically for their features, lifestyle, and comfort.`,
  `My goal is simple: to enhance your natural beauty while protecting the health of your lashes — so you leave feeling confident, cared for, and effortlessly beautiful.`,
]

const HIGHLIGHTS = [
  '9+ Years of Experience',
  'Advanced Russian Technique',
  'Customized Lash Styling',
  'Private Vancouver Studio',
]

export function AboutSection() {
  return (
    <section id="about" className="bg-bg-section-mist py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          {/* Portrait */}
          <FadeInOnScroll>
            <div className="relative">
              <div
                aria-hidden
                className="hidden sm:block absolute -bottom-5 -right-5 lg:-bottom-6 lg:-right-6 w-full h-full rounded-xl border border-sg-sage-soft bg-sg-cream"
              />
              <div className="relative h-[420px] sm:h-[480px] lg:h-[640px] rounded-xl overflow-hidden shadow-2 border border-sg-ink/5">
                <Image
                  src="/images/lilit-portrait.jpg"
                  alt="Lilit, founder and lash artist at SG Beauty, Vancouver WA"
                  fill
                  className="object-cover object-top grayscale contrast-[1.05]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </FadeInOnScroll>

          {/* Text */}
          <FadeInOnScroll delay={0.15}>
            <div className="flex flex-col gap-6">
              <SectionHeading
                eyebrow="Meet Your Lash Artist"
                title="Beauty, Made Personal"
                align="left"
              />

              <p className="sg-quote text-[1.375rem] text-sg-sage-darker leading-snug border-l-2 border-sg-sage pl-5">
                &ldquo;Every set should feel like you — only more effortless.&rdquo;
              </p>

              <div className="flex flex-col gap-4 font-body text-[1rem] text-fg-2 leading-relaxed">
                {BIO.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>

              {/* Signature */}
              <div className="pt-1">
                <p className="font-display italic font-semibold text-[1.75rem] text-fg-1 leading-none">
                  Lilit
                </p>
                <p className="mt-2 font-body text-xs font-semibold tracking-widest uppercase text-sg-sage-deep">
                  Founder &amp; Lash Artist
                </p>
              </div>

              {/* Experience highlights */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-4 border-t border-sg-blush">
                {HIGHLIGHTS.map((h, i) => (
                  <span key={h} className="flex items-center gap-3">
                    {i > 0 && (
                      <span className="text-sg-sage-deep/50 select-none" aria-hidden="true">
                        &bull;
                      </span>
                    )}
                    <span className="font-body text-xs font-semibold tracking-wide uppercase text-fg-3">
                      {h}
                    </span>
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="pt-2">
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => openExternal(BOOKING_URL)}
                >
                  Book an Appointment
                </Button>
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </div>
    </section>
  )
}
