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
    period: 'Aug 2026 – Present',
    current: true,
    etype: 'Research',
    role: 'Doctoral Researcher, Applied AI',
    company: 'Belhaven University · Jackson, MS',
    bullets: [
      'Traced a sandbox bypass in an AI-agent code interpreter into 25 open-source projects that copied the code (23 still unpatched); reporter credit on GHSA-m5v3-6ccr-cfgx (working paper “When Vendoring Defeats the Patch”).',
      'Showed that a planted label flips up to 92% of a LoRA-tuned financial model’s predictions across five markets, and that a standard confidence gate misses about half (working paper “Fragile in Different Ways”).',
    ],
  },
  {
    period: 'Jul 2025 – Jun 2026',
    current: false,
    etype: 'Contract',
    role: 'ML Platform Engineer',
    company: 'Wright-Patt Credit Union ($9B assets) · Fairborn, OH',
    bullets: [
      'Built an internal LLM gateway over Claude, OpenAI, and Ollama with evaluation guardrails, cost controls, and RAGAS grounding checks, giving the 12–15-person IT team one approved path to ship generative-AI features.',
      'Built the credit union’s first AWS ML platform as its founding ML platform engineer (SageMaker endpoints, MLflow registry with gated promotion and automated rollback, VPC isolation), cutting deployment failures 85% in 60 days.',
      'Designed security for all ML workloads (AES-256 at rest and in transit, least-privilege IAM, audit logging) and passed two consecutive NCUA audits with zero findings; codified infrastructure in Terraform with ArgoCD GitOps.',
      'Mentored two engineers into ML and platform ownership; both now ship production components independently.',
    ],
  },
  {
    period: 'Jul 2024 – Jun 2025',
    current: false,
    etype: 'Contract',
    role: 'Machine Learning Engineer',
    company: 'Day Air Credit Union ($830M assets) · Kettering, OH',
    bullets: [
      'Built RAG document QA over 500+ internal policy and NCUA regulatory documents (LangChain, vector search, Claude), cutting compliance research from about two hours to under 20 minutes per query.',
      'Fine-tuned a BERT intent classifier (14 classes) and served it with FastAPI at sub-200 ms p99, routing 10,000+ tickets weekly.',
      'Shipped an XGBoost credit-risk model on SageMaker scoring 500+ loan applications a day, with weekly Airflow retraining gated on AUC, precision, and calibration, and drift monitoring that caught two drift events before they reached credit decisions.',
    ],
  },
  {
    period: 'Jul 2020 – Jun 2023',
    current: false,
    etype: 'Full-time',
    role: 'Senior Data Engineer',
    company: 'Cognizant (Financial Services client) · Hyderabad, India',
    bullets: [
      'Led an Oracle → Redshift migration, rebuilding 20+ stored procedures as Airflow DAGs and cutting query runtime 60%.',
      'Built 15 production ETL/ELT pipelines with multi-stage validation that surfaced a silent upstream corruption affecting three months of financial reports; promoted from Associate to Senior in two years.',
    ],
  },
  {
    period: 'Jan 2019 – Oct 2019',
    current: false,
    etype: 'Internship',
    role: 'Data / Python Intern',
    company: 'Uber · Hyderabad, India',
    bullets: [
      'Automated a 4-hour weekly ETL job with Python and pandas, with rolling-baseline anomaly detection; earned a return-internship offer.',
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
