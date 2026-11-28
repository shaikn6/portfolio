import { useState } from 'react'
import ScrollReveal from './ScrollReveal'
import styles from './Contact.module.css'

interface Challenge {
  prompt: string
  tiles: string[]
  exp: number
  nonce: string
  sig: string
}

interface Details {
  email: string
  phone: string
}

const PROFILES = [
  { icon: 'in', label: 'LinkedIn', href: 'https://www.linkedin.com/in/nagizaazshaik' },
  { icon: '⌥', label: 'GitHub', href: 'https://github.com/shaikn6' },
  { icon: '🤗', label: 'Hugging Face', href: 'https://huggingface.co/9mark9' },
]

export default function Contact() {
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [picked, setPicked] = useState<number[]>([])
  const [message, setMessage] = useState('')
  const [details, setDetails] = useState<Details | null>(null)
  const [unavailable, setUnavailable] = useState(false)

  // The server issues the puzzle and checks the answer; the details are never part of this page.
  const load = async (note = '') => {
    setPicked([])
    setMessage(note)
    try {
      const res = await fetch('/api/contact')
      if (res.status === 503) {
        setUnavailable(true) // the server has no contact details configured: show the public links only
        return
      }
      if (res.ok) {
        setChallenge(await res.json())
        return
      }
    } catch {
      // fall through to the message below
    }
    setChallenge(null)
    setMessage('The check could not load. Please reload the page and try again.')
  }

  const verify = async () => {
    if (!challenge) return
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ selection: picked, exp: challenge.exp, nonce: challenge.nonce, sig: challenge.sig }),
      })
      if (res.ok) {
        setDetails(await res.json())
        return
      }
      await load('Not quite. Here is a new one.')
    } catch {
      setMessage('Something went wrong. Please try again.')
    }
  }

  const profileLinks = PROFILES.map(({ icon, label, href }) => (
    <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={styles.link}>
      <span>{icon}</span> {label}
    </a>
  ))

  const toggle = (index: number) =>
    setPicked((current) => (current.includes(index) ? current.filter((i) => i !== index) : [...current, index]))

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.wrap}>
        <ScrollReveal>
          <div className={styles.box}>
            <div className={styles.sectionTag}>Contact</div>
            <h2 className={styles.heading}>Let's build something.</h2>
            <p className={styles.sub}>GenAI · Fintech · LLM &amp; RAG · AWS.</p>

            {details ? (
              <div className={styles.links}>
                <a href={`mailto:${details.email}`} className={styles.link}>
                  <span>✉</span> {details.email}
                </a>
                <a href={`tel:${details.phone.replace(/[^\d+]/g, '')}`} className={styles.link}>
                  <span>☎</span> {details.phone}
                </a>
                {profileLinks}
              </div>
            ) : unavailable ? (
              <>
                <p className={styles.captchaErr}>Email and phone are not available right now. Find me here:</p>
                <div className={styles.links}>{profileLinks}</div>
              </>
            ) : (
              <div className={styles.captchaWrap}>
                <div className={styles.captchaBox}>
                  <p className={styles.captchaLabel}>Verify you're human to see my email, phone and links</p>
                  {challenge ? (
                    <>
                      <p className={styles.captchaQ}>{challenge.prompt}</p>
                      <div className={styles.tiles}>
                        {challenge.tiles.map((tile, index) => (
                          <button
                            key={index}
                            type="button"
                            className={styles.tile}
                            aria-pressed={picked.includes(index)}
                            onClick={() => toggle(index)}
                          >
                            {tile}
                          </button>
                        ))}
                      </div>
                      <div className={styles.captchaRow}>
                        <button className={styles.captchaBtn} onClick={verify}>Unlock →</button>
                      </div>
                    </>
                  ) : (
                    <div className={styles.captchaRow}>
                      <button className={styles.captchaBtn} onClick={() => load()}>Start the check</button>
                    </div>
                  )}
                  <p className={styles.captchaErr} role="status">{message}</p>
                </div>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
