import { useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'
import styles from './Research.module.css'

interface Finding {
  figure: string
  area: string
  claim: string
  source: string
  href: string
}

interface Paper {
  title: string
  question: string
  status: string
  artifact?: { label: string; href: string }
}

interface Contribution {
  project: string
  change: string
  href: string
}

type TabId = 'findings' | 'papers' | 'oss'

// Every figure below is taken from the linked repository's README or results files.
const FINDINGS: Finding[] = [
  {
    figure: '0.618',
    area: 'Agent memory',
    claim: 'of the evidence lands in the top 5 memories when the ranking is learned from feedback, against 0.545 for the best hand-set rule, on LoCoMo conversations the learner never saw. On LongMemEval it ties the best rule.',
    source: 'lethe',
    href: 'https://github.com/shaikn6/lethe',
  },
  {
    figure: '68–92%',
    area: 'LLM robustness',
    claim: 'of items: a planted annotation pushes a fine-tuned 0.5B sentiment model to "Bullish" in every one of five markets tested. A larger model resists that phrasing and falls to a different one.',
    source: 'fin-lora',
    href: 'https://github.com/shaikn6/fin-lora',
  },
  {
    figure: '−63%',
    area: 'LLM cost',
    claim: 'average latency when a confidence cascade sends only uncertain items to the fine-tuned LLM, for 0.4 points of accuracy.',
    source: 'fin-lora cascade',
    href: 'https://github.com/shaikn6/fin-lora',
  },
  {
    figure: 'GHSA',
    area: 'AI-agent security',
    claim: 'reporter credit for a sandbox bypass in an AI-agent code executor. Further reports are under coordinated disclosure.',
    source: 'advisory',
    href: 'https://github.com/femto/minion/security/advisories/GHSA-m5v3-6ccr-cfgx',
  },
]

const PAPERS: Paper[] = [
  {
    title: 'When Vendoring Defeats the Patch',
    question: 'A sandbox bypass in a widely used agent framework survives in copied code downstream. How far does it spread, and why do fixes not follow it?',
    status: 'Draft complete · disclosure in progress',
    artifact: { label: 'Published advisory', href: 'https://github.com/femto/minion/security/advisories/GHSA-m5v3-6ccr-cfgx' },
  },
  {
    title: 'Fragile in Different Ways',
    question: 'How often do small financial sentiment models change their answer under harmless rewording or a planted label, across equities, central-bank statements, oil, gold and crypto?',
    status: 'Draft',
    artifact: { label: 'Code and results', href: 'https://github.com/shaikn6/fin-lora' },
  },
  {
    title: 'The Weakest Link',
    question: 'Word-level attacks on a confidence-gated cascade for financial sentiment: does the cheap model that decides when to call the expensive one become the attack surface?',
    status: 'Draft',
  },
]

const MERGED: Contribution[] = [
  { project: 'crewAIInc/crewAI', change: 'Fixed Anthropic streaming so a returned tool call reports the call as completed (a bug I found and reported)', href: 'https://github.com/crewAIInc/crewAI/pull/8061' },
  { project: 'WingedGuardian/GENesis-AGI', change: 'Made upload cancel refuse paths and symlinks that lead outside the upload directory', href: 'https://github.com/WingedGuardian/GENesis-AGI/pull/2960' },
  { project: 'PrefectHQ/prefect', change: 'Fixed the WorkPoolUpdate import in the ECS guide', href: 'https://github.com/PrefectHQ/prefect/pull/23367' },
  { project: 'crewAIInc/crewAI', change: 'Fixed the RagTool and XMLSearchTool README imports', href: 'https://github.com/crewAIInc/crewAI/pull/8033' },
  { project: 'temporalio/sdk-python', change: 'Fixed the ClientConfig import in the README', href: 'https://github.com/temporalio/sdk-python/pull/1955' },
  { project: 'ray-project/ray', change: 'Fixed broken import samples in the RLlib and Tune scheduler guides', href: 'https://github.com/ray-project/ray/pull/66918' },
  { project: 'litestar-org/litestar', change: 'Fixed the MemoryChannelsBackend import in the channels guide', href: 'https://github.com/litestar-org/litestar/pull/5126' },
  { project: 'jackc/pgx', change: 'Corrected the documented pool_max_conns default', href: 'https://github.com/jackc/pgx/pull/2638' },
  { project: 'mlflow/mlflow', change: 'Fixed the trace import in the lightweight tracing SDK guide', href: 'https://github.com/mlflow/mlflow/pull/26613' },
  { project: 'langroid/langroid', change: 'Fixed the QdrantDBConfig import in an example', href: 'https://github.com/langroid/langroid/pull/1209' },
  { project: 'pyproj4/pyproj', change: 'Documented the None return for late-binding transformers', href: 'https://github.com/pyproj4/pyproj/pull/1637' },
  { project: 'nipy/nibabel', change: 'Clarified what BrainModelAxis.iter_structures yields', href: 'https://github.com/nipy/nibabel/pull/1550' },
  { project: 'stac-utils/pystac', change: 'Updated docs for the STAC v1.1.0 default', href: 'https://github.com/stac-utils/pystac/pull/1803' },
  { project: 'stac-utils/pystac-client', change: 'Corrected the limit parameter default', href: 'https://github.com/stac-utils/pystac-client/pull/931' },
  { project: 'nazrulworld/fhir.resources', change: 'Removed an orphaned link target from the README', href: 'https://github.com/nazrulworld/fhir.resources/pull/211' },
  { project: 'suguobin2021/backtest-integrity-guard', change: 'Reported malformed freeze manifests without a traceback', href: 'https://github.com/suguobin2021/backtest-integrity-guard/pull/33' },
  { project: 'jiegui2025/hwspec', change: 'Named AMD family 17h model 47h (Cyan Skillfish)', href: 'https://github.com/jiegui2025/hwspec/pull/75' },
]

const TABS: { id: TabId; label: string; count: number }[] = [
  { id: 'findings', label: 'Findings', count: FINDINGS.length },
  { id: 'papers', label: 'Working papers', count: PAPERS.length },
  { id: 'oss', label: 'Open source', count: MERGED.length },
]

const OPEN_PRS_URL = 'https://github.com/search?q=author%3Ashaikn6+is%3Apr+is%3Aopen+-user%3Ashaikn6&type=pullrequests'

function Findings() {
  return (
    <ol className={styles.ledger}>
      {FINDINGS.map((f) => (
        <li key={f.source} className={styles.row}>
          <a className={styles.rowLink} href={f.href} target="_blank" rel="noopener noreferrer">
            <span className={styles.figure}>{f.figure}</span>
            <span className={styles.body}>
              <span className={styles.area}>{f.area}</span>
              <span className={styles.claim}>{f.claim}</span>
            </span>
            <span className={styles.source}>{f.source}<span className={styles.arrow} aria-hidden="true">↗</span></span>
          </a>
        </li>
      ))}
    </ol>
  )
}

function Papers() {
  return (
    <>
      <p className={styles.note}>
        Doctoral research (DBA, Applied AI). These are working papers in preparation; none has been peer reviewed yet.
      </p>
      <ol className={styles.papers}>
        {PAPERS.map((p, i) => (
          <li key={p.title} className={styles.paper}>
            <span className={styles.paperIndex}>{String(i + 1).padStart(2, '0')}</span>
            <div className={styles.paperBody}>
              <h3 className={styles.paperTitle}>{p.title}</h3>
              <p className={styles.paperQuestion}>{p.question}</p>
              <div className={styles.paperMeta}>
                <span className={styles.status}>{p.status}</span>
                {p.artifact && (
                  <a className={styles.artifact} href={p.artifact.href} target="_blank" rel="noopener noreferrer">
                    {p.artifact.label}<span className={styles.arrow} aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </>
  )
}

function OpenSource() {
  return (
    <>
      <ul className={styles.merged}>
        {MERGED.map((c) => (
          <li key={c.href}>
            <a className={styles.mergedLink} href={c.href} target="_blank" rel="noopener noreferrer">
              <span className={styles.mergedState}>Merged</span>
              <span className={styles.mergedProject}>{c.project}</span>
              <span className={styles.mergedChange}>{c.change}</span>
              <span className={styles.arrow} aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ul>
      <p className={styles.note}>
        In review: native Groq, Fireworks and Together providers for crewAI, and fixes to broken documentation
        samples in Ray, MLflow, Dagster, Hugging Face Datasets, Feast and LlamaIndex.{' '}
        <a className={styles.inlineLink} href={OPEN_PRS_URL} target="_blank" rel="noopener noreferrer">
          See every open pull request
        </a>
        .
      </p>
    </>
  )
}

export default function Research() {
  const [active, setActive] = useState<TabId>('findings')
  const baseId = useId()
  const tabRefs = useRef<Record<TabId, HTMLButtonElement | null>>({ findings: null, papers: null, oss: null })

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const order = TABS.map((t) => t.id)
    const step = e.key === 'ArrowRight' ? 1 : -1
    const next = order[(order.indexOf(active) + step + order.length) % order.length]
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <section id="research" className={styles.section}>
      <div className={styles.wrap}>
        <ScrollReveal><div className={styles.sectionTag}>Research</div></ScrollReveal>
        <ScrollReveal delay={0.05}><h2 className={styles.sectionH}>What the experiments showed.</h2></ScrollReveal>
        <ScrollReveal delay={0.08}>
          <p className={styles.sectionSub}>
            Measured results from LLM, agent-memory and AI-security studies, the papers they feed, and what has been merged upstream.
            Each figure links to the code that produced it.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className={styles.tabs} role="tablist" aria-label="Research" onKeyDown={onKeyDown}>
            {TABS.map((t) => (
              <button
                key={t.id}
                ref={(el) => { tabRefs.current[t.id] = el }}
                id={`${baseId}-tab-${t.id}`}
                role="tab"
                type="button"
                aria-selected={active === t.id}
                aria-controls={`${baseId}-panel-${t.id}`}
                tabIndex={active === t.id ? 0 : -1}
                className={`${styles.tab} ${active === t.id ? styles.tabActive : ''}`}
                onClick={() => setActive(t.id)}
              >
                {t.label}
                <span className={styles.count}>{String(t.count).padStart(2, '0')}</span>
                {active === t.id && <motion.span layoutId="research-tab-rule" className={styles.tabRule} />}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            id={`${baseId}-panel-${active}`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${active}`}
            className={styles.panel}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            {active === 'findings' && <Findings />}
            {active === 'papers' && <Papers />}
            {active === 'oss' && <OpenSource />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
