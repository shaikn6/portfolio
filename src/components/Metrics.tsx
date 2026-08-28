import styles from './Metrics.module.css'

const METRICS = [
  {
    num: '10+', lbl: 'Public AI / Fintech Repos',
    icon: (
      <path d="M9 6 4 12l5 6M15 6l5 6-5 6" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    num: '5+', lbl: 'Years Experience',
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 7v5l3.5 2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    num: '0', lbl: 'NCUA Audit Findings (2 audits)',
    icon: (
      <path d="M12 3 4.5 6v6c0 4.5 3.2 7.8 7.5 9 4.3-1.2 7.5-4.5 7.5-9V6L12 3Z M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    num: '5', lbl: 'Cloud / ML Certifications',
    icon: (
      <>
        <circle cx="12" cy="9" r="5" />
        <path d="M9 13.5 7.5 21 12 18.5 16.5 21 15 13.5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
]

export default function Metrics() {
  return (
    <div className={styles.outer}>
      <div className={styles.row}>
        {METRICS.map(({ num, lbl, icon }, i) => (
          <div className={styles.metric} key={lbl} data-converge={i}>
            <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
            <svg className={styles.icon} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
              {icon}
            </svg>
            <div className={styles.num}>{num}</div>
            <div className={styles.lbl}>{lbl}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
