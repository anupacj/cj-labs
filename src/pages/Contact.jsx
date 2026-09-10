import React, { useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import styles from './Contact.module.css'

export default function Contact () {
  const headRef = useRef()
  useReveal(headRef)

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <div ref={headRef} className={`${styles.inner} reveal`}>
          <span className={`${styles.eyebrow} mono`}>INITIATE COLLABORATION</span>
          <h2 className={styles.title}>
            Let's build something <em>enduring.</em>
          </h2>
          <p className={styles.sub}>
            We take on select client collaborations per quarter. Reach out to discuss your project vision.
          </p>

          <div className={styles.actions}>
            <a href="mailto:hello@cjlabs.studio" className={styles.btnPrimary} data-cursor>
              Start a Project →
            </a>
            <a href="mailto:hello@cjlabs.studio" className={styles.btnGhost} data-cursor>
              hello@cjlabs.studio
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
