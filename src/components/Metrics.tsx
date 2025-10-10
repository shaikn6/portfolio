import ScrollReveal from './ScrollReveal'
import styles from './Metrics.module.css'

const METRICS = [
  { num: '16', lbl: 'GitHub Repos' },
  { num: '4+', lbl: 'Years Experience' },
  { num: '6',  lbl: 'Public Projects' },
  { num: '5',  lbl: 'Cloud Certifications' },
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
