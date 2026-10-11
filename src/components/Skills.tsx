import ScrollReveal from './ScrollReveal'
import styles from './Skills.module.css'

const SKILL_BLOCKS = [
  {
    title: 'Fintech & Risk',
    tags: ['Double-Entry Ledgers', 'Idempotent Money Movement', 'Credit-Risk Modelling', 'Calibration & Bootstrap CIs', 'Fair-Lending Testing (ECOA)', 'Walk-Forward Backtesting', 'Optimal Execution (TWAP · Almgren-Chriss)', 'Financial Sentiment', 'NCUA / SOC 2-aware'],
  },
  {
    title: 'LLM & Agentic AI',
    tags: ['RAG (Hybrid · Reranking · HyDE · CRAG)', 'LangGraph', 'CrewAI', 'MCP', 'LLM Gateways', 'Response Caching', 'LoRA / PEFT', 'RAGAS · LLM-as-Judge', 'Cost Analytics', 'NVIDIA NIM', 'vLLM / Ollama'],
  },
  {
    title: 'Machine Learning',
    tags: ['PyTorch', 'Transformers (from-scratch)', 'Knowledge Distillation', 'XGBoost', 'BERT', 'HuggingFace', 'scikit-learn', 'SHAP', 'SageMaker (Pipelines · Monitor)', 'MLflow'],
  },
  {
    title: 'Cloud & MLOps',
    tags: ['AWS (SageMaker · EKS · Glue · Redshift)', 'GCP', 'Terraform', 'Docker', 'Kubernetes', 'ArgoCD', 'GitHub Actions', 'Airflow', 'n8n', 'FastAPI'],
  },
  {
    title: 'AI Security & Governance',
    tags: ['OWASP LLM Top 10', 'Red-Teaming', 'Model Robustness Testing', 'Sandbox-Escape Research', 'Coordinated Disclosure', 'PII Handling (Presidio)', 'IAM least-privilege', 'OPA / Conftest', 'Checkov', 'Gitleaks'],
  },
  {
    title: 'Data Engineering & Languages',
    tags: ['Python', 'Go', 'SQL', 'PostgreSQL', 'Kafka', 'Spark / PySpark', 'dbt', 'Snowflake', 'Redshift', 'Oracle SQL / PL-SQL', 'Bash'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className={styles.section}>
      <div className={styles.blobField} aria-hidden="true">
        <div className={styles.blobA} />
        <div className={styles.blobB} />
      </div>
      <div className={styles.wrap}>
        <ScrollReveal><div className={styles.sectionTag}>Skills</div></ScrollReveal>
        <ScrollReveal delay={0.05}><h2 className={styles.sectionH}>Fintech depth, full ML lifecycle.</h2></ScrollReveal>
        <ScrollReveal delay={0.08}>
          <p className={styles.sectionSub}>Domain knowledge of money movement, credit and markets, on top of the full path from raw data to a deployed, monitored and secured model.</p>
        </ScrollReveal>

        <div className={styles.grid}>
          {SKILL_BLOCKS.map((block, i) => (
            <ScrollReveal key={block.title} delay={i * 0.07}>
              <div className={styles.block}>
                <div className={styles.blockTitle}>
                  <span className={styles.blockIndex}>{String(i + 1).padStart(2, '0')}</span>
                  {block.title}
                </div>
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
