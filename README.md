# portfolio

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](package.json)
[![Live site](https://img.shields.io/badge/Live%20site-nagizaaz.vercel.app-FF9E0F)](https://nagizaaz.vercel.app)

**Source of [nagizaaz.vercel.app](https://nagizaaz.vercel.app): a single-page portfolio for generative AI engineering in fintech, built with React, TypeScript and Vite and deployed on Vercel.**

It covers RAG pipelines, LLM gateways, agentic workflows and AWS ML platforms,
with links to the code behind each project.

## Stack

- **React 18 + TypeScript + Vite**
- **Framer Motion** + Lenis smooth scroll, `three.js` hero scene (deferred to idle)
- CSS Modules, design tokens, dark canvas with critical inline CSS for fast LCP
- Deployed on **Vercel** — auto-deploys from `main`

## Quickstart

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
