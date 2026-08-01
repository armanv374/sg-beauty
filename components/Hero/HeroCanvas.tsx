'use client'

import { useEffect, useRef } from 'react'

interface Props {
  currentFrame: number
  totalFrames: number
  isMobile: boolean
  coldPoster: string
  /** Horizontal focal point: 0 = left edge, 0.5 = center, 1 = right edge. Default 0.5. */
  focalX?: number
  /** Vertical focal point: 0 = top, 0.5 = center, 1 = bottom. Default 0.5. */
  focalY?: number
  /**
   * Zoom multiplier applied on top of cover scale (1.0 = no zoom).
   * Values > 1 crop tighter — useful on portrait mobile to cut the body area
   * below the face while keeping the face prominent.
   */
  zoom?: number
  /**
   * Which frame directory to use on mobile.
   * Set to 'mobile' once portrait-cropped frames (e.g. 1080×1920) are exported to
   * public/hero-lash/mobile/. Until then, 'desktop' gives sharper results because the
   * 750px landscape frames scale up ~6× on a 3× DPR phone vs ~2.3× for the 1916px desktop frames.
   */
  mobileFrameDir?: 'mobile' | 'desktop'
}

export function HeroCanvas({
  currentFrame,
  totalFrames,
  isMobile,
  coldPoster,
  focalX = 0.5,
  focalY = 0.5,
  zoom = 1.0,
  mobileFrameDir = 'desktop',
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cache = useRef(new Map<number, HTMLImageElement>())
  const renderedFrame = useRef(-1)
  const renderedSignature = useRef('')
  const canvasSize = useRef({ width: 0, height: 0, dpr: 1 })
  const requestDraw = useRef<() => void>(() => {})
  const frameRef = useRef(currentFrame)
  frameRef.current = currentFrame
  const focalXRef = useRef(focalX)
  focalXRef.current = focalX
  const focalYRef = useRef(focalY)
  focalYRef.current = focalY
  const zoomRef = useRef(zoom)
  zoomRef.current = zoom

  const frameUrl = (i: number) =>
    `/hero-lash/${isMobile ? mobileFrameDir : 'desktop'}/frame-${String(i + 1).padStart(4, '0')}.webp`

  const loadFrame = (i: number) => {
    if (cache.current.has(i)) return
    const img = new Image()
    img.onload = () => {
      cache.current.set(i, img)
      requestDraw.current()
    }
    img.onerror = () => {} // missing frame: draw fallback handles it
    img.src = frameUrl(i)
  }

  // Preload only the opening buffer. Loading all 484 frames during startup
  // created avoidable image/decode and callback work before user interaction.
  useEffect(() => {
    cache.current.clear()
    renderedFrame.current = -1
    renderedSignature.current = ''

    const eager = Math.min(1, totalFrames)
    for (let i = 0; i < eager; i++) loadFrame(i)

  // loadFrame is stable per render; isMobile/totalFrames are the real deps
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalFrames, isMobile])

  // Tier 2: preload 60 frames ahead of the current playhead
  useEffect(() => {
    // Frame zero is the idle/LCP state. Do not download a transition buffer
    // until the user has actually started moving to another hero stage.
    const lookAhead = currentFrame === 0 ? 1 : 60
    const end = Math.min(currentFrame + lookAhead, totalFrames)
    for (let i = currentFrame; i < end; i++) loadFrame(i)
    requestDraw.current()
  }, [currentFrame, totalFrames, isMobile])

  // RAF draw loop — only redraws when currentFrame changes
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const observer = new ResizeObserver(([entry]) => {
      canvasSize.current = {
        width: entry.contentRect.width,
        height: entry.contentRect.height,
        dpr: window.devicePixelRatio || 1,
      }
      renderedSignature.current = ''
      requestDraw.current()
    })
    observer.observe(canvas)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let rafId: number | null = null
    let ctx: CanvasRenderingContext2D | null = null

    const draw = () => {
      rafId = null
      const canvas = canvasRef.current
      if (canvas) {
        if (!ctx) ctx = canvas.getContext('2d')
        const { width, height, dpr } = canvasSize.current
        const signature = [
          frameRef.current,
          width,
          height,
          dpr,
          focalXRef.current,
          focalYRef.current,
          zoomRef.current,
        ].join(':')

        if (ctx && signature !== renderedSignature.current) {
          const didDraw = drawFrame(
            canvas,
            ctx,
            cache.current,
            frameRef.current,
            focalXRef.current,
            focalYRef.current,
            zoomRef.current,
            width,
            height,
            dpr,
          )
          if (didDraw) {
            renderedFrame.current = frameRef.current
            renderedSignature.current = signature
          }
        }
      }
    }

    requestDraw.current = () => {
      if (rafId === null) rafId = requestAnimationFrame(draw)
    }
    requestDraw.current()

    return () => {
      requestDraw.current = () => {}
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `url(${coldPoster})`,
        backgroundSize: 'cover',
        backgroundPosition: isMobile ? `${Math.round(focalX * 100)}% ${Math.round(focalY * 100)}%` : 'center',
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  )
}

function drawFrame(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  cache: Map<number, HTMLImageElement>,
  frameIndex: number,
  focalX = 0.5,
  focalY = 0.5,
  zoom = 1.0,
  cssW = 0,
  cssH = 0,
  dpr = 1,
): boolean {
  // Find nearest loaded frame if target frame not yet cached
  let img = cache.get(frameIndex)
  if (!img) {
    // Search backward first (most likely to have been loaded)
    for (let i = frameIndex - 1; i >= 0; i--) {
      const f = cache.get(i)
      if (f) { img = f; break }
    }
  }
  if (!img) {
    // Search forward as secondary fallback
    for (let i = frameIndex + 1; i <= frameIndex + 60; i++) {
      const f = cache.get(i)
      if (f) { img = f; break }
    }
  }
  if (!img) return false

  if (cssW === 0 || cssH === 0) return false

  // Resize canvas pixel buffer only when CSS dimensions change
  if (canvas.width !== Math.round(cssW * dpr) || canvas.height !== Math.round(cssH * dpr)) {
    canvas.width = Math.round(cssW * dpr)
    canvas.height = Math.round(cssH * dpr)
  }

  // Cover scale × zoom, then anchor to focalX/focalY (0=near edge, 0.5=center, 1=far edge)
  const coverScale = Math.max(cssW / img.naturalWidth, cssH / img.naturalHeight)
  const scale = coverScale * zoom
  const drawW = img.naturalWidth * scale
  const drawH = img.naturalHeight * scale
  const drawX = positionForFocalPoint(cssW, drawW, focalX)
  const drawY = positionForFocalPoint(cssH, drawH, focalY)

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  ctx.clearRect(0, 0, cssW, cssH)
  ctx.fillStyle = '#536357'
  ctx.fillRect(0, 0, cssW, cssH)
  ctx.drawImage(img, drawX, drawY, drawW, drawH)
  return true
}

function positionForFocalPoint(viewportSize: number, imageSize: number, focalPoint: number): number {
  if (imageSize <= viewportSize) {
    return (viewportSize - imageSize) / 2
  }

  return Math.max(viewportSize - imageSize, Math.min(0, viewportSize * 0.5 - imageSize * focalPoint))
}
