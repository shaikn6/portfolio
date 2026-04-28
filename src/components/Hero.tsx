import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Hero.module.css'
import LegoAvatar from './LegoAvatar'

const ROLES = ['an ML Engineer', 'an AI Engineer', 'a Cloud Architect'] as const
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
    const id = setInterval(() => setIndex(prev => (prev + 1) % ROLES.length), 2400)
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

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <motion.div className={styles.textCol} variants={TEXT_VARIANTS.container} initial="hidden" animate="show">
        <motion.h1 variants={TEXT_VARIANTS.item} className={styles.name}>
          Nagizaaz<br />Shaik
        </motion.h1>
        <motion.div variants={TEXT_VARIANTS.item} className={styles.kinetic}>
          <span className={styles.kineticPrefix}>I am&nbsp;</span>
          <RotatingRole />
        </motion.div>
        <motion.p variants={TEXT_VARIANTS.item} className={styles.desc}>
          From intern writing anomaly scripts at Uber — now production ML serving
          450K members, clinical AI shipping FHIR R4 to Epic, five models in deployment.
        </motion.p>
        <motion.div variants={TEXT_VARIANTS.item} className={styles.ctas}>
          <a href="https://linkedin.com/in/nagizaazshaik" target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>Connect on LinkedIn</a>
          <a href="https://github.com/shaikn6" target="_blank" rel="noopener noreferrer" className={styles.btnSecondary}>View GitHub</a>
          <a href="/assets/resume.pdf" target="_blank" rel="noopener noreferrer" className={`${styles.btnSecondary} ${styles.resumeBtn}`}>Resume ↓</a>
        </motion.div>
        <motion.div variants={TEXT_VARIANTS.item} className={styles.targeting}>
          ◈ ML models · AI agents · Cloud infrastructure · Healthcare tech
        </motion.div>
      </motion.div>

      <div className={styles.avatarCol}>
        <div className={styles.glowGround} />
        <motion.div className={styles.avatarWrap} initial={{ opacity: 0, y: 50, scale: 0.88 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1.5, ease: EASE, delay: 0.15 }}>
          <LegoAvatar />
        </motion.div>
      </div>

      <div className={styles.scrollCue} aria-hidden="true">
        <span>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  )
}
