import { useRef, useCallback } from 'react'
import ScrollReveal from './ScrollReveal'
import styles from './Projects.module.css'

interface Project {
  href: string
  domain: string
  domainClass: string
  name: string
  desc: string
  pills: string[]
  stat: string
}

const PROJECTS: Project[] = [
  {
    href: 'https://github.com/shaikn6/agentic-pipeline-healer',
    domain: 'AI Agents', domainClass: styles.dAgents,
    name: 'Agentic Pipeline Healer',
    desc: 'LangGraph multi-DAG orchestrator that monitors Airflow pipelines, classifies failures, generates AST-level code fixes, and dispatches Slack Block Kit alerts with a full SQLite audit log.',
    pills: ['LangGraph', 'Airflow', 'AST', 'FastAPI'],
    stat: 'CI passing',
  },
  {
    href: 'https://github.com/shaikn6/chexpert-pathology-classifier',
    domain: 'Computer Vision', domainClass: styles.dCv,
    name: 'CheXpert Pathology Classifier',
    desc: 'DenseNet121 + EfficientNet-B4 ensemble on the CheXpert 14-label benchmark. MC Dropout uncertainty, Grad-CAM + ScoreCAM explainability, DICOM pipeline, and clinical PDF report generator.',
    pills: ['PyTorch', 'DenseNet121', 'Grad-CAM', 'pydicom'],
    stat: '92% AUC',
  },
  {
    href: 'https://github.com/shaikn6/llm-safety-auditor',
    domain: 'LLM Safety', domainClass: styles.dSafety,
    name: 'LLM Safety Auditor',
    desc: 'Automated red-teaming framework generating 250+ adversarial attacks across 6 mutation strategies. Scores against OWASP LLM Top 10 and NIST AI RMF. Produces PDF audit reports with risk matrices.',
    pills: ['sentence-transformers', 'ReportLab', 'OWASP'],
    stat: '250+ attack vectors',
  },
  {
    href: 'https://github.com/shaikn6/clinical-note-llmops',
    domain: 'Healthcare AI', domainClass: styles.dClinical,
    name: 'Clinical Note LLMOps',
    desc: 'HIPAA-compliant LLMOps pipeline for clinical NLP. BioBERT + Presidio PII de-identification, FHIR R4 Epic integration, automated model drift detection, and full audit trail.',
    pills: ['BioBERT', 'Presidio', 'FHIR R4', 'SageMaker'],
    stat: 'HIPAA compliant',
  },
  {
    href: 'https://github.com/shaikn6/federated-credit-risk',
    domain: 'Privacy ML', domainClass: styles.dPrivacy,
    name: 'Federated Credit Risk',
    desc: '3-institution federated learning via Flower FedAvg — zero raw data sharing. L2-norm model poisoning guard, gradient clipping, ECOA Fair Lending feature audit, and differential privacy integration.',
    pills: ['Flower', 'PyTorch', 'FastAPI', 'ECOA'],
    stat: 'Zero data sharing',
  },
  {
    href: 'https://github.com/shaikn6/differential-privacy-llm',
    domain: 'Privacy AI', domainClass: styles.dPrivacy,
    name: 'Differential Privacy LLM',
    desc: 'DP-SGD fine-tuning from first principles with Rényi differential privacy budget accounting. Interactive Streamlit dashboard visualizing privacy-utility tradeoffs across ε values and noise multiplier configurations.',
    pills: ['PyTorch', 'Opacus', 'FastAPI', 'Streamlit'],
    stat: 'Rényi DP accounting',
  },
  {
    href: 'https://github.com/shaikn6/kafka-stream-feature-store',
    domain: 'Data Engineering', domainClass: styles.dDataeng,
    name: 'Kafka Stream Feature Store',
    desc: 'Real-time ML feature store: Kafka producers → Redis with sub-60s freshness guarantee. JSON serialization, per-IP rate limiting, and a FastAPI serving layer with feature versioning and TTL management.',
    pills: ['Kafka', 'Redis', 'FastAPI', 'Pydantic'],
    stat: '< 60s freshness',
  },
  {
    href: 'https://github.com/shaikn6/mlops-retraining-pipeline',
    domain: 'MLOps', domainClass: styles.dMlops,
    name: 'MLOps Retraining Pipeline',
    desc: 'Automated model retraining on data drift using Airflow + MLflow + SageMaker. Evidently AI drift detection triggers retraining jobs, tracks experiments, and promotes champions via A/B shadow deployment.',
    pills: ['Airflow', 'MLflow', 'SageMaker', 'Evidently'],
    stat: 'Auto retraining',
  },
  {
    href: 'https://github.com/shaikn6/enhanced-ai-proctor',
    domain: 'Computer Vision', domainClass: styles.dCv,
    name: 'Enhanced AI Proctor',
    desc: 'Real-time exam proctoring: YOLOv8 object detection + DeepFace identity verification + gaze tracking. Flags prohibited objects, identity switches, and attention loss with timestamped evidence reports via FastAPI.',
    pills: ['YOLOv8', 'DeepFace', 'OpenCV', 'FastAPI'],
    stat: 'Real-time detection',
  },
]

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null)

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLAnchorElement>) => {
    const el = cardRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%')
    el.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%')
  }, [])

  return (
    <ScrollReveal delay={delay}>
      <a
        ref={cardRef}
        className={styles.card}
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        onPointerMove={handlePointerMove}
      >
        <div className={styles.cardHeader}>
          <span className={`${styles.domain} ${project.domainClass}`}>{project.domain}</span>
          <span className={styles.arrow}>↗</span>
        </div>
        <div className={styles.name}>{project.name}</div>
        <div className={styles.desc}>{project.desc}</div>
        <div className={styles.pills}>
          {project.pills.map((p) => <span key={p} className={styles.pill}>{p}</span>)}
        </div>
        <div className={styles.footer}>
          <span className={styles.live}>● Live repo</span>
          <span>{project.stat}</span>
        </div>
      </a>
    </ScrollReveal>
  )
}

export default function Projects() {
  return (
    <section id="projects" className={styles.section}>
      <div className={styles.wrap}>
        <ScrollReveal><div className={styles.sectionTag}>Projects</div></ScrollReveal>
        <ScrollReveal delay={0.05}><h2 className={styles.sectionH}>Things I've actually built.</h2></ScrollReveal>
        <ScrollReveal delay={0.08}>
          <p className={styles.sectionSub}>
            9 open-source repos. Real code, real tests, real CI. AI agents · clinical AI · privacy ML · data infrastructure.
          </p>
        </ScrollReveal>

        <div className={styles.grid}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.href} project={p} delay={i * 0.06} />
          ))}
        </div>
      </div>
    </section>
  )
}
