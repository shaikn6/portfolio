import { useRef, useCallback, useState } from 'react'
import ScrollReveal from './ScrollReveal'
import styles from './Projects.module.css'

type Group = 'fintech' | 'llm' | 'ml' | 'infra'

interface Project {
  href: string
  group: Group
  demo?: { label: string; href: string }
  domain: string
  domainClass: string
  name: string
  desc: string
  pills: string[]
  stat: string
}

// Fintech first, then LLM systems, ML research and infrastructure.
const PROJECTS: Project[] = [
  {
    href: 'https://github.com/shaikn6/ledger-service',
    group: 'fintech',
    domain: 'Fintech · Backend', domainClass: styles.dCloud,
    name: 'Ledger Service',
    desc: 'Double-entry accounting ledger microservice — idempotent money movement over Postgres, deterministic row locking that cannot deadlock, and append-only postings for a tamper-evident audit trail. OpenAPI 3.1 contract. Go 1.27.',
    pills: ['Go', 'Postgres', 'Double-Entry', 'Idempotency', 'OpenAPI'],
    stat: 'Concurrency-safe money movement',
  },
  {
    href: 'https://github.com/shaikn6/llm-gateway',
    group: 'llm',
    domain: 'AI Engineering', domainClass: styles.dAgents,
    name: 'LLM Gateway',
    desc: 'One OpenAI-style chat endpoint over Claude, OpenAI, and local Ollama backends — per-tenant response caching, rate limiting, deterministic A/B routing, per-key cost tracking, and audit logging behind a single FastAPI service. Provider calls are checked against the real SDK method signatures in CI.',
    pills: ['FastAPI', 'Claude', 'OpenAI', 'Ollama', 'Redis'],
    stat: '415 tests · 99% coverage',
  },
  {
    href: 'https://github.com/shaikn6/fin-lora',
    group: 'fintech',
    demo: { label: 'Hugging Face model', href: 'https://huggingface.co/9mark9/fin-lora-news-qwen2.5-0.5b' },
    domain: 'ML · Fintech', domainClass: styles.dMl,
    name: 'fin-lora',
    desc: 'Which model should classify financial sentiment, and when is an LLM worth its cost? LoRA-tunes Qwen2.5-0.5B and benchmarks it against TF-IDF and zero-shot FinBERT on tweets, human-labeled headlines, and news. A confidence cascade sends only the uncertain items to the LLM, cutting average latency 63% for 0.4 points of accuracy. A follow-up study measures how often harmless edits or planted labels flip each model across five markets. Adapters published on Hugging Face.',
    pills: ['PyTorch', 'LoRA', 'Qwen2.5', 'FinBERT', 'Hugging Face'],
    stat: '63% lower latency',
  },
  {
    href: 'https://github.com/shaikn6/credit-arena',
    group: 'fintech',
    domain: 'ML · Fintech', domainClass: styles.dMl,
    name: 'credit-arena',
    desc: 'Six model families scored on the UCI credit-card default data (30,000 accounts) and compared on discrimination, calibration, business cost, and fair-lending behaviour. Paired bootstrap tests decide what counts as better: gradient boosting beats logistic regression by +0.0275 AUC (95% CI 0.0187 to 0.0369), while its lead over the random forest, ensemble, and segment specialists is not statistically separable. Sex is excluded from the features and used only in a post-hoc audit.',
    pills: ['scikit-learn', 'Gradient Boosting', 'Calibration', 'Bootstrap CI', 'Fair Lending'],
    stat: '+0.0275 AUC, CI-tested',
  },
  {
    href: 'https://github.com/shaikn6/finance-agent-crew',
    group: 'fintech',
    domain: 'AI · Fintech', domainClass: styles.dAgents,
    name: 'Finance Agent Crew',
    desc: 'Turns a stock ticker into a sourced equity-research brief: an LLM-free gatherer fans out concurrently over SEC EDGAR (XBRL), Alpha Vantage, and news; three analyst agents — fundamental, sentiment, risk — run in parallel; a writer synthesizes a BUY / HOLD / SELL call with bull and bear cases. Non-fatal error handling, CI, Docker.',
    pills: ['Python', 'asyncio', 'Claude', 'SEC EDGAR', 'Alpha Vantage', 'FastAPI'],
    stat: '3 analyst agents, parallel',
  },
  {
    href: 'https://github.com/shaikn6/fintech-devsecops-pipeline',
    group: 'infra',
    domain: 'DevSecOps · Fintech', domainClass: styles.dCloud,
    name: 'Fintech DevSecOps Pipeline',
    desc: 'DevSecOps platform for fintech workloads — Terraform on AWS EKS, Helm + ArgoCD GitOps, Checkov IaC scanning, OPA/Rego admission policies, RBAC, and NetworkPolicies enforcing least-privilege by default.',
    pills: ['Terraform', 'AWS EKS', 'ArgoCD', 'OPA', 'Checkov'],
    stat: 'Policy-gated GitOps',
  },
  {
    href: 'https://github.com/shaikn6/llm-safety-auditor',
    group: 'infra',
    demo: { label: 'Live demo', href: 'https://huggingface.co/spaces/9mark9/llm-safety-auditor' },
    domain: 'AI Safety', domainClass: styles.dSafety,
    name: 'LLM Safety Auditor',
    desc: 'Reproducible red-teaming harness: 250+ adversarial vectors (50 seed templates × 6 mutation strategies), a 6-layer safety detector, OWASP LLM Top 10 scoring, and compliance-grade PDF reports. Runs key-free against a seeded mock LLM or a live provider. Live demo on Hugging Face Spaces.',
    pills: ['Python', 'OWASP LLM Top 10', 'Red-Teaming', 'FastAPI', 'Streamlit', 'ReportLab'],
    stat: '479 tests · live HF demo',
  },
  {
    href: 'https://github.com/shaikn6/exec-rl',
    group: 'fintech',
    domain: 'ML · Fintech', domainClass: styles.dMl,
    name: 'exec-rl',
    desc: 'Optimal trade execution on a simulated market with price impact and a predictive signal: a from-scratch PPO agent against TWAP, Almgren-Chriss, and the exact optimum computed by a Riccati recursion. The honest result: a two-parameter rule tuned on training paths beats every PPO seed wherever there is a signal.',
    pills: ['PyTorch', 'PPO', 'Almgren-Chriss', 'Dynamic Programming', 'Simulation'],
    stat: 'RL vs the exact optimum',
  },
  {
    href: 'https://github.com/shaikn6/trade-arena',
    group: 'fintech',
    domain: 'ML · Fintech', domainClass: styles.dMl,
    name: 'trade-arena',
    desc: 'Walk-forward backtest of trading rules and ML models on 10 stocks, ETFs and crypto, net of transaction costs, with a shuffled-label control. Nothing beat buy-and-hold on average, and the write-up says so: the models matched it before costs and their turnover made them worse after.',
    pills: ['scikit-learn', 'Walk-Forward', 'Transaction Costs', 'Shuffled-Label Control'],
    stat: 'Nothing beat buy-and-hold',
  },
  {
    href: 'https://github.com/shaikn6/nano-finbert',
    group: 'ml',
    demo: { label: 'Companion model', href: 'https://huggingface.co/9mark9/finbert-minilm-sentiment' },
    domain: 'ML · Fintech', domainClass: styles.dMl,
    name: 'nano-finbert',
    desc: 'A 1.88M-parameter transformer encoder built entirely from scratch on financial text — custom BPE tokenizer, hand-written multi-head attention, own training loop, no pretrained weights, no HuggingFace dependency (after Karpathy’s nanoGPT, every component annotated). Companion fine-tuned model published to Hugging Face at 95.3% held-out accuracy (macro-F1 0.94).',
    pills: ['PyTorch', 'from-scratch Transformer', 'BPE', 'NLP', 'Fintech'],
    stat: '1.88M params · from scratch',
  },
  {
    href: 'https://github.com/shaikn6/georisk-agent',
    group: 'ml',
    demo: { label: 'Live demo', href: 'https://georisk-agent.vercel.app' },
    domain: 'GeoAI', domainClass: styles.dClinical,
    name: 'georisk-agent',
    desc: 'Physical-risk screening for a US site from satellite data: pulls a recent Sentinel-2 scene, the Copernicus elevation model, and the high-voltage grid map, then returns calibrated flood and wildfire probabilities with their track record and drivers. Validated on held-out regions against FEMA flood zones and USGS fire perimeters (flood AUC 0.866; 0.856 when trained without Ohio and tested there). Imagery sources fail over behind circuit breakers. Live demo at georisk-agent.vercel.app.',
    pills: ['Sentinel-2', 'FastAPI', 'Calibration', 'FEMA / USGS', 'GeoAI'],
    stat: 'Flood AUC 0.866',
  },
  {
    href: 'https://github.com/shaikn6/mcp-diagram-agent',
    group: 'llm',
    domain: 'AI Engineering', domainClass: styles.dAgents,
    name: 'MCP Diagram Agent',
    desc: 'Model Context Protocol server that turns a plain-text system description into a production-ready Excalidraw architecture diagram via Claude. Fully typed MCP tool surface with a 95% coverage gate and strict mypy + ruff CI.',
    pills: ['MCP', 'Claude', 'Excalidraw', 'FastAPI', 'mypy'],
    stat: '95% coverage gate',
  },
  {
    href: 'https://github.com/shaikn6/nvidia-nim-rag-techniques',
    group: 'llm',
    domain: 'AI Engineering', domainClass: styles.dAgents,
    name: 'NVIDIA NIM RAG Techniques',
    desc: 'Five production RAG optimization techniques powered by NVIDIA NIM — hybrid search with RRF, cross-encoder reranking, query rewriting (HyDE / multi-query / step-back), context compression, and corrective RAG via LangGraph.',
    pills: ['NVIDIA NIM', 'LangGraph', 'RRF', 'Cross-Encoder', 'HyDE'],
    stat: '99% coverage · 5 techniques',
  },
  {
    href: 'https://github.com/shaikn6/on-device-llm-optimizer',
    group: 'ml',
    domain: 'AI Engineering', domainClass: styles.dAgents,
    name: 'On-Device LLM Optimizer',
    desc: 'A complete pipeline for shrinking an LLM to run on a phone or laptop: knowledge distillation from Phi-3 Mini (3.8B) into a 236M student model on Apple MLX, INT4 quantization, and CoreML export. The architecture and each stage are test-verified; the repo ships the pipeline, not trained checkpoints, and labels its benchmark table as targets.',
    pills: ['MLX', 'CoreML', 'Knowledge Distillation', 'INT4 Quantization', 'PyTorch'],
    stat: '3.8B → 236M pipeline',
  },
]

const FILTERS: { id: 'all' | Group; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'fintech', label: 'Fintech' },
  { id: 'llm', label: 'LLM & Agents' },
  { id: 'ml', label: 'ML Research' },
  { id: 'infra', label: 'Security & Infra' },
]

const MAX_TILT = 7

function ProjectCard({ project, delay, featured }: { project: Project; delay: number; featured?: boolean }) {
  const cardRef = useRef<HTMLElement>(null)
  const rafRef = useRef<number | null>(null)

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
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
      <article
        ref={cardRef}
        className={`${styles.card} ${featured ? styles.featured : ''}`}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div className={styles.cardHeader}>
          <span className={`${styles.domain} ${project.domainClass}`}>{project.domain}</span>
          <span className={styles.arrow} aria-hidden="true">↗</span>
        </div>
        <h3 className={styles.name}>
          <a className={styles.nameLink} href={project.href} target="_blank" rel="noopener noreferrer">
            {project.name}
          </a>
        </h3>
        <div className={styles.desc}>{project.desc}</div>
        <div className={styles.pills}>
          {project.pills.map((p) => <span key={p} className={styles.pill}>{p}</span>)}
        </div>
        <div className={styles.footer}>
          {project.demo ? (
            <a className={styles.demo} href={project.demo.href} target="_blank" rel="noopener noreferrer">
              <span className={styles.liveDot} aria-hidden="true" />{project.demo.label}
            </a>
          ) : (
            <span className={styles.live}><span className={styles.liveDot} aria-hidden="true" />Live repo</span>
          )}
          <span>{project.stat}</span>
        </div>
      </article>
    </ScrollReveal>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState<'all' | Group>('all')
  const visible = filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.group === filter)

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.wrap}>
        <ScrollReveal><div className={styles.sectionTag}>Projects</div></ScrollReveal>
        <ScrollReveal delay={0.05}><h2 className={styles.sectionH}>Things I've actually built.</h2></ScrollReveal>
        <ScrollReveal delay={0.08}>
          <p className={styles.sectionSub}>
            Fintech systems first: ledgers, credit risk, execution and sentiment, then the LLM platforms and
            infrastructure around them. Real code, real tests, CI green on every repo.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className={styles.filters} role="group" aria-label="Filter projects">
            {FILTERS.map((f) => {
              const count = f.id === 'all' ? PROJECTS.length : PROJECTS.filter((p) => p.group === f.id).length
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={filter === f.id}
                  className={`${styles.filter} ${filter === f.id ? styles.filterActive : ''}`}
                  onClick={() => setFilter(f.id)}
                >
                  {f.label}<span className={styles.filterCount}>{count}</span>
                </button>
              )
            })}
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {visible.map((p, i) => (
            <ProjectCard key={p.href} project={p} delay={Math.min(i, 6) * 0.05} featured={filter === 'all' && i === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}
