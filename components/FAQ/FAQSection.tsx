'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeInOnScroll } from '@/components/ui/FadeInOnScroll'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { cn } from '@/lib/cn'

const FAQS = [
  {
    q: 'How long do lash extensions last?',
    a: 'Lash extensions typically last 4–6 weeks with proper care. Because they shed with your natural lashes, most clients return every 2–3 weeks for a fill to keep their set looking full and fresh.',
  },
  {
    q: 'How should I prepare for my appointment?',
    a: 'Arrive with clean, makeup-free lashes. Avoid waterproof mascara or oil-based products for 24 hours beforehand, and skip your contact lenses if you wear them — you will need to keep your eyes closed throughout the service.',
  },
  {
    q: 'Can I wear makeup with lash extensions?',
    a: 'Yes, though you will rarely need mascara. Avoid oil-based makeup removers near the eye area, as oil breaks down the adhesive. Water-based formulas and a gentle lash cleanser are the way to go.',
  },
  {
    q: 'What is the difference between Classic, Hybrid, and Volume?',
    a: 'Classic applies one extension per natural lash for a defined, natural look. Volume uses handmade fans of 2–6 extensions per lash for density. Hybrid blends both techniques — texture and fullness with a natural finish.',
  },
  {
    q: 'Do lash extensions damage natural lashes?',
    a: 'Applied correctly, lash extensions do not damage natural lashes. Lilit performs a full consultation before every appointment to ensure the weight and style chosen are right for your natural lash health.',
  },
  {
    q: 'How often should I come in for fills?',
    a: 'Every 2–3 weeks is ideal. A 2-week fill takes 45–60 minutes and keeps your set looking fresh. Waiting longer than 3 weeks usually means more extensions have shed, which may require a longer appointment.',
  },
]

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <FadeInOnScroll delay={index * 0.07}>
      <div className="border-b border-sg-blush last:border-b-0">
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-start justify-between gap-4 py-5 text-left group focus-visible:outline-none"
          aria-expanded={open}
        >
          <span className="font-body font-semibold text-[1rem] text-fg-1 group-hover:text-sg-sage-deep transition-colors duration-base leading-snug">
            {q}
          </span>
          <img
            src="/icons/chevron-down.svg"
            width={18}
            height={18}
            alt=""
            className={cn(
              'flex-shrink-0 mt-0.5 transition-transform duration-base ease-soft',
              open ? 'rotate-180' : 'rotate-0'
            )}
          />
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <p className="font-body text-[0.9375rem] text-fg-2 leading-relaxed pb-5 pr-8">
                {a}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeInOnScroll>
  )
}

export function FAQSection() {
  return (
    <section id="faq" className="bg-bg-card py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">
          <FadeInOnScroll>
            <SectionHeading
              eyebrow="FAQ"
              title="Common Questions"
              sub="Everything you need to know before your first appointment."
              align="left"
            />
          </FadeInOnScroll>

          <div className="divide-sg-blush">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
