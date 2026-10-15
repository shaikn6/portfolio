import ScrollReveal from './ScrollReveal'
import styles from './Skills.module.css'

const SKILL_BLOCKS = [
  {
    title: 'LLMs & Fine-Tuning',
    tags: ['Claude', 'OpenAI', 'Qwen2.5', 'Hugging Face', 'LoRA / PEFT', 'Knowledge Distillation', 'INT4 Quantization', 'Apple MLX', 'vLLM', 'Ollama'],
  },
  {
    title: 'Agentic AI',
    tags: ['LangGraph', 'CrewAI', 'Multi-Agent Systems', 'MCP', 'Tool Calling', 'Agent Memory', 'Pydantic Structured Outputs', 'Async Pipelines'],
  },
  {
    title: 'RAG & Retrieval',
    tags: ['LangChain', 'Embeddings', 'Pinecone', 'FAISS', 'BM25 Hybrid Search', 'Reranking', 'HyDE', 'Corrective RAG', 'Semantic Caching', 'NVIDIA NIM'],
  },
  {
    title: 'Evaluation & Safety',
    tags: ['RAGAS', 'LLM-as-Judge', 'A/B Testing', 'Robustness Testing', 'OWASP LLM Top 10', 'Red-Teaming', 'Prompt Injection', 'Sandbox-Bypass Research', 'Coordinated Disclosure', 'Presidio PII'],
  },
  {
    title: 'LLMOps & Cloud',
    tags: ['FastAPI', 'Redis', 'Docker', 'Kubernetes', 'ArgoCD', 'GitHub Actions', 'MLflow', 'AWS SageMaker / EKS', 'GCP Vertex AI', 'Terraform'],
  },
  {
    title: 'ML & Languages',
    tags: ['PyTorch', 'BERT', 'XGBoost', 'scikit-learn', 'Reinforcement Learning (PPO)', 'Python', 'Go', 'SQL', 'JavaScript'],
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
        <ScrollReveal delay={0.05}><h2 className={styles.sectionH}>LLM systems, end to end.</h2></ScrollReveal>
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
