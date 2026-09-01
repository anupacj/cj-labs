import React, { useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import styles from './Services.module.css'

const PILLARS = [
  {
    num: '(01)',
    name: 'Branding & Identity',
    values: ['Consistency', 'Narrative'],
    deliverables: ['Logo Identity Systems', 'Corporate Identity', 'Brand Story & Guidelines'],
    color: '#a78bfa'
  },
  {
    num: '(02)',
    name: 'UX/UI & Product Design',
    values: ['Hierarchy', 'User Feedback'],
    deliverables: ['UX Strategy & Research', 'User Interface Design', 'UI Kits & Design Systems', 'Interactive Prototypes'],
    color: '#6ee7b7'
  },
  {
    num: '(03)',
    name: 'Web & WebGL Engineering',
    values: ['Speed', 'Scalability'],
    deliverables: ['Frontend Development', 'Custom WebGL & Shaders', 'DevOps & Architecture', 'Product Analytics'],
    color: '#60a5fa'
  },
  {
    num: '(04)',
    name: '3D & Motion Graphics',
    values: ['Realism', 'Movement'],
    deliverables: ['3D Modeling & Rendering', 'Micro-Animations', 'Brand Campaign Motion'],
    color: '#fb7185'
  }
]

export default function Services () {
  const headerRef = useRef()
  useReveal(headerRef)

  return (
    <section id="services" style={{ position: 'relative', zIndex: 10 }}>
      <div className={styles.inner}>
        <div ref={headerRef} className={`${styles.header} reveal`}>
          <p className={`${styles.eyebrow} mono`}>What We Do</p>
          <h2 className={styles.title}>Full-cycle digital<br /><em>capabilities</em></h2>
          <p className={styles.subtext}>
            We build standout digital products and experiences that move our clients’ brands forward.
          </p>
        </div>

        <div className={styles.pillarList}>
          {PILLARS.map((p, i) => {
            const cardRef = useRef()
            useReveal(cardRef, i * 0.08)

            return (
              <div key={p.num} ref={cardRef} className={`${styles.pillarCard} frosted reveal`} data-cursor>
                <div className={styles.pillarHeader}>
                  <span className={`${styles.pillarNum} mono`} style={{ color: p.color }}>{p.num}</span>
                  <div className={styles.titleBlock}>
                    <h3 className={styles.pillarName}>{p.name}</h3>
                    <div className={styles.valueRow}>
                      {p.values.map(val => (
                        <span key={val} className={`${styles.valueBadge} mono`}>
                          {val}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={styles.deliverablesBlock}>
                  <span className={`${styles.delivLabel} mono`}>DELIVERABLES:</span>
                  <div className={styles.tagGrid}>
                    {p.deliverables.map(d => (
                      <span key={d} className={styles.tag}>{d}</span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
