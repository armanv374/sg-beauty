export interface Stage {
  name: string
  holdFrame: number
  holdVh: number
  headline: string
  headlineItalic?: string
  sub: string
  cta?: { label: string; href: string }
  poster: string
}

// Scroll position no longer scrubs frames — it only selects which stage the
// playhead should be heading toward. Each stage owns a zone of `holdVh` vh;
// crossing a zone boundary is the trigger, and the playhead (in HeroSection)
// animates frames toward that stage's holdFrame at a fixed speed.
export function scrollToTargetStage(
  scrollPx: number,
  stages: Stage[],
  pxPerVh: number,
): number {
  let cursor = 0
  for (let i = 0; i < stages.length; i++) {
    cursor += stages[i].holdVh * pxPerVh
    if (scrollPx < cursor) return i
  }
  return stages.length - 1
}

// Pixel offset (from container top) where stage i's zone begins.
// Used by SlideIndicator dot clicks.
export function stageStartPx(stageIndex: number, stages: Stage[], pxPerVh: number): number {
  let cursor = 0
  for (let i = 0; i < stageIndex; i++) cursor += stages[i].holdVh * pxPerVh
  return cursor
}

// Total scroll range in vh. Add 100 for the sticky viewport to get container height.
export function totalScrollVh(stages: Stage[]): number {
  return stages.reduce((sum, s) => sum + s.holdVh, 0)
}
