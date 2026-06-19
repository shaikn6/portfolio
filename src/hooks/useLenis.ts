import { useEffect } from 'react'

/**
 * Buttery inertial smooth scroll (Lenis), dynamically imported after first
 * paint so it stays out of the critical bundle. Respects prefers-reduced-motion.
 */
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let destroy: (() => void) | undefined
    let cancelled = false

    ;(async () => {
      const { default: Lenis } = await import('lenis')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      if (cancelled) return

      const lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.6,
      })
      lenis.on('scroll', ScrollTrigger.update)

      let raf = 0
      const loop = (time: number) => { lenis.raf(time); raf = requestAnimationFrame(loop) }
      raf = requestAnimationFrame(loop)

      const onClick = (e: MouseEvent) => {
        const a = (e.target as HTMLElement)?.closest('a[href^="#"]') as HTMLAnchorElement | null
        const id = a?.getAttribute('href')
        if (id && id.length > 1) { e.preventDefault(); lenis.scrollTo(id, { offset: -80 }) }
      }
      document.addEventListener('click', onClick)

      destroy = () => {
        cancelAnimationFrame(raf)
        document.removeEventListener('click', onClick)
        lenis.destroy()
      }
    })()

    return () => { cancelled = true; destroy?.() }
  }, [])
}
