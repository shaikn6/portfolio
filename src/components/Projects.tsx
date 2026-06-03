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
  // ── AI Engineer ──
  {
    href: 'https://github.com/shaikn6/agent-autopsy',
    domain: 'AI Engineering', domainClass: styles.dAgents,
    name: 'Agent Autopsy',
    desc: 'Observability and debugging framework for production LLM agents. Captures full chain-of-thought traces, tool call sequences, and token budgets across multi-agent LangGraph workflows. Surfaces latency hotspots and hallucination patterns via a Streamlit dashboard with structured JSON export.',
    pills: ['LangGraph', 'LangChain', 'Streamlit', 'OpenTelemetry', 'FastAPI', 'Redis'],
    stat: 'Full trace capture',
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
    href: 'https://github.com/shaikn6/autonomous-coding-agent',
    domain: 'AI Engineering', domainClass: styles.dAgents,
    name: 'Autonomous Coding Agent',
    desc: 'LangGraph ReAct agent that autonomously plans, writes, executes, and iterates code against a test harness. Tool belt includes AST-level code diffing, sandboxed subprocess execution, GitHub PR creation, and a self-critique loop that halts on coverage regression.',
    pills: ['LangGraph', 'OpenAI', 'AST', 'GitHub API', 'Docker', 'pytest'],
    stat: 'Self-correcting loop',
  },
  {
    href: 'https://github.com/shaikn6/finance-agent-crew',
    domain: 'AI · Fintech', domainClass: styles.dAgents,
    name: 'Finance Agent Crew',
    desc: 'Multi-agent CrewAI system for financial research — parallel analyst, risk assessor, and report-writer agents collaborating on SEC filing analysis, earnings call summaries, and portfolio risk scoring. Outputs structured markdown reports with citation chains.',
    pills: ['CrewAI', 'LangChain', 'OpenAI', 'SEC EDGAR API', 'FAISS', 'FastAPI'],
    stat: '3-agent pipeline',
  },
  {
    href: 'https://github.com/shaikn6/federated-credit-risk',
    domain: 'ML · Fintech', domainClass: styles.dCloud,
    name: 'Federated Credit Risk',
    desc: 'Three-institution federated credit risk modeling via Flower FedAvg — zero raw data exchange. L2-norm model poisoning detection gate, gradient clipping, and ECOA / Fair Lending compliance constraints applied to the global model.',
    pills: ['PyTorch', 'Flower', 'Federated Learning', 'ECOA', 'Docker', 'FastAPI'],
    stat: 'Zero data sharing',
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
            15 open-source repos across LLM Engineering, AI Agents, MLOps, and Cloud Architecture. Real code, real tests, CI green on every repo.
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
