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

// Assembled at runtime — keeps contact details out of static source strings
// so scrapers crawling the bundle never see a complete address. Only revealed
// in the DOM after the human-verification puzzle is solved.
function getEmail(): string {
  return ['nagizaazs', '@', 'gmail', '.com'].join('')
}

function getPhoneTel(): string {
  return ['+1', '256', '251', '4502'].join('')
}

export default function Contact() {
  const [puzzle, setPuzzle] = useState<Puzzle>(() => generatePuzzle())
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [email, setEmail] = useState('')
  const [phoneTel, setPhoneTel] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setPuzzle(generatePuzzle())
  }, [])

  const verify = () => {
    if (parseInt(input, 10) === puzzle.answer) {
      setUnlocked(true)
      setEmail(getEmail())
      setPhoneTel(getPhoneTel())
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
              <a href="https://huggingface.co/9mark9" target="_blank" rel="noopener noreferrer" className={styles.link}>
                <span>🤗</span> Hugging Face
              </a>
              <a href="/assets/resume.pdf" target="_blank" rel="noopener noreferrer" className={styles.link}>
                <span>↓</span> Resume
              </a>
            </div>

            {!unlocked ? (
              <div className={styles.captchaWrap}>
                <div className={styles.captchaBox}>
                  <p className={styles.captchaLabel}>Verify you're human to unlock email</p>
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
                <a href={`tel:${phoneTel}`} className={styles.link} aria-label="Call">
                  <span>☎</span> Call
                </a>
                <a href={`mailto:${email}`} className={styles.link} aria-label="Email">
                  <span>@</span> Email
                </a>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
