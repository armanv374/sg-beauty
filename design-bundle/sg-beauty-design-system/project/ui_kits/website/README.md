# SG Beauty — Website UI Kit

A high-fidelity recreation of the SG Beauty marketing site, built by adapting the "Natural Touch — Beauty Salon" Figma template to SG Beauty's brand (sage primary, lash-specific copy and imagery).

## Files

| File | Purpose |
|---|---|
| `index.html` | Full clickable page — runs straight in a browser. |
| `Header.jsx` | Sticky header w/ nav, mobile menu, "Book now" CTA. |
| `Hero.jsx` | Eyebrow + Playfair display headline + CTA pair + lash chips floating over a hero portrait. |
| `Services.jsx` | Filter-tab carousel of service cards (Classic / Hybrid / Volume / Lift / Brows). |
| `Testimonials.jsx` | Read / unread testimonial cards + pagination bar. |
| `Contact.jsx` | Send-us-a-message form + two floating benefit cards. |
| `Footer.jsx` | Slate footer w/ four columns + bottom bar. |
| `Divider.jsx` | Full-bleed photo strip with scrim — used between sections. |
| `components.jsx` | Buttons, inputs, eyebrow, section-header primitives. |

## Interactivity

- Service tabs filter the visible card.
- "Book now" buttons (any of them) open a small booking modal.
- The contact form accepts input and shows a success state on submit.

## Notes

- Components are deliberately cosmetic — they don't make network calls, just demonstrate the visual + state vocabulary.
- All assets resolve through `../../assets/` and `../../colors_and_type.css`.
- The original Figma uses `position: absolute` everywhere; the recreation uses flex / grid for resilience.
