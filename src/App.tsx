import Nav from './components/Nav'
import SocialSidebar from './components/SocialSidebar'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Metrics from './components/Metrics'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Analytics from './components/Analytics'
import Manifesto from './components/Manifesto'
import Marquee from './components/Marquee'
import CustomCursor from './components/CustomCursor'
import { useScrollProgress } from './hooks/useScrollProgress'
import { useLenis } from './hooks/useLenis'
import { useReveal } from './hooks/useReveal'

export default function App() {
  useScrollProgress()
  useLenis()
  useReveal()

  return (
    <>
      <Analytics />
      <CustomCursor />
      <div id="scroll-bar" />
      <div className="bg-aurora" aria-hidden="true" />
      <div className="bg-grain" aria-hidden="true" />
      <div className="bg-grid" aria-hidden="true" />

      <Nav />
      <SocialSidebar />

      <main style={{ position: 'relative', zIndex: 2 }}>
        <Hero />
        <Manifesto />
        <Marquee />
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
