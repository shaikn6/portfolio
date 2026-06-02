# Portfolio React Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the single `index.html` portfolio with a production-quality Vite + React + TypeScript app featuring Three.js 3D animated background, Framer Motion scroll reveals, glassmorphism project cards with spotlight hover, and a styled Lego SVG avatar — matching or exceeding moncy.dev visual polish.

**Architecture:** Vite handles bundling and dev server. React components are split by section (Hero, Nav, Projects, Skills, Experience, Contact). Three.js via `@react-three/fiber` renders floating particles on a WebGL canvas fixed behind all content. Framer Motion `useInView` drives scroll-triggered entrance animations per section. CSS Modules scope styles; design tokens live in `src/styles/tokens.css` (global).

**Tech Stack:** Vite 5, React 18, TypeScript 5, `@react-three/fiber` 8, `@react-three/drei`, `three`, `framer-motion` 11, CSS Modules, Google Fonts (DM Serif Display, JetBrains Mono, Inter)

---

## File Map

```
/Users/izaaz95/github-projects/portfolio/
├── index.html                  ← Vite entry (fonts + meta, inject main.tsx)
├── package.json                ← all deps
├── tsconfig.json               ← strict TS config
├── vite.config.ts              ← Vite config
├── vercel.json                 ← build + SPA rewrites
└── src/
    ├── main.tsx                ← React root mount
    ├── App.tsx                 ← section assembly, global wrappers
    ├── styles/
    │   ├── tokens.css          ← CSS custom properties (colors, spacing, type, easing)
    │   └── global.css          ← reset, body, html, scroll, reduced-motion
    ├── components/
    │   ├── ParticleBackground.tsx    ← Three.js canvas (r3f), fixed behind content
    │   ├── Nav.tsx + Nav.module.css  ← sticky glassmorphism navbar
    │   ├── Hero.tsx + Hero.module.css ← avatar, name, tagline, CTAs, scroll cue
    │   ├── Metrics.tsx + Metrics.module.css ← animated count-up stats row
    │   ├── Experience.tsx + Experience.module.css ← timeline
    │   ├── Projects.tsx + Projects.module.css ← glassmorphism cards + spotlight
    │   ├── Skills.tsx + Skills.module.css ← animated skill tag blocks
    │   ├── Education.tsx + Education.module.css ← edu + certs grid
    │   ├── Contact.tsx + Contact.module.css ← contact box + captcha
    │   └── ScrollReveal.tsx    ← reusable Framer Motion reveal wrapper
    └── hooks/
        └── useScrollProgress.ts ← scroll % for the progress bar
```

---

## Task 1: Project scaffold — Vite + React + TypeScript

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `vite.config.ts`
- Create: `index.html`
- Create: `vercel.json`
- Create: `src/main.tsx`
- Create: `src/App.tsx` (shell only)

- [ ] **Step 1: Remove old root-level artifacts that conflict with Vite**

```bash
cd /Users/izaaz95/github-projects/portfolio
# Keep: assets/, finance/, healthcare/, docs/, README.md
# We will NOT delete index.html yet — we overwrite it in Step 3
```

- [ ] **Step 2: Write `package.json`**

```json
{
  "name": "nagizaaz-portfolio",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@react-three/drei": "^9.109.2",
    "@react-three/fiber": "^8.17.10",
    "framer-motion": "^11.3.8",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "three": "^0.167.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@types/three": "^0.167.0",
    "@vitejs/plugin-react": "^4.3.1",
    "typescript": "^5.5.3",
    "vite": "^5.3.4"
  }
}
```

- [ ] **Step 3: Write `tsconfig.json`**

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

- [ ] **Step 4: Write `tsconfig.app.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

- [ ] **Step 5: Write `tsconfig.node.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 6: Write `vite.config.ts`**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
  },
})
```

- [ ] **Step 7: Write `index.html` (Vite entry — overwrites old single-page file)**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <script>if(location.hostname.indexOf('github.io')!==-1){location.replace('https://nagizaaz.vercel.app');}</script>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nagizaaz Shaik — ML Engineer · AI Engineer · Cloud Architect</title>
  <meta name="description" content="ML Engineer · AI Engineer · Cloud Architect with 6 years of experience across production ML systems, clinical AI, and AWS cloud infrastructure. Open to internships in Tech and Healthcare." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:wght@300;400;500&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

- [ ] **Step 8: Write `vercel.json`**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```

- [ ] **Step 9: Write `src/main.tsx`**

```typescript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 10: Write shell `src/App.tsx`**

```typescript
export default function App() {
  return <div style={{ color: 'white', padding: '2rem' }}>Portfolio loading…</div>
}
```

- [ ] **Step 11: Install dependencies**

```bash
cd /Users/izaaz95/github-projects/portfolio && npm install
```

Expected: `node_modules/` created, no peer-dep errors. Three + r3f + framer-motion present.

- [ ] **Step 12: Verify build passes**

```bash
cd /Users/izaaz95/github-projects/portfolio && npm run build
```

Expected: `dist/` created, no TypeScript errors.

- [ ] **Step 13: Commit scaffold**

```bash
cd /Users/izaaz95/github-projects/portfolio
git add package.json package-lock.json tsconfig.json tsconfig.app.json tsconfig.node.json vite.config.ts index.html vercel.json src/main.tsx src/App.tsx
git commit -m "feat: scaffold Vite+React+TS portfolio — bare-bones boot"
```

---

## Task 2: Design tokens and global styles

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`

- [ ] **Step 1: Write `src/styles/tokens.css`**

```css
:root {
  /* ── Palette ── */
  --color-bg:       #07080f;
  --color-bg2:      #0a0b14;
  --color-surface:  rgba(255, 255, 255, 0.035);
  --color-surface2: rgba(255, 255, 255, 0.06);
  --color-border:   rgba(56, 189, 248, 0.18);
  --color-border2:  rgba(255, 255, 255, 0.07);
  --color-accent:   #38bdf8;
  --color-accent2:  #818cf8;
  --color-accent3:  #a5f3fc;
  --color-green:    #34d399;
  --color-text:     #e2e8f0;
  --color-muted:    rgba(226, 232, 240, 0.5);

  /* ── Typography ── */
  --font-serif:  'DM Serif Display', serif;
  --font-mono:   'JetBrains Mono', monospace;
  --font-sans:   'Inter', sans-serif;

  --text-hero:   clamp(3.4rem, 9vw, 7.5rem);
  --text-h2:     clamp(2.1rem, 4vw, 3rem);
  --text-base:   1rem;

  /* ── Spacing ── */
  --space-section: clamp(4rem, 6vw, 5.5rem);
  --radius:        14px;

  /* ── Motion ── */
  --dur:  280ms;
  --ease: cubic-bezier(0.16, 1, 0.3, 1);

  /* ── Effects ── */
  --glow: 0 0 24px rgba(56, 189, 248, 0.18);
}
```

- [ ] **Step 2: Write `src/styles/global.css`**

```css
@import './tokens.css';

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  font-size: 15px;
}

body {
  font-family: var(--font-sans);
  background: var(--color-bg);
  color: var(--color-text);
  overflow-x: hidden;
  line-height: 1.6;
}

/* Scroll progress bar — filled via JS */
#scroll-bar {
  position: fixed;
  left: 0;
  top: 0;
  width: 2px;
  height: 0%;
  background: linear-gradient(to bottom, var(--color-accent), var(--color-accent2));
  z-index: 1000;
  transition: height 80ms linear;
}

/* Subtle grain texture */
.bg-grain {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 0.035;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* Faint grid overlay */
.bg-grid {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(56, 189, 248, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(56, 189, 248, 0.04) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(ellipse at 50% 30%, #000 30%, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse at 50% 30%, #000 30%, transparent 75%);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 3: Commit**

```bash
cd /Users/izaaz95/github-projects/portfolio
git add src/styles/tokens.css src/styles/global.css
git commit -m "feat: design tokens and global CSS reset"
```

---

## Task 3: ScrollReveal wrapper + useScrollProgress hook

**Files:**
- Create: `src/hooks/useScrollProgress.ts`
- Create: `src/components/ScrollReveal.tsx`

- [ ] **Step 1: Write `src/hooks/useScrollProgress.ts`**

```typescript
import { useEffect } from 'react'

export function useScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById('scroll-bar')
    if (!bar) return

    const onScroll = () => {
      const pct =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      bar.style.height = pct + '%'
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
}
```

- [ ] **Step 2: Write `src/components/ScrollReveal.tsx`**

```typescript
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
  as?: keyof JSX.IntrinsicElements
}

export default function ScrollReveal({
  children,
  delay = 0,
  className,
  as: Tag = 'div',
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })

  return (
    <motion.div
      ref={ref as React.Ref<HTMLDivElement>}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
cd /Users/izaaz95/github-projects/portfolio
git add src/hooks/useScrollProgress.ts src/components/ScrollReveal.tsx
git commit -m "feat: ScrollReveal component and useScrollProgress hook"
```

---

## Task 4: Three.js particle background

**Files:**
- Create: `src/components/ParticleBackground.tsx`

This component renders a fixed WebGL canvas behind all content using `@react-three/fiber`. It shows ~120 small floating particles that drift slowly, plus aurora-style gradient fog orbs via `drei`'s `<Cloud>` or custom instanced mesh.

- [ ] **Step 1: Write `src/components/ParticleBackground.tsx`**

```typescript
import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Particles({ count = 120 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null)

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sz = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8
      sz[i] = Math.random() * 0.04 + 0.01
    }
    return [pos, sz]
  }, [count])

  useFrame(({ clock }) => {
    if (!mesh.current) return
    mesh.current.rotation.y = clock.getElapsedTime() * 0.012
    mesh.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.008) * 0.06
  })

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    return geo
  }, [positions, sizes])

  return (
    <points ref={mesh} geometry={geometry}>
      <pointsMaterial
        size={0.035}
        color="#38bdf8"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function AuroraOrb({
  position,
  color,
  scale,
  speed,
}: {
  position: [number, number, number]
  color: string
  scale: number
  speed: number
}) {
  const mesh = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!mesh.current) return
    const t = clock.getElapsedTime() * speed
    mesh.current.position.x = position[0] + Math.sin(t) * 1.5
    mesh.current.position.y = position[1] + Math.cos(t * 0.7) * 1.0
  })

  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[scale, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.06} depthWrite={false} />
    </mesh>
  )
}

export default function ParticleBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <Particles count={130} />
        <AuroraOrb position={[-4, 2, -3]} color="#2563eb" scale={5} speed={0.08} />
        <AuroraOrb position={[4, -2, -4]} color="#7c3aed" scale={4.5} speed={0.06} />
        <AuroraOrb position={[0, 1, -5]} color="#38bdf8" scale={3.5} speed={0.05} />
      </Canvas>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/izaaz95/github-projects/portfolio
git add src/components/ParticleBackground.tsx
git commit -m "feat: Three.js particle + aurora orb background"
```

---

## Task 5: Nav component

**Files:**
- Create: `src/components/Nav.tsx`
- Create: `src/components/Nav.module.css`

- [ ] **Step 1: Write `src/components/Nav.module.css`**

```css
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 900;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 48px;
  height: 60px;
  background: rgba(7, 8, 15, 0.65);
  backdrop-filter: blur(28px) saturate(160%);
  -webkit-backdrop-filter: blur(28px) saturate(160%);
  border-bottom: 1px solid var(--color-border2);
}

.nav::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(56, 189, 248, 0.35), transparent);
  opacity: 0.6;
}

.logo {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--color-accent);
  text-decoration: none;
  letter-spacing: 0.02em;
}

.links {
  display: flex;
  gap: 32px;
  list-style: none;
}

.links a {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--color-muted);
  text-decoration: none;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: color var(--dur);
}

.links a:hover {
  color: var(--color-text);
}

.cta {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  padding: 7px 18px;
  border: 1px solid var(--color-accent);
  border-radius: 6px;
  color: var(--color-accent);
  text-decoration: none;
  letter-spacing: 0.06em;
  transition: background var(--dur), color var(--dur);
}

.cta:hover {
  background: var(--color-accent);
  color: var(--color-bg);
}

@media (max-width: 768px) {
  .nav {
    padding: 0 20px;
  }
  .links {
    display: none;
  }
}
```

- [ ] **Step 2: Write `src/components/Nav.tsx`**

```typescript
import styles from './Nav.module.css'

const LINKS = [
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <a className={styles.logo} href="#hero">nag·izaaz·shaik</a>
      <ul className={styles.links}>
        {LINKS.map(({ href, label }) => (
          <li key={href}>
            <a href={href}>{label}</a>
          </li>
        ))}
      </ul>
      <a className={styles.cta} href="#contact">Hire Me</a>
    </nav>
  )
}
```

- [ ] **Step 3: Commit**

```bash
cd /Users/izaaz95/github-projects/portfolio
git add src/components/Nav.tsx src/components/Nav.module.css
git commit -m "feat: Nav component — sticky glassmorphism bar"
```

---

## Task 6: Hero section

**Files:**
- Create: `src/components/Hero.tsx`
- Create: `src/components/Hero.module.css`

- [ ] **Step 1: Write `src/components/Hero.module.css`**

```css
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 100px 48px 80px;
  position: relative;
  z-index: 2;
}

.avatarWrap {
  width: 168px;
  height: 168px;
  margin: 0 auto 32px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  box-shadow:
    0 0 0 2px rgba(56, 189, 248, 0.35),
    0 0 0 8px rgba(56, 189, 248, 0.07),
    0 0 50px rgba(56, 189, 248, 0.28),
    0 0 100px rgba(129, 140, 248, 0.18);
  animation: photoPulse 5s ease-in-out infinite;
}

@keyframes photoPulse {
  0%, 100% {
    box-shadow:
      0 0 0 2px rgba(56, 189, 248, 0.35),
      0 0 0 8px rgba(56, 189, 248, 0.07),
      0 0 50px rgba(56, 189, 248, 0.28),
      0 0 100px rgba(129, 140, 248, 0.18);
  }
  50% {
    box-shadow:
      0 0 0 2px rgba(56, 189, 248, 0.5),
      0 0 0 12px rgba(56, 189, 248, 0.06),
      0 0 70px rgba(56, 189, 248, 0.4),
      0 0 130px rgba(129, 140, 248, 0.25);
  }
}

.label {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-accent);
  background: rgba(56, 189, 248, 0.08);
  border: 1px solid rgba(56, 189, 248, 0.28);
  padding: 5px 14px;
  border-radius: 100px;
  margin-bottom: 28px;
  display: inline-block;
}

.name {
  font-family: var(--font-serif);
  font-size: var(--text-hero);
  line-height: 0.98;
  margin-bottom: 4px;
  background: linear-gradient(120deg, #e2e8f0 0%, var(--color-accent) 35%, var(--color-accent2) 65%, #a5f3fc 100%);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: grad 12s ease infinite;
  letter-spacing: -0.015em;
  filter: drop-shadow(0 8px 28px rgba(56, 189, 248, 0.12));
}

@keyframes grad {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.role {
  font-size: clamp(1rem, 2vw, 1.35rem);
  font-weight: 400;
  color: var(--color-muted);
  margin-bottom: 20px;
  letter-spacing: 0.01em;
}

.desc {
  font-size: 1rem;
  color: var(--color-muted);
  max-width: 560px;
  line-height: 1.75;
  margin-bottom: 36px;
}

.targeting {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--color-accent2);
  background: rgba(129, 140, 248, 0.07);
  border: 1px solid rgba(129, 140, 248, 0.22);
  padding: 5px 14px;
  border-radius: 100px;
  margin-bottom: 36px;
  display: inline-block;
  letter-spacing: 0.1em;
}

.ctas {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.btnPrimary {
  padding: 13px 30px;
  background: linear-gradient(135deg, var(--color-accent), var(--color-accent2));
  border-radius: 10px;
  color: #07080f;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 600;
  text-decoration: none;
  letter-spacing: 0.06em;
  position: relative;
  overflow: hidden;
  box-shadow: 0 6px 24px -6px rgba(56, 189, 248, 0.55), 0 0 0 1px rgba(56, 189, 248, 0.4) inset;
  transition: transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease);
}

.btnPrimary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 32px -6px rgba(56, 189, 248, 0.7), 0 0 0 1px rgba(56, 189, 248, 0.55) inset;
}

.btnSecondary {
  padding: 13px 30px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  color: var(--color-text);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  text-decoration: none;
  letter-spacing: 0.06em;
  background: rgba(255, 255, 255, 0.025);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: border-color var(--dur), background var(--dur), transform var(--dur);
}

.btnSecondary:hover {
  border-color: var(--color-accent);
  background: rgba(56, 189, 248, 0.08);
  transform: translateY(-2px);
}

.scrollCue {
  position: absolute;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.scrollCue span {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.18em;
  color: var(--color-muted);
  text-transform: uppercase;
}

.scrollLine {
  width: 1px;
  height: 36px;
  background: linear-gradient(to bottom, var(--color-accent), transparent);
  animation: pulse 2.2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.3; }
  50%       { opacity: 1; }
}

@media (max-width: 768px) {
  .hero { padding: 80px 20px 60px; }
}

@media (prefers-reduced-motion: reduce) {
  .avatarWrap { animation: none; }
  .name { animation: none; }
  .scrollLine { animation: none; }
}
```

- [ ] **Step 2: Write `src/components/Hero.tsx`**

```typescript
import { motion } from 'framer-motion'
import styles from './Hero.module.css'
import LegoAvatar from './LegoAvatar'

const VARIANTS = {
  container: {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  },
  item: {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  },
}

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <motion.div variants={VARIANTS.container} initial="hidden" animate="show">
        <motion.div variants={VARIANTS.item} className={styles.avatarWrap}>
          <LegoAvatar />
        </motion.div>
        <motion.div variants={VARIANTS.item} className={styles.label}>
          ML Engineer · AI Engineer · Cloud Architect
        </motion.div>
        <motion.h1 variants={VARIANTS.item} className={styles.name}>
          Nagizaaz Shaik
        </motion.h1>
        <motion.p variants={VARIANTS.item} className={styles.role}>
          It doesn't matter where you start. It matters that you build.
        </motion.p>
        <motion.p variants={VARIANTS.item} className={styles.desc}>
          Intern at Uber writing anomaly scripts. Now: production ML for 450K members,
          zero audit findings, five models in deployment, clinical AI shipping FHIR R4 to Epic.
          The journey doesn't stop here.
        </motion.p>
        <motion.div variants={VARIANTS.item} className={styles.targeting}>
          ◈ ML models · AI agents · Cloud infrastructure · Tech &amp; Healthcare
        </motion.div>
        <motion.div variants={VARIANTS.item} className={styles.ctas}>
          <a
            href="https://linkedin.com/in/nagizaazshaik"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnPrimary}
          >
            Connect on LinkedIn
          </a>
          <a
            href="https://github.com/shaikn6"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnSecondary}
          >
            View GitHub
          </a>
          <a
            href="/assets/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnSecondary}
          >
            Resume ↓
          </a>
        </motion.div>
      </motion.div>
      <div className={styles.scrollCue}>
        <span>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create the Lego avatar as a standalone SVG component `src/components/LegoAvatar.tsx`**

```typescript
export default function LegoAvatar() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      aria-label="Nagizaaz Shaik"
      style={{ display: 'block', width: '100%', height: '100%' }}
    >
      <defs>
        <linearGradient id="lg-skin" x1="25%" y1="0%" x2="75%" y2="100%">
          <stop offset="0%" stopColor="#d08848" />
          <stop offset="100%" stopColor="#a86030" />
        </linearGradient>
        <linearGradient id="lg-suit" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#20203a" />
          <stop offset="100%" stopColor="#0c0c18" />
        </linearGradient>
        <radialGradient id="lg-hair" cx="45%" cy="20%" r="75%">
          <stop offset="0%" stopColor="#2e1e10" />
          <stop offset="100%" stopColor="#0a0705" />
        </radialGradient>
        <linearGradient id="lg-sheen" x1="15%" y1="5%" x2="35%" y2="65%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
      {/* LEGS */}
      <rect x="80" y="178" width="17" height="28" rx="3" fill="#181828" />
      <rect x="103" y="178" width="17" height="28" rx="3" fill="#181828" />
      <rect x="78" y="170" width="44" height="12" rx="3" fill="#1e1e32" />
      {/* TORSO */}
      <rect x="68" y="118" width="64" height="56" rx="6" fill="url(#lg-suit)" />
      <rect x="85" y="120" width="30" height="54" rx="2" fill="#efeffa" />
      <rect x="68" y="118" width="20" height="56" rx="6" fill="url(#lg-suit)" />
      <rect x="112" y="118" width="20" height="56" rx="6" fill="url(#lg-suit)" />
      <path d="M85,120 L75,134 L71,152 L84,148 L87,134Z" fill="#16162e" />
      <path d="M115,120 L125,134 L129,152 L116,148 L113,134Z" fill="#16162e" />
      <polygon points="100,128 97,134 98.5,164 100,166 101.5,164 103,134" fill="#12122a" />
      <polygon points="97,126 100,121 103,126 102,134 98,134" fill="#1c1c38" />
      <rect x="68" y="118" width="64" height="56" rx="6" fill="url(#lg-sheen)" />
      {/* ARMS CROSSED */}
      <path d="M70,127 Q54,134 47,147 Q42,158 47,165 Q57,176 80,175 Q95,174 110,169" stroke="#141428" strokeWidth="18" fill="none" strokeLinecap="round" />
      <path d="M130,127 Q146,134 153,147 Q158,158 153,165 Q143,176 120,175 Q105,174 90,169" stroke="#0e0e20" strokeWidth="16" fill="none" strokeLinecap="round" />
      <circle cx="110" cy="169" r="10" fill="url(#lg-skin)" />
      <rect x="105" y="166" width="10" height="8" rx="2" fill="rgba(0,0,0,0.28)" />
      <circle cx="90" cy="169" r="10" fill="url(#lg-skin)" />
      <rect x="85" y="166" width="10" height="8" rx="2" fill="rgba(0,0,0,0.28)" />
      {/* NECK */}
      <rect x="90" y="108" width="20" height="14" rx="4" fill="url(#lg-skin)" />
      {/* HEAD STUD */}
      <ellipse cx="100" cy="37" rx="13" ry="6" fill="#b86e28" />
      <ellipse cx="100" cy="34" rx="11" ry="5.5" fill="#c87838" />
      {/* HEAD BLOCK */}
      <rect x="64" y="39" width="72" height="73" rx="18" fill="url(#lg-skin)" />
      <rect x="64" y="39" width="72" height="73" rx="18" fill="url(#lg-sheen)" />
      {/* CURLY HAIR */}
      <ellipse cx="100" cy="41" rx="44" ry="37" fill="url(#lg-hair)" />
      <circle cx="66" cy="45" r="19" fill="#0c0806" />
      <circle cx="75" cy="27" r="21" fill="#0c0806" />
      <circle cx="93" cy="19" r="21" fill="#0c0806" />
      <circle cx="112" cy="18" r="20" fill="#0c0806" />
      <circle cx="129" cy="26" r="18" fill="#0c0806" />
      <circle cx="138" cy="41" r="17" fill="#0c0806" />
      <ellipse cx="93" cy="25" rx="26" ry="11" fill="rgba(255,255,255,0.09)" transform="rotate(-12,93,25)" />
      <ellipse cx="63" cy="68" rx="10" ry="22" fill="url(#lg-hair)" />
      <ellipse cx="137" cy="68" rx="10" ry="22" fill="url(#lg-hair)" />
      {/* EYEBROWS */}
      <path d="M75,58 Q86,51 96,56" stroke="#1a0d06" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <path d="M104,56 Q114,51 125,58" stroke="#1a0d06" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      {/* LEFT EYE */}
      <ellipse cx="86" cy="68" rx="11" ry="12" fill="white" />
      <circle cx="87" cy="69" r="8.5" fill="#1c1005" />
      <circle cx="87" cy="69" r="4.8" fill="#060402" />
      <circle cx="91" cy="65" r="3" fill="white" opacity="0.9" />
      {/* RIGHT EYE */}
      <ellipse cx="114" cy="68" rx="11" ry="12" fill="white" />
      <circle cx="113" cy="69" r="8.5" fill="#1c1005" />
      <circle cx="113" cy="69" r="4.8" fill="#060402" />
      <circle cx="117" cy="65" r="3" fill="white" opacity="0.9" />
      {/* NOSE */}
      <circle cx="97" cy="82" r="2.8" fill="rgba(155,80,38,0.58)" />
      <circle cx="103" cy="82" r="2.8" fill="rgba(155,80,38,0.58)" />
      {/* SMILE */}
      <path d="M78,93 Q100,110 122,93" stroke="#8a3e1a" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M80,94 Q100,108 120,94 Q119,101 100,102 Q81,101 80,94Z" fill="white" opacity="0.9" />
      {/* CHEEKS */}
      <circle cx="77" cy="89" r="6" fill="rgba(255,100,65,0.22)" />
      <circle cx="123" cy="89" r="6" fill="rgba(255,100,65,0.22)" />
      {/* STUBBLE */}
      <ellipse cx="100" cy="103" rx="22" ry="7" fill="rgba(15,8,3,0.18)" />
    </svg>
  )
}
```

- [ ] **Step 4: Commit**

```bash
cd /Users/izaaz95/github-projects/portfolio
git add src/components/Hero.tsx src/components/Hero.module.css src/components/LegoAvatar.tsx
git commit -m "feat: Hero section with Framer Motion entrance animation and Lego avatar"
```

---

## Task 7: Metrics row

**Files:**
- Create: `src/components/Metrics.tsx`
- Create: `src/components/Metrics.module.css`

- [ ] **Step 1: Write `src/components/Metrics.module.css`**

```css
.row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: var(--color-border2);
  border: 1px solid var(--color-border2);
  border-radius: var(--radius);
  overflow: hidden;
  margin: 0 auto;
  max-width: 1100px;
  padding: 0 48px;
  box-shadow: 0 10px 40px -20px rgba(56, 189, 248, 0.3);
}

.metric {
  background: linear-gradient(180deg, rgba(13, 17, 23, 0.85), rgba(7, 8, 15, 0.95));
  padding: 30px 24px;
  text-align: center;
  transition: background var(--dur);
}

.metric:hover {
  background: linear-gradient(180deg, rgba(56, 189, 248, 0.06), rgba(7, 8, 15, 0.95));
}

.num {
  font-family: var(--font-serif);
  font-size: 2.4rem;
  background: linear-gradient(135deg, var(--color-accent), var(--color-accent2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 6px;
}

.lbl {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-muted);
}

@media (max-width: 768px) {
  .row {
    grid-template-columns: repeat(2, 1fr);
    padding: 0 20px;
  }
}
```

- [ ] **Step 2: Write `src/components/Metrics.tsx`**

```typescript
import ScrollReveal from './ScrollReveal'
import styles from './Metrics.module.css'

const METRICS = [
  { num: '42', lbl: 'GitHub Repos' },
  { num: '4+', lbl: 'Years Experience' },
  { num: '9',  lbl: 'Public Projects' },
  { num: '5',  lbl: 'Cloud Certifications' },
]

export default function Metrics() {
  return (
    <div style={{ padding: '0 48px', maxWidth: '1100px', margin: '0 auto' }}>
      <div className={styles.row}>
        {METRICS.map(({ num, lbl }, i) => (
          <ScrollReveal key={lbl} delay={i * 0.07}>
            <div className={styles.metric}>
              <div className={styles.num}>{num}</div>
              <div className={styles.lbl}>{lbl}</div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
cd /Users/izaaz95/github-projects/portfolio
git add src/components/Metrics.tsx src/components/Metrics.module.css
git commit -m "feat: Metrics row component"
```

---

## Task 8: Experience section

**Files:**
- Create: `src/components/Experience.tsx`
- Create: `src/components/Experience.module.css`

- [ ] **Step 1: Write `src/components/Experience.module.css`**

```css
.section {
  position: relative;
  background: linear-gradient(180deg, rgba(10, 11, 20, 0.72), rgba(7, 8, 15, 0.78));
}

.section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(56, 189, 248, 0.25), transparent);
}

.wrap {
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--space-section) 48px;
}

.sectionTag {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--color-accent);
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}

.sectionTag::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, rgba(56, 189, 248, 0.4), transparent);
  max-width: 100px;
}

.sectionH {
  font-family: var(--font-serif);
  font-size: var(--text-h2);
  margin-bottom: 52px;
  letter-spacing: -0.015em;
  background: linear-gradient(120deg, #f1f5f9 0%, #cbd5e1 40%, var(--color-accent3) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.item {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 0 40px;
  padding: 32px 0;
  border-bottom: 1px solid var(--color-border2);
}

.item:last-child {
  border-bottom: none;
}

.period {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--color-muted);
  letter-spacing: 0.04em;
  padding-top: 3px;
  line-height: 1.5;
}

.current {
  display: inline-block;
  margin-top: 6px;
  background: rgba(52, 211, 153, 0.12);
  border: 1px solid rgba(52, 211, 153, 0.3);
  color: var(--color-green);
  font-size: 0.6rem;
  padding: 2px 8px;
  border-radius: 100px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.role {
  font-weight: 600;
  font-size: 1.05rem;
  margin-bottom: 3px;
}

.company {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--color-accent);
  margin-bottom: 14px;
}

.bullets {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.bullets li {
  font-size: 0.9rem;
  color: var(--color-muted);
  padding-left: 16px;
  position: relative;
  line-height: 1.6;
}

.bullets li::before {
  content: '›';
  position: absolute;
  left: 0;
  color: var(--color-accent);
  font-weight: 500;
}

@media (max-width: 768px) {
  .wrap { padding: 64px 20px; }
  .item { grid-template-columns: 1fr; gap: 8px; }
  .period { font-size: 0.7rem; }
}
```

- [ ] **Step 2: Write `src/components/Experience.tsx`**

```typescript
import ScrollReveal from './ScrollReveal'
import styles from './Experience.module.css'

const EXPERIENCE = [
  {
    period: 'Jul 2024 – Jun 2026',
    current: true,
    role: 'Cloud Architect',
    company: 'Wright-Patt Credit Union · Fairborn, OH',
    bullets: [
      'Designed and owned the full ML platform on AWS — 5 production SageMaker endpoints, MLflow model registry with version-gated promotion. Deployment failures reduced 85% in 60 days.',
      'Built SageMaker Model Monitor with custom statistical baselines — caught 2 critical model degradation events before accuracy dropped in production credit decisions.',
      'Deployed XGBoost underwriting model processing 500+ automated loan decisions/day. Cut manual analyst review queue 30%.',
      'Fine-tuned BERT on internal ticket data as a FastAPI microservice — sub-200ms p99, 40% reduction in misrouting across 10K+ weekly requests.',
      'Passed 2 consecutive NCUA audits with zero findings on $400M in member financial data — AES-256, IAM least privilege, CloudTrail on all inference calls.',
    ],
  },
  {
    period: 'Jul 2020 – Jun 2023',
    current: false,
    role: 'Data Engineer',
    company: 'Cognizant · Hyderabad, India',
    bullets: [
      'Led Oracle 11g → Amazon Redshift migration — redesigned schema for columnar storage, rewrote 20+ stored procedures as Airflow DAGs. Query runtime improved 60% on 25GB+ warehouse.',
      'Designed 15 production ETL/ELT pipelines in Airflow across Oracle, SQL Server, flat files, and REST APIs — surfaced a silent corruption issue invalidating 3 months of downstream financial reports.',
      'Built real-time Kafka feature pipeline for retail demand forecasting — POS events in 5-min tumbling window, end-to-end latency under 60s, contributed to 28% reduction in emergency restocking.',
      'Promoted to tech lead in 2 years — code reviews for 3 engineers, 100% on-time delivery on 2 client accounts.',
    ],
  },
  {
    period: 'Jan 2019 – Mar 2019',
    current: false,
    role: 'SQL / Data Intern',
    company: 'Uber · Hyderabad, India',
    bullets: [
      'Return engagement on the same city ops team — built SQL queries and Vertica views for weekly driver utilisation, trip completion, and surge pricing reporting across Hyderabad.',
      'Consolidated fragmented ad-hoc queries into standardised templates, cutting analyst prep time for the weekly ops review from 3 hours to under 45 minutes.',
    ],
  },
  {
    period: 'Aug 2018 – Oct 2018',
    current: false,
    role: 'Python Intern',
    company: 'Uber · Hyderabad, India',
    bullets: [
      'Automated extraction and transformation of operational event data using Python and pandas — converted a 4-hour manual weekly process into a scheduled job producing clean summary tables for city ops.',
      'Built an anomaly detection script flagging unusual trip counts and revenue figures against rolling 7-day baselines before data entered the reporting pipeline.',
      'Secured a return internship offer by approaching the manager directly at the end of the engagement.',
    ],
  },
]

export default function Experience() {
  return (
    <section id="experience" className={styles.section}>
      <div className={styles.wrap}>
        <ScrollReveal><div className={styles.sectionTag}>Experience</div></ScrollReveal>
        <ScrollReveal delay={0.05}><h2 className={styles.sectionH}>Where I've shipped.</h2></ScrollReveal>

        <div className={styles.timeline}>
          {EXPERIENCE.map((exp, i) => (
            <ScrollReveal key={exp.company} delay={i * 0.07}>
              <div className={styles.item}>
                <div className={styles.period}>
                  {exp.period}
                  {exp.current && <><br /><span className={styles.current}>Current</span></>}
                </div>
                <div>
                  <div className={styles.role}>{exp.role}</div>
                  <div className={styles.company}>{exp.company}</div>
                  <ul className={styles.bullets}>
                    {exp.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Commit**

```bash
cd /Users/izaaz95/github-projects/portfolio
git add src/components/Experience.tsx src/components/Experience.module.css
git commit -m "feat: Experience section with timeline"
```

---

## Task 9: Projects section with glassmorphism cards + spotlight

**Files:**
- Create: `src/components/Projects.tsx`
- Create: `src/components/Projects.module.css`

- [ ] **Step 1: Write `src/components/Projects.module.css`**

```css
.section {
  position: relative;
}

.wrap {
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--space-section) 48px;
}

.sectionTag {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--color-accent);
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}

.sectionTag::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, rgba(56, 189, 248, 0.4), transparent);
  max-width: 100px;
}

.sectionH {
  font-family: var(--font-serif);
  font-size: var(--text-h2);
  margin-bottom: 8px;
  letter-spacing: -0.015em;
  background: linear-gradient(120deg, #f1f5f9 0%, #cbd5e1 40%, var(--color-accent3) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.sectionSub {
  color: var(--color-muted);
  max-width: 580px;
  margin-bottom: 52px;
  font-size: 0.96rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
  gap: 20px;
}

.card {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.045), rgba(255, 255, 255, 0.018));
  border: 1px solid var(--color-border2);
  border-radius: var(--radius);
  padding: 26px 24px 22px;
  text-decoration: none;
  color: var(--color-text);
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition:
    border-color var(--dur),
    transform var(--dur),
    background var(--dur),
    box-shadow var(--dur);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(14px) saturate(140%);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
}

/* Cursor-tracking spotlight */
.card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    600px circle at var(--mx, 50%) var(--my, 0%),
    rgba(56, 189, 248, 0.10),
    transparent 40%
  );
  opacity: 0;
  transition: opacity var(--dur);
  pointer-events: none;
}

/* Gradient border on hover */
.card::after {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: var(--radius);
  padding: 1px;
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.55), rgba(129, 140, 248, 0.35) 40%, transparent 70%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude;
  opacity: 0;
  transition: opacity var(--dur);
  pointer-events: none;
}

.card:hover {
  border-color: rgba(56, 189, 248, 0.3);
  transform: translateY(-4px);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.025));
  box-shadow: 0 20px 60px -20px rgba(56, 189, 248, 0.35), 0 8px 24px -12px rgba(0, 0, 0, 0.6);
}

.card:hover::before { opacity: 1; }
.card:hover::after  { opacity: 1; }

.cardHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.domain {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 4px;
  font-weight: 500;
}

.dAgents   { background: rgba(56, 189, 248, 0.1);  color: #38bdf8; }
.dCv       { background: rgba(129, 140, 248, 0.1); color: #818cf8; }
.dSafety   { background: rgba(251, 113, 133, 0.1); color: #fb7185; }
.dClinical { background: rgba(52, 211, 153, 0.1);  color: #34d399; }
.dPrivacy  { background: rgba(251, 191, 36, 0.1);  color: #fbbf24; }
.dDataeng  { background: rgba(167, 139, 250, 0.1); color: #a78bfa; }
.dMlops    { background: rgba(56, 189, 248, 0.08); color: #67e8f9; }

.arrow {
  font-size: 1rem;
  color: var(--color-muted);
  transition: color var(--dur), transform var(--dur);
}

.card:hover .arrow {
  color: var(--color-accent);
  transform: translate(2px, -2px);
}

.name {
  font-weight: 600;
  font-size: 1.02rem;
  line-height: 1.3;
}

.desc {
  font-size: 0.86rem;
  color: var(--color-muted);
  line-height: 1.65;
  flex: 1;
}

.pills {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 4px;
}

.pill {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  padding: 3px 8px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--color-border2);
  border-radius: 4px;
  color: var(--color-muted);
  letter-spacing: 0.04em;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
  border-top: 1px solid var(--color-border2);
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--color-muted);
}

.live { color: var(--color-green); }

@media (max-width: 768px) {
  .wrap { padding: 64px 20px; }
}
```

- [ ] **Step 2: Write `src/components/Projects.tsx`**

```typescript
import { useRef, useCallback } from 'react'
import ScrollReveal from './ScrollReveal'
import styles from './Projects.module.css'

interface Project {
  href: string
  domain: string
  domainClass: string
  name: string
  desc: string
  pills: string[]
  stat: string
}

const PROJECTS: Project[] = [
  {
    href: 'https://github.com/shaikn6/agentic-pipeline-healer',
    domain: 'AI Agents', domainClass: styles.dAgents,
    name: 'Agentic Pipeline Healer',
    desc: 'LangGraph multi-DAG orchestrator that monitors Airflow pipelines, classifies failures, generates AST-level code fixes, and dispatches Slack Block Kit alerts with a full SQLite audit log.',
    pills: ['LangGraph', 'Airflow', 'AST', 'FastAPI'],
    stat: 'CI passing',
  },
  {
    href: 'https://github.com/shaikn6/chexpert-pathology-classifier',
    domain: 'Computer Vision', domainClass: styles.dCv,
    name: 'CheXpert Pathology Classifier',
    desc: 'DenseNet121 + EfficientNet-B4 ensemble on the CheXpert 14-label benchmark. MC Dropout uncertainty, Grad-CAM + ScoreCAM explainability, DICOM pipeline, and clinical PDF report generator.',
    pills: ['PyTorch', 'DenseNet121', 'Grad-CAM', 'pydicom'],
    stat: '92% AUC',
  },
  {
    href: 'https://github.com/shaikn6/llm-safety-auditor',
    domain: 'LLM Safety', domainClass: styles.dSafety,
    name: 'LLM Safety Auditor',
    desc: 'Automated red-teaming framework generating 250+ adversarial attacks across 6 mutation strategies. Scores against OWASP LLM Top 10 and NIST AI RMF. Produces PDF audit reports with risk matrices.',
    pills: ['sentence-transformers', 'ReportLab', 'OWASP'],
    stat: '250+ attack vectors',
  },
  {
    href: 'https://github.com/shaikn6/clinical-note-llmops',
    domain: 'Healthcare AI', domainClass: styles.dClinical,
    name: 'Clinical Note LLMOps',
    desc: 'HIPAA-compliant LLMOps pipeline for clinical NLP. BioBERT + Presidio PII de-identification, FHIR R4 Epic integration, automated model drift detection, and full audit trail.',
    pills: ['BioBERT', 'Presidio', 'FHIR R4', 'SageMaker'],
    stat: 'HIPAA compliant',
  },
  {
    href: 'https://github.com/shaikn6/federated-credit-risk',
    domain: 'Privacy ML', domainClass: styles.dPrivacy,
    name: 'Federated Credit Risk',
    desc: '3-institution federated learning via Flower FedAvg — zero raw data sharing. L2-norm model poisoning guard, gradient clipping, ECOA Fair Lending feature audit, and differential privacy integration.',
    pills: ['Flower', 'PyTorch', 'FastAPI', 'ECOA'],
    stat: 'Zero data sharing',
  },
  {
    href: 'https://github.com/shaikn6/differential-privacy-llm',
    domain: 'Privacy AI', domainClass: styles.dPrivacy,
    name: 'Differential Privacy LLM',
    desc: 'DP-SGD fine-tuning from first principles with Rényi differential privacy budget accounting. Interactive Streamlit dashboard visualizing privacy-utility tradeoffs across ε values and noise multiplier configurations.',
    pills: ['PyTorch', 'Opacus', 'FastAPI', 'Streamlit'],
    stat: 'Rényi DP accounting',
  },
  {
    href: 'https://github.com/shaikn6/kafka-stream-feature-store',
    domain: 'Data Engineering', domainClass: styles.dDataeng,
    name: 'Kafka Stream Feature Store',
    desc: 'Real-time ML feature store: Kafka producers → Redis with sub-60s freshness guarantee. JSON serialization, per-IP rate limiting, and a FastAPI serving layer with feature versioning and TTL management.',
    pills: ['Kafka', 'Redis', 'FastAPI', 'Pydantic'],
    stat: '< 60s freshness',
  },
  {
    href: 'https://github.com/shaikn6/mlops-retraining-pipeline',
    domain: 'MLOps', domainClass: styles.dMlops,
    name: 'MLOps Retraining Pipeline',
    desc: 'Automated model retraining on data drift using Airflow + MLflow + SageMaker. Evidently AI drift detection triggers retraining jobs, tracks experiments, and promotes champions via A/B shadow deployment.',
    pills: ['Airflow', 'MLflow', 'SageMaker', 'Evidently'],
    stat: 'Auto retraining',
  },
  {
    href: 'https://github.com/shaikn6/enhanced-ai-proctor',
    domain: 'Computer Vision', domainClass: styles.dCv,
    name: 'Enhanced AI Proctor',
    desc: 'Real-time exam proctoring: YOLOv8 object detection + DeepFace identity verification + gaze tracking. Flags prohibited objects, identity switches, and attention loss with timestamped evidence reports via FastAPI.',
    pills: ['YOLOv8', 'DeepFace', 'OpenCV', 'FastAPI'],
    stat: 'Real-time detection',
  },
]

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null)

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLAnchorElement>) => {
    const el = cardRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%')
    el.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%')
  }, [])

  return (
    <ScrollReveal delay={delay}>
      <a
        ref={cardRef}
        className={styles.card}
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        onPointerMove={handlePointerMove}
      >
        <div className={styles.cardHeader}>
          <span className={`${styles.domain} ${project.domainClass}`}>{project.domain}</span>
          <span className={styles.arrow}>↗</span>
        </div>
        <div className={styles.name}>{project.name}</div>
        <div className={styles.desc}>{project.desc}</div>
        <div className={styles.pills}>
          {project.pills.map((p) => <span key={p} className={styles.pill}>{p}</span>)}
        </div>
        <div className={styles.footer}>
          <span className={styles.live}>● Live repo</span>
          <span>{project.stat}</span>
        </div>
      </a>
    </ScrollReveal>
  )
}

export default function Projects() {
  return (
    <section id="projects" className={styles.section}>
      <div className={styles.wrap}>
        <ScrollReveal><div className={styles.sectionTag}>Projects</div></ScrollReveal>
        <ScrollReveal delay={0.05}><h2 className={styles.sectionH}>Things I've actually built.</h2></ScrollReveal>
        <ScrollReveal delay={0.08}>
          <p className={styles.sectionSub}>
            9 open-source repos. Real code, real tests, real CI. AI agents · clinical AI · privacy ML · data infrastructure.
          </p>
        </ScrollReveal>

        <div className={styles.grid}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.href} project={p} delay={i * 0.06} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Commit**

```bash
cd /Users/izaaz95/github-projects/portfolio
git add src/components/Projects.tsx src/components/Projects.module.css
git commit -m "feat: Projects section — glassmorphism cards with cursor-tracking spotlight"
```

---

## Task 10: Skills section

**Files:**
- Create: `src/components/Skills.tsx`
- Create: `src/components/Skills.module.css`

- [ ] **Step 1: Write `src/components/Skills.module.css`**

```css
.section {
  position: relative;
  background: linear-gradient(180deg, rgba(10, 11, 20, 0.72), rgba(7, 8, 15, 0.78));
}

.section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(129, 140, 248, 0.25), transparent);
}

.wrap {
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--space-section) 48px;
}

.sectionTag {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--color-accent);
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}

.sectionTag::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, rgba(56, 189, 248, 0.4), transparent);
  max-width: 100px;
}

.sectionH {
  font-family: var(--font-serif);
  font-size: var(--text-h2);
  margin-bottom: 8px;
  letter-spacing: -0.015em;
  background: linear-gradient(120deg, #f1f5f9 0%, #cbd5e1 40%, var(--color-accent3) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.sectionSub {
  color: var(--color-muted);
  max-width: 580px;
  margin-bottom: 52px;
  font-size: 0.96rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}

.block {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.045), rgba(255, 255, 255, 0.015));
  border: 1px solid var(--color-border2);
  border-radius: var(--radius);
  padding: 22px;
  backdrop-filter: blur(12px) saturate(140%);
  -webkit-backdrop-filter: blur(12px) saturate(140%);
  transition: border-color var(--dur), transform var(--dur), background var(--dur);
}

.block:hover {
  border-color: rgba(56, 189, 248, 0.28);
  transform: translateY(-2px);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.022));
}

.blockTitle {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 14px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.tag {
  font-size: 0.8rem;
  padding: 4px 10px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--color-border2);
  border-radius: 6px;
  color: var(--color-text);
  white-space: nowrap;
  transition: border-color var(--dur), color var(--dur), background var(--dur), transform var(--dur);
}

.tag:hover {
  border-color: rgba(56, 189, 248, 0.4);
  color: var(--color-accent);
  background: rgba(56, 189, 248, 0.08);
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .wrap { padding: 64px 20px; }
}
```

- [ ] **Step 2: Write `src/components/Skills.tsx`**

```typescript
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
```

- [ ] **Step 3: Commit**

```bash
cd /Users/izaaz95/github-projects/portfolio
git add src/components/Skills.tsx src/components/Skills.module.css
git commit -m "feat: Skills section with hover-animated tag blocks"
```

---

## Task 11: Education + Certifications section

**Files:**
- Create: `src/components/Education.tsx`
- Create: `src/components/Education.module.css`

- [ ] **Step 1: Write `src/components/Education.module.css`**

```css
.wrap {
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--space-section) 48px;
}

.sectionTag {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--color-accent);
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}

.sectionTag::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, rgba(56, 189, 248, 0.4), transparent);
  max-width: 100px;
}

.sectionH {
  font-family: var(--font-serif);
  font-size: var(--text-h2);
  margin-bottom: 52px;
  letter-spacing: -0.015em;
  background: linear-gradient(120deg, #f1f5f9 0%, #cbd5e1 40%, var(--color-accent3) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.blockTitle {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 20px;
}

.eduItem {
  padding: 18px 0;
  border-bottom: 1px solid var(--color-border2);
}

.eduItem:last-child { border-bottom: none; }

.degree {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 4px;
}

.school {
  font-size: 0.85rem;
  color: var(--color-muted);
  margin-bottom: 2px;
}

.meta {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--color-muted);
}

.certList {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.certItem {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.045), rgba(255, 255, 255, 0.015));
  border: 1px solid var(--color-border2);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: border-color var(--dur), transform var(--dur), background var(--dur);
}

.certItem:hover {
  border-color: rgba(56, 189, 248, 0.32);
  transform: translateX(4px);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.02));
}

.certBadge {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 700;
  font-family: var(--font-mono);
  flex-shrink: 0;
}

.cAws  { background: rgba(255, 153, 0, 0.15); color: #ff9900; }
.cGcp  { background: rgba(66, 133, 244, 0.15); color: #4285f4; }
.cSnow { background: rgba(41, 182, 246, 0.15); color: #29b6f6; }
.cDbt  { background: rgba(255, 111, 97, 0.15); color: #ff6f61; }

.certName {
  font-size: 0.84rem;
  font-weight: 500;
  line-height: 1.3;
}

@media (max-width: 768px) {
  .wrap { padding: 64px 20px; }
  .grid { grid-template-columns: 1fr; gap: 32px; }
}
```

- [ ] **Step 2: Write `src/components/Education.tsx`**

```typescript
import ScrollReveal from './ScrollReveal'
import styles from './Education.module.css'

const EDUCATION = [
  {
    degree: 'Doctor of Business Administration (DBA)',
    school: 'Belhaven University · Jackson, MS',
    meta: 'Aug 2026 – Present · Business Intelligence & Analytics',
  },
  {
    degree: 'M.S. Computer Science',
    school: 'University of Dayton · Dayton, OH',
    meta: 'Aug 2023 – May 2025 · GPA 3.93 / 4.0',
  },
  {
    degree: 'B.Tech Computer Science Engineering',
    school: 'CMR Engineering College · Hyderabad, India',
    meta: 'Aug 2016 – May 2020 · GPA 8.9 / 10.0',
  },
]

const CERTS = [
  { badge: 'AWS', cls: styles.cAws, name: 'AWS Certified Machine Learning – Specialty' },
  { badge: 'AWS', cls: styles.cAws, name: 'AWS Certified Cloud Practitioner' },
  { badge: 'GCP', cls: styles.cGcp, name: 'GCP Professional Data Engineer' },
  { badge: '❄',  cls: styles.cSnow, name: 'Snowflake SnowPro Advanced: Data Engineer' },
  { badge: 'dbt', cls: styles.cDbt, name: 'dbt Analytics Engineering Certification' },
]

export default function Education() {
  return (
    <section id="education">
      <div className={styles.wrap}>
        <ScrollReveal><div className={styles.sectionTag}>Education & Certifications</div></ScrollReveal>
        <ScrollReveal delay={0.05}><h2 className={styles.sectionH}>Credentials.</h2></ScrollReveal>

        <div className={styles.grid}>
          <div>
            <div className={styles.blockTitle}>Education</div>
            {EDUCATION.map((e, i) => (
              <ScrollReveal key={e.degree} delay={i * 0.07}>
                <div className={styles.eduItem}>
                  <div className={styles.degree}>{e.degree}</div>
                  <div className={styles.school}>{e.school}</div>
                  <div className={styles.meta}>{e.meta}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div>
            <div className={styles.blockTitle}>Certifications</div>
            <div className={styles.certList}>
              {CERTS.map((c, i) => (
                <ScrollReveal key={c.name} delay={i * 0.07}>
                  <div className={styles.certItem}>
                    <div className={`${styles.certBadge} ${c.cls}`}>{c.badge}</div>
                    <div className={styles.certName}>{c.name}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Commit**

```bash
cd /Users/izaaz95/github-projects/portfolio
git add src/components/Education.tsx src/components/Education.module.css
git commit -m "feat: Education and Certifications section"
```

---

## Task 12: Contact section with captcha

**Files:**
- Create: `src/components/Contact.tsx`
- Create: `src/components/Contact.module.css`

- [ ] **Step 1: Write `src/components/Contact.module.css`**

```css
.section {
  text-align: center;
}

.wrap {
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--space-section) 48px;
}

.box {
  max-width: 640px;
  margin: 0 auto;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02));
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 60px 52px;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(20px) saturate(140%);
  -webkit-backdrop-filter: blur(20px) saturate(140%);
  box-shadow: 0 30px 80px -30px rgba(56, 189, 248, 0.25), 0 0 0 1px rgba(56, 189, 248, 0.06) inset;
}

.box::before {
  content: '';
  position: absolute;
  top: -1px;
  left: 10%;
  right: 10%;
  height: 1px;
  background: linear-gradient(to right, transparent, var(--color-accent), var(--color-accent2), transparent);
}

.box::after {
  content: '';
  position: absolute;
  width: 300px;
  height: 300px;
  top: -150px;
  left: 50%;
  transform: translateX(-50%);
  background: radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 70%);
  pointer-events: none;
}

.sectionTag {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--color-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 18px;
}

.heading {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 3.2vw, 2.6rem);
  margin-bottom: 12px;
  letter-spacing: -0.01em;
  background: linear-gradient(120deg, #f1f5f9 0%, var(--color-accent) 60%, var(--color-accent2) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.sub {
  color: var(--color-muted);
  margin-bottom: 36px;
  font-size: 0.95rem;
}

.links {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: 1px solid var(--color-border2);
  border-radius: 10px;
  color: var(--color-text);
  text-decoration: none;
  font-family: var(--font-mono);
  font-size: 0.76rem;
  letter-spacing: 0.04em;
  background: rgba(255, 255, 255, 0.025);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: border-color var(--dur), color var(--dur), background var(--dur), transform var(--dur);
}

.link:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
  background: rgba(56, 189, 248, 0.10);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px -8px rgba(56, 189, 248, 0.45);
}

/* Captcha */
.captchaWrap { margin-top: 8px; }

.captchaBox {
  display: inline-block;
  background: var(--color-surface);
  border: 1px solid var(--color-border2);
  border-radius: 10px;
  padding: 20px 28px;
}

.captchaLabel {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-muted);
  margin-bottom: 10px;
}

.captchaQ {
  font-size: 1.05rem;
  font-weight: 600;
  margin-bottom: 14px;
}

.captchaRow {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.captchaInput {
  width: 88px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--color-border2);
  border-radius: 6px;
  color: var(--color-text);
  font-family: var(--font-mono);
  font-size: 0.9rem;
  text-align: center;
  outline: none;
}

.captchaInput:focus {
  border-color: var(--color-accent);
}

.captchaBtn {
  padding: 8px 18px;
  background: var(--color-accent);
  color: var(--color-bg);
  border: none;
  border-radius: 6px;
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: opacity 0.2s;
}

.captchaBtn:hover { opacity: 0.85; }

.captchaErr {
  font-size: 0.72rem;
  color: #f85149;
  margin-top: 8px;
  min-height: 16px;
}

@media (max-width: 768px) {
  .wrap { padding: 64px 20px; }
  .box { padding: 36px 24px; }
  .links { flex-direction: column; align-items: center; }
}
```

- [ ] **Step 2: Write `src/components/Contact.tsx`**

```typescript
import { useState, useEffect, useRef } from 'react'
import ScrollReveal from './ScrollReveal'
import styles from './Contact.module.css'

type Op = '+' | '×' | '−'

interface Puzzle {
  question: string
  answer: number
}

function generatePuzzle(): Puzzle {
  const ops: Op[] = ['+', '×', '−']
  const op = ops[Math.floor(Math.random() * ops.length)]
  let a: number, b: number, answer: number

  if (op === '×') {
    a = Math.floor(Math.random() * 8) + 2
    b = Math.floor(Math.random() * 8) + 2
    answer = a * b
  } else if (op === '−') {
    a = Math.floor(Math.random() * 20) + 15
    b = Math.floor(Math.random() * 14) + 1
    answer = a - b
  } else {
    a = Math.floor(Math.random() * 30) + 5
    b = Math.floor(Math.random() * 30) + 5
    answer = a + b
  }

  return { question: `What is ${a} ${op} ${b}?`, answer }
}

export default function Contact() {
  const [puzzle, setPuzzle] = useState<Puzzle>(() => generatePuzzle())
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setPuzzle(generatePuzzle())
  }, [])

  const verify = () => {
    if (parseInt(input, 10) === puzzle.answer) {
      setUnlocked(true)
      setError('')
    } else {
      setError('Incorrect — try again.')
      setInput('')
      inputRef.current?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') verify()
  }

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.wrap}>
        <ScrollReveal>
          <div className={styles.box}>
            <div className={styles.sectionTag}>Contact</div>
            <h2 className={styles.heading}>Let's build something.</h2>
            <p className={styles.sub}>ML models · AI agents · cloud infrastructure.</p>

            <div className={styles.links}>
              <a href="https://linkedin.com/in/nagizaazshaik" target="_blank" rel="noopener noreferrer" className={styles.link}>
                <span>in</span> LinkedIn
              </a>
              <a href="https://github.com/shaikn6" target="_blank" rel="noopener noreferrer" className={styles.link}>
                <span>⌥</span> GitHub
              </a>
              <a href="/assets/resume.pdf" target="_blank" rel="noopener noreferrer" className={styles.link}>
                <span>↓</span> Resume
              </a>
            </div>

            {!unlocked ? (
              <div className={styles.captchaWrap}>
                <div className={styles.captchaBox}>
                  <p className={styles.captchaLabel}>Verify you're human to unlock contact</p>
                  <p className={styles.captchaQ}>{puzzle.question}</p>
                  <div className={styles.captchaRow}>
                    <input
                      ref={inputRef}
                      type="number"
                      className={styles.captchaInput}
                      placeholder="Answer"
                      autoComplete="off"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                    <button className={styles.captchaBtn} onClick={verify}>Unlock →</button>
                  </div>
                  <p className={styles.captchaErr}>{error}</p>
                </div>
              </div>
            ) : (
              <div className={styles.links}>
                <a href="mailto:shaikn6@udayton.edu" className={styles.link}>
                  <span>@</span> Email
                </a>
                <a href="tel:+19453940116" className={styles.link}>
                  <span>☎</span> Phone
                </a>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Commit**

```bash
cd /Users/izaaz95/github-projects/portfolio
git add src/components/Contact.tsx src/components/Contact.module.css
git commit -m "feat: Contact section with React-state captcha"
```

---

## Task 13: Analytics script + footer + App assembly

**Files:**
- Create: `src/components/Analytics.tsx`
- Create: `src/components/Footer.tsx`
- Modify: `src/App.tsx` (replace shell with full assembly)

- [ ] **Step 1: Create `src/components/Analytics.tsx`**

This preserves the tracking code from the original `index.html` verbatim.

```typescript
import { useEffect } from 'react'

export default function Analytics() {
  useEffect(() => {
    const API = 'https://portfolio-analytics-five.vercel.app/api/track'
    const t0 = Date.now()

    function fp(): string {
      try {
        const c = document.createElement('canvas')
        const x = c.getContext('2d')!
        x.textBaseline = 'top'
        x.font = '14px Arial'
        x.fillStyle = '#f60'
        x.fillRect(125, 1, 62, 20)
        x.fillStyle = '#069'
        x.fillText('Nagizaaz\u{1F499}', 2, 15)
        x.fillStyle = 'rgba(102,204,0,0.7)'
        x.fillText('Nagizaaz\u{1F499}', 4, 17)
        return c.toDataURL().slice(-32)
      } catch {
        return ''
      }
    }

    const fprint = fp()
    let stored = sessionStorage.getItem('_vsid')
    if (!stored) {
      stored = Math.random().toString(36).slice(2) + Date.now().toString(36)
      sessionStorage.setItem('_vsid', stored)
    }
    const sid = stored + (fprint ? fprint.replace(/[^a-z0-9]/gi, '').slice(0, 8) : '')

    try {
      fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'visit',
          session_id: sid,
          page: location.pathname,
          referrer: document.referrer || '',
        }),
      }).catch(() => {})

      const handleBeforeUnload = () => {
        navigator.sendBeacon(
          API,
          JSON.stringify({
            type: 'leave',
            session_id: sid,
            time_spent: Math.round((Date.now() - t0) / 1000),
          }),
        )
      }

      window.addEventListener('beforeunload', handleBeforeUnload)
      return () => window.removeEventListener('beforeunload', handleBeforeUnload)
    } catch {
      // silently ignore
    }
  }, [])

  return null
}
```

- [ ] **Step 2: Create `src/components/Footer.tsx`**

```typescript
export default function Footer() {
  return (
    <footer style={{
      textAlign: 'center',
      padding: '28px 48px',
      borderTop: '1px solid rgba(255,255,255,0.07)',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.7rem',
      color: 'rgba(226,232,240,0.5)',
      letterSpacing: '0.06em',
      position: 'relative',
      zIndex: 2,
    }}>
      © 2026 Nagizaaz Shaik · ML Engineer · MLOps · AI Systems
    </footer>
  )
}
```

- [ ] **Step 3: Write the full `src/App.tsx`**

```typescript
import ParticleBackground from './components/ParticleBackground'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Metrics from './components/Metrics'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Analytics from './components/Analytics'
import { useScrollProgress } from './hooks/useScrollProgress'

export default function App() {
  useScrollProgress()

  return (
    <>
      <Analytics />
      <div id="scroll-bar" />
      <ParticleBackground />
      <div className="bg-grain" aria-hidden="true" />
      <div className="bg-grid" aria-hidden="true" />

      <Nav />

      <main style={{ position: 'relative', zIndex: 2 }}>
        <Hero />
        <Experience />
        <Metrics />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
```

- [ ] **Step 4: Commit**

```bash
cd /Users/izaaz95/github-projects/portfolio
git add src/App.tsx src/components/Analytics.tsx src/components/Footer.tsx
git commit -m "feat: assemble App — all sections wired, analytics preserved"
```

---

## Task 14: Build verification, Metrics padding fix, and final push

- [ ] **Step 1: Run TypeScript + build**

```bash
cd /Users/izaaz95/github-projects/portfolio && npm run build
```

Expected: `dist/` output, zero TypeScript errors, zero Vite errors.

- [ ] **Step 2: Fix any TypeScript errors**

Common issues to watch for:
- `noUnusedLocals` — remove unused imports
- JSX `as` prop on `ScrollReveal` that conflicts — if so, remove the unused `as` prop from the interface
- Three.js `@types/three` version mismatch — if `drei` types error, add `"skipLibCheck": true` is already set so it should pass

If `ScrollReveal` has a TS error due to the unused `as` parameter, simplify to:

```typescript
interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export default function ScrollReveal({ children, delay = 0, className }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 3: Fix Metrics padding (the component has inline style duplication with its CSS — clean it up)**

In `src/components/Metrics.tsx`, remove the outer wrapping `div` with inline `padding`/`maxWidth` styles and apply them in `Metrics.module.css` instead:

Add to `Metrics.module.css`:
```css
.outer {
  padding: 0 48px;
  max-width: 1100px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .outer { padding: 0 20px; }
}
```

Update `Metrics.tsx` to wrap with `<div className={styles.outer}>`.

- [ ] **Step 4: Run build again to confirm clean**

```bash
cd /Users/izaaz95/github-projects/portfolio && npm run build
```

Expected: `dist/index.html` + `dist/assets/` present, no errors.

- [ ] **Step 5: Final commit**

```bash
cd /Users/izaaz95/github-projects/portfolio
git add -A
git commit -m "feat: complete Vite+React+TS portfolio rebuild — Three.js bg, Framer Motion, glassmorphism cards"
```

- [ ] **Step 6: Push to origin/main**

```bash
cd /Users/izaaz95/github-projects/portfolio && git push origin main
```

Expected: Vercel auto-deploy triggered.

---

## Self-Review

**Spec coverage check:**

| Requirement | Covered |
|---|---|
| Vite + React + TS scaffold | Task 1 |
| CSS Modules, no Tailwind | All component tasks use `.module.css` |
| Three.js via r3f floating particles | Task 4 |
| Three.js aurora orbs | Task 4 `AuroraOrb` component |
| Framer Motion scroll animations | Task 3 `ScrollReveal` + all sections |
| Glassmorphism project cards | Task 9 |
| Cursor-tracking spotlight on cards | Task 9 `handlePointerMove` |
| Sticky glassmorphism nav | Task 5 |
| Animated SVG avatar with glow rings | Task 6 `LegoAvatar` + `photoPulse` animation |
| Skill tag blocks | Task 10 |
| 3+ distinct section backgrounds | Hero (transparent over particles), Experience/Skills (dark gradient), Projects (neutral), Education (clean) |
| Analytics sendBeacon preserved | Task 13 `Analytics.tsx` |
| GitHub Pages redirect preserved | Task 1 `index.html` script |
| vercel.json with buildCommand + outputDirectory | Task 1 |
| npm run build passes | Task 14 |
| Push to origin/main | Task 14 |
| Name, title, tagline | Task 6 |
| Experience (WPCU + Cognizant + Uber) | Task 8 |
| 9 projects with GitHub links | Task 9 |
| Skills blocks | Task 10 |
| Education + certifications | Task 11 |
| Contact + captcha | Task 12 |

**Placeholder scan:** None found — all steps contain actual code.

**Type consistency:** `ScrollReveal` takes `children`, `delay`, `className`. Used consistently across all section components. `ParticleBackground` exports default, imported in `App.tsx`. All CSS module class names match between `.module.css` and `.tsx` files.

---

*Plan complete.*
