import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import GlassSurface from './GlassSurface/GlassSurface'
import styles from './Nav.module.css'

const NAV_ITEMS = [
  { label: 'Work',     link: '#work' },
  { label: 'Services', link: '#services' },
  { label: 'Lab',      link: '#lab' },
  { label: 'About',    link: '#about' },
  { label: 'Contact',  link: '#contact' },
]

export default function Nav ({ onOpenProject }) {
  const [activeItem, setActiveItem] = useState('Work')
  const [scrolled, setScrolled]     = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
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
      {/* Studio Brand Identifier */}
      <div className={styles.logo} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} data-cursor>
        <span className={`${styles.logoText} mono`}>CJ LABS</span>
      </div>

      {/* Floating VisionOS Glass Navigation Bar */}
      <GlassSurface
        borderRadius={999}
        className={`${styles.glassBarSurface} ${scrolled ? styles.glassBarScrolled : ''}`}
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
                {isActive && (
                  <motion.div
                    layoutId="navActiveIndicator"
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

      {/* Distinct CTA Button: Start a Project */}
      <button
        className={styles.startProjectCta}
        onClick={onOpenProject || (() => handleNavigate({ label: 'Contact', link: '#contact' }))}
        data-cursor
      >
        <span>Start a Project</span>
        <span className={styles.ctaArrow}>→</span>
      </button>
    </header>
  )
}
