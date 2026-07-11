import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import styles from './Hero.module.css'
import { useMagnetic } from '../hooks/useMagnetic'
import SafeBoundary from './SafeBoundary'

const Scene3D = lazy(() => import('./Scene3D'))
const ROLES = ['LLM systems', 'AI agents', 'ML platforms'] as const

function RotatingRole() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIndex(p => (p + 1) % ROLES.length), 2800)
    return () => clearInterval(id)
  }, [])
  return (
    <span className={styles.rotator} aria-live="polite">
      {/* key change remounts the span → CSS wordIn animation re-runs */}
      <span key={index} className={styles.rotWord}>{ROLES[index]}</span>
    </span>
  )
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  const m1 = useMagnetic<HTMLAnchorElement>(0.4)
  const m2 = useMagnetic<HTMLAnchorElement>(0.4)
  const m3 = useMagnetic<HTMLAnchorElement>(0.4)

  // Defer the 3D until idle — keeps three.js off the critical path.
  const [show3D, setShow3D] = useState(false)
  useEffect(() => {
    const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback
    if (typeof ric === 'function') {
      const id = ric(() => setShow3D(true), { timeout: 2500 })
      return () => (window as unknown as { cancelIdleCallback?: (h: number) => void }).cancelIdleCallback?.(id)
    }
    const id = window.setTimeout(() => setShow3D(true), 1500)
    return () => clearTimeout(id)
  }, [])

  // Lightweight scroll-fade (replaces framer useScroll) — rAF-throttled, passive.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const update = () => {
      const sec = ref.current, inner = innerRef.current
      if (!sec || !inner) return
      const p = Math.min(1, Math.max(0, -sec.getBoundingClientRect().top / window.innerHeight))
      inner.style.opacity = String(1 - Math.min(1, p / 0.8))
      inner.style.transform = `translateY(${p * 140}px)`
    }
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [])

  return (
    <section id="hero" ref={ref} className={styles.hero}>
      <div className={styles.scene} aria-hidden="true">
        {show3D && (
          <SafeBoundary>
            <Suspense fallback={null}>
              <Scene3D />
            </Suspense>
          </SafeBoundary>
        )}
      </div>

      <div className={styles.inner} ref={innerRef}>
        <p className={`${styles.eyebrow} ${styles.up}`} style={{ animationDelay: '0.05s' }}>
          AI / LLM Engineer — Fintech
        </p>

        <h1 className={styles.name}>
          <span className={`${styles.line} ${styles.rise}`} style={{ animationDelay: '0.08s' }}>Nagizaaz</span>
          <span className={`${styles.line} ${styles.rise}`} style={{ animationDelay: '0.16s' }}>Shaik</span>
        </h1>

        <div className={`${styles.kinetic} ${styles.up}`} style={{ animationDelay: '0.34s' }}>
          <span className={styles.kineticPrefix}>I build</span>&nbsp;<RotatingRole />
        </div>

        <p className={`${styles.desc} ${styles.up}`} style={{ animationDelay: '0.46s' }}>
          Production AI for financial services — credit-risk models, multi-agent
          pipelines, and the secure ML platforms that ship them. I don't just write
          code; I build systems that pass the audit.
        </p>

        <p className={`${styles.openBadge} ${styles.up}`} style={{ animationDelay: '0.52s' }}>
          <span className={styles.openDot} aria-hidden="true" />
          Open to full-time roles &amp; AI research internships — DBA (Applied AI) in progress
        </p>

        <div className={`${styles.ctas} ${styles.up}`} style={{ animationDelay: '0.6s' }}>
          <a ref={m1} href="mailto:nagizaazs@gmail.com?subject=R%C3%A9sum%C3%A9%20request" className={styles.cta}>
            <span>Résumé on request</span><span className={styles.arrow}>→</span>
          </a>
          <a ref={m2} href="#projects" className={styles.cta}>
            <span>Selected work</span><span className={styles.arrow}>→</span>
          </a>
          <a ref={m3} href="https://github.com/shaikn6" target="_blank" rel="noopener noreferrer" className={styles.cta}>
            <span>GitHub</span><span className={styles.arrow}>↗</span>
          </a>
        </div>
      </div>

      <div className={styles.scrollCue} aria-hidden="true">
        <span>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  )
}
