import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import styles from './Hero.module.css'

const ROLES = ['LLM systems', 'AI agents', 'ML platforms'] as const
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

function RotatingRole() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIndex(p => (p + 1) % ROLES.length), 2800)
    return () => clearInterval(id)
  }, [])
  return (
    <span className={styles.rotator} aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.span
          key={ROLES[index]}
          className={styles.rotWord}
          initial={{ opacity: 0, y: '0.5em' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-0.5em' }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 160])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const reveal = {
    hidden: { opacity: 0, y: 40 },
    show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 1, ease: EASE, delay: 0.15 + i * 0.12 } }),
  }

  return (
    <section id="hero" ref={ref} className={styles.hero}>
      <motion.div className={styles.inner} style={{ y, opacity }}>
        <motion.p custom={0} variants={reveal} initial="hidden" animate="show" className={styles.eyebrow}>
          AI / LLM Engineer — Fintech
        </motion.p>

        <h1 className={styles.name}>
          <motion.span custom={1} variants={reveal} initial="hidden" animate="show" className={styles.line}>Nagizaaz</motion.span>
          <motion.span custom={2} variants={reveal} initial="hidden" animate="show" className={styles.line}>Shaik</motion.span>
        </h1>

        <motion.div custom={3} variants={reveal} initial="hidden" animate="show" className={styles.kinetic}>
          <span className={styles.kineticPrefix}>I build</span>&nbsp;<RotatingRole />
        </motion.div>

        <motion.p custom={4} variants={reveal} initial="hidden" animate="show" className={styles.desc}>
          Production AI for financial services — credit-risk models, multi-agent
          pipelines, and the secure ML platforms that ship them. I don't just write
          code; I build systems that pass the audit.
        </motion.p>

        <motion.div custom={5} variants={reveal} initial="hidden" animate="show" className={styles.ctas}>
          <a href="/assets/resume.pdf" target="_blank" rel="noopener noreferrer" className={styles.cta}>
            <span>Résumé</span><span className={styles.arrow}>→</span>
          </a>
          <a href="#projects" className={styles.cta}>
            <span>Selected work</span><span className={styles.arrow}>→</span>
          </a>
          <a href="https://github.com/shaikn6" target="_blank" rel="noopener noreferrer" className={styles.cta}>
            <span>GitHub</span><span className={styles.arrow}>↗</span>
          </a>
        </motion.div>
      </motion.div>

      <div className={styles.scrollCue} aria-hidden="true">
        <span>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  )
}
