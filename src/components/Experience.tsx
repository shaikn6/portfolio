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

// Results lead each line. Employers and locations are left out on purpose.
const EXPERIENCE = [
  {
    period: 'Aug 2026 – Present',
    current: true,
    etype: 'Research',
    role: 'Doctoral Researcher, Applied AI',
    company: 'Belhaven University',
    bullets: [
      'Reported a sandbox bypass in an AI-agent code executor through a GitHub security advisory; a downstream project, femto/minion, adopted the fix and credited the report (working paper “When Vendoring Defeats the Patch”).',
      'Released guard-gap-detector, a read-only static checker with a synthetic corpus, so the finding can be reproduced without third-party code or an exploit.',
      'A planted label pushes a LoRA-tuned financial model to the attacker’s label on up to 92% of items across five markets, and a 0.8 confidence gate misses 12–51% of one attack’s flips (working paper “Fragile in Different Ways”).',
    ],
  },
  {
    period: 'Jul 2025 – Jun 2026',
    current: false,
    etype: 'Contract',
    role: 'ML Platform Engineer',
    company: 'Regulated credit union',
    bullets: [
      'Deployment failures down 85% in 60 days: founded the AWS ML platform (SageMaker endpoints and Pipelines, MLflow registry with gated promotion and automated rollback, per-environment VPC isolation).',
      'One governed path for the IT team to ship GenAI features: built the internal GenAI gateway (Claude, OpenAI, Ollama) with evaluation guardrails, cost controls and RAGAS grounding checks.',
      'Two regulatory audits passed with zero findings: owned ML data security (AES-256 at rest and in transit, least-privilege IAM, audit logging), with the infrastructure in Terraform and GitOps on ArgoCD.',
      'Mentored engineers into ML and platform ownership through weekly architecture and code reviews.',
    ],
  },
  {
    period: 'Jul 2024 – Jun 2025',
    current: false,
    etype: 'Contract',
    role: 'Machine Learning Engineer',
    company: 'Regulated credit union',
    bullets: [
      'Policy research cut from about two hours to under 20 minutes per question: built a RAG system over 500+ internal policy and regulatory documents (LangChain, vector search, Claude).',
      'Sub-200 ms p99: fine-tuned a 14-class BERT intent classifier that fixed support-request misrouting, served on FastAPI.',
      'Approval rates kept within risk thresholds: built the first-pass consumer-loan underwriting model (XGBoost on SageMaker) as the first dedicated ML engineer.',
      'Weekly automated retraining replaced a manual multi-hour cycle: an Airflow pipeline with rolling-window retraining, holdout evaluation and AUC / precision / calibration promotion gates.',
      'Data drift caught before it reached credit decisions: SageMaker Model Monitor with custom baselines.',
    ],
  },
  {
    period: 'Jul 2020 – Jun 2023',
    current: false,
    etype: 'Full-time',
    role: 'Senior Data Engineer',
    company: 'IT services firm (financial-services client)',
    bullets: [
      'Query runtime down 60%: led an Oracle 11g to Amazon Redshift migration, rebuilding stored procedures as Airflow DAGs.',
      'A silent upstream corruption in financial reports caught: built production ETL/ELT pipelines with multi-stage validation; promoted from Associate to Senior.',
    ],
  },
  {
    period: 'Jan 2019 – Oct 2019',
    current: false,
    etype: 'Internship',
    role: 'Python Intern',
    company: 'Technology company',
    bullets: [
      'A weekly manual ETL job automated with Python and pandas, with rolling-baseline anomaly detection; earned a return-internship offer.',
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
