import React, { useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import styles from './About.module.css'

export default function About () {
  const headRef = useRef()
  const founderRef = useRef()
  useReveal(headRef)
  useReveal(founderRef, 0.1)

  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left Column: Studio Philosophy */}
          <div ref={headRef} className={`${styles.visionBlock} reveal`}>
            <span className={`${styles.eyebrow} mono`}>STUDIO PHILOSOPHY</span>
            <h2 className={styles.title}>Vision. Clarity.<br /><em>Flow. Execution.</em></h2>
            <div className={styles.visionBody}>
              <p className={styles.leadText}>
                At CJ Labs, we craft digital presences that combine engineering rigor with refined visual restraint.
              </p>
              <p className={styles.bodyText}>
                We believe exceptional digital products come from eliminating friction — aligning strategy, spatial UI design, and GPU-accelerated graphics under one focused studio practice.
              </p>
              <p className={styles.bodyText}>
                Our work is designed to endure: fast, clear, and quiet in its authority.
              </p>
            </div>
          </div>

          {/* Right Column: Founder & Leadership Card */}
          <div ref={founderRef} className={`${styles.founderCol} reveal`}>
            <div className={styles.founderCard} data-cursor>
              <div className={styles.avatarFrame}>
                <span className={`${styles.monogram} mono`}>CJ</span>
              </div>
              <div className={styles.founderInfo}>
                <span className={`${styles.founderRole} mono`}>LEAD FULL-STACK DEVELOPER</span>
                <h3 className={styles.founderName}>Chiran Jayasiri</h3>
                <p className={styles.founderBio}>
                  Directing brand strategy, frontend architecture, and interactive 3D WebGL implementations.
                </p>
                <div className={styles.disciplinesRow}>
                  <span className={`${styles.disciplineTag} mono`}>Design</span>
                  <span className={`${styles.disciplineTag} mono`}>Engineering</span>
                  <span className={`${styles.disciplineTag} mono`}>3D</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
