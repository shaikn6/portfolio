import { motion } from 'framer-motion'
import styles from './Hero.module.css'
import LegoAvatar from './LegoAvatar'

const VARIANTS = {
  container: {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  },
  item: {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  },
}

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <motion.div variants={VARIANTS.container} initial="hidden" animate="show">
        <motion.div variants={VARIANTS.item} className={styles.avatarOuter}>
          <div className={styles.avatarWrap}>
            <LegoAvatar />
          </div>
        </motion.div>
        <motion.div variants={VARIANTS.item} className={styles.label}>
          ML Engineer · AI Engineer · Cloud Architect
        </motion.div>
        <motion.h1 variants={VARIANTS.item} className={styles.name}>
          Nagizaaz Shaik
        </motion.h1>
        <motion.p variants={VARIANTS.item} className={styles.role}>
          It doesn't matter where you start. It matters that you build.
        </motion.p>
        <motion.p variants={VARIANTS.item} className={styles.desc}>
          Intern at Uber writing anomaly scripts. Now: production ML for 450K members,
          zero audit findings, five models in deployment, clinical AI shipping FHIR R4 to Epic.
          The journey doesn't stop here.
        </motion.p>
        <motion.div variants={VARIANTS.item} className={styles.targeting}>
          ◈ ML models · AI agents · Cloud infrastructure · Tech &amp; Healthcare
        </motion.div>
        <motion.div variants={VARIANTS.item} className={styles.ctas}>
          <a
            href="https://linkedin.com/in/nagizaazshaik"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnPrimary}
          >
            Connect on LinkedIn
          </a>
          <a
            href="https://github.com/shaikn6"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnSecondary}
          >
            View GitHub
          </a>
          <a
            href="/assets/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnSecondary}
          >
            Resume ↓
          </a>
        </motion.div>
      </motion.div>
      <div className={styles.scrollCue}>
        <span>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  )
}
