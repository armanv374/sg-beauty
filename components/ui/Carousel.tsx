'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/cn'

interface CarouselHelpers {
  isActive: boolean
  onSelect: () => void
}

interface CarouselProps<T> {
  items: T[]
  itemKey: (item: T, index: number) => string | number
  renderItem: (item: T, index: number, helpers: CarouselHelpers) => ReactNode
  ariaLabel: (logicalIndex: number, count: number) => string
  slideClassName?: string
  trackClassName?: string
  gapClassName?: string
}

/**
 * Shared endless-loop carousel: native scroll-snap track (real swipe support,
 * no drag library), silent recentering into a tripled slide buffer so it
 * never hits an end, shared arrow + pagination-dot UI. Used by both the
 * Gallery and Testimonials sections so they share one interaction model.
 */
export function Carousel<T>({
  items,
  itemKey,
  renderItem,
  ariaLabel,
  slideClassName = 'w-[80%] sm:w-[58%] lg:w-[46%]',
  trackClassName = 'px-[10%] sm:px-[21%] lg:px-[27%]',
  gapClassName = 'gap-5 sm:gap-6',
}: CarouselProps<T>) {
  const count = items.length
  const looped = [...items, ...items, ...items]
  const startIndex = count

  const [activeDom, setActiveDom] = useState(startIndex)
  const trackRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<Array<HTMLDivElement | null>>([])
  const settleTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  function scrollToIndex(i: number, instant = false) {
    const track = trackRef.current
    const el = slideRefs.current[i]
    if (!track || !el) return
    const trackRect = track.getBoundingClientRect()
    const slideRect = el.getBoundingClientRect()
    const target =
      track.scrollLeft + slideRect.left - trackRect.left - (track.clientWidth - slideRect.width) / 2

    track.scrollTo({
      left: Math.max(0, Math.min(target, track.scrollWidth - track.clientWidth)),
      behavior: instant ? 'instant' : 'smooth',
    })
  }

  // Start centered in the middle copy, no animation
  useEffect(() => {
    const frame = requestAnimationFrame(() => scrollToIndex(startIndex, true))
    return () => cancelAnimationFrame(frame)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let frame = 0

    const computeClosest = () => {
      const trackCenter = track.getBoundingClientRect().left + track.clientWidth / 2
      let closestIndex = 0
      let closestDistance = Number.POSITIVE_INFINITY

      slideRefs.current.forEach((slide, index) => {
        if (!slide) return
        const rect = slide.getBoundingClientRect()
        const distance = Math.abs(rect.left + rect.width / 2 - trackCenter)
        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = index
        }
      })
      return closestIndex
    }

    const updateActiveSlide = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        setActiveDom(computeClosest())
      })

      // Once scrolling has actually settled, silently recenter into the middle
      // copy if we've drifted into the first or last buffer copy.
      if (settleTimeout.current) clearTimeout(settleTimeout.current)
      settleTimeout.current = setTimeout(() => {
        const closest = computeClosest()
        if (closest < count) {
          scrollToIndex(closest + count, true)
          setActiveDom(closest + count)
        } else if (closest >= count * 2) {
          scrollToIndex(closest - count, true)
          setActiveDom(closest - count)
        }
      }, 150)
    }

    track.addEventListener('scroll', updateActiveSlide, { passive: true })
    window.addEventListener('resize', updateActiveSlide)

    return () => {
      cancelAnimationFrame(frame)
      if (settleTimeout.current) clearTimeout(settleTimeout.current)
      track.removeEventListener('scroll', updateActiveSlide)
      window.removeEventListener('resize', updateActiveSlide)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count])

  const activeLogical = ((activeDom % count) + count) % count

  return (
    <div>
      <div className="relative">
        <div
          ref={trackRef}
          className={cn(
            'no-scrollbar flex items-center overflow-x-auto snap-x snap-mandatory pb-2',
            gapClassName,
            trackClassName
          )}
        >
          {looped.map((item, i) => (
            <div
              key={itemKey(item, i)}
              ref={(el) => {
                slideRefs.current[i] = el
              }}
              className={cn(
                'snap-center shrink-0 transition-all duration-500 ease-soft',
                slideClassName,
                activeDom === i ? 'opacity-100 scale-100' : 'opacity-50 scale-[0.93]'
              )}
            >
              {renderItem(item, i, {
                isActive: activeDom === i,
                onSelect: () => scrollToIndex(i),
              })}
            </div>
          ))}
        </div>

        {/* Arrows — always enabled, the loop never ends */}
        <button
          onClick={() => scrollToIndex(activeDom - 1)}
          aria-label="Previous"
          className="hidden sm:flex absolute left-2 lg:left-6 top-[calc(50%-1.25rem)] -translate-y-1/2 z-10 w-11 h-11 items-center justify-center rounded-full bg-bg-page shadow-2 border border-sg-ink/10 text-fg-1 hover:bg-sg-sage-mist transition-colors duration-base"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => scrollToIndex(activeDom + 1)}
          aria-label="Next"
          className="hidden sm:flex absolute right-2 lg:right-6 top-[calc(50%-1.25rem)] -translate-y-1/2 z-10 w-11 h-11 items-center justify-center rounded-full bg-bg-page shadow-2 border border-sg-ink/10 text-fg-1 hover:bg-sg-sage-mist transition-colors duration-base"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-center mt-6">
          {items.map((item, i) => (
            <button
              key={itemKey(item, i)}
              onClick={() => scrollToIndex(count + i)}
              aria-label={ariaLabel(i, count)}
              className="w-11 h-11 rounded-full flex items-center justify-center group"
            >
              <span
                aria-hidden="true"
                className={cn(
                  'block h-2 rounded-full transition-all duration-slow ease-soft',
                  activeLogical === i
                    ? 'w-6 bg-sg-sage-deep'
                    : 'w-2 bg-sg-ink/15 group-hover:bg-sg-ink/30'
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
