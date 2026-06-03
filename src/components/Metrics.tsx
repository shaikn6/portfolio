import ScrollReveal from './ScrollReveal'
import styles from './Metrics.module.css'

const METRICS = [
  { num: '30+',  lbl: 'Public Repos' },
  { num: '5',    lbl: 'Years Experience' },
  { num: '6.7K', lbl: 'Contributions' },
  { num: '5',    lbl: 'Certifications' },
]

export default function Metrics() {
  return (
    <div className={styles.outer}>
      <div className={styles.row}>
        {METRICS.map(({ num, lbl }, i) => (
          <ScrollReveal key={lbl} delay={i * 0.07}>
            <div className={styles.metric}>
              <div className={styles.num}>{num}</div>
              <div className={styles.lbl}>{lbl}</div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}
