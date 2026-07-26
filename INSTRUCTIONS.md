# SG Beauty — Website Rebuild Instructions

## Context

This is a full rebuild of the existing website at **sgbeautywa.com**.

**The salon:**
- Name: **SG Beauty**
- Technician: **Lilit** (the sole artist — the website voice should feel personal, not corporate)
- Specialty: Classic, Hybrid, Volume, and Mega Volume lash extensions. Also brow lamination.
- Technique: Russian lash technique
- Location: 911 Main St, Ste 110 Room 14, Vancouver, WA 98660
- Phone: (971) 521-3365
- Hours: Mon–Fri 10:30am–6:00pm · Sat 12:00pm–5:00pm · Sun Closed
- Booking: integrate with existing booking link (placeholder: `BOOKING_URL`)
- Instagram: `INSTAGRAM_HANDLE` (fill in)

**Brand voice:** Warm, personal, confident. Lilit is a skilled artist who gives consultations and customizes every set. The tone should feel like a trusted expert, not a generic beauty chain.

**Design system:** Colors, typography, and spacing tokens are defined in a separate design system file (`design-system.*`) that will be provided. Do NOT hardcode any color values, font names, or spacing values — import and reference tokens from the design system only.

---

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS configured to use design system tokens + `globals.css` for CSS variables
- **Animation**: Framer Motion — scroll-triggered reveals, slide transitions, micro-interactions
- **Images**: `next/image` everywhere — no raw `<img>` tags
- **Video**: Native HTML5 `<video>` — autoplay, muted, loop, playsinline
- **Icons**: Lucide React
- **SEO**: Next.js Metadata API + JSON-LD structured data
- **Fonts**: Loaded via `next/font/google` — pulled from design system spec
- **Utilities**: `clsx` + `tailwind-merge` via a `cn()` helper

---

## Page Structure

### 1. Hero Section — Scroll-Triggered Video Slides

The hero is the main visual statement of the site. It occupies the full viewport and uses **scroll progression** to move through 5 full-screen slides — not a carousel. As the user scrolls down, each slide transitions in. Page content begins only after all 5 slides have been passed.

**Behavior:**
- The hero container is sticky/fixed with scroll-jacked inner panel
- Use `IntersectionObserver` or a scroll progress hook to map scroll position → active slide index
- Slide transitions: crossfade or upward slide using Framer Motion `AnimatePresence`
- A **slide indicator** (thin vertical line + 5 dots) sits on the right edge — active dot highlighted
- A **scroll cue** (animated down arrow or "scroll" label) appears on slide 1 and fades after first scroll

**Each slide structure:**
- Full-screen `<video>` background: autoplay, muted, loop, playsinline, with a `poster` image fallback
- Dark overlay (opacity from design system token) to ensure text legibility
- Centered or left-aligned text block: large headline + short subtext + optional CTA button
- Video paths: `/videos/slide-[n].mp4` · Poster paths: `/images/slide-[n]-poster.jpg`

**Slide content:**
| # | Headline | Subtext |
|---|----------|---------|
| 1 | "Wake Up Beautiful." | Custom lash extensions by Lilit in Vancouver, WA |
| 2 | "Classic. Hybrid. Volume." | Every set is designed around your natural lashes |
| 3 | "The Russian Technique, Perfected." | Lightweight fans. Lasting results. |
| 4 | "More Than Lashes." | Brow lamination & tinting — complete your look |
| 5 | "Your Appointment Is Waiting." | Book online — spots fill fast |

**Mobile fallback:** Replace video with the poster image. Keep text and overlay identical.

**Performance rules for video:**
- Only the active slide's video plays — pause all others
- Use `preload="none"` on non-active slides; switch to `preload="auto"` when a slide is next
- Never autoplay a video that isn't in the viewport

---

### 2. Services Section

**Heading:** "The Sets"

4 service cards in a grid (2×2 on desktop, stacked on mobile). Each card:
- Service name (large)
- 1–2 sentence description
- "Starting from $XX" pricing — use placeholder tokens (e.g. `PRICE_CLASSIC`)
- Subtle hover state per design system

**Services:**
1. **Classic Lashes** — One extension per natural lash. Clean, natural look with added length and definition.
2. **Hybrid Lashes** — A mix of classic and volume fans. Fuller texture with a natural finish.
3. **Volume & Mega Volume** — Handcrafted fans for a bold, dramatic effect. Lightweight and safe.
4. **Brow Lamination** — Restructures brow hairs for a brushed-up, defined shape. Tint available.

Add secondary note for: **Fills** (2-week and 3-week) and **Removal**.

---

### 3. About / Meet Lilit Section

**Heading:** "Meet Lilit"

Two-column layout:
- **Left:** Portrait photo of Lilit — `next/image`, tall aspect ratio. Placeholder: `/images/lilit-portrait.jpg`
- **Right:** Personal brand story, 2–3 short paragraphs. Key points:
  - Trained in Russian lash technique
  - Full consultation before every appointment
  - Customizes every set — no two are the same
  - Warm, calm, clean studio environment

Include a blockquote from a real client review: *"She made them custom with a Russian technique — the best lashes I've had so far."*

---

### 4. Process Section — "How It Works"

**Heading:** "Your Appointment, Step by Step"

4 numbered steps, horizontal or diagonal layout, stagger-animate on scroll:

1. **Book Online** — Choose your service and pick a time that works for you
2. **Consultation** — Lilit assesses your natural lashes and discusses your ideal look
3. **The Application** — Relax while each extension is placed with precision and care
4. **Aftercare** — Leave with everything you need to keep your lashes perfect

Large faded step numbers, step title, one-line description each.

---

### 5. Testimonials

**Heading:** "What Clients Say"

3 review cards in a grid (horizontal scroll on mobile). Each card:
- 5-star rating (styled per design system)
- Review text (2–3 sentences)
- Client first name + service type

**Reviews to use (real, paraphrased):**
- "Lilit is experienced, fast, and does incredible work. She customized the set using Russian technique — the best lashes I've ever had. Will absolutely be back."
- "The atmosphere was warm, clean, and relaxing. She took the time to do a full consultation and listened to exactly what I wanted before starting."
- "I absolutely love my lashes. From the moment I walked in, everything felt professional and personal."

Below cards: stat bar — **4.9★ Rated** · **100% Custom Sets** · **Russian Technique Certified**

---

### 6. Gallery

**Heading:** "The Work"

Masonry or asymmetric grid, 6–8 photos. All placeholder paths: `/images/gallery-[n].jpg`

- `next/image` with `sizes` prop
- Hover: subtle zoom + overlay
- Click: lightweight CSS/JS lightbox — no heavy library
- Alt text pattern: `"[service] lash extensions by Lilit at SG Beauty, Vancouver WA"`

---

### 7. Booking CTA Section

Full-width section:
- **Heading:** "Ready for Your Lashes?"
- **Subtext:** "Book your appointment online — Lilit sees clients Mon–Sat in Vancouver, WA."
- **Primary button:** "Book Now" → `BOOKING_URL`
- **Secondary:** (971) 521-3365 · 911 Main St, Ste 110 Room 14, Vancouver, WA

---

### 8. FAQ Section

**Heading:** "Common Questions"

Accordion, smooth expand/collapse, chevron rotates on open. 6 questions with real, helpful answers (2–4 sentences each — not filler):

1. How long do lash extensions last?
2. How should I prepare for my appointment?
3. Can I wear makeup with lash extensions?
4. What's the difference between Classic, Hybrid, and Volume?
5. Do lash extensions damage natural lashes?
6. How often should I come in for fills?

---

### 9. Footer

- Logo / salon name (left)
- Nav links: Services · About · Gallery · FAQ · Book
- Hours: Mon–Fri 10:30am–6pm · Sat 12–5pm · Sun Closed
- Address: 911 Main St, Ste 110 Room 14, Vancouver, WA 98660
- Phone: (971) 521-3365
- Social icons: Instagram, Facebook — placeholders: `INSTAGRAM_URL`, `FACEBOOK_URL`
- Copyright line: © 2025 SG Beauty. All rights reserved.

---

## SEO Requirements

### Metadata (`app/layout.tsx`)
```ts
export const metadata = {
  title: 'SG Beauty | Lash Extensions in Vancouver, WA',
  description: 'Professional lash extensions in Vancouver, WA. Classic, Hybrid, Volume & Mega Volume sets by certified artist Lilit. Russian technique. Book online.',
  keywords: ['lash extensions Vancouver WA', 'lash salon Vancouver Washington', 'Russian volume lashes', 'brow lamination Vancouver WA', 'SG Beauty'],
  openGraph: {
    title: 'SG Beauty — Lash Extensions in Vancouver, WA',
    description: 'Custom lash extensions by Lilit. Classic, Hybrid, Volume & Mega Volume. Book online.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    type: 'website',
    url: 'https://sgbeautywa.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SG Beauty — Lash Extensions in Vancouver, WA',
    images: ['/og-image.jpg'],
  },
  alternates: { canonical: 'https://sgbeautywa.com' },
  robots: { index: true, follow: true },
}
```

### JSON-LD Structured Data

Add in `app/layout.tsx` as `<script type="application/ld+json">`:

```json
{
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "name": "SG Beauty",
  "description": "Professional lash extension salon specializing in classic, hybrid, and volume lash extensions. Russian technique by certified artist Lilit.",
  "url": "https://sgbeautywa.com",
  "telephone": "+19715213365",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "911 Main St, Ste 110 Room 14",
    "addressLocality": "Vancouver",
    "addressRegion": "WA",
    "postalCode": "98660",
    "addressCountry": "US"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "10:30",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "12:00",
      "closes": "17:00"
    }
  ],
  "priceRange": "$$",
  "image": "https://sgbeautywa.com/og-image.jpg"
}
```

Also add a `FAQPage` JSON-LD block using the FAQ section content.

### Technical SEO Checklist
- [ ] One `<h1>` on the page — in the Hero (slide 1 headline)
- [ ] Semantic HTML: `<main>`, `<section>`, `<nav>`, `<footer>`, `<h2>`–`<h3>` for section headings
- [ ] All images have descriptive `alt` text referencing the service and location
- [ ] `sitemap.xml` via `app/sitemap.ts`
- [ ] `robots.txt` via `app/robots.ts`
- [ ] No render-blocking scripts — all third-party scripts deferred or `strategy="lazyOnload"`
- [ ] Canonical URL set in metadata

---

## Performance Requirements

Target: **Lighthouse 90+ across all metrics**

- `next/image` with `width`, `height`, `sizes`, and `priority` on the first visible image (slide 1 poster)
- Videos: only the active slide plays; all others paused with `preload="none"`
- Fonts: via `next/font/google` — no layout shift
- Tailwind purge correctly configured — no unused CSS shipped
- Lazy load all below-the-fold images and non-critical sections
- Core Web Vitals targets: LCP < 2.5s · CLS < 0.1 · FID < 100ms

---

## File Structure

```
/
├── app/
│   ├── layout.tsx           # Root layout: metadata, fonts, JSON-LD
│   ├── page.tsx             # Assembles all sections in order
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── Hero/
│   │   ├── HeroSection.tsx  # Scroll logic + slide orchestration
│   │   ├── VideoSlide.tsx   # Single slide: video bg + overlay + text
│   │   └── SlideIndicator.tsx
│   ├── Services/
│   ├── About/
│   ├── Process/
│   ├── Testimonials/
│   ├── Gallery/
│   ├── BookingCTA/
│   ├── FAQ/
│   ├── Footer/
│   └── ui/                  # Shared: Button, SectionHeading, FadeInOnScroll, etc.
├── public/
│   ├── videos/              # slide-1.mp4 … slide-5.mp4
│   ├── images/              # posters, gallery, lilit-portrait, og-image
│   └── icons/
├── styles/
│   └── globals.css          # CSS variables from design system, base reset
├── lib/
│   └── cn.ts                # clsx + tailwind-merge helper
├── design-system.*          # Provided separately — source of truth for all tokens
└── INSTRUCTIONS.md
```

---

## Component Conventions

- TypeScript everywhere, named exports
- Reusable `<FadeInOnScroll>` wrapper using Framer Motion `whileInView` + `viewport={{ once: true }}`
- All design values (color, spacing, typography) referenced from design system tokens — never hardcoded
- Mobile-first responsive: `sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280
- No inline styles
- No raw `<img>` tags
- No heavy UI component libraries

---

## Placeholder Tokens

These need to be filled in by the client before launch:

| Token | Value needed |
|-------|-------------|
| `BOOKING_URL` | Online booking link (Vagaro, Fresha, Booksy, etc.) |
| `INSTAGRAM_URL` | Full Instagram profile URL |
| `FACEBOOK_URL` | Full Facebook page URL |
| `INSTAGRAM_HANDLE` | @handle for display in footer |
| `PRICE_CLASSIC` | Classic lash set starting price |
| `PRICE_HYBRID` | Hybrid set starting price |
| `PRICE_VOLUME` | Volume/Mega Volume starting price |
| `PRICE_BROW` | Brow lamination starting price |
| `/videos/slide-[1–5].mp4` | Hero video files |
| `/images/slide-[1–5]-poster.jpg` | Poster frames for each video |
| `/images/lilit-portrait.jpg` | Portrait photo of Lilit |
| `/images/gallery-[1–8].jpg` | Gallery photos of the work |
| `/og-image.jpg` | 1200×630px Open Graph image |

---

## What NOT to Do

- ❌ Do not hardcode any colors, fonts, or spacing — use design system tokens only
- ❌ No carousel/slider for the hero — scroll-triggered slide progression only
- ❌ No raw `<img>` tags — always `next/image`
- ❌ No Lorem Ipsum — use real or realistic content at all times
- ❌ Do not invent prices — use placeholder tokens where real data is missing
- ❌ No heavy third-party UI libraries that inflate bundle size
- ❌ Do not make the site feel generic — every word, layout choice, and interaction should feel specific to Lilit and SG Beauty
