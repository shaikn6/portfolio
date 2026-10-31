import styles from './Marquee.module.css'

const ITEMS = ['Generative AI', 'Agentic AI', 'Agent Memory', 'LLM Gateways', 'RAG', 'Fine-Tuning', 'LLM Evaluation', 'AI-Agent Security', 'ML Platforms']

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
