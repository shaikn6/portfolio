import { useRef, useCallback, useState } from 'react'
import ScrollReveal from './ScrollReveal'
import styles from './Projects.module.css'
import { FILTERS, PROJECTS, type Group, type Project } from '../data/projects'

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
            Fintech LLM systems, agents and credit risk first, then evaluation, computer vision and reinforcement learning.
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
