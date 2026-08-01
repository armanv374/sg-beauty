import { cn } from '@/lib/cn'

interface SlideIndicatorProps {
  count: number
  active: number
  onDotClick: (index: number) => void
}

export function SlideIndicator({ count, active, onDotClick }: SlideIndicatorProps) {
  return (
    <div className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 flex-col items-center">
      {/* Thin vertical line */}
      <div className="w-px h-8 bg-white/30 mb-1" />
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => onDotClick(i)}
          aria-label={`Go to slide ${i + 1}`}
          className="w-11 h-11 rounded-full flex items-center justify-center group focus-visible:outline-none"
        >
          <span
            aria-hidden="true"
            className={cn(
              'block rounded-full transition-all duration-slow ease-soft',
              i === active
                ? 'w-2 h-2 bg-white shadow-[0_0_0_2px_rgba(255,255,255,0.4)]'
                : 'w-1.5 h-1.5 bg-white/40 group-hover:bg-white/70'
            )}
          />
        </button>
      ))}
      <div className="w-px h-8 bg-white/30 mt-1" />
    </div>
  )
}
