'use client'

import { m } from 'framer-motion'
import { type ReactNode } from 'react'

interface FadeInOnScrollProps {
  children: ReactNode
  delay?: number
  yOffset?: number
  className?: string
}

export function FadeInOnScroll({
  children,
  delay = 0,
  yOffset = 20,
  className,
}: FadeInOnScrollProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 0.61, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </m.div>
  )
}
