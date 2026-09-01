import React, { useState, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import styles from './Work.module.css'

const CATEGORIES = [
  { id: 'all', label: 'ALL' },
  { id: 'branding', label: 'BRANDING' },
  { id: 'uxui', label: 'UX/UI & PRODUCT' },
  { id: 'webgl', label: 'WEB & WEBGL' },
  { id: 'motion', label: '3D & MOTION' },
]

export default function Work () {
  const [activeCategory, setActiveCategory] = useState('all')
  const headerRef = useRef()
  useReveal(headerRef)

  return (
    <section id="work" style={{ position: 'relative', zIndex: 10 }}>
      <div className={styles.inner}>
        <div ref={headerRef} className={`${styles.header} reveal`}>
          <p className={`${styles.eyebrow} mono`}>Selected Work</p>
          <h2 className={styles.title}>Projects &<br /><em>Case Studies</em></h2>
          <p className={styles.subtext}>
            Fresh digital presences, brand identities, and high-performance WebGL platforms built for ambition.
          </p>

          {/* Bare Category Filter Bar */}
          <div className={styles.filterBar}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`${styles.filterChip} ${activeCategory === cat.id ? styles.filterChipActive : ''}`}
                onClick={() => setActiveCategory(cat.id)}
                data-cursor
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Clean Slate Bare Project Container */}
        <div className={`${styles.clearSlateBox} frosted reveal`}>
          <div className={styles.slateContent}>
            <span className={styles.slateIcon}>📁</span>
            <h3 className={styles.slateTitle}>Selected Agency Case Studies</h3>
            <p className={styles.slateText}>
              Currently showing category: <strong className="mono">[{activeCategory.toUpperCase()}]</strong>.
            </p>
            <p className={styles.slateSub}>
              We take on select client collaborations per quarter. Request our Capabilities Deck for private client case studies.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
