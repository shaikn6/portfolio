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
  // ── Fintech ML · flagship ──
  {
    href: 'https://github.com/shaikn6/finance-agent-crew',
    domain: 'AI · Fintech', domainClass: styles.dAgents,
    name: 'Finance Agent Crew',
    desc: 'Turns a stock ticker into a sourced equity-research brief: an LLM-free gatherer fans out concurrently over SEC EDGAR (XBRL), Alpha Vantage, and news; three analyst agents — fundamental, sentiment, risk — run in parallel; a writer synthesizes a BUY / HOLD / SELL call with bull and bear cases. Non-fatal error handling, CI, Docker.',
    pills: ['Python', 'asyncio', 'Claude', 'SEC EDGAR', 'Alpha Vantage', 'FastAPI'],
    stat: '3 analyst agents, parallel',
  },
  {
    href: 'https://github.com/shaikn6/llm-safety-auditor',
    domain: 'AI Safety', domainClass: styles.dSafety,
    name: 'LLM Safety Auditor',
    desc: 'Reproducible red-teaming harness: 250+ adversarial vectors (50 seed templates × 6 mutation strategies), a 4-layer safety detector, OWASP LLM Top 10 scoring, and compliance-grade PDF reports. Runs key-free against a seeded mock LLM or a live provider. Live demo on Hugging Face Spaces.',
    pills: ['Python', 'OWASP LLM Top 10', 'Red-Teaming', 'FastAPI', 'Streamlit', 'ReportLab'],
    stat: '404 tests · 97% coverage',
  },
  {
    href: 'https://github.com/shaikn6/nano-finbert',
    domain: 'ML · Fintech', domainClass: styles.dMl,
    name: 'nano-finbert',
    desc: 'A 1.88M-parameter transformer encoder built entirely from scratch on financial text — custom BPE tokenizer, hand-written multi-head attention, own training loop, no pretrained weights, no HuggingFace dependency (after Karpathy’s nanoGPT, every component annotated). Companion fine-tuned model published to Hugging Face at 95.3% held-out accuracy (macro-F1 0.94).',
    pills: ['PyTorch', 'from-scratch Transformer', 'BPE', 'NLP', 'Fintech'],
    stat: '1.88M params · 95.3% acc',
  },
  // ── LLM Engineering · Infra ──
  {
    href: 'https://github.com/shaikn6/llm-gateway',
    domain: 'AI Engineering', domainClass: styles.dAgents,
    name: 'LLM Gateway',
    desc: 'OpenAI-compatible API proxy for multi-provider LLM routing — semantic caching, token-budget enforcement, latency-aware routing, and per-key cost analytics across Claude, OpenAI, and local Ollama backends behind a single FastAPI interface with Prometheus metrics.',
    pills: ['FastAPI', 'Claude', 'OpenAI', 'Ollama', 'Prometheus', 'Redis'],
    stat: 'Multi-provider routing',
  },
  {
    href: 'https://github.com/shaikn6/on-device-llm-optimizer',
    domain: 'AI Engineering', domainClass: styles.dAgents,
    name: 'On-Device LLM Optimizer',
    desc: 'Knowledge-distills Phi-3 Mini (3.8B) down to a 236M student model on Apple MLX, then INT4-quantizes and exports to CoreML — real LLM inference running on-device without a server round-trip.',
    pills: ['MLX', 'CoreML', 'Knowledge Distillation', 'INT4 Quantization', 'PyTorch'],
    stat: '3.8B → 236M, on-device',
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
  // ── Fintech infra · DevSecOps ──
  {
    href: 'https://github.com/shaikn6/ledger-service',
    domain: 'Fintech · Backend', domainClass: styles.dCloud,
    name: 'Ledger Service',
    desc: 'Double-entry accounting ledger microservice — idempotent money movement over Postgres, ordered row locking to prevent deadlocks, and append-only postings for a tamper-evident audit trail. Go 1.26.',
    pills: ['Go', 'Postgres', 'Double-Entry', 'Idempotency'],
    stat: 'Idempotent money movement',
  },
  {
    href: 'https://github.com/shaikn6/fintech-devsecops-pipeline',
    domain: 'DevSecOps · Fintech', domainClass: styles.dCloud,
    name: 'Fintech DevSecOps Pipeline',
    desc: 'DevSecOps platform for fintech workloads — Terraform on AWS EKS, Helm + ArgoCD GitOps, Checkov IaC scanning, OPA/Rego admission policies, RBAC, and NetworkPolicies enforcing least-privilege by default.',
    pills: ['Terraform', 'AWS EKS', 'ArgoCD', 'OPA', 'Checkov'],
    stat: 'Policy-gated GitOps',
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
            Selected work across fintech ML, LLM engineering, and secure infrastructure. Real code, real tests, CI green on every repo.
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
