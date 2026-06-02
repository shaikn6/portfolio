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
