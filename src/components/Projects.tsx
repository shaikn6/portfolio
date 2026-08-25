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
  // ── LLM Engineering · AgentOps ──
  {
    href: 'https://github.com/shaikn6/on-device-llm-optimizer',
    domain: 'AI Engineering', domainClass: styles.dAgents,
    name: 'On-Device LLM Optimizer',
    desc: 'Knowledge-distills Phi-3 Mini (3.8B) down to a 236M student model on Apple MLX, then INT4-quantizes and exports to CoreML — built to get real LLM inference running on-device without a server round-trip.',
    pills: ['MLX', 'CoreML', 'Knowledge Distillation', 'INT4 Quantization', 'PyTorch'],
    stat: '3.8B → 236M, on-device',
  },
  {
    href: 'https://github.com/shaikn6/llm-gateway',
    domain: 'AI Engineering', domainClass: styles.dAgents,
    name: 'LLM Gateway',
    desc: 'Unified API proxy for multi-provider LLM routing — semantic fallback, token-budget enforcement, latency-aware load balancing, and per-key cost accounting. Supports OpenAI, Anthropic, and local Ollama backends behind a single FastAPI interface with Prometheus metrics.',
    pills: ['FastAPI', 'OpenAI', 'Anthropic', 'Ollama', 'Prometheus', 'Redis'],
    stat: 'Multi-provider routing',
  },
  {
    href: 'https://github.com/shaikn6/nvidia-nim-rag-techniques',
    domain: 'AI Engineering', domainClass: styles.dAgents,
    name: 'NVIDIA NIM RAG Techniques',
    desc: 'Five production RAG optimization techniques powered by NVIDIA NIM — hybrid search with RRF, cross-encoder reranking, query rewriting (HyDE / multi-query / step-back), context compression, and corrective RAG via LangGraph.',
    pills: ['NVIDIA NIM', 'LangGraph', 'RRF', 'Cross-Encoder', 'HyDE'],
    stat: '5 RAG techniques',
  },
  {
    href: 'https://github.com/shaikn6/mcp-diagram-agent',
    domain: 'AI Engineering', domainClass: styles.dAgents,
    name: 'MCP Diagram Agent',
    desc: 'Model Context Protocol server that turns a plain-text system description into a production-ready Excalidraw architecture diagram via Claude. Fully typed MCP tool surface with 97%+ test coverage and a strict mypy + ruff CI gate.',
    pills: ['MCP', 'Claude', 'Excalidraw', 'FastAPI', 'mypy'],
    stat: '97%+ coverage',
  },
  // ── ML · Fintech ──
  {
    href: 'https://github.com/shaikn6/finance-agent-crew',
    domain: 'AI · Fintech', domainClass: styles.dAgents,
    name: 'Finance Agent Crew',
    desc: 'Multi-agent CrewAI system for financial research — parallel analyst, risk assessor, and report-writer agents collaborating on SEC filing analysis, earnings call summaries, and portfolio risk scoring. Outputs structured markdown reports with citation chains.',
    pills: ['CrewAI', 'LangChain', 'OpenAI', 'SEC EDGAR API', 'FAISS', 'FastAPI'],
    stat: '3-agent pipeline',
  },
  {
    href: 'https://github.com/shaikn6/nano-finbert',
    domain: 'ML · Fintech', domainClass: styles.dMl,
    name: 'nano-finbert',
    desc: 'A tiny transformer encoder (~2M params) trained from scratch on financial text — no pretrained weights, no HuggingFace dependency. Inspired by nanoGPT, every component is annotated. Feed it a financial headline, get back a structured market signal: sentiment, entities, sectors, event type, impact score.',
    pills: ['PyTorch', 'Transformers', 'NLP', 'From Scratch', 'Fintech'],
    stat: '~2M params',
  },
  // ── Healthcare · Clinical AI ──
  {
    href: 'https://github.com/shaikn6/medical-imaging-ai',
    domain: 'Healthcare AI', domainClass: styles.dClinical,
    name: 'Medical Imaging AI',
    desc: 'Chest X-ray pathology classifier with Grad-CAM and ScoreCAM explainability built from scratch — plus a U-Net segmentation head and a real DICOM ingestion pipeline with PHI scrubbing. Built so a radiologist can see why the model flagged an image, not just that it did.',
    pills: ['PyTorch', 'Grad-CAM', 'DICOM', 'EfficientNet-B4', 'Streamlit'],
    stat: 'Grad-CAM from scratch',
  },
  {
    href: 'https://github.com/shaikn6/healthcare-rag',
    domain: 'Healthcare AI', domainClass: styles.dClinical,
    name: 'Healthcare RAG',
    desc: 'HIPAA-aware clinical RAG pipeline — PHI detection and redaction before anything hits the vector store, disclaimer-injected answers, and an n8n-orchestrated ingestion flow. Retrieval-grounded clinical Q&A that treats PHI handling as a first-class design constraint, not an afterthought.',
    pills: ['RAG', 'Claude', 'PHI Redaction', 'FastAPI', 'n8n'],
    stat: 'PHI-redacted retrieval',
  },
  {
    href: 'https://github.com/shaikn6/icu-mortality-predictor',
    domain: 'Healthcare AI', domainClass: styles.dClinical,
    name: 'ICU Mortality Predictor',
    desc: '30-day ICU mortality prediction from the first 24 hours of MIMIC-III clinical data — XGBoost with Optuna-tuned hyperparameters, SHAP explainability, and HMAC-signed model artifacts. Includes a synthetic-data fallback so the full pipeline runs without a MIMIC data-use agreement.',
    pills: ['XGBoost', 'MIMIC-III', 'SHAP', 'Optuna', 'FastAPI'],
    stat: '0.85 AUC, synthetic-safe',
  },
  {
    href: 'https://github.com/shaikn6/clinical-survival-analysis',
    domain: 'Healthcare AI', domainClass: styles.dClinical,
    name: 'Clinical Survival Analysis',
    desc: 'Six survival models — Kaplan-Meier, Cox PH, Random Survival Forest, XGBoost, DeepSurv, and DeepHit — with competing-risks CIF via Aalen-Johansen, wrapped in a FastAPI + Streamlit dashboard for side-by-side comparison.',
    pills: ['Survival Analysis', 'PyTorch', 'Cox PH', 'Streamlit'],
    stat: '6 models, competing risks',
  },
  // ── Safety · SRE · DevSecOps ──
  {
    href: 'https://github.com/shaikn6/llm-safety-auditor',
    domain: 'AI Safety', domainClass: styles.dSafety,
    name: 'LLM Safety Auditor',
    desc: 'Automated red-teaming and safety evaluation framework for production LLMs. Executes 250+ adversarial attack vectors across six mutation strategies. Scores against the full OWASP LLM Top 10 taxonomy and generates structured PDF audit reports suitable for compliance review.',
    pills: ['HuggingFace', 'OWASP LLM Top 10', 'Red-Teaming', 'FastAPI', 'ReportLab'],
    stat: '250+ attack vectors',
  },
  {
    href: 'https://github.com/shaikn6/fintech-devsecops-pipeline',
    domain: 'DevSecOps · Fintech', domainClass: styles.dCloud,
    name: 'Fintech DevSecOps Pipeline',
    desc: 'Production DevSecOps platform for fintech — Terraform on AWS EKS, Helm + ArgoCD GitOps, Checkov IaC scanning, OPA/Rego policies, Gitleaks secret scanning, SLSA provenance, and container signing, mapped to PCI-DSS and SOC 2 controls.',
    pills: ['Terraform', 'AWS EKS', 'ArgoCD', 'OPA', 'Checkov', 'SLSA'],
    stat: 'PCI-DSS / SOC 2',
  },
]

const MAX_TILT = 7

function ProjectCard({ project, delay, featured }: { project: Project; delay: number; featured?: boolean }) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const rafRef = useRef<number | null>(null)

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLAnchorElement>) => {
    const el = cardRef.current
    if (!el) return
    const clientX = e.clientX
    const clientY = e.clientY
    if (rafRef.current !== null) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null
      const r = el.getBoundingClientRect()
      const px = (clientX - r.left) / r.width
      const py = (clientY - r.top) / r.height
      el.style.setProperty('--mx', (px * 100) + '%')
      el.style.setProperty('--my', (py * 100) + '%')
      el.style.setProperty('--rx', (-(py - 0.5) * MAX_TILT) + 'deg')
      el.style.setProperty('--ry', ((px - 0.5) * MAX_TILT) + 'deg')
    })
  }, [])

  const handlePointerLeave = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    const el = cardRef.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }, [])

  return (
    <ScrollReveal delay={delay} className={featured ? styles.featuredWrap : undefined}>
      <a
        ref={cardRef}
        className={`${styles.card} ${featured ? styles.featured : ''}`}
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
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
          <span className={styles.live}><span className={styles.liveDot} aria-hidden="true" />Live repo</span>
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
            12 selected projects from 15 public repos across LLM Engineering, Healthcare AI, MLOps, and DevSecOps. Real code, real tests, CI green on every repo.
          </p>
        </ScrollReveal>

        <div className={styles.grid}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.href} project={p} delay={i * 0.06} featured={i === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}
