import styles from './Footer.module.css'

const LINKS = ['Work', 'Services', 'Process', 'About', 'Lab', 'Contact']

export default function Footer () {
  const scrollTo = id => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  return (
    <footer className={styles.footer} style={{ position: 'relative', zIndex: 10 }}>
      <div className={styles.container}>
        <div className={styles.topRow}>
          <div className={styles.brand}>
            <div className={styles.logo}>CJ LABS</div>
            <p className={styles.tagline}>Digital presences & WebGL engineering built for ambition.</p>
          </div>
          <div className={styles.links}>
            {LINKS.map(l => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className={styles.link}
                onClick={e => {
                  e.preventDefault()
                  scrollTo(l)
                }}
                data-cursor
              >
                {l}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.bottomRow}>
          <p className={`${styles.copy} mono`}>© 2026 CJ LABS · ALL RIGHTS RESERVED</p>
          <span className={`${styles.loc} mono`}>EST 2024</span>
        </div>
      </div>
    </footer>
  )
}
