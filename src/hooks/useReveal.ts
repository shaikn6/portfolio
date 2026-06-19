import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Cinematic scroll choreography (GSAP + ScrollTrigger):
 *  - .reveal        → slow fade + rise as it enters
 *  - [data-parallax]→ subtle depth drift tied to scroll
 *  - [data-grow]    → image/element scales up on scroll (Samana-style expansion)
 */
export function useReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set('.reveal', { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      // staggered reveals
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })

      // parallax depth
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        const depth = parseFloat(el.dataset.parallax || '0.2')
        gsap.to(el, {
          yPercent: -depth * 100,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })

      // scroll-driven scale (image expansion)
      gsap.utils.toArray<HTMLElement>('[data-grow]').forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0.86, opacity: 0.6 },
          {
            scale: 1, opacity: 1, ease: 'none',
            scrollTrigger: { trigger: el, start: 'top 92%', end: 'top 40%', scrub: true },
          },
        )
      })
    })

    const id = setTimeout(() => ScrollTrigger.refresh(), 300)
    return () => { clearTimeout(id); ctx.revert() }
  }, [])
}
