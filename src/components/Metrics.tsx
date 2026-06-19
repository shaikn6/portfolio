import styles from './Metrics.module.css'

const METRICS = [
  { num: '12',   lbl: 'Open-Source Projects' },
  { num: '5+',   lbl: 'Years Experience' },
  { num: '$400M', lbl: 'Member Data Secured' },
  { num: '5',    lbl: 'Cloud / ML Certifications' },
]

export default function Metrics() {
  return (
    <div className={styles.outer}>
      <div className={styles.row}>
        {METRICS.map(({ num, lbl }, i) => (
          <div className={styles.metric} key={lbl} data-converge={i}>
            <div className={styles.num}>{num}</div>
            <div className={styles.lbl}>{lbl}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
