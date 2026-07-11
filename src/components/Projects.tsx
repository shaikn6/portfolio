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
    href: 'https://github.com/shaikn6/finance-llmops-platform',
    domain: 'LLMOps · Fintech', domainClass: styles.dAgents,
    name: 'Finance LLMOps Platform',
    desc: 'LLMOps platform purpose-built for financial services — LLM evaluation harnesses, prompt versioning with rollback, and model governance workflows for auditability. Built for teams shipping generative AI in a regulated environment.',
    pills: ['FastAPI', 'Prompt Versioning', 'Model Governance', 'Financial Services', 'LLM Eval'],
    stat: 'Governance + eval',
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
    href: 'https://github.com/shaikn6/mlops-feature-platform',
    domain: 'MLOps · Fintech', domainClass: styles.dMl,
    name: 'MLOps Feature Platform',
    desc: 'Enterprise feature platform for financial ML — Feast feature store, MLflow model registry, Airflow-orchestrated training pipelines, and Evidently AI drift monitoring, wired together as a single reproducible stack.',
    pills: ['Feast', 'MLflow', 'Airflow', 'Evidently AI', 'Python'],
    stat: 'Feature store + registry',
  },
  {
    href: 'https://github.com/shaikn6/sql-to-dag-compiler',
    domain: 'Data Engineering', domainClass: styles.dCloud,
    name: 'SQL-to-DAG Compiler',
    desc: 'Compiles Oracle SQL/PLSQL and dbt models directly into Airflow 2.x DAGs, with lineage export to Mermaid/DOT/JSON and an edge-case handler for legacy stored-procedure quirks most migration tools choke on.',
    pills: ['Airflow', 'dbt', 'PL/SQL', 'Data Lineage', 'Python'],
    stat: 'SQL → DAG, auto-lineage',
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
    href: 'https://github.com/shaikn6/agentic-pipeline-healer',
    domain: 'AI · SRE', domainClass: styles.dCloud,
    name: 'Agentic Pipeline Healer',
    desc: 'LangGraph agent that watches Airflow DAGs in production, diagnoses failed tasks from logs and stack traces, and auto-applies fixes — schema drift, timeout tuning, dependency resets — without paging a human first.',
    pills: ['LangGraph', 'Airflow', 'AIOps', 'FastAPI', 'Observability'],
    stat: 'Auto-diagnose + fix',
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
            12 selected projects from 16 public repos across LLM Engineering, AI Agents, MLOps, and DevSecOps. Real code, real tests, CI green on every repo.
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
