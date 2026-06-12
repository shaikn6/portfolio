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
    desc: 'End-to-end radiology image segmentation pipeline using EfficientNet-B4 — automated preprocessing, Grad-CAM + ScoreCAM explainability overlays, DICOM pipeline, and PHI scrubbing. Containerised FastAPI inference service.',
    pills: ['EfficientNet-B4', 'Grad-CAM', 'DICOM', 'PyTorch', 'FastAPI', 'Docker'],
    stat: 'Clinical-grade',
  },
  {
    href: 'https://github.com/shaikn6/clinical-survival-analysis',
    domain: 'Clinical ML', domainClass: styles.dClinical,
    name: 'Clinical Survival Analysis',
    desc: '6-model survival analysis — Kaplan-Meier, Cox PH, Random Survival Forest, XGBoost, DeepSurv, DeepHit — with competing risks, Aalen-Johansen CIF, Streamlit dashboard, and FastAPI serving layer.',
    pills: ['PyTorch', 'scikit-survival', 'XGBoost', 'Streamlit', 'FastAPI'],
    stat: '6 models',
  },
  {
    href: 'https://github.com/shaikn6/federated-credit-risk',
    domain: 'ML · Cloud', domainClass: styles.dCloud,
    name: 'Federated Credit Risk',
    desc: 'Three-institution federated credit risk modeling via Flower FedAvg — zero raw data exchange. L2-norm model poisoning detection gate, gradient clipping, and ECOA / Fair Lending compliance constraints applied to the global model.',
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
    href: 'https://github.com/shaikn6/healthcare-rag',
    domain: 'AI · Healthcare', domainClass: styles.dClinical,
    name: 'Healthcare RAG',
    desc: 'HIPAA-safe RAG pipeline with PHI detection and redaction, vector store, clinical Q&A with disclaimer injection. Designed for structured clinical document retrieval with audit trail.',
    pills: ['LangChain', 'RAG', 'Presidio', 'FAISS', 'FastAPI'],
    stat: 'PHI-safe RAG',
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
  {
    href: 'https://github.com/shaikn6/ai-rag-app',
    domain: 'AI Engineering', domainClass: styles.dAgents,
    name: 'AI RAG Application',
    desc: 'LangChain RAG application with document ingestion, vector search, OpenAI integration, and FastAPI serving layer. Full ingestion-to-query pipeline with citation support.',
    pills: ['LangChain', 'RAG', 'OpenAI', 'FAISS', 'FastAPI'],
    stat: 'Citation-grounded',
  },
  // ── Data Engineering · Cloud ──
  {
    href: 'https://github.com/shaikn6/kafka-stream-feature-store',
    domain: 'ML · Cloud', domainClass: styles.dCloud,
    name: 'Kafka Stream Feature Store',
    desc: 'Real-time ML feature store delivering sub-60s feature freshness. Kafka streaming producers into a Redis online store with point-in-time correctness and a FastAPI feature-serving layer for low-latency inference.',
    pills: ['Kafka', 'Redis', 'FastAPI', 'Feature Store', 'Streaming'],
    stat: 'Sub-60s freshness',
  },
  {
    href: 'https://github.com/shaikn6/sql-to-dag-compiler',
    domain: 'Cloud · Data Eng', domainClass: styles.dCloud,
    name: 'SQL-to-DAG Compiler',
    desc: 'Oracle SQL/PLSQL + dbt models compiled to Airflow 2.x DAGs with lineage export in Mermaid, DOT, and JSON formats. Includes edge-case handler and dbt model parser.',
    pills: ['Python', 'Airflow', 'dbt', 'Oracle PL/SQL', 'Mermaid'],
    stat: 'Lineage-aware',
  },
  {
    href: 'https://github.com/shaikn6/ml-churn-pipeline',
    domain: 'ML Engineering', domainClass: styles.dMl,
    name: 'ML Churn Pipeline',
    desc: 'End-to-end customer churn prediction — scikit-learn pipeline with feature engineering, MLflow experiment tracking and model registry, and a REST API inference layer.',
    pills: ['scikit-learn', 'MLflow', 'FastAPI', 'pandas', 'Docker'],
    stat: 'MLflow tracked',
  },
  {
    href: 'https://github.com/shaikn6/flight-ops-intelligence',
    domain: 'ML · Cloud', domainClass: styles.dCloud,
    name: 'Flight Ops Intelligence',
    desc: 'ML flight delay predictor with XGBoost + Open-Meteo live weather integration, real-time FastAPI endpoint, and a Folium route risk map for operational visibility.',
    pills: ['XGBoost', 'Open-Meteo API', 'FastAPI', 'Folium', 'scikit-learn'],
    stat: 'Live weather',
  },
  {
    href: 'https://github.com/shaikn6/cloud-iac',
    domain: 'Cloud Architecture', domainClass: styles.dCloud,
    name: 'Cloud IaC',
    desc: 'Production AWS infrastructure as code — Terraform modules for VPC, ECS, RDS, S3, and IAM with security-hardened defaults, least-privilege policies, and CloudTrail logging.',
    pills: ['Terraform', 'AWS', 'VPC', 'ECS', 'RDS', 'IAM'],
    stat: 'Security-hardened',
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
            14 open-source repos across ML Engineering, AI Engineering, Healthcare AI, and Cloud Architecture. Real code, real tests, CI green on every repo.
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
