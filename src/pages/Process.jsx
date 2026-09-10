import React, { useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import styles from './Process.module.css'

const STEPS = [
  {
    num: '01',
    phase: 'Discover & Strategize',
    desc: 'Deep-dive research into brand positioning, market landscape, user behavior, and technical constraints.'
  },
  {
    num: '02',
    phase: 'Design & Prototype',
    desc: 'Iterative spatial UI design, visual systems, interactive prototypes, and motion graphics language.'
  },
  {
    num: '03',
    phase: 'Engineer & Build',
    desc: 'Production-grade frontend architecture, custom WebGL shaders, performance optimization, and token integration.'
  },
  {
    num: '04',
    phase: 'Ship & Expand',
    desc: 'Seamless deployment, real-time analytics integration, performance monitoring, and continuous studio support.'
  }
]

export default function Process () {
  const headerRef = useRef()
  useReveal(headerRef)

  return (
    <section id="process" className={styles.section}>
      <div className={styles.container}>
        <div ref={headerRef} className={`${styles.header} reveal`}>
          <span className={`${styles.eyebrow} mono`}>STUDIO METHODOLOGY</span>
          <h2 className={styles.title}>How we <em>collaborate</em></h2>
          <p className={styles.subtext}>
            A disciplined, four-phase engineering and design pipeline engineered for precision and momentum.
          </p>
        </div>

        <div className={styles.grid}>
          {STEPS.map((step, i) => {
            const cardRef = useRef()
            useReveal(cardRef, i * 0.08)

            return (
              <div key={step.num} ref={cardRef} className={`${styles.stepCard} reveal`}>
                <span className={`${styles.stepNum} mono`}>({step.num})</span>
                <h3 className={styles.stepTitle}>{step.phase}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
