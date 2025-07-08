import ScrollReveal from './ScrollReveal'
import styles from './Skills.module.css'

const SKILL_BLOCKS = [
  {
    title: 'LLMs & AI Agents',
    tags: ['LangChain', 'LangGraph', 'RAG', 'FAISS', 'Prompt Engineering', 'OWASP LLM Top 10', 'Hallucination Detection', 'Red-teaming'],
  },
  {
    title: 'Machine Learning',
    tags: ['PyTorch', 'HuggingFace', 'scikit-learn', 'XGBoost', 'SHAP / LIME', 'Opacus (DP-SGD)', 'Flower (FL)', 'Grad-CAM'],
  },
  {
    title: 'MLOps & Infrastructure',
    tags: ['MLflow', 'Airflow', 'SageMaker', 'Evidently AI', 'Docker', 'GitHub Actions', 'FastAPI', 'Terraform'],
  },
  {
    title: 'Data Engineering',
    tags: ['Apache Kafka', 'Apache Spark', 'dbt', 'Snowflake', 'Redis', 'PostgreSQL', 'Redshift', 'SQL Lineage'],
  },
  {
    title: 'Cloud & Languages',
    tags: ['AWS', 'GCP', 'Azure', 'Python', 'SQL / PL-SQL', 'Bash', 'Scala'],
  },
  {
    title: 'Security & Governance',
    tags: ['HIPAA', 'GDPR', 'ECOA / Fair Lending', 'PII Redaction', 'Differential Privacy', 'Audit Logging', 'FHIR R4'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className={styles.section}>
      <div className={styles.wrap}>
        <ScrollReveal><div className={styles.sectionTag}>Skills</div></ScrollReveal>
        <ScrollReveal delay={0.05}><h2 className={styles.sectionH}>Full ML lifecycle fluency.</h2></ScrollReveal>
        <ScrollReveal delay={0.08}>
          <p className={styles.sectionSub}>From raw data to deployed, monitored model — across cloud platforms.</p>
        </ScrollReveal>

        <div className={styles.grid}>
          {SKILL_BLOCKS.map((block, i) => (
            <ScrollReveal key={block.title} delay={i * 0.07}>
              <div className={styles.block}>
                <div className={styles.blockTitle}>{block.title}</div>
                <div className={styles.tags}>
                  {block.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
