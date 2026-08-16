import ScrollReveal from './ScrollReveal'
import styles from './Skills.module.css'

const SKILL_BLOCKS = [
  {
    title: 'LLM & Agentic AI',
    tags: ['RAG (Hybrid · Reranking · HyDE · CRAG)', 'LangGraph', 'CrewAI', 'MCP', 'Prompt Engineering', 'Semantic Caching', 'LLM Gateways', 'OWASP LLM Top 10', 'Red-Teaming'],
  },
  {
    title: 'LLMOps & Eval',
    tags: ['RAGAS', 'LLM-as-Judge', 'A/B Testing', 'Cost Analytics', 'Agent Observability', 'MLflow', 'NVIDIA NIM', 'vLLM / Ollama'],
  },
  {
    title: 'Machine Learning',
    tags: ['PyTorch', 'Transformers (from-scratch)', 'XGBoost', 'BERT', 'HuggingFace', 'scikit-learn', 'SHAP', 'SageMaker (Pipelines · Monitor)'],
  },
  {
    title: 'Cloud & MLOps',
    tags: ['AWS (SageMaker · EKS · Glue · Redshift)', 'GCP', 'Terraform', 'Airflow', 'Docker', 'Kubernetes', 'ArgoCD', 'CI/CD', 'FastAPI'],
  },
  {
    title: 'Data Governance & Security',
    tags: ['NCUA / SOC 2-aware', 'ECOA / Fair-Lending', 'PII (Presidio)', 'AES-256', 'IAM least-privilege', 'CloudTrail audit', 'OPA / Conftest', 'Checkov', 'Gitleaks', 'SLSA'],
  },
  {
    title: 'Data Engineering & Languages',
    tags: ['Kafka', 'Spark / PySpark', 'dbt', 'Snowflake', 'Redshift', 'Oracle SQL / PL-SQL', 'Python', 'SQL', 'Bash'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className={styles.section}>
      <svg className={styles.blobField} viewBox="0 0 1200 800" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="skillsBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="70" />
          </filter>
        </defs>
        <g filter="url(#skillsBlur)">
          <path className={styles.blobA} d="M180 120c110-60 260-40 330 60s30 240-90 290S150 500 90 400 70 180 180 120Z" fill="var(--color-accent)" fillOpacity="0.09" />
          <path className={styles.blobB} d="M980 480c90 50 130 170 60 250s-230 90-320 20-100-210-10-280 180-40 270 10Z" fill="var(--color-accent3)" fillOpacity="0.07" />
        </g>
      </svg>
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
