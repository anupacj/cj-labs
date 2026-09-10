import React, { useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import styles from './Services.module.css'

const PILLARS = [
  {
    num: '01',
    name: 'Branding & Identity',
    values: ['Consistency', 'Narrative'],
    desc: 'Visual identity systems engineered for coherence across physical and digital touchpoints.',
    deliverables: ['Logo Identity Systems', 'Corporate Identity', 'Brand Guidelines & Systems']
  },
  {
    num: '02',
    name: 'UX/UI & Product Design',
    values: ['Hierarchy', 'User Flow'],
    desc: 'Functional interfaces built around user research, clear component hierarchy, and design tokens.',
    deliverables: ['UX Strategy & Research', 'User Interface Design', 'Design Systems', 'Interactive Prototypes']
  },
  {
    num: '03',
    name: 'Web & WebGL Engineering',
    values: ['Speed', 'Scalability'],
    desc: 'Bespoke web applications, interactive WebGL shaders, and high-performance frontend architectures.',
    deliverables: ['Frontend Development', 'Custom WebGL & Shaders', 'Performance Audits', 'Product Analytics']
  },
  {
    num: '04',
    name: '3D & Motion Graphics',
    values: ['Realism', 'Movement'],
    desc: '3D modeling, spatial rendering, and motion design that articulate complex product narratives.',
    deliverables: ['3D Modeling & Rendering', 'Micro-Animations', 'Brand Motion Systems']
  }
]

export default function Services () {
  const headerRef = useRef()
  useReveal(headerRef)

  return (
    <section id="services" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.stickyLayout}>
          {/* Left Column (Sticky) */}
          <div ref={headerRef} className={`${styles.stickyCol} reveal`}>
            <span className={`${styles.eyebrow} mono`}>FULL-CYCLE CAPABILITIES</span>
            <h2 className={styles.stickyTitle}>Services built for <em>ambition</em></h2>
            <p className={styles.stickySub}>
              Our process spans strategy, design, and engineering under one roof to deliver scalable digital systems.
            </p>
          </div>

          {/* Right Column (Scrolling Cards) */}
          <div className={styles.scrollCol}>
            {PILLARS.map((p, i) => {
              const cardRef = useRef()
              useReveal(cardRef, i * 0.08)

              return (
                <div key={p.num} ref={cardRef} className={`${styles.serviceCard} reveal`} data-cursor>
                  <div className={styles.cardHeader}>
                    <span className={`${styles.cardNum} mono`}>({p.num})</span>
                    <div className={styles.cardTitleWrap}>
                      <h3 className={styles.cardName}>{p.name}</h3>
                      <div className={styles.valueRow}>
                        {p.values.map(val => (
                          <span key={val} className={`${styles.valueTag} mono`}>
                            {val}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className={styles.cardDesc}>{p.desc}</p>

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
      </div>
    </section>
  )
}
