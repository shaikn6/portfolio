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
    title: 'Healthcare AI & Compliance',
    tags: ['HIPAA-aware PHI Handling', 'PHI Redaction (Presidio)', 'DICOM / pydicom', 'Grad-CAM / ScoreCAM', 'Clinical NLP', 'MIMIC-III', 'Survival Analysis'],
  },
  {
    title: 'Data Governance & Security',
    tags: ['NCUA / SOC 2-aware', 'ECOA / Fair-Lending', 'AES-256', 'IAM least-privilege', 'CloudTrail audit', 'OPA / Conftest', 'Checkov', 'Gitleaks', 'SLSA'],
  },
  {
    title: 'Data Engineering & Languages',
    tags: ['Kafka', 'Spark / PySpark', 'dbt', 'Snowflake', 'Redshift', 'Oracle SQL / PL-SQL', 'Python', 'SQL', 'Bash'],
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
        <ScrollReveal delay={0.05}><h2 className={styles.sectionH}>Full ML lifecycle fluency.</h2></ScrollReveal>
        <ScrollReveal delay={0.08}>
          <p className={styles.sectionSub}>From raw data to deployed, monitored model — across cloud platforms.</p>
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
