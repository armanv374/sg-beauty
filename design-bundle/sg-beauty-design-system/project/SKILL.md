---
name: sg-beauty-design
description: Use this skill to generate well-branded interfaces and assets for SG Beauty — a professional lash extension salon in Washington — for either production work or throwaway prototypes / mocks / decks. Contains essential design guidelines, colour and type tokens, fonts, photographic assets, and a website UI kit of recreated components for fast prototyping.
user-invocable: true
---

# SG Beauty design skill

Read **`README.md`** first — it covers the brand context, voice, visual foundations, iconography, and a manifest of the other files in this skill.

Then explore:

- `colors_and_type.css` — every design token (colour, type, spacing, radius, shadow, motion). Import this stylesheet at the top of any HTML artifact you produce.
- `assets/icons/` — 15 currentColor SVG icons (arrow, star, phone, mail, map-pin, instagram, whatsapp, clock, menu, close, check, alert, chevron-down, comma). Reach for **Lucide** from CDN for anything missing — never draw your own.
- `assets/images/` — photographic placeholders (hero portrait, texture, avatar). Replace with brand-supplied photography for production work.
- `assets/logo-sg-beauty.png` — the SG Beauty lockup.
- `ui_kits/website/` — JSX components and an interactive `index.html` recreating the SG Beauty marketing site. Lift components from here rather than rebuilding.
- `preview/` — small specimen cards used to render the design-system review tab.

## When you're invoked

If you're producing visual artifacts (slides, mocks, throwaway prototypes, social mocks, in-salon menus, decks), copy the assets you need out of this skill and produce static HTML files with `colors_and_type.css` linked. Use the components in `ui_kits/website/` as your starting point.

If you're working on production code, you can copy assets and read the rules here to become an expert in designing against the SG Beauty brand.

If you're invoked without any other guidance, ask the user what they want to build or design, ask several focused questions about audience / surface / format / variations, then act as an expert designer and output either HTML artifacts or production code depending on the need.

## Hard rules

- **Voice.** Warm professional. "We" for the salon, "you" for the client. Sentence case. No emoji. No exclamation marks.
- **Type.** Playfair Display for display, Inter for everything else. Don't introduce a third family.
- **Colour.** Sage primary on cream surfaces, slate-teal text. **Never pure black text. Never bluish-purple gradients.**
- **Icons.** Use `assets/icons/` first, Lucide CDN second. Never emoji, never hand-drawn SVG illustrations.
- **Motion.** Soft easing, 200–400 ms. No bouncy springs.
