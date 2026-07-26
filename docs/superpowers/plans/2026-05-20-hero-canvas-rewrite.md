# Hero Canvas Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current MP4-scrubbing hero with a canvas-based WebP image sequence hero that scroll-drives through 5 lash service stages, holding text at each stage and playing a cinematic transition between them.

**Architecture:** A pure scroll-math utility (`lib/heroScrollMap.ts`) maps scroll position to `{ stageIndex, isHold, currentFrame }`. `HeroSection` (orchestrator) feeds those values to `HeroCanvas` (frame cache + RAF draw), `HeroStageText` (Framer Motion text fade), and `SlideIndicator` (5 dots). No new dependencies.

**Tech Stack:** Next.js 14 App Router, TypeScript, Framer Motion 11, Tailwind CSS, `requestAnimationFrame`, `requestIdleCallback` (with `setTimeout` fallback).

---

## File Map

| Action | Path | Responsibility |
|---|---|---|
| Create | `lib/heroScrollMap.ts` | Stage type + 3 pure scroll-math functions |
| Create | `lib/heroScrollMap.test.ts` | Unit tests for scroll math (run with `npx tsx`) |
| Create | `components/Hero/HeroCanvas.tsx` | Canvas element, frame cache, RAF draw loop |
| Create | `components/Hero/HeroStageText.tsx` | Text overlay with Framer Motion fade |
| Rewrite | `components/Hero/HeroSection.tsx` | Orchestrator: config, scroll state, layout |
| Delete | `components/Hero/VideoSlide.tsx` | Replaced by HeroCanvas + HeroStageText |
| No change | `components/Hero/SlideIndicator.tsx` | API unchanged; parent handles scroll target |
| No change | `app/page.tsx` | Already imports `HeroSection` by name |

---

## Task 1: Scroll Map Utility

**Files:**
- Create: `lib/heroScrollMap.ts`
- Create: `lib/heroScrollMap.test.ts`

- [ ] **Step 1: Create `lib/heroScrollMap.ts`**

```typescript
// lib/heroScrollMap.ts

export interface Stage {
  name: string
  holdFrame: number
  holdVh: number
  transitionVh: number
  headline: string
  headlineItalic?: string
  sub: string
  cta?: { label: string; href: string }
  poster: string
}

export interface StageState {
  stageIndex: number
  isHold: boolean
  currentFrame: number
}

export function scrollToStageState(
  scrollPx: number,
  stages: Stage[],
  pxPerVh: number,
): StageState {
  if (scrollPx <= 0) {
    return { stageIndex: 0, isHold: true, currentFrame: stages[0].holdFrame }
  }

  let cursor = 0

  for (let i = 0; i < stages.length; i++) {
    const stage = stages[i]
    const transitionPx = stage.transitionVh * pxPerVh

    // Transition zone into this stage (0-width for stage 0 since transitionVh === 0)
    if (transitionPx > 0 && scrollPx < cursor + transitionPx) {
      const t = (scrollPx - cursor) / transitionPx
      const prev = stages[i - 1]
      return {
        stageIndex: i,
        isHold: false,
        currentFrame: Math.round(prev.holdFrame + (stage.holdFrame - prev.holdFrame) * t),
      }
    }
    cursor += transitionPx

    // Hold zone for this stage
    const holdPx = stage.holdVh * pxPerVh
    if (scrollPx < cursor + holdPx || i === stages.length - 1) {
      return { stageIndex: i, isHold: true, currentFrame: stage.holdFrame }
    }
    cursor += holdPx
  }

  const last = stages[stages.length - 1]
  return { stageIndex: stages.length - 1, isHold: true, currentFrame: last.holdFrame }
}

// Returns the pixel offset (from container top) where stage i's hold zone begins.
// Used by SlideIndicator dot clicks to land on the hold, not the transition.
export function holdStartPx(stageIndex: number, stages: Stage[], pxPerVh: number): number {
  let cursor = 0
  for (let i = 0; i < stages.length; i++) {
    cursor += stages[i].transitionVh * pxPerVh
    if (i === stageIndex) return cursor
    cursor += stages[i].holdVh * pxPerVh
  }
  return cursor
}

// Total scroll range in vh. Add 100 for the sticky viewport to get container height.
export function totalScrollVh(stages: Stage[]): number {
  return stages.reduce((sum, s) => sum + s.transitionVh + s.holdVh, 0)
}
```

- [ ] **Step 2: Create `lib/heroScrollMap.test.ts`**

```typescript
// lib/heroScrollMap.test.ts
// Run: npx tsx lib/heroScrollMap.test.ts

import assert from 'node:assert/strict'
import { scrollToStageState, holdStartPx, totalScrollVh } from './heroScrollMap'

const PX = 10 // 1 vh = 10 px for clean integer math

const STAGES = [
  { name: 'Neutral',   holdFrame: 0,   holdVh: 60, transitionVh: 0,  headline: '', sub: '', poster: '' },
  { name: 'Lash Lift', holdFrame: 119, holdVh: 45, transitionVh: 65, headline: '', sub: '', poster: '' },
  { name: 'Classic',   holdFrame: 239, holdVh: 45, transitionVh: 65, headline: '', sub: '', poster: '' },
  { name: 'Hybrid',    holdFrame: 359, holdVh: 45, transitionVh: 65, headline: '', sub: '', poster: '' },
  { name: 'Volume',    holdFrame: 479, holdVh: 60, transitionVh: 65, headline: '', sub: '', poster: '' },
]

// totalScrollVh: 60+0 + 45+65 + 45+65 + 45+65 + 60+65 = 515
assert.equal(totalScrollVh(STAGES), 515)

// holdStartPx:
// stage 0: no transition → 0
assert.equal(holdStartPx(0, STAGES, PX), 0)
// stage 1: after stage-0 hold (600) + stage-1 transition (650) = 1250
assert.equal(holdStartPx(1, STAGES, PX), 1250)
// stage 2: + stage-1 hold (450) + stage-2 transition (650) = 2350
assert.equal(holdStartPx(2, STAGES, PX), 2350)

// scrollToStageState:

// Negative scroll → stage 0 hold
assert.deepEqual(scrollToStageState(-1, STAGES, PX), { stageIndex: 0, isHold: true, currentFrame: 0 })

// Stage 0 hold: 0–599px
assert.deepEqual(scrollToStageState(0,   STAGES, PX), { stageIndex: 0, isHold: true, currentFrame: 0 })
assert.deepEqual(scrollToStageState(300, STAGES, PX), { stageIndex: 0, isHold: true, currentFrame: 0 })
assert.deepEqual(scrollToStageState(599, STAGES, PX), { stageIndex: 0, isHold: true, currentFrame: 0 })

// Stage 1 transition: 600–1249px
// t=0 at 600px → frame 0
assert.deepEqual(scrollToStageState(600, STAGES, PX), { stageIndex: 1, isHold: false, currentFrame: 0 })
// t=0.5 at 925px → frame round(119 * 0.5) = round(59.5) = 60
assert.deepEqual(scrollToStageState(925, STAGES, PX), { stageIndex: 1, isHold: false, currentFrame: 60 })

// Stage 1 hold: 1250–1699px
assert.deepEqual(scrollToStageState(1250, STAGES, PX), { stageIndex: 1, isHold: true, currentFrame: 119 })
assert.deepEqual(scrollToStageState(1699, STAGES, PX), { stageIndex: 1, isHold: true, currentFrame: 119 })

// Stage 2 transition begins at 1700px; t=0 → frame 119 (prev hold frame)
assert.deepEqual(scrollToStageState(1700, STAGES, PX), { stageIndex: 2, isHold: false, currentFrame: 119 })

// Past end → last stage hold
assert.deepEqual(scrollToStageState(99999, STAGES, PX), { stageIndex: 4, isHold: true, currentFrame: 479 })

console.log('✓ All heroScrollMap tests passed')
```

- [ ] **Step 3: Run the tests**

```
npx tsx lib/heroScrollMap.test.ts
```

Expected output:
```
✓ All heroScrollMap tests passed
```

If it fails: the assertion error message will show which case is wrong. Re-check the cursor math in `scrollToStageState`.

---

## Task 2: HeroCanvas Component

**Files:**
- Create: `components/Hero/HeroCanvas.tsx`

- [ ] **Step 1: Create `components/Hero/HeroCanvas.tsx`**

```tsx
// components/Hero/HeroCanvas.tsx
'use client'

import { useEffect, useRef } from 'react'

interface Props {
  currentFrame: number
  totalFrames: number
  isMobile: boolean
  coldPoster: string
}

export function HeroCanvas({ currentFrame, totalFrames, isMobile, coldPoster }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cache = useRef(new Map<number, HTMLImageElement>())
  const renderedFrame = useRef(-1)
  const frameRef = useRef(currentFrame)
  frameRef.current = currentFrame

  const frameUrl = (i: number) =>
    `/hero-lash/${isMobile ? 'mobile' : 'desktop'}/frame-${String(i + 1).padStart(4, '0')}.webp`

  const loadFrame = (i: number) => {
    if (cache.current.has(i)) return
    const img = new Image()
    img.onload = () => cache.current.set(i, img)
    img.onerror = () => {} // missing frame: draw fallback handles it
    img.src = frameUrl(i)
  }

  // Tier 1 (eager) + Tier 3 (idle background fill)
  useEffect(() => {
    cache.current.clear()
    renderedFrame.current = -1

    const eager = Math.min(30, totalFrames)
    for (let i = 0; i < eager; i++) loadFrame(i)

    let idx = eager
    const step = () => {
      if (idx >= totalFrames) return
      loadFrame(idx++)
      scheduleIdle(step)
    }
    scheduleIdle(step)
  // loadFrame is stable per render; isMobile/totalFrames are the real deps
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalFrames, isMobile])

  // Tier 2: preload 60 frames ahead of the current playhead
  useEffect(() => {
    const end = Math.min(currentFrame + 60, totalFrames)
    for (let i = currentFrame; i < end; i++) loadFrame(i)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFrame, totalFrames])

  // RAF draw loop — only redraws when currentFrame changes
  useEffect(() => {
    let rafId: number
    const tick = () => {
      const canvas = canvasRef.current
      if (canvas && frameRef.current !== renderedFrame.current) {
        drawFrame(canvas, cache.current, frameRef.current)
        renderedFrame.current = frameRef.current
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, []) // intentionally empty: RAF loop runs for lifetime of component

  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `url(${coldPoster})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  )
}

function scheduleIdle(fn: () => void) {
  if (typeof requestIdleCallback !== 'undefined') {
    requestIdleCallback(() => fn())
  } else {
    setTimeout(fn, 100)
  }
}

function drawFrame(
  canvas: HTMLCanvasElement,
  cache: Map<number, HTMLImageElement>,
  frameIndex: number,
): void {
  // Find nearest loaded frame if target frame not yet cached
  let img = cache.get(frameIndex)
  if (!img) {
    for (let i = frameIndex - 1; i >= 0; i--) {
      const f = cache.get(i)
      if (f) { img = f; break }
    }
  }
  if (!img) return

  const dpr = window.devicePixelRatio || 1
  const cssW = canvas.offsetWidth
  const cssH = canvas.offsetHeight
  if (cssW === 0 || cssH === 0) return

  // Resize canvas pixel buffer only when CSS dimensions change
  if (canvas.width !== Math.round(cssW * dpr) || canvas.height !== Math.round(cssH * dpr)) {
    canvas.width = Math.round(cssW * dpr)
    canvas.height = Math.round(cssH * dpr)
  }

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // Cover scaling: fill canvas, center the image
  const scale = Math.max(cssW / img.naturalWidth, cssH / img.naturalHeight)
  const drawW = img.naturalWidth * scale
  const drawH = img.naturalHeight * scale
  const drawX = (cssW - drawW) / 2
  const drawY = (cssH - drawH) / 2

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.drawImage(img, drawX, drawY, drawW, drawH)
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```
npx tsc --noEmit
```

Expected: no errors. Fix any type errors before continuing.

---

## Task 3: HeroStageText Component

**Files:**
- Create: `components/Hero/HeroStageText.tsx`

- [ ] **Step 1: Create `components/Hero/HeroStageText.tsx`**

```tsx
// components/Hero/HeroStageText.tsx
'use client'

import type { CSSProperties } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import type { Stage } from '@/lib/heroScrollMap'

interface Props {
  stage: Stage
  stageIndex: number
  isHold: boolean
  onBook: () => void
}

export function HeroStageText({ stage, stageIndex, isHold, onBook }: Props) {
  const HeadingTag = (stageIndex === 0 ? 'h1' : 'h2') as 'h1' | 'h2'

  return (
    // pointer-events-none on wrapper so canvas scroll events pass through;
    // pointer-events-auto restored on the text block so buttons are clickable
    <div className="absolute inset-0 flex items-center z-10 pointer-events-none">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 w-full">
        <AnimatePresence mode="wait">
          {isHold && (
            <motion.div
              key={stageIndex}
              className="max-w-xl pointer-events-auto"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <HeadingTag
                className="font-display font-semibold text-[2.75rem] md:text-[4rem] lg:text-[5rem] leading-[1.05] tracking-[-0.015em] text-fg-on-dark mb-5"
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
                <Button variant="sage" size="lg" onClick={onBook}>
                  {stage.cta.label}
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```
npx tsc --noEmit
```

Expected: no errors.

---

## Task 4: Rewrite HeroSection + Delete VideoSlide

**Files:**
- Rewrite: `components/Hero/HeroSection.tsx`
- Delete: `components/Hero/VideoSlide.tsx`

> `SlideIndicator.tsx` needs **no changes** — its API (`count`, `active`, `onDotClick`) is already generic.

- [ ] **Step 1: Rewrite `components/Hero/HeroSection.tsx`**

```tsx
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
  scrollToStageState,
  holdStartPx,
  totalScrollVh,
} from '@/lib/heroScrollMap'
import type { CSSProperties } from 'react'

const BOOKING_URL = 'BOOKING_URL'

// ─────────────────────────────────────────────────────────────────────────────
// FRAME CONFIG — update these after exporting frames from your 4 source videos
// ─────────────────────────────────────────────────────────────────────────────
const TOTAL_FRAMES = 480
// UPDATE: total number of exported WebP files (e.g. 480 for 4 × 120-frame videos)

const STAGES: Stage[] = [
  {
    name: 'Neutral',
    // First frame of the sequence.
    // UPDATE: always 0 unless you trim frames from the start.
    holdFrame: 0,
    holdVh: 60,      // vh scrolled while this hold is active
    transitionVh: 0, // no incoming transition for the first stage
    headline: 'Wake Up Beautiful.',
    sub: 'Custom lash services by Lilit in Vancouver, WA',
    cta: { label: 'Book an appointment', href: BOOKING_URL },
    poster: '/hero-lash/posters/neutral.webp',
  },
  {
    name: 'Lash Lift',
    // Last frame of slide-1.mp4.
    // UPDATE: (frames in video 1) − 1. e.g. 119 for a 120-frame export.
    holdFrame: 119,
    holdVh: 45,
    transitionVh: 65, // vh scrolled during Neutral → Lash Lift animation
    headline: 'Lash Lift.',
    headlineItalic: 'Naturally Yours.',
    sub: 'Your own lashes, elevated — no extensions needed.',
    poster: '/hero-lash/posters/lash-lift.webp',
  },
  {
    name: 'Classic',
    // Last frame of slide-2.mp4.
    // UPDATE: holdFrame[Lash Lift] + (frames in video 2). e.g. 119 + 120 = 239.
    holdFrame: 239,
    holdVh: 45,
    transitionVh: 65, // Lash Lift → Classic animation
    headline: 'Classic Lashes.',
    sub: 'One extension per lash. Defined, natural, effortless.',
    poster: '/hero-lash/posters/classic.webp',
  },
  {
    name: 'Hybrid',
    // Last frame of slide-3.mp4.
    // UPDATE: holdFrame[Classic] + (frames in video 3). e.g. 239 + 120 = 359.
    holdFrame: 359,
    holdVh: 45,
    transitionVh: 65, // Classic → Hybrid animation
    headline: 'Hybrid Lashes.',
    sub: 'Texture and dimension with a natural finish.',
    poster: '/hero-lash/posters/hybrid.webp',
  },
  {
    name: 'Volume',
    // Last frame of slide-4.mp4 = last frame of the full sequence.
    // UPDATE: TOTAL_FRAMES − 1. e.g. 479.
    holdFrame: 479,
    holdVh: 60,
    transitionVh: 65, // Hybrid → Volume animation
    headline: 'Volume Lashes.',
    sub: 'Handmade fans for full, dramatic results that last.',
    poster: '/hero-lash/posters/volume.webp',
  },
]

// Container height = scroll range (515vh) + sticky viewport (100vh) = 615vh
const CONTAINER_VH = totalScrollVh(STAGES) + 100

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [stageIndex, setStageIndex] = useState(0)
  const [isHold, setIsHold] = useState(true)
  const [currentFrame, setCurrentFrame] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768)
    setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) return

    const onScroll = () => {
      const container = containerRef.current
      if (!container) return
      const containerTop = container.getBoundingClientRect().top + window.scrollY
      const scrollPx = Math.max(0, window.scrollY - containerTop)
      const state = scrollToStageState(scrollPx, STAGES, window.innerHeight)
      setStageIndex(state.stageIndex)
      setIsHold(state.isHold)
      setCurrentFrame(state.currentFrame)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [prefersReducedMotion])

  const scrollToHoldStart = (i: number) => {
    const container = containerRef.current
    if (!container) return
    const containerTop = container.getBoundingClientRect().top + window.scrollY
    window.scrollTo({
      top: containerTop + holdStartPx(i, STAGES, window.innerHeight),
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
            <div key={i} className="relative h-screen overflow-hidden">
              <Image
                src={stage.poster}
                alt={`${stage.name} lashes by Lilit at SG Beauty, Vancouver WA`}
                fill
                className="object-cover"
                sizes="100vw"
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-sg-ink/55" />
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-[1280px] mx-auto px-6 lg:px-8 w-full">
                  <div className="max-w-xl">
                    <HeadingTag
                      className="font-display font-semibold text-[2.75rem] md:text-[4rem] lg:text-[5rem] leading-[1.05] tracking-[-0.015em] text-fg-on-dark mb-5"
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
                        onClick={() => window.open(BOOKING_URL, '_blank')}
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
    <section id="top">
      <div ref={containerRef} style={{ height: `${CONTAINER_VH}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <HeroCanvas
            currentFrame={currentFrame}
            totalFrames={TOTAL_FRAMES}
            isMobile={isMobile}
            coldPoster={STAGES[0].poster}
          />
          <div className="absolute inset-0 bg-sg-ink/55" />
          <HeroStageText
            stage={STAGES[stageIndex]}
            stageIndex={stageIndex}
            isHold={isHold}
            onBook={() => window.open(BOOKING_URL, '_blank')}
          />
          <SlideIndicator
            count={STAGES.length}
            active={stageIndex}
            onDotClick={scrollToHoldStart}
          />
          <AnimatePresence>
            {isHold && stageIndex === 0 && (
              <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/70 z-20"
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
```

- [ ] **Step 2: Delete `components/Hero/VideoSlide.tsx`**

Delete the file — it is fully replaced by `HeroCanvas` and `HeroStageText`. Nothing else imports it.

- [ ] **Step 3: Verify TypeScript compiles**

```
npx tsc --noEmit
```

Expected: no errors. The most likely error is a missing `Testimonials` import in `app/page.tsx` if that component does not yet exist — that is pre-existing and unrelated to this change.

---

## Task 5: End-to-End Verification

**No code changes in this task — manual browser verification.**

- [ ] **Step 1: Start the dev server**

```
npm run dev
```

Open `http://localhost:3000` in a browser.

- [ ] **Step 2: Verify cold-start state**

Expectation at page load (no scroll):
- The neutral poster image (`/hero-lash/posters/neutral.webp`) is visible as the background — or a blank/dark canvas if the poster file does not exist yet (add any placeholder `.webp` to confirm the path works)
- "Wake Up Beautiful." headline is visible
- "Scroll" cue with bouncing chevron is visible at the bottom
- The canvas element is present in DevTools Elements panel

If the poster files don't exist yet, add placeholders:
```
public/hero-lash/posters/neutral.webp   (any small webp)
public/hero-lash/posters/lash-lift.webp
public/hero-lash/posters/classic.webp
public/hero-lash/posters/hybrid.webp
public/hero-lash/posters/volume.webp
```

- [ ] **Step 3: Verify scroll behaviour (with placeholder frames)**

If real WebP frames are not yet exported, add a single placeholder frame to confirm the URL pattern:
```
public/hero-lash/desktop/frame-0001.webp  (any small webp)
```

Scroll slowly down. Expected:
- Hero is sticky (stays in view while scrolling within the 615vh container)
- Headline fades out as the first transition zone begins (around 60vh of scroll)
- Canvas area shows the placeholder frame (or cold poster fallback if frame is missing)
- Headline fades back in when the next hold zone starts
- SlideIndicator dots are visible on the right edge; active dot changes per stage

- [ ] **Step 4: Verify dot navigation**

Click each of the 5 indicator dots. Expected: smooth scroll to the start of that stage's **hold zone** (not the transition). The headline should be immediately visible after the scroll completes.

- [ ] **Step 5: Verify reduced-motion fallback**

In Chrome DevTools: Rendering tab → Emulate CSS media feature → `prefers-reduced-motion: reduce`. Reload.

Expected:
- 5 stacked `h-screen` sections, each with a poster image background
- All text visible without animation
- No sticky pinning
- No canvas element in DOM
- SlideIndicator not rendered

- [ ] **Step 6: Verify TypeScript and build**

```
npx tsc --noEmit
npm run build
```

Expected: both commands exit cleanly. Fix any type or build errors before considering implementation complete.

---

## Post-Implementation: Frame Export Guide

After receiving the real frame WebPs from the client or exporting them yourself (FFmpeg example):

```bash
# Export all 4 videos to one continuous sequence
# First, count frames per video:
ffprobe -v error -select_streams v:0 -count_packets -show_entries stream=nb_read_packets -of csv=p=0 slide-1.mp4

# Export video 1 (frames 0001 onward):
ffmpeg -i slide-1.mp4 -vf "fps=30,scale=1920:-1" -q:v 80 public/hero-lash/desktop/frame-%04d.webp

# Export video 2 (frames starting after video 1's last frame):
# e.g. if video 1 had 120 frames, start_number=121
ffmpeg -i slide-2.mp4 -vf "fps=30,scale=1920:-1" -start_number 121 -q:v 80 public/hero-lash/desktop/frame-%04d.webp

# Repeat for videos 3 and 4 with the correct start_number.
# Then update holdFrame values in STAGES and TOTAL_FRAMES in HeroSection.tsx.
```

Mobile frames: same commands with `scale=750:-1` output to `public/hero-lash/mobile/`.

Poster frames: extract the specific hold frames as single images:
```bash
# e.g. frame 1 = Neutral poster
ffmpeg -i slide-1.mp4 -vframes 1 public/hero-lash/posters/neutral.webp
# last frame of slide-1.mp4 = Lash Lift poster
ffmpeg -sseof -0.1 -i slide-1.mp4 -vframes 1 public/hero-lash/posters/lash-lift.webp
```
