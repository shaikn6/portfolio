import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Hero.module.css'

const ROLES = ['LLM systems', 'AI agents', 'ML platforms'] as const
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

const TEXT_VARIANTS = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.09 } } },
  item: {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
  },
}

function RotatingRole() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIndex(prev => (prev + 1) % ROLES.length), 2600)
    return () => clearInterval(id)
  }, [])
  return (
    <span className={styles.rotator} aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.span
          key={ROLES[index]}
          className={styles.rotWord}
          initial={{ opacity: 0, y: '0.55em', filter: 'blur(7px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: '-0.55em', filter: 'blur(7px)' }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

const STATS = [
  { v: 'AWS ML', l: 'Specialty certified' },
  { v: '$400M', l: 'member data secured' },
  { v: '12', l: 'open-source AI projects' },
  { v: '5+ yrs', l: 'ML · data · cloud' },
]

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <motion.div className={styles.textCol} variants={TEXT_VARIANTS.container} initial="hidden" animate="show">
        <motion.div variants={TEXT_VARIANTS.item} className={styles.eyebrow}>
          AI / LLM Engineer · Fintech
        </motion.div>
        <motion.h1 variants={TEXT_VARIANTS.item} className={styles.name}>
          Nagizaaz<br />Shaik
        </motion.h1>
        <motion.div variants={TEXT_VARIANTS.item} className={styles.kinetic}>
          I build&nbsp;<RotatingRole />
        </motion.div>
        <motion.p variants={TEXT_VARIANTS.item} className={styles.desc}>
          Production LLM systems, multi-agent pipelines, and the secure MLOps platforms
          that ship them — built for financial services. From data engineering to ML and
          cloud architecture, now focused on applied AI.
        </motion.p>
        <motion.div variants={TEXT_VARIANTS.item} className={styles.ctas}>
          <a href="/assets/resume.pdf" target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>Download Résumé</a>
          <a href="#projects" className={styles.btnSecondary}>View Work</a>
          <a href="https://github.com/shaikn6" target="_blank" rel="noopener noreferrer" className={styles.btnGhost}>GitHub ↗</a>
        </motion.div>
      </motion.div>

      <motion.aside
        className={`${styles.snapshot} glass`}
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.25 }}
      >
        <div className={styles.snapTop}>
          <div className={styles.mark}>NS</div>
          <div>
            <div className={styles.snapRole}>Cloud Architect</div>
            <div className={styles.snapCo}>Wright-Patt Credit Union · OH</div>
          </div>
          <div className={styles.statusDot} title="Open to AI/LLM roles" />
        </div>
        <div className={styles.snapDivider} />
        <ul className={styles.snapStats}>
          {STATS.map(s => (
            <li key={s.l}>
              <span className={styles.statV}>{s.v}</span>
              <span className={styles.statL}>{s.l}</span>
            </li>
          ))}
        </ul>
        <div className={styles.snapFoot}>● Open to AI / LLM Engineer roles in fintech</div>
      </motion.aside>

      <div className={styles.scrollCue} aria-hidden="true">
        <span>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  )
}
