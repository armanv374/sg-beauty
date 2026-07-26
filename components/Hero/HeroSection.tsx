// components/Hero/HeroSection.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { HeroCanvas } from './HeroCanvas'
import { HeroStageText } from './HeroStageText'
import { SlideIndicator } from './SlideIndicator'
import { Button } from '@/components/ui/Button'
import {
  type Stage,
  scrollToTargetStage,
  stageStartPx,
  totalScrollVh,
} from '@/lib/heroScrollMap'
import { BOOKING_URL, openExternal } from '@/lib/siteLinks'
import type { CSSProperties } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// FRAME CONFIG — update these after exporting frames from your 4 source videos
// ─────────────────────────────────────────────────────────────────────────────
const TOTAL_FRAMES = 484
// 4 videos × 121 frames each

// Playhead speed in frames per second. Source clips are 30fps; 42 plays each
// ~121-frame transition in ~2.9s regardless of how the user scrolled.
const PLAYBACK_FPS = 42

// A mobile swipe covers far less scroll distance than a desktop wheel or
// trackpad gesture, so shrink every stage zone to keep each trigger within
// a single swipe.
const MOBILE_ZONE_SCALE = 0.45

const STAGES: Stage[] = [
  {
    name: 'Neutral',
    // First frame of the sequence.
    // UPDATE: always 0 unless you trim frames from the start.
    holdFrame: 0,
    holdVh: 60, // scroll zone owned by this stage; crossing its end triggers the next transition
    headline: 'Lashes Designed Around You.',
    sub: 'Every set is thoughtfully customized to complement your natural features, style, and lifestyle.',
    cta: { label: 'Book an appointment', href: BOOKING_URL },
    poster: '/hero-lash/posters/neutral.webp',
  },
  {
    name: 'Lash Lift',
    // Last frame of slide-1.mp4 (121 frames, 0-based index = 120).
    holdFrame: 120,
    holdVh: 100,
    headline: 'Lash Lift.',
    headlineItalic: 'Naturally Yours.',
    sub: 'Your own lashes, beautifully lifted for an effortlessly polished look.',
    poster: '/hero-lash/posters/lash-lift.webp',
  },
  {
    name: 'Classic',
    // Last frame of slide-2.mp4 (120 + 121 = 241, 0-based).
    holdFrame: 241,
    holdVh: 100,
    headline: 'Classic Lashes.',
    headlineItalic: 'Effortlessly Elegant.',
    sub: 'Timeless definition with a soft, natural finish.',
    poster: '/hero-lash/posters/classic.webp',
  },
  {
    name: 'Hybrid',
    // Last frame of slide-3.mp4 (241 + 121 = 362, 0-based).
    holdFrame: 362,
    holdVh: 100,
    headline: 'Hybrid Lashes.',
    headlineItalic: 'Beautifully Balanced.',
    sub: 'The perfect harmony of softness, texture, and volume.',
    poster: '/hero-lash/posters/hybrid.webp',
  },
  {
    name: 'Volume',
    // Last frame of slide-4.mp4 = TOTAL_FRAMES − 1 = 483.
    holdFrame: 483,
    holdVh: 100,
    headline: 'Volume Lashes.',
    headlineItalic: 'Confidently Bold.',
    sub: 'Full, lightweight lashes that make a statement while feeling beautifully comfortable.',
    poster: '/hero-lash/posters/volume.webp',
  },
]


export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [stageIndex, setStageIndex] = useState(0)
  const [isHold, setIsHold] = useState(true)
  const [currentFrame, setCurrentFrame] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  // Playhead position in fractional frames; the rAF loop below moves it toward
  // targetFrame at PLAYBACK_FPS, independent of scroll speed.
  const playhead = useRef(0)
  const targetFrame = useRef(STAGES[0].holdFrame)

  const zoneScale = isMobile ? MOBILE_ZONE_SCALE : 1
  // Container height = scaled scroll range + sticky viewport (100vh)
  const containerVh = totalScrollVh(STAGES) * zoneScale + 100

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const handler = () => setIsMobile(mq.matches)
    setIsMobile(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)
  }, [])

  // Scroll only picks the target stage; it never scrubs frames.
  useEffect(() => {
    if (prefersReducedMotion) return

    const onScroll = () => {
      const container = containerRef.current
      if (!container) return
      const containerTop = container.getBoundingClientRect().top + window.scrollY
      const scrollPx = Math.max(0, window.scrollY - containerTop)
      const pxPerVh = (window.innerHeight / 100) * zoneScale
      const target = scrollToTargetStage(scrollPx, STAGES, pxPerVh)
      setStageIndex(target)
      targetFrame.current = STAGES[target].holdFrame
      if (playhead.current !== targetFrame.current) setIsHold(false)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [prefersReducedMotion, zoneScale])

  // Fixed-speed playhead: advances currentFrame toward targetFrame at
  // PLAYBACK_FPS (backward when scrolling up), then settles into the hold.
  useEffect(() => {
    if (prefersReducedMotion) return

    let rafId: number
    let last: number | null = null
    const tick = (now: number) => {
      const dt = last === null ? 0 : Math.min((now - last) / 1000, 0.1)
      last = now
      const target = targetFrame.current
      if (playhead.current !== target) {
        const step = PLAYBACK_FPS * dt
        playhead.current =
          playhead.current < target
            ? Math.min(playhead.current + step, target)
            : Math.max(playhead.current - step, target)
        setCurrentFrame(Math.round(playhead.current))
        if (playhead.current === target) setIsHold(true)
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [prefersReducedMotion])

  const scrollToStage = (i: number) => {
    const container = containerRef.current
    if (!container) return
    const containerTop = container.getBoundingClientRect().top + window.scrollY
    window.scrollTo({
      top: containerTop + stageStartPx(i, STAGES, (window.innerHeight / 100) * zoneScale),
      behavior: 'smooth',
    })
  }

  // ── prefers-reduced-motion: stacked static sections ────────────────────────
  if (prefersReducedMotion) {
    return (
      <section id="top" aria-label="Lash services at SG Beauty">
        {STAGES.map((stage, i) => {
          const HeadingTag = (i === 0 ? 'h1' : 'h2') as 'h1' | 'h2'
          return (
            <div key={i} className="relative h-[100dvh] overflow-hidden">
              <Image
                src={stage.poster}
                alt={`${stage.name} lashes by Lilit at SG Beauty, Vancouver WA`}
                fill
                className="object-cover"
                sizes="100vw"
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-sg-ink/55" />
              <div className="absolute inset-0 flex items-end md:items-center">
                <div className="max-w-[1280px] mx-auto px-6 lg:px-8 w-full pb-[10dvh] md:pb-0">
                  <div className="max-w-xl">
                    <HeadingTag
                      className="font-display font-semibold text-[2.375rem] md:text-[4rem] lg:text-[5rem] leading-[1.05] tracking-[-0.015em] text-fg-on-dark mb-4 md:mb-5"
                      style={{ textWrap: 'balance' } as CSSProperties}
                    >
                      {stage.headline}
                      {stage.headlineItalic && (
                        <em className="not-italic block" style={{ color: 'var(--sg-sage-soft)' }}>
                          {stage.headlineItalic}
                        </em>
                      )}
                    </HeadingTag>
                    <p
                      className="font-body text-[1.0625rem] md:text-[1.25rem] leading-relaxed text-fg-on-dark/85 mb-8 max-w-md"
                      style={{ textWrap: 'pretty' } as CSSProperties}
                    >
                      {stage.sub}
                    </p>
                    {stage.cta && (
                      <Button
                        variant="sage"
                        size="lg"
                        onClick={() => openExternal(BOOKING_URL)}
                      >
                        {stage.cta.label}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </section>
    )
  }

  // ── Full canvas hero ────────────────────────────────────────────────────────
  return (
    <section id="top" aria-label="Lash services at SG Beauty">
      <div ref={containerRef} style={{ height: `${containerVh}vh` }}>
        <div className="sticky top-0 h-[100dvh] overflow-hidden bg-[#536357]">
          <HeroCanvas
            currentFrame={currentFrame}
            totalFrames={TOTAL_FRAMES}
            isMobile={isMobile}
            coldPoster={STAGES[0].poster}
            focalX={isMobile ? 0.72 : 0.5}
            focalY={isMobile ? 0.42 : 0.5}
            zoom={isMobile ? 1.03 : 1}
            mobileFrameDir="desktop"
          />
          <div className="absolute inset-0 bg-sg-ink/55" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#536357]/95 via-[#536357]/35 to-transparent md:hidden" />
          <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-sg-ink/65 via-sg-ink/20 to-transparent md:hidden" />
          <HeroStageText
            stage={STAGES[stageIndex]}
            stageIndex={stageIndex}
            isHold={isHold}
            onBook={() => openExternal(BOOKING_URL)}
          />
          <SlideIndicator
            count={STAGES.length}
            active={stageIndex}
            onDotClick={scrollToStage}
          />
          <AnimatePresence>
            {isHold && stageIndex === 0 && (
              <motion.div
                className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-1 text-white/70 z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <span className="font-body text-xs tracking-[0.18em] uppercase">Scroll</span>
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                >
                  <ChevronDown size={18} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
