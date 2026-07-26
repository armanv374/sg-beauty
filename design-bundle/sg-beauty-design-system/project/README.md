# SG Beauty Design System

> A design system for **SG Beauty** — a professional lash extension salon in Washington. Classic, hybrid, and volume lash extensions performed by certified artists, with an emphasis on precision, hygiene, and customised styling.

This system gives any design or prototyping agent the tokens, copy voice, components, and reference layouts to produce on-brand work for SG Beauty quickly — landing pages, social posts, in-salon menus, slide decks, and one-off mockups.

---

## Brand at a glance

| | |
|---|---|
| **Industry** | Boutique beauty salon, single-discipline (lash extensions) |
| **Location** | Washington, USA |
| **Audience** | Women 22–45 looking for premium, low-maintenance lash work |
| **Mood** | Soft. Considered. Quiet luxury. Not flashy, not minimal-cold. |
| **Voice** | Warm professional. "Beautiful, long-lasting lashes that enhance your natural confidence." |
| **Logotype** | "SG" in a high-contrast serif over a small "BEAUTY" tracked-caps subline, single-line face/butterfly illustration nested inside the **G** |

---

## Sources used to build this system

| Source | What was extracted |
|---|---|
| **`uploads/Logo.png`** | The "SG Beauty" lockup. Background sage colour (#9CA68B-range) lifted as the brand primary. |
| **Figma — "Natural Touch — Beauty Salon Website UI Kit (Community)"** (mounted .fig) | The full UI vocabulary: type pairing (Playfair Display + Inter), cream/peach surfaces, slate dark, pill buttons, service-card layout, testimonial pattern, header / footer, icon set. Adapted, not copied — SG Beauty's primary is sage, the template's primary was slate. |

> The reader probably does **not** have access to either source. Both are referenced for provenance; everything you need to design against is mirrored into this folder (`assets/`, `colors_and_type.css`, `ui_kits/`).

---

## Content fundamentals

**Voice.** Warm, knowledgeable, considered. We sound like a senior artist explaining the difference between classic and hybrid sets without ever being condescending. Closer to a soft-spoken concierge than a beauty influencer.

**Pronoun.** We talk in **we** for the salon and **you** for the client. Never "I." Never "us girls."

**Casing.** Sentence case for headings and body. Title Case only for service names and proper nouns ("Volume Set," "SG Beauty"). Tracked **ALL CAPS** is reserved for tiny eyebrows ("BOOK A SET") and small section labels — never for paragraphs.

**Sentence shape.** Short and direct, with the occasional pause. Commas earn their place. We almost never use exclamation marks. Em-dashes are fine — sparingly.

**Examples of on-voice copy.**

> Soft, precise lashes — applied one at a time.
>
> Book a consultation if you're new. We'll talk through eye shape, lifestyle and the look you want before we touch a single lash.
>
> Classic, hybrid and volume sets, applied by certified artists who actually love what they do.
>
> First-time fill ups within three weeks of your initial set — half price.

**Examples of off-voice copy** (avoid):

> 💖 LASHES THAT WOW! 💖 Book today bestie!
>
> Get your dream lashes at SG Beauty!!!
>
> Our amazing AI-powered lash technology…

**Emoji.** Avoid. The only acceptable use is a single 📍 or ✉️ as an inline glyph next to a contact line — and even there, the SVG icon set is preferred.

**Numbers, prices, units.** Prefer `$140` over `USD 140`. "Three weeks" beats "3 wks." Time is `10:00 AM – 7:00 PM`.

---

## Visual foundations

### Colour
SG Beauty's identity is built on **sage green** (`#9CA68B`, lifted from the logo) paired with the warm **cream → blush → peach** family inherited from the source UI kit. Dark text is a deep slate-teal (`#17313E`) — never pure black. See `colors_and_type.css` for the full token list; the high-level groups are:

- **Brand sage** — primary CTA, focus rings, active states, hero washes.
- **Cream / blush** — card surfaces, divider sections, soft hero panels. This is where the salon's "warmth" lives.
- **Slate ink** — body text, footer, contrast UI. Reads as more sophisticated than pure black on cream.
- **Lilac & coral** — sparing accents only (icon halos, sale tags). Never as a primary surface.

### Typography
**Playfair Display** for display headlines and quotes — the elegant high-contrast serif that anchors the brand. **Inter** for everything else (UI, body, captions). One-off marketing pieces may pull in **Aldrich** or **Oswald** for ALL CAPS labels, mirroring the source kit. Type scale is in `colors_and_type.css`.

> ⚠️ **Font substitution.** No `.ttf` / `.woff2` files shipped with the brief. Both fonts are loaded from **Google Fonts** at the top of `colors_and_type.css`. Please send the licensed brand font files if there are specific weights or italic cuts in use — Playfair Display in particular ships in several optical sizes.

### Spacing & layout
A **4-pt grid**. Sections breathe — 80–120 px vertical padding on desktop, 64 px on tablet. Cards have generous 16–24 px internal padding. The signature radius is **`24px`** (called out explicitly in the source kit) for cards and hero illustrations; buttons are pill-shaped (`999px`); small chips use 16 px.

### Backgrounds & motifs
- **Full-bleed photography** for hero — close-cropped eyes / lashes / soft portraits. Warm, natural light. No harsh studio flash.
- **Divider strips** — narrow bands (160–200 px tall) of full-bleed texture (linen, shell, marble) between sections, sometimes overlaid with a 20% slate scrim.
- **Cream washes** for warm sections; sage **mist** (#E8ECDF) for fresh / refresher sections.
- No gradients except subtle one-direction warm fades. **No mesh / aurora / "AI-purple" backgrounds.**
- **No hand-drawn doodles** or AI-generated florals.

### Imagery direction
Warm-toned, low-contrast, soft natural light. Skin reads as glowing, not retouched. Black-and-white is allowed but rare — reserve it for editorial slides. Avoid blue-cast, fluorescent, or selfie-with-ring-light energy.

### Animation & interaction
Movement is **slow and graceful** — never bouncy. Default transition `200ms` with a soft cubic-bezier easing. Use `300–400ms` on larger surfaces (hero parallax, image reveals). No spring overshoots. Fades and small vertical translations (4–8 px) for entrance; never spin, never wobble.

**Hover states.** Buttons darken to `--sg-sage-deep` and shift their icon ~4 px in the direction of travel. Card hover lifts shadow from `--shadow-1` to `--shadow-3` and adds a `1px` `--sg-ink-40` border. Links shift to `--sg-sage-darker` (no underline).

**Press states.** Buttons darken further to `--sg-sage-darker`, scale to `0.98`, and remove their outer shadow. Cards do **not** scale on press.

**Focus states.** A 3 px sage halo (`--shadow-focus`) around the focused element. Visible by default — accessibility is non-negotiable.

### Borders & dividers
Hairlines are warm: `1px solid var(--border-soft)` (a peach `#EED6C4`) when on cream, `1px solid var(--border-hairline)` on white, `1px solid var(--border-ink)` for stronger separation against cream. **Avoid pure grey borders.**

### Shadows
Three steps only — `--shadow-1` (resting cards), `--shadow-2` (modals, popovers), `--shadow-3` (lifted state, e.g. hovered service card). Plus `--shadow-card` (a slightly grippier shadow lifted from the Figma "Card / Benefit" component) for floating contact cards.

### Cards
Default card = cream fill, 24 px radius, 1 px peach border, `--shadow-1`. The Benefit card variant adds the grippier `--shadow-card`. On hover, border firms to `rgba(65, 94, 114, 0.6)` and shadow lifts.

### Transparency & blur
Used sparingly. The only common case is the testimonial card "read" state — a `rgba(23, 49, 62, 0.3)` translucent slate panel sitting on a peach section, with cream-coloured display type inside. No `backdrop-filter` overuse; saved for an optional sticky header glass effect.

### Layout rules
- Standard desktop content width: **1280 px** centred in a 1440 px viewport (24 px gutters when narrower).
- Section padding: 80–120 px top/bottom desktop, 56 px mobile.
- The header is sticky on scroll, glass-light variant.
- The footer is the only place pure white text sits on slate dark.

### Things to avoid (anti-patterns)
- Bluish-purple gradients, mesh blobs, glass morphism overload.
- Emoji used as bullet points.
- Hand-drawn brand SVGs of "girls with lashes" — use real photography or copy in icons from `assets/icons/`.
- Cards with **only a coloured left border** and a rounded right side.
- More than two type families on a single composition.

---

## Iconography

The icon system is the **Natural Touch line-icon set** lifted from the source Figma — 1.5-px stroke, rounded joins, monochromatic. They live in `assets/icons/` as SVGs that use `currentColor` for fill / stroke, so they recolour through CSS. Set covers:

`arrow-right`, `chevron-down`, `menu`, `close`, `check`, `alert`, `clock`, `star`, `star-filled`, `comma` (quote glyph), `phone`, `mail`, `map-pin`, `whatsapp`, `instagram`.

For glyphs missing from this set (e.g. **Eye**, **Sparkle**, **Calendar**, **Scissors**, **Heart**), pull from **[Lucide](https://lucide.dev)** — same stroke weight and rounded geometry. Lucide is also CDN-available; reach for it before drawing anything by hand.

> ⚠️ **Substitution flag.** Lash-specific glyphs (eye, lash, sparkle) are not in the original kit; Lucide is the documented fallback. If a custom eye / lash mark is needed, request it from the brand — do **not** draw one in SVG.

**Emoji as icons:** never.
**Unicode symbols as icons:** never. The only Unicode characters we use are `©`, `→`, `•`, and en/em dashes.

---

## Files in this folder

| Path | What it is |
|---|---|
| `README.md` | This document. |
| `SKILL.md` | Agent-Skill manifest — load this in a Claude Code skill to brief an agent on SG Beauty. |
| `colors_and_type.css` | All design tokens (colour, type, spacing, radii, shadow, motion) + semantic type classes. Import into any HTML artifact. |
| `assets/logo-sg-beauty.png` | The full SG Beauty lockup (2000 × 2000 PNG, sage background). |
| `assets/icons/` | 15 currentColor SVG icons. |
| `assets/images/` | Photographic placeholders — hero portrait, texture divider, avatar, lifestyle. |
| `preview/` | Small HTML cards rendered into the **Design System** review tab. |
| `ui_kits/website/` | Marketing-site UI kit — React components + interactive `index.html` recreating the lash-extension site. |

---

## Quick start (for a designer / agent picking this up)

1. `<link rel="stylesheet" href="/path/to/colors_and_type.css">` at the top of your HTML.
2. Reach for the semantic type classes (`.sg-h1`, `.sg-body`, `.sg-eyebrow`).
3. Pull components / patterns from `ui_kits/website/` — don't reinvent the buttons, the service cards, or the footer.
4. Use real photography from `assets/images/` as placeholders — replace with brand-supplied photography in production.
5. If you need a glyph that isn't in `assets/icons/`, link **Lucide** from CDN and use the matching stroke weight.

---

## Caveats & open questions

- **Brand fonts not provided.** Playfair Display + Inter via Google Fonts. Send the licensed files if there's a non-standard cut in use.
- **Brand photography not provided.** All hero / portrait imagery in `assets/images/` came from the source Figma template (Pexels/Unsplash-style stock). Replace with real client / salon photography.
- **Brand colour precision.** Sage primary `#9CA68B` was eyedropped from the logo PNG; the original brand spec may use a slightly different swatch. Please confirm.
- **No social, brand voice doc, or service price list was provided.** Sample copy in the website UI kit is realistic but **invented**.
