import { motion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'
import styles from './Experience.module.css'

const bulletList = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}

const bulletItem = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

const EXPERIENCE = [
  {
    period: 'Jul 2025 – Jun 2026',
    current: false,
    etype: 'Contract',
    role: 'AI/ML Platform Architect',
    company: 'Wright-Patt Credit Union · Fairborn, OH',
    bullets: [
      'Designed the AWS ML platform end to end — SageMaker inference endpoints, MLflow registry with version-gated promotion and automated rollback, per-environment VPC isolation. Deployment failures cut 85% in 60 days.',
      'Defined the data-security architecture for all ML workloads — AES-256 at rest and in transit, CloudTrail on every inference call, least-privilege IAM — passing two NCUA audits with zero findings on $400M in member data.',
      'Codified infrastructure in Terraform and moved deployments to a GitOps workflow (ArgoCD) for reproducible, peer-reviewed environment changes.',
      'Introduced an internal LLM gateway with evaluation guardrails so app teams could ship generative-AI features against approved models with cost controls and audit logging — RAGAS-based evaluation showed a 22% lift in grounded-answer accuracy over the prior single-model baseline.',
      'Mentored two engineers into ML and platform ownership; both now ship production components independently.',
    ],
  },
  {
    period: 'Jul 2024 – Jun 2025',
    current: false,
    etype: 'Contract',
    role: 'ML Engineer',
    company: 'Day Air Credit Union · Kettering, OH',
    bullets: [
      'Built and deployed an XGBoost credit-risk model on SageMaker scoring 500+ consumer-loan applications/day — automated first-pass underwriting, cut manual review 30% while holding approval-rate stability.',
      'Fine-tuned a BERT classifier on member support tickets as a FastAPI microservice — 14 intents, sub-200ms p99, routing 10K+ weekly requests with a 40% drop in misrouting.',
      'Engineered an automated retraining pipeline in Airflow — rolling-window retrain, holdout-gated promotion on AUC/precision/calibration — replacing 8+ hrs manual work/week.',
      'Stood up model monitoring (SageMaker Model Monitor + custom baselines), catching two drift events before they affected production credit decisions.',
      'Built a RAG document-QA assistant over 500+ policy and NCUA docs (LangChain + vector search, Claude 3.5) — compliance research cut from 2 hrs to under 20 min/query.',
    ],
  },
  {
    period: 'Jul 2020 – Jun 2023',
    current: false,
    etype: 'Full-time',
    role: 'Senior Data Engineer',
    company: 'Cognizant · Hyderabad, India',
    bullets: [
      'Led an Oracle 11g → Amazon Redshift migration for a financial-services client — columnar schema with tuned distribution/sort keys, 20+ stored procedures re-platformed as Airflow DAGs. Query runtime improved 60% on a 25 GB+ warehouse.',
      'Designed 15 production ETL/ELT pipelines in Airflow across Oracle, SQL Server, flat files, and REST APIs — surfaced a silent corruption invalidating 3 months of downstream financial reports.',
      'Built a real-time Kafka feature pipeline — POS events in 5-min tumbling windows landed to Redshift at sub-60s latency, contributing to a 28% cut in emergency restocking.',
      'Promoted from Associate to Senior Data Engineer in two years — code reviews for 3 engineers, primary client contact on 2 accounts, 100% on-time delivery.',
    ],
  },
  {
    period: 'Aug 2019 – Oct 2019',
    current: false,
    etype: 'Internship',
    role: 'SQL / Data Intern',
    company: 'Uber · Hyderabad, India',
    bullets: [
      'Returned to the city-ops team — built SQL queries and Vertica views powering weekly driver-utilisation, trip-completion, and surge-pricing reporting.',
      'Standardised fragmented ad-hoc queries into reusable templates, cutting weekly ops-review prep from 3 hours to under 45 minutes.',
    ],
  },
  {
    period: 'Jan 2019 – Mar 2019',
    current: false,
    etype: 'Internship',
    role: 'Python Intern',
    company: 'Uber · Hyderabad, India',
    bullets: [
      'Automated extraction and transformation of operational event data with Python and pandas — turned a 4-hour manual weekly process into a scheduled job producing clean summary tables for city ops.',
      'Built an anomaly-detection script flagging unusual trip counts and revenue against rolling 7-day baselines before data entered the reporting pipeline; earned a return offer.',
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
          <div className={styles.timelineLine} aria-hidden="true" />
          {EXPERIENCE.map((exp, i) => (
            <ScrollReveal key={`${exp.company}-${exp.period}`} delay={i * 0.07}>
              <div className={`${styles.item} ${!exp.current ? styles.past : ''}`}>
                <span className={`${styles.dot} ${exp.current ? styles.dotCurrent : ''}`} aria-hidden="true" />
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
                  <div className={styles.role}>{exp.role} <span className={styles.etype}>· {exp.etype}</span></div>
                  <div className={styles.company}>{exp.company}</div>
                  <motion.ul
                    className={styles.bullets}
                    variants={bulletList}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '0px 0px -80px 0px' }}
                  >
                    {exp.bullets.map((b) => <motion.li key={b} variants={bulletItem}>{b}</motion.li>)}
                  </motion.ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
