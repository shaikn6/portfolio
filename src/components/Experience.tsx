import ScrollReveal from './ScrollReveal'
import styles from './Experience.module.css'

const EXPERIENCE = [
  {
    period: 'Jul 2024 – Jun 2026',
    current: true,
    role: 'Cloud Architect',
    company: 'Wright-Patt Credit Union · Fairborn, OH',
    bullets: [
      'Designed and owned the full ML platform on AWS — 5 production SageMaker endpoints, MLflow model registry with version-gated promotion. Deployment failures reduced 85% in 60 days.',
      'Built SageMaker Model Monitor with custom statistical baselines — caught 2 critical model degradation events before accuracy dropped in production credit decisions.',
      'Deployed XGBoost underwriting model processing 500+ automated loan decisions/day. Cut manual analyst review queue 30%.',
      'Fine-tuned BERT on internal ticket data as a FastAPI microservice — sub-200ms p99, 40% reduction in misrouting across 10K+ weekly requests.',
      'Passed 2 consecutive NCUA audits with zero findings on $400M in member financial data — AES-256, IAM least privilege, CloudTrail on all inference calls.',
    ],
  },
  {
    period: 'Jul 2020 – Jun 2023',
    current: false,
    role: 'Data Engineer',
    company: 'Cognizant · Hyderabad, India',
    bullets: [
      'Led Oracle 11g → Amazon Redshift migration — redesigned schema for columnar storage, rewrote 20+ stored procedures as Airflow DAGs. Query runtime improved 60% on 25GB+ warehouse.',
      'Designed 15 production ETL/ELT pipelines in Airflow across Oracle, SQL Server, flat files, and REST APIs — surfaced a silent corruption issue invalidating 3 months of downstream financial reports.',
      'Built real-time Kafka feature pipeline for retail demand forecasting — POS events in 5-min tumbling window, end-to-end latency under 60s, contributed to 28% reduction in emergency restocking.',
      'Promoted to tech lead in 2 years — code reviews for 3 engineers, 100% on-time delivery on 2 client accounts.',
    ],
  },
  {
    period: 'Jan 2019 – Mar 2019',
    current: false,
    role: 'SQL / Data Intern',
    company: 'Uber · Hyderabad, India',
    bullets: [
      'Return engagement on the same city ops team — built SQL queries and Vertica views for weekly driver utilisation, trip completion, and surge pricing reporting across Hyderabad.',
      'Consolidated fragmented ad-hoc queries into standardised templates, cutting analyst prep time for the weekly ops review from 3 hours to under 45 minutes.',
    ],
  },
  {
    period: 'Aug 2018 – Oct 2018',
    current: false,
    role: 'Python Intern',
    company: 'Uber · Hyderabad, India',
    bullets: [
      'Automated extraction and transformation of operational event data using Python and pandas — converted a 4-hour manual weekly process into a scheduled job producing clean summary tables for city ops.',
      'Built an anomaly detection script flagging unusual trip counts and revenue figures against rolling 7-day baselines before data entered the reporting pipeline.',
      'Secured a return internship offer by approaching the manager directly at the end of the engagement.',
    ],
  },
]

export default function Experience() {
  return (
    <section id="experience" className={styles.section}>
      <div className={styles.wrap}>
        <ScrollReveal><div className={styles.sectionTag}>Experience</div></ScrollReveal>
        <ScrollReveal delay={0.05}><h2 className={styles.sectionH}>Where I've shipped.</h2></ScrollReveal>

        <div className={styles.timeline}>
          {EXPERIENCE.map((exp, i) => (
            <ScrollReveal key={exp.company} delay={i * 0.07}>
              <div className={styles.item}>
                <div className={styles.period}>
                  {exp.period}
                  {exp.current && (
                    <>
                      <br />
                      <span className={styles.current}>Current</span>
                    </>
                  )}
                </div>
                <div>
                  <div className={styles.role}>{exp.role}</div>
                  <div className={styles.company}>{exp.company}</div>
                  <ul className={styles.bullets}>
                    {exp.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
