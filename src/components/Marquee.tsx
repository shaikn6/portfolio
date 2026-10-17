import styles from './Marquee.module.css'

const ITEMS = ['Generative AI', 'Agentic AI', 'RAG Pipelines', 'AWS', 'LLM Gateways', 'Fintech', 'LLM Evaluation', 'AI-Agent Security', 'Fine-Tuning']

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS]
  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.track}>
        {row.map((t, i) => (
          <span className={styles.item} key={i}>
            {t}<span className={styles.dot}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
