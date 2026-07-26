'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'
import { BOOKING_URL, openExternal } from '@/lib/siteLinks'

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'FAQ', href: '#faq' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = NAV_LINKS.map(({ href }) => document.querySelector(href)).filter(
      (section): section is Element => section !== null
    )

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleSection) setActiveSection(`#${visibleSection.target.id}`)
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.1, 0.25, 0.5] }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-slow ease-soft',
        scrolled
          ? 'bg-sg-cream/92 backdrop-saturate-[140%] backdrop-blur-[14px] border-b border-sg-ink/8 shadow-1'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 flex items-center justify-between h-[88px] md:h-[72px]">
        {/* Logo */}
        <a href="#top" className="flex items-center py-2 md:py-0" aria-label="SG Beauty home">
          <Image
            src="/images/logo-transparent.png"
            alt="SG Beauty"
            width={160}
            height={56}
            className="h-[68px] md:h-[92px] w-auto object-contain"
            priority
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-body font-medium text-[0.9375rem] text-fg-1 no-underline transition-colors duration-base ease-soft hover:text-sg-sage-deep"
            >
              {link.label}
            </a>
          ))}
          <Button variant="dark" size="sm" onClick={() => openExternal(BOOKING_URL)}>
            Book now
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 -mr-2 text-fg-1 rounded-md"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden max-h-[calc(100dvh-88px)] overflow-y-auto bg-sg-cream/98 backdrop-blur-xl px-7 pb-7 pt-5">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href

              return (
                <a
                  key={link.label}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'group relative flex items-center min-h-12 py-3 pl-5 font-body text-[1.0625rem] font-medium tracking-[0.01em] no-underline transition-all duration-base ease-soft active:translate-x-1',
                    isActive
                      ? 'text-sg-sage-darker'
                      : 'text-fg-1 hover:text-sg-sage-deep hover:translate-x-1'
                  )}
                  onClick={() => {
                    setActiveSection(link.href)
                    setMobileOpen(false)
                  }}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute left-0 h-1.5 w-1.5 rounded-full bg-sg-sage-deep transition-all duration-base ease-soft',
                      isActive
                        ? 'scale-100 opacity-100'
                        : 'scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-60'
                    )}
                  />
                  {link.label}
                </a>
              )
            })}
          </nav>

          <Button
            variant="dark"
            className="mt-7 w-full justify-center"
            onClick={() => {
              setMobileOpen(false)
              openExternal(BOOKING_URL)
            }}
          >
            Book now
          </Button>
        </div>
      )}
    </header>
  )
}
