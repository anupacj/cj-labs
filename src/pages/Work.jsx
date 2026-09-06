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
            <span className={styles.slateIcon} style={{ display: 'flex', justifyContent: 'center' }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
            </span>
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
