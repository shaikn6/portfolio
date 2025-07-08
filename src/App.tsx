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
