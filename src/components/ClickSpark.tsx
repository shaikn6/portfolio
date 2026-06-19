import { useEffect, useRef } from 'react'

/** A small champagne spark burst at the pointer on click. Pure canvas, rAF, cheap. */
export default function ClickSpark() {
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const c = canvas.current!
    const ctx = c.getContext('2d')!
    const resize = () => { c.width = innerWidth; c.height = innerHeight }
    resize()
    window.addEventListener('resize', resize)

    type Spark = { x: number; y: number; a: number; life: number; len: number }
    let sparks: Spark[] = []
    let raf = 0

    const burst = (e: MouseEvent) => {
      const n = 9
      for (let i = 0; i < n; i++) {
        sparks.push({ x: e.clientX, y: e.clientY, a: (i / n) * Math.PI * 2, life: 1, len: 10 + Math.random() * 8 })
      }
    }
    window.addEventListener('click', burst)

    const loop = () => {
      ctx.clearRect(0, 0, c.width, c.height)
      sparks = sparks.filter(s => s.life > 0)
      for (const s of sparks) {
        const d = (1 - s.life) * 26
        const x1 = s.x + Math.cos(s.a) * d
        const y1 = s.y + Math.sin(s.a) * d
        const x2 = x1 + Math.cos(s.a) * s.len * s.life
        const y2 = y1 + Math.sin(s.a) * s.len * s.life
        ctx.strokeStyle = `rgba(200, 176, 138, ${s.life})`
        ctx.lineWidth = 1.5
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke()
        s.life -= 0.045
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('click', burst)
    }
  }, [])

  return <canvas ref={canvas} aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 9998, pointerEvents: 'none' }} />
}
