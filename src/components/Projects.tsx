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
  // ── ML Engineer ──
  {
    href: 'https://github.com/shaikn6/chexpert-pathology-classifier',
    domain: 'ML Engineering', domainClass: styles.dMl,
    name: 'CheXpert Pathology Classifier',
    desc: 'Multi-label chest X-ray classification across all 14 CheXpert classes at 92% AUC. DenseNet121 + EfficientNet-B4 ensemble with MC Dropout uncertainty quantification and Grad-CAM / ScoreCAM explainability overlays for radiologist review. Full DICOM ingestion pipeline with PHI scrubbing.',
    pills: ['PyTorch', 'DenseNet121', 'EfficientNet-B4', 'Grad-CAM', 'DICOM', 'SageMaker'],
    stat: '92% AUC',
  },
  {
    href: 'https://github.com/shaikn6/medical-imaging-ai',
    domain: 'ML Engineering', domainClass: styles.dMl,
    name: 'Medical Imaging AI',
    desc: 'End-to-end radiology image segmentation pipeline using U-Net architecture — automated preprocessing, Grad-CAM explainability overlays, and a containerised inference service built on MONAI for clinical imaging standards compliance.',
    pills: ['U-Net', 'MONAI', 'Grad-CAM', 'PyTorch', 'Docker'],
    stat: 'Clinical-grade',
  },
  {
    href: 'https://github.com/shaikn6/federated-credit-risk',
    domain: 'ML · Cloud', domainClass: styles.dCloud,
    name: 'Federated Credit Risk',
    desc: 'Three-institution federated credit risk modeling via Flower FedAvg — zero raw data exchange. L2-norm model poisoning detection gate, gradient clipping, and ECOA / Fair Lending compliance constraints applied to the global model. Deployed as a containerised multi-node system with FastAPI coordination layer.',
    pills: ['PyTorch', 'Flower', 'Federated Learning', 'ECOA', 'Docker', 'FastAPI'],
    stat: 'Zero data sharing',
  },
  // ── AI Engineer ──
  {
    href: 'https://github.com/shaikn6/clinical-note-llmops',
    domain: 'AI · Cloud', domainClass: styles.dClinical,
    name: 'Clinical Note LLMOps',
    desc: 'HIPAA-compliant NLP pipeline for unstructured clinical notes — Presidio PII de-identification, BioBERT NER, ICD-10 code extraction, and FHIR R4 structured output. Covers all 18 PHI identifier types with full audit logging. Designed for Epic / HL7 integration.',
    pills: ['BioBERT', 'Presidio', 'FHIR R4', 'ICD-10', 'FastAPI', 'spaCy'],
    stat: 'HIPAA compliant',
  },
  {
    href: 'https://github.com/shaikn6/llm-safety-auditor',
    domain: 'AI Engineering', domainClass: styles.dSafety,
    name: 'LLM Safety Auditor',
    desc: 'Automated red-teaming and safety evaluation framework for production LLMs. Executes 250+ adversarial attack vectors across six mutation strategies. Scores against the full OWASP LLM Top 10 taxonomy and generates structured PDF audit reports suitable for compliance review.',
    pills: ['HuggingFace', 'OWASP LLM Top 10', 'Red-Teaming', 'FastAPI', 'ReportLab'],
    stat: '250+ attack vectors',
  },
  {
    href: 'https://github.com/shaikn6/agentic-pipeline-healer',
    domain: 'AI · Cloud', domainClass: styles.dAgents,
    name: 'Agentic Pipeline Healer',
    desc: 'LangGraph multi-DAG orchestrator that monitors Airflow pipelines, performs LLM-driven root cause diagnosis, applies AST-level code fixes with automated rollback, and fires Slack Block Kit alerts — with a full SQLite audit trail.',
    pills: ['LangGraph', 'Airflow', 'AST', 'FastAPI', 'SQLite', 'Slack API'],
    stat: 'Self-healing CI',
  },
  // ── More public projects ──
  {
    href: 'https://github.com/shaikn6/mlops-retraining-pipeline',
    domain: 'ML Engineering', domainClass: styles.dMl,
    name: 'MLOps Retraining Pipeline',
    desc: 'Automated ML retraining with statistical promotion gates — KS-test drift detection triggers retraining, Welch t-test and A/B validation gate promotion, with automated rollback. Airflow-orchestrated on MLflow and SageMaker.',
    pills: ['Airflow', 'MLflow', 'SageMaker', 'scikit-learn', 'Drift Detection'],
    stat: 'Drift-triggered',
  },
  {
    href: 'https://github.com/shaikn6/kafka-stream-feature-store',
    domain: 'ML · Cloud', domainClass: styles.dCloud,
    name: 'Kafka Stream Feature Store',
    desc: 'Real-time ML feature store delivering sub-60s feature freshness. Kafka streaming producers into a Redis online store with point-in-time correctness and a FastAPI feature-serving layer for low-latency inference.',
    pills: ['Kafka', 'Redis', 'FastAPI', 'Feature Store', 'Streaming'],
    stat: 'Sub-60s freshness',
  },
  {
    href: 'https://github.com/shaikn6/finance-llmops-platform',
    domain: 'AI Engineering', domainClass: styles.dSafety,
    name: 'Finance LLMOps Platform',
    desc: 'RAG platform over SEC 10-K filings and earnings calls — citation-grounded answers with hallucination detection, Evidently monitoring, and MLflow prompt versioning, fronted by a Streamlit analyst dashboard.',
    pills: ['LangChain', 'RAG', 'MLflow', 'Evidently', 'Streamlit'],
    stat: 'Citation-grounded',
  },
  {
    href: 'https://github.com/shaikn6/prompt-ops',
    domain: 'AI Engineering', domainClass: styles.dAgents,
    name: 'PromptOps',
    desc: 'Git-style version control and A/B testing for LLM prompts — diff, branch, and roll back prompt versions with experiment tracking and evaluation metrics. MLflow for prompts.',
    pills: ['LLMOps', 'Prompt Engineering', 'A/B Testing', 'FastAPI'],
    stat: 'Prompt versioning',
  },
  {
    href: 'https://github.com/shaikn6/evidently-llm-sentinel',
    domain: 'AI · Cloud', domainClass: styles.dSafety,
    name: 'Evidently LLM Sentinel',
    desc: 'Production LLM observability extending Evidently AI — tracks semantic drift, hallucination risk, and response-quality degradation over time with Grafana dashboards and alerting.',
    pills: ['Evidently', 'Grafana', 'LLM Monitoring', 'Observability'],
    stat: 'Semantic drift',
  },
  {
    href: 'https://github.com/shaikn6/high-traffic-ticket-engine',
    domain: 'Cloud Architecture', domainClass: styles.dCloud,
    name: 'High-Traffic Ticket Engine',
    desc: 'Distributed ticket-reservation engine handling 10K concurrent users with zero oversells. Redis distributed locks with atomic Lua reservation scripts and TTL-based hold expiry under load-tested concurrency.',
    pills: ['Redis', 'Distributed Locks', 'FastAPI', 'Concurrency', 'Lua'],
    stat: '10K concurrent · 0 oversells',
  },
  {
    href: 'https://github.com/shaikn6/distributed-etl-ecommerce',
    domain: 'Cloud · Data Eng', domainClass: styles.dCloud,
    name: 'Distributed ETL — E-Commerce',
    desc: 'Distributed ETL framework on a PySpark medallion architecture — dbt star-schema modeling, Airflow orchestration, Great Expectations quality gates, containerised with CI/CD.',
    pills: ['PySpark', 'dbt', 'Airflow', 'Great Expectations', 'Docker'],
    stat: 'Medallion architecture',
  },
  {
    href: 'https://github.com/shaikn6/redshift-wlm-optimizer',
    domain: 'ML · Cloud', domainClass: styles.dCloud,
    name: 'Redshift WLM Optimizer',
    desc: 'XGBoost model predicts Redshift query cost and auto-routes each query to the optimal WLM queue, cutting financial-report runtime by 85%. ML-driven cloud cost optimization.',
    pills: ['AWS Redshift', 'XGBoost', 'WLM', 'Cost Optimization'],
    stat: '85% faster',
  },
  {
    href: 'https://github.com/shaikn6/icu-mortality-predictor',
    domain: 'Clinical ML', domainClass: styles.dClinical,
    name: 'ICU Mortality Predictor',
    desc: '30-day ICU mortality prediction from the first 24 hours of MIMIC-III data — XGBoost with SHAP explainability and a hardened FastAPI inference layer for clinical decision support.',
    pills: ['XGBoost', 'SHAP', 'MIMIC-III', 'FastAPI'],
    stat: 'AUC > 0.85',
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
            6 open-source repos across ML Engineering, AI Engineering, and Cloud Architecture. Real code, real tests, real CI.
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
