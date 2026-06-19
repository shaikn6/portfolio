import { lazy, Suspense } from 'react'
import Nav from './components/Nav'
import SocialSidebar from './components/SocialSidebar'
import Hero from './components/Hero'
import Analytics from './components/Analytics'
import CustomCursor from './components/CustomCursor'
import ClickSpark from './components/ClickSpark'
import { useScrollProgress } from './hooks/useScrollProgress'
import { useLenis } from './hooks/useLenis'
import { useReveal } from './hooks/useReveal'

// Below-the-fold — split out of the initial bundle so Hero paints fast (LCP/FCP)
const Manifesto = lazy(() => import('./components/Manifesto'))
const Marquee = lazy(() => import('./components/Marquee'))
const Experience = lazy(() => import('./components/Experience'))
const Metrics = lazy(() => import('./components/Metrics'))
const Projects = lazy(() => import('./components/Projects'))
const Skills = lazy(() => import('./components/Skills'))
const Education = lazy(() => import('./components/Education'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

export default function App() {
  useScrollProgress()
  useLenis()
  useReveal()

  return (
    <>
      <Analytics />
      <CustomCursor />
      <ClickSpark />
      <div id="scroll-bar" />
      <div className="bg-aurora" aria-hidden="true" />
      <div className="bg-grain" aria-hidden="true" />
      <div className="bg-grid" aria-hidden="true" />

      <Nav />
      <SocialSidebar />

      <main style={{ position: 'relative', zIndex: 2 }}>
        <Hero />
        <Suspense fallback={null}>
          <Manifesto />
          <Marquee />
          <Experience />
          <Metrics />
          <Projects />
          <Skills />
          <Education />
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  )
}
