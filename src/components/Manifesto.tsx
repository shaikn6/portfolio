import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import styles from './Manifesto.module.css'

const LINE =
  'I turn financial-services problems into shipped AI systems — credit-risk models, multi-agent pipelines, and secure ML platforms that pass the audit.'

const WORDS = LINE.split(' ')

function Word({ children, range, progress }: { children: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.12, 1])
  const y = useTransform(progress, range, [8, 0])
  return (
    <motion.span className={styles.word} style={{ opacity, y }}>
      {children}&nbsp;
    </motion.span>
  )
}

export default function Manifesto() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.15'],
  })

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.sticky}>
        <p className={styles.eyebrow}>What I do</p>
        <h2 className={styles.line}>
          {WORDS.map((w, i) => {
            const start = i / WORDS.length
            const end = start + 1 / WORDS.length
            return (
              <Word key={i} range={[start, end]} progress={scrollYProgress}>
                {w}
              </Word>
            )
          })}
        </h2>
      </div>
    </section>
  )
}
