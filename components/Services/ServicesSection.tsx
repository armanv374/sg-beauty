'use client'

import { useState } from 'react'
import { Sparkles, Layers, Feather, Eye, Repeat, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FadeInOnScroll } from '@/components/ui/FadeInOnScroll'
import { cn } from '@/lib/cn'
import { BOOKING_URL, openExternal } from '@/lib/siteLinks'

interface Service {
  id: string
  name: string
  desc: string
  price?: string
  badge?: string
  icon: typeof Sparkles
  variant?: 'standard' | 'info'
}

const SERVICES: Service[] = [
  {
    id: 'classic',
    name: 'Classic Full Set',
    desc: 'A timeless, one-to-one application that adds natural length and definition — soft, polished, effortlessly you.',
    price: 'Starting at $150',
    icon: Sparkles,
  },
  {
    id: 'hybrid',
    name: 'Hybrid Full Set',
    desc: 'A textured blend of classic and volume fans for extra fullness, in a finish that still looks like your own lashes.',
    price: 'Starting at $170',
    icon: Layers,
  },
  {
    id: 'volume',
    name: 'Volume Full Set',
    desc: 'Handcrafted volume fans, custom-mapped to your eyes for a bold, glamorous finish that stays feather-light.',
    price: 'Starting at $190',
    icon: Feather,
  },
  {
    id: 'lift',
    name: 'Lash Lift & Tint',
    desc: 'Lifts and tints your natural lashes for a curled, mascara-like effect — no extensions, no daily maintenance.',
    price: 'Starting at $120',
    icon: Eye,
  },
  {
    id: 'brow',
    name: 'Brow Lamination',
    desc: 'A restructuring treatment with shaping and tint that brushes brows into a fuller, more defined arch for weeks.',
    price: 'Starting at $120',
    icon: Sparkles,
  },
  {
    id: 'refills',
    name: 'Refills & Removals',
    desc: 'Keeping your set fresh or ready for a change? Every fill interval and safe removal option is available directly in Vagaro booking.',
    icon: Repeat,
    variant: 'info',
  },
]

function ServiceCard({ svc, index }: { svc: Service; index: number }) {
  const [hovered, setHovered] = useState(false)
  const Icon = svc.icon
  const isInfo = svc.variant === 'info'

  return (
    <FadeInOnScroll delay={index * 0.08}>
      <article
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          'relative h-full flex flex-col gap-5 p-7 lg:p-8 rounded-xl border transition-all duration-base ease-soft',
          isInfo ? 'bg-sg-sage-mist' : 'bg-bg-page',
          hovered
            ? 'border-sg-slate/50 shadow-3 -translate-y-1'
            : 'border-sg-ink/10 shadow-1'
        )}
      >
        {svc.badge && (
          <span className="absolute top-6 right-6 z-10 px-2.5 py-1 rounded-xs bg-sg-ink text-fg-on-dark font-body text-[10px] font-semibold tracking-widest uppercase">
            {svc.badge}
          </span>
        )}

        <div
          className={cn(
            'flex items-center justify-center w-12 h-12 rounded-lg transition-transform duration-base ease-soft',
            isInfo ? 'bg-sg-paper/70 text-sg-sage-darker' : 'bg-sg-sage-mist text-sg-sage-deep',
            hovered && 'scale-110 -rotate-3'
          )}
        >
          <Icon size={22} strokeWidth={1.75} />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-display font-semibold text-[1.375rem] text-fg-1 leading-snug">
            {svc.name}
          </h3>
          <p className="font-body text-[0.9375rem] text-fg-2 leading-relaxed">{svc.desc}</p>
        </div>

        <div className="flex flex-col items-stretch gap-4 mt-auto pt-5 border-t border-sg-blush sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          {svc.price ? (
            <span className="font-display font-semibold text-[1.25rem] text-fg-1 whitespace-nowrap sm:shrink-0">
              {svc.price}
            </span>
          ) : (
            <span className="font-body text-xs font-semibold tracking-wide uppercase text-sg-rose-text whitespace-nowrap sm:shrink-0">
              Available at booking
            </span>
          )}
          <Button
            variant={isInfo ? 'secondary' : 'sage'}
            size="sm"
            onClick={() => openExternal(BOOKING_URL)}
            className="w-full justify-center whitespace-nowrap sm:w-auto sm:shrink-0"
          >
            Book with Vagaro
          </Button>
        </div>
      </article>
    </FadeInOnScroll>
  )
}

export function ServicesSection() {
  return (
    <section id="services" className="bg-bg-card py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <FadeInOnScroll>
          <SectionHeading
            eyebrow="Services"
            title="The Menu"
            sub="Every set and treatment is customized in person — these are your starting points."
          />
        </FadeInOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {SERVICES.map((svc, i) => (
            <ServiceCard key={svc.id} svc={svc} index={i} />
          ))}
        </div>

        <FadeInOnScroll delay={0.3}>
          <p className="mt-10 text-center font-body text-sm text-fg-3">
            Looking to customize? <strong className="text-fg-1">Outer-corner accents</strong> and{' '}
            <strong className="text-fg-1">hybrid sets with bottom lashes</strong> are available
            too — just ask at booking.
          </p>

          <div className="flex items-center justify-center gap-2 mt-6">
            <ShieldCheck size={15} className="text-sg-sage-deep/70 flex-shrink-0" strokeWidth={1.75} />
            <p className="font-body text-xs text-fg-3 leading-relaxed">
              Online booking is securely handled through{' '}
              <span className="font-semibold text-fg-2">Vagaro</span>, our trusted booking
              platform. Click any service above to choose your appointment time.
            </p>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  )
}
