import { useRef, useCallback, useState } from 'react'
import ScrollReveal from './ScrollReveal'
import styles from './Projects.module.css'

type Group = 'llm' | 'agents' | 'safety'

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

// LLM systems, agents, then evaluation and safety. Every figure comes from the linked repository.
const PROJECTS: Project[] = [
  {
    href: 'https://github.com/shaikn6/finance-agent-crew',
    group: 'agents',
    domain: 'Multi-Agent', domainClass: styles.dAgents,
    name: 'Finance Agent Crew',
    desc: 'Turns a stock ticker into a sourced research brief: an LLM-free gatherer fans out concurrently over SEC EDGAR, market data and news; fundamental, sentiment and risk agents run in parallel; a writer agent synthesizes a BUY / HOLD / SELL call with bull and bear cases. Typed Pydantic outputs throughout.',
    pills: ['Python', 'asyncio', 'Claude', 'Pydantic', 'FastAPI'],
    stat: '333 tests · 99% coverage',
  },
  {
    href: 'https://github.com/shaikn6/llm-gateway',
    group: 'llm',
    domain: 'LLMOps', domainClass: styles.dCloud,
    name: 'LLM Gateway',
    desc: 'One OpenAI-style chat endpoint over Claude, OpenAI, and local Ollama backends — per-tenant response caching, rate limiting, deterministic A/B routing, per-key cost tracking, and audit logging behind a single FastAPI service. Provider calls are checked against the real SDK method signatures in CI.',
    pills: ['FastAPI', 'Claude', 'OpenAI', 'Ollama', 'Redis'],
    stat: '428 tests · 99% coverage',
  },
  {
    href: 'https://github.com/shaikn6/fin-lora',
    group: 'llm',
    demo: { label: 'Hugging Face model', href: 'https://huggingface.co/9mark9/fin-lora-news-qwen2.5-0.5b' },
    domain: 'Fine-Tuning', domainClass: styles.dMl,
    name: 'fin-lora',
    desc: 'LoRA-tunes Qwen2.5-0.5B for financial sentiment and benchmarks it against TF-IDF and zero-shot FinBERT: 84.7% on 2,000 news snippets vs 73.6% for FinBERT. A confidence cascade sends only uncertain items to the LLM, cutting average latency 63% for 0.4 points of accuracy. A follow-up study measures how easily planted labels flip each model across five markets.',
    pills: ['PyTorch', 'LoRA / PEFT', 'Qwen2.5', 'FinBERT', 'Hugging Face'],
    stat: '84.7% vs 73.6% FinBERT',
  },
  {
    href: 'https://github.com/shaikn6/lethe',
    group: 'agents',
    domain: 'Agent Memory', domainClass: styles.dAgents,
    name: 'lethe',
    desc: 'A memory server for AI agents that learns which memories to return. After each recall the agent reports whether the memories helped, and a small reinforcement-learning policy shifts the ranking. The first learner lost to a hand-set rule (0.611 vs 0.641 evidence in the top 10) because new memories were never tried; forced exploration fixed it: 0.707 on held-out LoCoMo conversations, at 7,119 requests/s. One Go binary with a crash-safe journal and Python, LangChain and MCP adapters.',
    pills: ['Go', 'Reinforcement Learning', 'LangChain', 'MCP', 'Python'],
    stat: '0.707 held-out evidence · 7,119 req/s',
  },
  {
    href: 'https://github.com/shaikn6/llm-safety-auditor',
    group: 'safety',
    demo: { label: 'Live demo', href: 'https://huggingface.co/spaces/9mark9/llm-safety-auditor' },
    domain: 'LLM Safety', domainClass: styles.dSafety,
    name: 'LLM Safety Auditor',
    desc: 'Reproducible red-teaming harness: 50 curated adversarial attacks (350 with mutations), a 6-layer safety detector, OWASP LLM Top 10 scoring, and PDF audit reports. Runs key-free against a seeded mock LLM; adapters for Anthropic and OpenAI-compatible endpoints are included.',
    pills: ['Python', 'OWASP LLM Top 10', 'Red-Teaming', 'FastAPI', 'Streamlit'],
    stat: '495 tests · live HF demo',
  },
  {
    href: 'https://github.com/shaikn6/guard-gap-detector',
    group: 'safety',
    domain: 'Agent Security', domainClass: styles.dSafety,
    name: 'guard-gap-detector',
    desc: 'Read-only static detector for a sandbox-guard gap in the AST-walking restricted Python interpreters that AI agents use to run code. Ships a synthetic test corpus, no third-party code and no exploit. Artifact for the working paper “When Vendoring Defeats the Patch”.',
    pills: ['Python', 'AST', 'Static Analysis', 'AI Agents'],
    stat: 'Paper artifact',
  },
  {
    href: 'https://github.com/shaikn6/nvidia-nim-rag-techniques',
    group: 'llm',
    domain: 'RAG', domainClass: styles.dMl,
    name: 'NVIDIA NIM RAG Techniques',
    desc: 'Five RAG optimization techniques on NVIDIA NIM — hybrid search with RRF, cross-encoder reranking, query rewriting (HyDE / multi-query / step-back), context compression, and corrective RAG via LangGraph.',
    pills: ['NVIDIA NIM', 'LangGraph', 'RRF', 'Cross-Encoder', 'HyDE'],
    stat: '5 techniques',
  },
  {
    href: 'https://github.com/shaikn6/mcp-diagram-agent',
    group: 'agents',
    domain: 'MCP', domainClass: styles.dAgents,
    name: 'MCP Diagram Agent',
    desc: 'Model Context Protocol server that turns a plain-text system description into an Excalidraw architecture diagram via Claude. Fully typed MCP tool surface with a 95% coverage gate and strict mypy + ruff CI.',
    pills: ['MCP', 'Claude', 'Excalidraw', 'FastAPI', 'mypy'],
    stat: '95% coverage gate',
  },
  {
    href: 'https://github.com/shaikn6/on-device-llm-optimizer',
    group: 'llm',
    domain: 'Efficient LLMs', domainClass: styles.dMl,
    name: 'On-Device LLM Optimizer',
    desc: 'A pipeline for shrinking an LLM to run on a laptop or phone: knowledge distillation from Phi-3 Mini (3.8B) into a 236M student on Apple MLX, INT4 quantization, and CoreML export. The repo ships the pipeline, not trained checkpoints, and labels its benchmark table as targets.',
    pills: ['MLX', 'CoreML', 'Knowledge Distillation', 'INT4 Quantization', 'PyTorch'],
    stat: '3.8B → 236M pipeline',
  },
]

const FILTERS: { id: 'all' | Group; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'llm', label: 'LLM Systems' },
  { id: 'agents', label: 'Agents' },
  { id: 'safety', label: 'Safety & Evaluation' },
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
            LLM systems and agents first, then the evaluation and safety work that keeps them honest.
            Real code and real tests; every number comes from the linked repository.
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
