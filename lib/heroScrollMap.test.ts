// lib/heroScrollMap.test.ts
// Run: npx tsx lib/heroScrollMap.test.ts

import * as assert from 'node:assert/strict'
import { scrollToTargetStage, stageStartPx, totalScrollVh } from './heroScrollMap'

const PX = 10 // 1 vh = 10 px for clean integer math

const STAGES = [
  { name: 'Neutral',   holdFrame: 0,   holdVh: 60,  headline: '', sub: '', poster: '' },
  { name: 'Lash Lift', holdFrame: 120, holdVh: 100, headline: '', sub: '', poster: '' },
  { name: 'Classic',   holdFrame: 241, holdVh: 100, headline: '', sub: '', poster: '' },
  { name: 'Hybrid',    holdFrame: 362, holdVh: 100, headline: '', sub: '', poster: '' },
  { name: 'Volume',    holdFrame: 483, holdVh: 100, headline: '', sub: '', poster: '' },
]

// totalScrollVh: 60 + 100 + 100 + 100 + 100 = 460
assert.equal(totalScrollVh(STAGES), 460)

// stageStartPx: cumulative zone starts
assert.equal(stageStartPx(0, STAGES, PX), 0)
assert.equal(stageStartPx(1, STAGES, PX), 600)
assert.equal(stageStartPx(2, STAGES, PX), 1600)
assert.equal(stageStartPx(4, STAGES, PX), 3600)

// scrollToTargetStage: zone lookup
assert.equal(scrollToTargetStage(-1, STAGES, PX), 0)
assert.equal(scrollToTargetStage(0, STAGES, PX), 0)
assert.equal(scrollToTargetStage(599, STAGES, PX), 0)
// boundary crossing is the trigger
assert.equal(scrollToTargetStage(600, STAGES, PX), 1)
assert.equal(scrollToTargetStage(1599, STAGES, PX), 1)
assert.equal(scrollToTargetStage(1600, STAGES, PX), 2)
assert.equal(scrollToTargetStage(3600, STAGES, PX), 4)
// past end → last stage
assert.equal(scrollToTargetStage(99999, STAGES, PX), 4)

console.log('✓ All heroScrollMap tests passed')
