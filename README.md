# Nagizaaz Shaik — Portfolio

**Live site:** [nagizaaz.vercel.app](https://nagizaaz.vercel.app/)

Single-page portfolio for a generative AI engineer working in fintech —
RAG pipelines, LLM gateways, agentic workflows and AWS ML platforms.

## Stack

- **React 18 + TypeScript + Vite**
- **Framer Motion** + Lenis smooth scroll, `three.js` hero scene (deferred to idle)
- CSS Modules, design tokens, dark canvas with critical inline CSS for fast LCP
- Deployed on **Vercel** — auto-deploys from `main`

## Develop

```bash
npm ci           # reproducible install from package-lock.json
npm run dev      # local dev server
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build
```

## Content

All site copy lives in the component files under `src/components/` — `Hero`,
`Manifesto`, `Marquee`, `Metrics`, `Experience`, `Projects`, `Research`, `Skills`,
`Education`, `Contact`. Headline numbers are in `Metrics`, project stats in
`Projects`, and findings, papers and merged pull requests in `Research`. The
search and social preview text is in `index.html`. Edit those directly; there
is no CMS.

## Featured projects

| Project | Focus |
|---------|-------|
| [`llm-gateway`](https://github.com/shaikn6/llm-gateway) | OpenAI-compatible multi-provider LLM gateway with caching, rate limits, A/B routing and cost tracking |
| [`lethe`](https://github.com/shaikn6/lethe) | Memory server for AI agents that learns from feedback which memories to return |
| [`llm-safety-auditor`](https://github.com/shaikn6/llm-safety-auditor) | Red-teaming harness — 50 curated attacks (350 with mutations), OWASP LLM Top 10, PDF reports |
| [`fin-lora`](https://github.com/shaikn6/fin-lora) | LoRA-tuned Qwen2.5 with a confidence cascade and a robustness study |
| [`finance-agent-crew`](https://github.com/shaikn6/finance-agent-crew) | Async multi-agent research over SEC EDGAR, market data and news |

## License

MIT — see [LICENSE](LICENSE).
