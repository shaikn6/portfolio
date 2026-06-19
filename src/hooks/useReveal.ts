import { useEffect } from 'react'

/**
 * Cinematic scroll choreography (GSAP + ScrollTrigger), dynamically imported
 * after first paint so GSAP stays out of the critical bundle.
 *  - .reveal         → slow fade + rise on enter
 *  - [data-parallax] → depth drift tied to scroll
 *  - [data-grow]     → scale-up on scroll
 *  - [data-converge] → scattered elements fly into alignment
 */
export function useReveal() {
  useEffect(() => {
    let cleanup: (() => void) | undefined
    let cancelled = false

    ;(async () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)

      if (reduce) {
        gsap.set('.reveal', { opacity: 1, y: 0 })
        return
      }

      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
          gsap.to(el, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
        })
        gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
          const depth = parseFloat(el.dataset.parallax || '0.2')
          gsap.to(el, { yPercent: -depth * 100, ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } })
        })
        gsap.utils.toArray<HTMLElement>('[data-converge]').forEach((el) => {
          const i = parseInt(el.dataset.converge || '0')
          const dirX = (i % 2 === 0 ? -1 : 1) * (90 + i * 28)
          const dirY = (i < 2 ? -1 : 1) * 50
          gsap.fromTo(el, { x: dirX, y: dirY, opacity: 0, rotate: i % 2 === 0 ? -5 : 5 },
            { x: 0, y: 0, opacity: 1, rotate: 0, ease: 'power3.out', duration: 1.1,
              scrollTrigger: { trigger: el.parentElement, start: 'top 80%', once: true } })
        })
        gsap.utils.toArray<HTMLElement>('[data-grow]').forEach((el) => {
          gsap.fromTo(el, { scale: 0.86, opacity: 0.6 },
            { scale: 1, opacity: 1, ease: 'none',
              scrollTrigger: { trigger: el, start: 'top 92%', end: 'top 40%', scrub: true } })
        })
      })

      const id = setTimeout(() => ScrollTrigger.refresh(), 400)
      cleanup = () => { clearTimeout(id); ctx.revert() }
    })()

    return () => { cancelled = true; cleanup?.() }
  }, [])
}
