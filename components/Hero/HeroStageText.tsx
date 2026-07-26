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
    <div className="absolute inset-0 flex items-end md:items-center z-10 pointer-events-none">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 w-full pb-[10dvh] md:pb-0">
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
                className="font-body text-[0.9375rem] md:text-[1.25rem] leading-relaxed text-fg-on-dark/85 mb-6 md:mb-8 max-w-md"
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
