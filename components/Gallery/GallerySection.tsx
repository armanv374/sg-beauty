'use client'

import Image from 'next/image'
import { Carousel } from '@/components/ui/Carousel'
import { FadeInOnScroll } from '@/components/ui/FadeInOnScroll'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { INSTAGRAM_URL, openExternal } from '@/lib/siteLinks'

const BROW_STYLING_SHOTS = new Set([6, 15])

/* Curated selection — best, most varied shots from the full set */
const FEATURED = [10, 1, 15, 4, 9, 6, 13, 16].map((n) => ({
  src: `/images/gallery-${n}.jpg`,
  alt: BROW_STYLING_SHOTS.has(n)
    ? `Lash extensions and brow styling by Lilit at SG Beauty, Vancouver WA`
    : `Lash extensions by Lilit at SG Beauty, Vancouver WA`,
}))

export function GallerySection() {
  return (
    <section id="gallery" className="bg-bg-section-mist py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <FadeInOnScroll>
          <SectionHeading
            eyebrow="Gallery"
            title="The Work"
            sub="Every set is customized to complement each client's natural features. Here's a selection of Lilit's recent work."
          />
        </FadeInOnScroll>
      </div>

      <FadeInOnScroll delay={0.15}>
        <div className="mt-14">
          <Carousel
            items={FEATURED}
            itemKey={(_, i) => i}
            ariaLabel={(i) => `Go to image ${i + 1}`}
            renderItem={(img, i, { onSelect }) => (
              <button
                onClick={onSelect}
                aria-label={`View image ${(i % FEATURED.length) + 1} of ${FEATURED.length}`}
                className="group relative block w-full aspect-[4/5] rounded-xl overflow-hidden shadow-2 cursor-pointer"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-slow ease-soft group-hover:scale-105"
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 58vw, 46vw"
                />
                <div className="absolute inset-0 bg-sg-ink/0 group-hover:bg-sg-ink/10 transition-colors duration-base" />
              </button>
            )}
          />
        </div>
      </FadeInOnScroll>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* Instagram CTA */}
        <FadeInOnScroll delay={0.25}>
          <div className="mt-20 flex flex-col items-center text-center gap-4 max-w-lg mx-auto">
            <h3 className="font-display font-semibold text-2xl text-fg-1">Love what you see?</h3>
            <p className="font-body text-[0.9375rem] text-fg-2 leading-relaxed">
              Follow SG Beauty on Instagram to see more recent transformations, behind-the-scenes
              moments, and new lash sets.
            </p>
            <Button
              variant="sage"
              size="md"
              onClick={() => openExternal(INSTAGRAM_URL)}
              className="mt-1"
            >
              <img
                src="/icons/instagram.svg"
                width={16}
                height={16}
                alt=""
                className="brightness-0 invert"
              />
              Follow on Instagram
            </Button>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  )
}
