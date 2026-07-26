# Hero Canvas Rewrite — Design Spec
**Date:** 2026-05-20
**Project:** SG Beauty (`c:\Users\arman\SGB`)
**Status:** Approved, ready for implementation

---

## 1. Overview

Replace the current MP4-scrubbing hero with a canvas-based image sequence hero. The user scrolls through a sticky canvas that plays WebP frame sequences, stopping at each lash service for long enough to read the text, then transitioning cinematically to the next.

No new dependencies. Uses existing Framer Motion + RAF.

---

## 2. Asset Requirements

### Frame sequence
All 4 videos are exported as **one single continuous numbered sequence**:

```
public/hero-lash/
  desktop/
    frame-0001.webp   ← first frame (Neutral hold)
    frame-0002.webp
    ...
    frame-NNNN.webp   ← last frame (Volume hold)
  mobile/
    frame-0001.webp
    ...
    frame-NNNN.webp
  posters/
    neutral.webp      ← static fallback for prefers-reduced-motion
    lash-lift.webp
    classic.webp
    hybrid.webp
    volume.webp
```

### Video → frame export mapping
| Video | Content | Last frame = hold frame for |
|---|---|---|
| `slide-1.mp4` | Neutral → Lash Lift | Lash Lift |
| `slide-2.mp4` | Lash Lift → Classic | Classic |
| `slide-3.mp4` | Classic → Hybrid | Hybrid |
| `slide-4.mp4` | Hybrid → Volume | Volume |

### Frame URL pattern
```ts
// Frame index is 0-based internally; file names are 1-based with 4-digit zero-padding
`/hero-lash/${isMobile ? 'mobile' : 'desktop'}/frame-${String(index + 1).padStart(4, '0')}.webp`
```

### Breakpoint: mobile ≤ 768px, desktop > 768px. Detected once on mount.

---

## 3. Component Structure

```
components/Hero/
  HeroSection.tsx     ← scroll orchestrator, config, derives stage state
  HeroCanvas.tsx      ← canvas element, frame cache, preloading, RAF draw
  HeroStageText.tsx   ← headline / sub / CTA overlay, Framer Motion fade
  SlideIndicator.tsx  ← 5 dots (unchanged API, updated count)
```

---

## 4. STAGES Config (in HeroSection.tsx)

```ts
const TOTAL_FRAMES = 480 // UPDATE after export: total number of exported WebP frames

const STAGES: Stage[] = [
  {
    name: 'Neutral',
    // First frame of the entire sequence — the opening still.
    // UPDATE: always 0 unless you trim frames from the start.
    holdFrame: 0,
    holdVh: 60,       // scroll range (vh) spent on this hold
    transitionVh: 0,  // no incoming transition for the first stage
    headline: 'Wake Up Beautiful.',
    sub: 'Custom lash services by Lilit in Vancouver, WA',
    cta: { label: 'Book an appointment', href: BOOKING_URL },
    poster: '/hero-lash/posters/neutral.webp',
  },
  {
    name: 'Lash Lift',
    // Last frame of slide-1.mp4.
    // UPDATE: set to (frames in video 1) - 1  e.g. 119 for a 120-frame export
    holdFrame: 119,
    holdVh: 45,
    transitionVh: 65, // scroll range (vh) for the Neutral → Lash Lift animation
    headline: 'Lash Lift.',
    headlineItalic: 'Naturally Yours.',
    sub: 'Your own lashes, elevated — no extensions needed.',
    poster: '/hero-lash/posters/lash-lift.webp',
  },
  {
    name: 'Classic',
    // Last frame of slide-2.mp4.
    // UPDATE: holdFrame of previous stage + frames in video 2  e.g. 119 + 120 = 239
    holdFrame: 239,
    holdVh: 45,
    transitionVh: 65, // Lash Lift → Classic animation
    headline: 'Classic Lashes.',
    sub: 'One extension per lash. Defined, natural, effortless.',
    poster: '/hero-lash/posters/classic.webp',
  },
  {
    name: 'Hybrid',
    // Last frame of slide-3.mp4.
    // UPDATE: e.g. 239 + 120 = 359
    holdFrame: 359,
    holdVh: 45,
    transitionVh: 65, // Classic → Hybrid animation
    headline: 'Hybrid Lashes.',
    sub: 'Texture and dimension with a natural finish.',
    poster: '/hero-lash/posters/hybrid.webp',
  },
  {
    name: 'Volume',
    // Last frame of slide-4.mp4 = last frame of the entire sequence.
    // UPDATE: TOTAL_FRAMES - 1  e.g. 479
    holdFrame: 479,
    holdVh: 60,
    transitionVh: 65, // Hybrid → Volume animation
    headline: 'Volume Lashes.',
    sub: 'Handmade fans for full, dramatic results that last.',
    poster: '/hero-lash/posters/volume.webp',
  },
]
```

**Total scroll range:** sum of all `holdVh + transitionVh` = 515vh. Container height = 515 + 100 = 615vh.

To adjust pacing: change `holdVh` (dwell time per service) or `transitionVh` (animation speed). No other code needs to change.

---

## 5. Scroll → Stage State Mapping

`HeroSection` computes these three values on every scroll event:

| Value | Type | Description |
|---|---|---|
| `stageIndex` | `number` | Index into STAGES of the active stage |
| `isHold` | `boolean` | `true` during a hold zone, `false` during a transition |
| `currentFrame` | `number` | Frame index to render on the canvas |

### Algorithm

1. Convert scroll position to `scrollPx`: pixels scrolled within the hero container.
2. Walk the STAGES array accumulating `(transitionVh + holdVh) × pxPerVh` per stage to find the active zone.
3. If in a **hold zone**: `currentFrame = stage.holdFrame`, `isHold = true`
4. If in a **transition zone**: `currentFrame = Math.round(lerp(prevStage.holdFrame, stage.holdFrame, t))`, `isHold = false`

`lerp(a, b, t) = a + (b - a) * t` where `t` is 0→1 progress through the transition zone.

### Dot-click scroll target
Clicking dot `i` scrolls to the pixel offset of the **start of that stage's hold section**, not the start of its transition. This ensures the text is immediately visible when the user navigates via dots.

---

## 6. HeroCanvas

**Props:** `currentFrame: number`, `totalFrames: number`, `isMobile: boolean`

**Frame cache:** `useRef<Map<number, HTMLImageElement>>(new Map())`

**Preloading — three tiers:**
1. **Immediate (mount):** Frames 0–29 (first 30 frames).
2. **Ahead-of-playhead (on scroll):** When `currentFrame` is within 30 frames of a transition boundary, batch-load the next 60 frames.
3. **Idle (background):** All remaining frames via `requestIdleCallback` with `setTimeout(fn, 100)` fallback for unsupported browsers.

**Cold-start:** The neutral poster (`stage[0].poster`) is rendered as a CSS `background-image` on the wrapper `div` behind the `<canvas>`. This is immediately visible before any frames load, preventing a blank canvas flash.

**Fallback for missing frames:** If frame N fails to load, search backwards for the nearest cached frame and draw that instead. Never show a blank canvas.

**Canvas sizing:**
- Set `canvas.width = canvas.offsetWidth * devicePixelRatio`
- Set `canvas.height = canvas.offsetHeight * devicePixelRatio`
- Scale context: `ctx.scale(devicePixelRatio, devicePixelRatio)`

**Cover scaling** (replicate `object-fit: cover`):
```
scale = max(canvasW / imgW, canvasH / imgH)
drawX = (canvasW - imgW * scale) / 2
drawY = (canvasH - imgH * scale) / 2
ctx.drawImage(img, drawX, drawY, imgW * scale, imgH * scale)
```

**RAF loop:** Runs continuously while mounted. Redraws only when `currentFrame` ref value has changed since the last draw. Cancelled on unmount.

---

## 7. HeroStageText

**Props:** `stage: Stage`, `stageIndex: number`, `isHold: boolean`

Uses `AnimatePresence mode="wait"` with a `motion.div` keyed on `stageIndex`.

- **Transition zones (`isHold = false`):** `AnimatePresence` unmounts the block → exit animation fires (`opacity: 0, y: -8`, 0.35s ease-in). Canvas is clean.
- **Hold zones (`isHold = true`):** Block mounts → enter animation fires (`opacity: 0, y: 12` → `opacity: 1, y: 0`, 0.5s ease-out).

The CTA button lives inside the same `motion.div`, so it follows the same `isHold` visibility rule.

---

## 8. SlideIndicator

Unchanged API: `count={5}`, `active={stageIndex}`, `onDotClick={(i) => scrollToHoldStart(i)}`.

`scrollToHoldStart(i)` scrolls to the pixel offset of the start of stage `i`'s hold zone (skipping its transition). Computed from the same STAGES config the scroll handler uses.

---

## 9. prefers-reduced-motion Fallback

Detected via `window.matchMedia('(prefers-reduced-motion: reduce)')` on mount.

When active:
- No sticky container, no canvas, no RAF
- Render 5 `<section>` elements stacked vertically, each `h-screen`
- Each section shows `next/image` from `stage.poster` with `fill` + `object-cover`
- Dark overlay + text always visible (no AnimatePresence)
- SlideIndicator hidden

---

## 10. What to Update After Frame Export

After running FFmpeg (or similar) to export frames:

1. Set `TOTAL_FRAMES` to the actual total frame count.
2. Update the four `holdFrame` values in `STAGES` to the real last-frame indices:
   - `STAGES[1].holdFrame` = last frame index of `slide-1.mp4`
   - `STAGES[2].holdFrame` = last frame of video 1 + last frame of video 2
   - `STAGES[3].holdFrame` = above + last frame of video 3
   - `STAGES[4].holdFrame` = `TOTAL_FRAMES - 1`
3. Place WebP files in `public/hero-lash/desktop/` and `public/hero-lash/mobile/`
4. Place poster WebPs in `public/hero-lash/posters/`

---

## 11. Performance Notes

- Desktop frames typically 1920×1080 WebP ≈ 50–150 KB each. At 480 frames: 24–72 MB total transferred (spread over the session, not upfront).
- Mobile frames typically 750×1334 WebP ≈ 20–60 KB each — significant savings on mobile.
- The tiered preloading ensures < 30 images load before first interaction.
- Canvas draw is O(1) per frame — no layout cost.
- RAF is cancelled on component unmount — no leaks.

---

## 12. Files Changed

| File | Action |
|---|---|
| `components/Hero/HeroSection.tsx` | Full rewrite |
| `components/Hero/HeroCanvas.tsx` | New file |
| `components/Hero/HeroStageText.tsx` | New file (replaces VideoSlide.tsx content) |
| `components/Hero/SlideIndicator.tsx` | Minor update (dot-click target logic) |
| `components/Hero/VideoSlide.tsx` | Deleted |
| `public/hero-lash/` | New asset directory (populated by user after export) |
