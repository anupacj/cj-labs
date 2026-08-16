import styles from './Footer.module.css'

const LINKS = ['Work', 'About', 'Services', 'Lab']

export default function Footer () {
  const scrollTo = id => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  return (
    <footer className={styles.footer} style={{ position: 'relative', zIndex: 10 }}>
      <div className={styles.logo}>CJ LABS</div>
      <div className={styles.links}>
        {LINKS.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} className={styles.link}
            onClick={e => { e.preventDefault(); scrollTo(l) }} data-cursor>{l}</a>
        ))}
      </div>
      <p className={`${styles.copy} mono`}>© 2026 CJ LABS · ALL RIGHTS RESERVED</p>
    </footer>
  )
}
