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
