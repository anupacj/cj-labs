import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import GlassSurface from './GlassSurface/GlassSurface'
import styles from './Nav.module.css'

const NAV_ITEMS = [
  { label: 'Work',     link: '#work' },
  { label: 'About',    link: '#about' },
  { label: 'Services', link: '#services' },
  { label: 'Lab',      link: '#lab' },
  { label: 'Contact',  link: '#contact' },
]

export default function Nav () {
  const [activeItem, setActiveItem] = useState('Work')
  const [scrolled, setScrolled]     = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavigate = (item) => {
    setActiveItem(item.label)
    const targetId = item.link.slice(1)
    const el = document.getElementById(targetId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className={`${styles.navHeader} ${scrolled ? styles.headerScrolled : ''}`}>
      {/* Brand Logo */}
      <div className={styles.logo} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} data-cursor>
        <span className={styles.logoDot} />
        <span className={styles.logoText}>CJ LABS</span>
      </div>

      {/* Floating VisionOS Glass Navigation Bar — Thicker, Spacious & Longer */}
      <GlassSurface
        borderRadius={999}
        className={styles.glassBarSurface}
      >
        <nav className={styles.navItemsRow}>
          {NAV_ITEMS.map((item) => {
            const isActive = activeItem === item.label
            return (
              <button
                key={item.label}
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                onClick={() => handleNavigate(item)}
                data-cursor
              >
                {/* Ultra-Smooth Sliding Active Pill */}
                {isActive && (
                  <motion.div
                    layoutId="navActivePill"
                    className={styles.activePillBackground}
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30,
                      mass: 0.8
                    }}
                  />
                )}
                <span className={styles.navText}>{item.label}</span>
              </button>
            )
          })}
        </nav>
      </GlassSurface>

      {/* Circular VisionOS Glass Action Button */}
      <GlassSurface
        width={56}
        height={56}
        borderRadius={999}
        className={styles.circleBtnSurface}
        onClick={() => handleNavigate({ label: 'Contact', link: '#contact' })}
        data-cursor
      >
        <span className={styles.circleIcon}>💬</span>
      </GlassSurface>
    </header>
  )
}
