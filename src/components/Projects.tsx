import { useRef, useCallback, useState } from 'react'
import ScrollReveal from './ScrollReveal'
import styles from './Projects.module.css'

type Group = 'llm' | 'agents' | 'safety' | 'ml'

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

// Featured order. Each card leads with its result; every figure comes from the linked repository.
const PROJECTS: Project[] = [
  {
    href: 'https://github.com/shaikn6/lethe',
    group: 'agents',
    demo: { label: 'Live demo', href: 'https://huggingface.co/spaces/9mark9/lethe-agent-memory' },
    domain: 'Agent Memory', domainClass: styles.dAgents,
    name: 'lethe',
    desc: 'Puts 0.707 of the evidence in the top 10 on held-out LoCoMo conversations, against 0.641 for the best hand-set rule; on LongMemEval it only ties that rule. A memory server for AI agents: after each recall the agent reports whether the memories helped, and a small reinforcement-learning policy shifts the ranking. The first learner lost (0.611) because new memories were never tried; forced exploration fixed it. One Go binary with a crash-safe journal and Python, LangChain and MCP adapters.',
    pills: ['Go', 'Reinforcement Learning', 'LangChain', 'MCP', 'Python'],
    stat: '0.707 vs 0.641 held-out · ~8,700 req/s',
  },
  {
    href: 'https://github.com/shaikn6/llm-gateway',
    group: 'llm',
    domain: 'LLMOps', domainClass: styles.dCloud,
    name: 'LLM Gateway',
    desc: 'One OpenAI-style chat endpoint over Claude, OpenAI and local Ollama, with 428 tests at 99% line coverage. Per-tenant response caching, rate limiting, deterministic A/B routing, per-key cost tracking and audit logging in one FastAPI service; provider calls are checked against the real SDK method signatures in CI.',
    pills: ['FastAPI', 'Claude', 'OpenAI', 'Ollama', 'Redis'],
    stat: '428 tests · 99% coverage',
  },
  {
    href: 'https://github.com/shaikn6/fin-lora',
    group: 'llm',
    demo: { label: 'Hugging Face model', href: 'https://huggingface.co/9mark9/fin-lora-news-qwen2.5-0.5b' },
    domain: 'Fine-Tuning', domainClass: styles.dMl,
    name: 'fin-lora',
    desc: '84.7% on 2,000 LLM-labelled news snippets against 73.6% for zero-shot FinBERT, and 76.8% against 71.2% on 267 human-labelled headlines. LoRA-tuned Qwen2.5-0.5B for financial sentiment, benchmarked against TF-IDF and FinBERT. A confidence cascade sends only uncertain items to the LLM, cutting average latency 63% for 0.4 points of accuracy; a follow-up study measures how easily planted labels flip each model across five markets.',
    pills: ['PyTorch', 'LoRA / PEFT', 'Qwen2.5', 'FinBERT', 'Hugging Face'],
    stat: '84.7% vs 73.6% FinBERT',
  },
  {
    href: 'https://github.com/shaikn6/llm-safety-auditor',
    group: 'safety',
    demo: { label: 'Live demo', href: 'https://huggingface.co/spaces/9mark9/llm-safety-auditor' },
    domain: 'LLM Safety', domainClass: styles.dSafety,
    name: 'LLM Safety Auditor',
    desc: 'Scores an LLM against the OWASP LLM Top 10, with 635 tests behind it: 50 curated adversarial attacks (350 with mutations), a 6-layer safety detector and PDF audit reports. Runs key-free against a seeded mock LLM; detector recall is measured on that mock, and the README shows where it is weaker on real text. Adapters for Anthropic and OpenAI-compatible endpoints are included.',
    pills: ['Python', 'OWASP LLM Top 10', 'Red-Teaming', 'FastAPI', 'Streamlit'],
    stat: '635 tests · live HF demo',
  },
  {
    href: 'https://github.com/shaikn6/readme-truth',
    group: 'safety',
    domain: 'Engineering Tools', domainClass: styles.dCloud,
    name: 'readme-truth',
    desc: 'Catches READMEs that no longer match the code: a hand audit of 22 repositories found 15 had drifted. It turns a README into verifiable claims (test counts, versions, paths, commands, links, licence) and checks each one against the repository. Deterministic, offline and standard-library only; runs as a CLI or a GitHub Action.',
    pills: ['Python', 'GitHub Actions', 'CLI', 'Static Analysis'],
    stat: '52 tests',
  },
  {
    href: 'https://github.com/shaikn6/finance-agent-crew',
    group: 'agents',
    domain: 'Multi-Agent', domainClass: styles.dAgents,
    name: 'Finance Agent Crew',
    desc: 'Turns a stock ticker into a sourced research brief, with 333 tests and an offline mode that needs no API keys. An LLM-free gatherer fans out concurrently over SEC EDGAR, market data and news; fundamental, sentiment and risk agents run in parallel; a writer agent synthesizes a BUY / HOLD / SELL call with bull and bear cases. Typed Pydantic outputs throughout.',
    pills: ['Python', 'asyncio', 'Claude', 'Pydantic', 'FastAPI'],
    stat: '333 tests · 99% coverage',
  },
  {
    href: 'https://github.com/shaikn6/nvidia-nim-rag-techniques',
    group: 'llm',
    domain: 'RAG', domainClass: styles.dMl,
    name: 'NVIDIA NIM RAG Techniques',
    desc: 'Cross-encoder reranking lifted recall@1 from 0.857 to 0.964 over naive dense retrieval on a small 28-query labelled set, too small to rank the techniques. Five RAG techniques on NVIDIA NIM: hybrid search with RRF, cross-encoder reranking, query rewriting (HyDE / multi-query / step-back), context compression and corrective RAG via LangGraph.',
    pills: ['NVIDIA NIM', 'LangGraph', 'RRF', 'Cross-Encoder', 'HyDE'],
    stat: 'recall@1 0.857 → 0.964',
  },
  {
    href: 'https://github.com/shaikn6/sigdet',
    group: 'ml',
    domain: 'Computer Vision', domainClass: styles.dMl,
    name: 'sigdet',
    desc: '0.939 ± 0.005 test mAP50-95 over 3 seeds for YOLO11n on a leakage-aware split; the larger YOLO11s scored 0.859 ± 0.041, so the smaller model was better and more stable. Document signature detection with hash-checked splits (26 test images) and a robustness study under scan corruptions.',
    pills: ['PyTorch', 'YOLO11', 'Computer Vision', 'Multi-Seed Evaluation'],
    stat: '0.939 ± 0.005 mAP50-95',
  },
  {
    href: 'https://github.com/shaikn6/exec-rl',
    group: 'ml',
    domain: 'Reinforcement Learning', domainClass: styles.dMl,
    name: 'exec-rl',
    desc: '0.22 bps mean implementation shortfall against 18.8 bps for TWAP and Almgren-Chriss on 20,000 held-out simulated paths, 3 seeds, when an alpha signal is present; without the signal PPO is no better than TWAP. A from-scratch PPO agent that sells a 100,000-share position over 20 steps. Simulation only.',
    pills: ['PyTorch', 'PPO', 'Reinforcement Learning', 'Simulation'],
    stat: '0.22 vs 18.8 bps (simulated)',
  },
  {
    href: 'https://github.com/shaikn6/guard-gap-detector',
    group: 'safety',
    domain: 'Agent Security', domainClass: styles.dSafety,
    name: 'guard-gap-detector',
    desc: 'Separates all 3 vulnerable fixtures from all 5 clean ones on its synthetic corpus. A read-only static detector for a sandbox-guard gap in the AST-walking restricted Python interpreters that AI agents use to run code; no third-party code and no exploit. Artifact for the working paper “When Vendoring Defeats the Patch”.',
    pills: ['Python', 'AST', 'Static Analysis', 'AI Agents'],
    stat: 'Paper artifact',
  },
]

const FILTERS: { id: 'all' | Group; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'llm', label: 'LLM Systems' },
  { id: 'agents', label: 'Agents' },
  { id: 'safety', label: 'Safety, Evaluation & Tools' },
  { id: 'ml', label: 'Vision & RL' },
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
            Agent memory, LLM systems and evaluation first, then computer vision and reinforcement learning.
            Each card leads with its result; every number comes from the linked repository.
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
