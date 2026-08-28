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
    role: 'ML Platform Engineer',
    company: 'Wright-Patt Credit Union · Fairborn, OH',
    bullets: [
      'Brought in as the credit union’s founding ML platform engineer to build its first AWS ML platform end to end — SageMaker inference endpoints, an MLflow registry with version-gated promotion and automated rollback, per-environment VPC isolation — cutting deployment failures 85% within the first 60 days.',
      'Defined the data-security architecture for all ML workloads — AES-256 at rest and in transit, least-privilege IAM, full audit logging — and passed two consecutive NCUA audits with zero findings.',
      'Built an internal LLM gateway fronting Claude, OpenAI, and Ollama with evaluation guardrails, cost controls, and RAGAS-based grounding checks, letting application teams ship generative-AI features against approved models with measurably better grounded-answer accuracy than the prior single-model setup.',
      'Codified infrastructure in Terraform and moved deployments to a GitOps workflow on ArgoCD, making environment changes reproducible and peer-reviewed.',
      'Mentored two engineers into ML and platform ownership through weekly architecture and code-review sessions; both now ship production components independently.',
    ],
  },
  {
    period: 'Jul 2024 – Jun 2025',
    current: false,
    etype: 'Contract',
    role: 'Machine Learning Engineer',
    company: 'Day Air Credit Union · Kettering, OH',
    bullets: [
      'As Day Air’s first dedicated ML engineer, built and deployed an XGBoost credit-risk model on SageMaker scoring 500+ consumer-loan applications per day, automating first-pass underwriting while holding approval-rate stability within risk thresholds.',
      'Fine-tuned a BERT classifier on member support tickets and shipped it as a FastAPI microservice — 14 intent categories at sub-200ms p99 latency — routing 10,000+ weekly support requests and sharply reducing misrouting.',
      'Built a retrieval-augmented document-QA system over 500+ internal policy and NCUA regulatory documents with LangChain, vector search, and Claude, cutting compliance research from around two hours to under 20 minutes per query.',
      'Engineered a weekly retraining pipeline in Apache Airflow with rolling-window retrain, holdout evaluation, and promotion gates on AUC, precision, and calibration, replacing a manual multi-hour process each cycle.',
      'Deployed drift monitoring via SageMaker Model Monitor with custom statistical baselines, catching two data-drift events before they reached production credit decisions.',
    ],
  },
  {
    period: 'Jul 2020 – Jun 2023',
    current: false,
    etype: 'Full-time',
    role: 'Senior Data Engineer',
    company: 'Cognizant (Financial Services client) · Hyderabad, India',
    bullets: [
      'Led an Oracle 11g → Amazon Redshift migration for a financial-services client — redesigned the schema for columnar storage with tuned distribution and sort keys and re-platformed 20+ stored procedures as modular Airflow DAGs, cutting average analytical query runtime 60% across a warehouse serving five business units.',
      'Designed 15 production ETL/ELT pipelines in Apache Airflow across Oracle, SQL Server, flat files, and REST APIs with a multi-stage validation layer at every hop; surfaced a silent upstream corruption that had been invalidating three months of downstream financial reports.',
      'Built a real-time Kafka feature pipeline aggregating POS events in five-minute tumbling windows and landing to Redshift at sub-60-second end-to-end latency, supporting a measurable reduction in emergency restocking.',
      'Promoted from Associate to Senior Data Engineer in two years; led code reviews for three engineers and served as primary client contact across two accounts.',
    ],
  },
  {
    period: 'Jan 2019 – Oct 2019',
    current: false,
    etype: 'Internship',
    role: 'Data / Python Intern (2 rotations)',
    company: 'Uber · Hyderabad, India',
    bullets: [
      'Built SQL and Vertica reporting for driver-utilization, trip-completion, and surge-pricing, and standardized fragmented ad-hoc queries into reusable templates.',
      'Automated a 4-hour weekly ETL process into a scheduled job with Python and pandas — including an anomaly-detection script on rolling 7-day baselines — earning a return-internship offer.',
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
