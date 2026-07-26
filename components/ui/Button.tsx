import { cn } from '@/lib/cn'
import { type ButtonHTMLAttributes, forwardRef } from 'react'

type Variant = 'primary' | 'sage' | 'dark' | 'secondary' | 'ghost' | 'cream'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  showArrow?: boolean
}

const variantStyles: Record<Variant, string> = {
  primary:   'bg-sg-slate text-fg-on-dark border-transparent',
  sage:      'bg-sg-sage text-fg-on-sage border-transparent hover:bg-sg-sage-deep active:bg-sg-sage-darker active:scale-[0.98]',
  dark:      'bg-sg-ink text-fg-on-dark border-transparent hover:bg-sg-slate active:scale-[0.98]',
  secondary: 'bg-transparent text-fg-1 border-sg-ink hover:bg-sg-ink/5',
  ghost:     'bg-transparent text-fg-1 border-transparent hover:bg-sg-ink/5',
  cream:     'bg-sg-cream text-fg-1 border-sg-blush hover:bg-sg-blush',
}

const sizeStyles: Record<Size, { btn: string; arrow: number }> = {
  sm: { btn: 'px-4 py-2 text-[0.875rem]', arrow: 10 },
  md: { btn: 'px-[1.375rem] py-[0.625rem] text-[0.9375rem]', arrow: 12 },
  lg: { btn: 'px-7 py-[0.875rem] text-base', arrow: 14 },
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', showArrow = true, className, children, ...props }, ref) => {
    const s = sizeStyles[size]
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center gap-2 rounded-pill border font-body font-bold leading-none cursor-pointer',
          'transition-all duration-base ease-soft',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variantStyles[variant],
          s.btn,
          className
        )}
        {...props}
      >
        {children}
        {showArrow && (
          <svg
            viewBox="0 0 6.391 11.095"
            fill="currentColor"
            width={s.arrow}
            height={s.arrow}
            aria-hidden="true"
          >
            <path
              d="M 6.147 4.948 C 6.303 5.104 6.391 5.316 6.391 5.537 C 6.391 5.758 6.303 5.97 6.147 6.126 L 1.433 10.841 C 1.276 10.998 1.065 11.082 0.847 11.08 C 0.628 11.078 0.419 10.99 0.265 10.836 C 0.11 10.681 0.022 10.472 0.021 10.254 C 0.019 10.035 0.103 9.825 0.254 9.668 L 4.379 5.537 L 0.254 1.412 C 0.103 1.255 0.019 1.045 0.021 0.826 C 0.022 0.608 0.11 0.399 0.265 0.244 C 0.419 0.09 0.628 0.002 0.847 0 C 1.065 -0.002 1.276 0.082 1.433 0.234 L 6.147 4.948 Z"
              fillRule="evenodd"
            />
          </svg>
        )}
      </button>
    )
  }
)
Button.displayName = 'Button'
