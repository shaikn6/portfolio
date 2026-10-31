import ScrollReveal from './ScrollReveal'
import styles from './Skills.module.css'

const SKILL_BLOCKS = [
  {
    title: 'Generative AI',
    tags: ['Claude', 'OpenAI', 'Hugging Face', 'Qwen2.5', 'LoRA / PEFT', 'Prompt Engineering', 'Structured Outputs', 'LLM Gateways', 'vLLM', 'Ollama'],
  },
  {
    title: 'Agentic AI',
    tags: ['LangGraph', 'CrewAI', 'MCP', 'Tool Calling', 'Multi-Agent Orchestration', 'Agent Memory', 'Guardrails', 'Async Pipelines'],
  },
  {
    title: 'Deep Learning, Vision & RL',
    tags: ['PyTorch', 'Transformers', 'BERT', 'YOLO11', 'PPO', 'XGBoost', 'scikit-learn'],
  },
  {
    title: 'RAG Pipelines',
    tags: ['LangChain', 'Embeddings', 'Pinecone', 'FAISS', 'OpenSearch', 'BM25 Hybrid Search', 'Reranking', 'HyDE', 'Corrective RAG', 'Semantic Caching'],
  },
  {
    title: 'AWS',
    tags: ['Bedrock', 'SageMaker', 'Lambda', 'S3', 'Glue', 'Redshift', 'EKS', 'IAM', 'CloudWatch', 'VPC'],
  },
  {
    title: 'Evaluation & Safety',
    tags: ['RAGAS', 'LLM-as-Judge', 'Held-Out Tests', 'OWASP LLM Top 10', 'Red-Teaming', 'Prompt Injection', 'PII Redaction', 'Sandbox-Bypass Research', 'Coordinated Disclosure'],
  },
  {
    title: 'MLOps & Data',
    tags: ['Databricks', 'MLflow', 'Airflow', 'Kafka', 'FastAPI', 'Docker', 'Kubernetes', 'Terraform', 'ArgoCD', 'GitHub Actions', 'n8n'],
  },
  {
    title: 'Fintech & Languages',
    tags: ['Credit-Risk Modeling', 'ECOA Fair Lending', 'Regulatory Compliance', 'SHAP', 'Python', 'Go', 'SQL'],
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
        <ScrollReveal delay={0.05}><h2 className={styles.sectionH}>GenAI on AWS, end to end.</h2></ScrollReveal>
        <ScrollReveal delay={0.08}>
          <p className={styles.sectionSub}>From choosing and fine-tuning the model to retrieval, agents, evaluation, safety and the platform that serves them.</p>
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
