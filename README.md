# Nagizaaz Shaik — Portfolio

**Live site:** [nagizaaz.vercel.app](https://nagizaaz.vercel.app/)

Single-page portfolio for an AI / LLM engineer working in regulated fintech —
production GenAI systems, RAG pipelines, multi-agent orchestration, and the
secure LLMOps platforms that ship them.

## Stack

- **React 19 + TypeScript + Vite**
- **Framer Motion** + Lenis smooth scroll, `three.js` hero scene (deferred to idle)
- CSS Modules, design tokens, dark canvas with critical inline CSS for fast LCP
- Deployed on **Vercel** — auto-deploys from `main`

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build
```

## Content

All site copy lives in the component files under `src/components/` — `Hero`,
`Experience`, `Projects`, `Skills`, `Education`, `Contact`. Edit those directly;
there is no CMS.

## Featured projects

| Project | Focus |
|---------|-------|
| [`finance-agent-crew`](https://github.com/shaikn6/finance-agent-crew) | Async multi-agent equity research over SEC EDGAR + market data |
| [`llm-safety-auditor`](https://github.com/shaikn6/llm-safety-auditor) | Red-teaming harness — 250+ vectors, OWASP LLM Top 10, PDF reports |
| [`nano-finbert`](https://github.com/shaikn6/nano-finbert) | 1.88M-param transformer built from scratch on financial text |
| [`llm-gateway`](https://github.com/shaikn6/llm-gateway) | OpenAI-compatible multi-provider LLM proxy with caching + cost analytics |
| [`ledger-service`](https://github.com/shaikn6/ledger-service) | Double-entry accounting ledger — idempotent money movement over Postgres |

## License

MIT — see [LICENSE](LICENSE).
