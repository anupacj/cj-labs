import { useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import styles from './About.module.css'

const CAPS = [
  { name: 'Visual Design',      tag: 'UI · Brand' },
  { name: 'Motion & Interaction', tag: 'Animation' },
  { name: 'Design Systems',    tag: 'Tokens · Components' },
  { name: 'Web Engineering',   tag: 'React · WebGL' },
  { name: 'Prototyping',       tag: 'Figma · Code' },
  { name: 'Creative Direction', tag: 'Strategy · Vision' },
]

const STATS = [
  { num: '48+',  label: 'Projects shipped', color: 'var(--accent)' },
  { num: '6',    label: 'Years of craft',   color: 'var(--violet)' },
  { num: '100%', label: 'Remote-first',     color: 'var(--blue)' },
  { num: '∞',    label: 'Iterations made',  color: 'var(--rose)' },
]

export default function About () {
  const hRef = useRef(); useReveal(hRef)

  return (
    <section id="about" style={{ position: 'relative', zIndex: 10 }}>
      <div className={styles.inner}>
        <div className={styles.layout}>

          {/* Left — text + stats */}
          <div>
            <div ref={hRef} className={`${styles.head} reveal`}>
              <p className={`${styles.eyebrow} mono`}>About us</p>
              <h2 className={styles.title}>Obsessed<br />with <em>craft</em></h2>
            </div>
            <div className={`${styles.body} reveal reveal-delay-1`}>
              <p>We are a small studio with <strong>high standards and a low tolerance for average.</strong> Every pixel is intentional. Every interaction is considered.</p>
              <p>We work at the intersection of design and engineering — building things that look extraordinary and actually work at scale.</p>
            </div>
            <div className={styles.statGrid}>
              {STATS.map((s, i) => (
                <div key={s.label} className={`${styles.statCard} frosted reveal reveal-delay-${i + 1}`}>
                  <div className={styles.statNum} style={{ color: s.color }}>{s.num}</div>
                  <div className={styles.statLabel}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — capabilities list */}
          <div className={styles.caps}>
            {CAPS.map((c, i) => {
              const r = useRef(); useReveal(r, i * 0.06)
              return (
                <div key={c.name} ref={r} className={`${styles.capItem} reveal`} data-cursor>
                  <div className={styles.capInner}>
                    <span className={styles.capName}>{c.name}</span>
                    <span className={`${styles.capTag} mono`}>{c.tag}</span>
                  </div>
                  <span className={styles.capArrow}>→</span>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
