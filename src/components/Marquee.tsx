import styles from './Marquee.module.css'

const ITEMS = ['LLM Engineering', 'Generative AI', 'AI Agents', 'RAG', 'Agent Memory', 'LLMOps', 'LLM Evaluation', 'Red-Teaming', 'Fine-Tuning']

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
