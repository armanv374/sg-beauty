import { cn } from '@/lib/cn'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  sub?: string
  align?: 'center' | 'left'
  light?: boolean
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = 'center',
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <header
      className={cn(
        'flex flex-col gap-3',
        align === 'center' ? 'items-center text-center max-w-xl mx-auto' : 'items-start',
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            'sg-eyebrow',
            light ? 'text-fg-on-dark/80' : 'text-sg-rose-text'
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          'sg-h2',
          light ? 'text-fg-on-dark' : 'text-fg-1'
        )}
      >
        {title}
      </h2>
      {sub && (
        <p
          className={cn(
            'sg-body mt-1 max-w-[32rem]',
            light ? 'text-fg-on-dark/75' : 'text-fg-2'
          )}
        >
          {sub}
        </p>
      )}
    </header>
  )
}
