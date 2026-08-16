import styles from './Contact.module.css'

export default function Contact () {
  return (
    <section id="contact" className={styles.section} style={{ position: 'relative', zIndex: 10 }}>
      <div className={styles.inner}>
        <p className={`${styles.eyebrow} mono`}>Ready to start?</p>
        <h2 className={styles.title}>
          Let's make<br />something <span className={styles.grad}>unforgettable.</span>
        </h2>
        <p className={styles.sub}>We take on 3–4 projects per quarter. Reach out early.</p>

        <div className={styles.actions}>
          <a href="mailto:hello@cjlabs.studio" className={styles.btnPrimary} data-cursor>
            Start a project →
          </a>
          <a href="mailto:hello@cjlabs.studio" className={styles.btnGhost} data-cursor>
            hello@cjlabs.studio
          </a>
        </div>
      </div>
    </section>
  )
}
