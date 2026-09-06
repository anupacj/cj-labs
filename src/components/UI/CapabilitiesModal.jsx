import React from 'react'
import styles from './CapabilitiesModal.module.css'

export default function CapabilitiesModal ({ isOpen, onClose, onOpenProject }) {
  if (!isOpen) return null

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <div className={styles.header}>
          <span className={`${styles.badge} mono`}>STUDIO OVERVIEW 2024–2025</span>
          <h2 className={styles.title}>CJ Labs Capabilities Deck</h2>
          <p className={styles.subtitle}>
            A comprehensive guide to our design craft, full-cycle technical capabilities, process, and engagement models.
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.section}>
            <h3>What's Inside:</h3>
            <ul className={styles.list}>
              <li><strong>Core Pillars:</strong> Branding, UX/UI, WebGL & Engineering, 3D Motion.</li>
              <li><strong>Project Lifecycle:</strong> Discovery, Wireframing, Production, QA, Deployment.</li>
              <li><strong>Engagement Models:</strong> Fixed-Scope Sprints, Team Augmentation, Monthly Retainers.</li>
              <li><strong>Technology Stack:</strong> React 19, Three.js, WebGL, Node, Design Systems.</li>
            </ul>
          </div>

          <div className={styles.deckPreview}>
            <div className={styles.deckBox}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6ee7b7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <div>
                <strong>CJ_Labs_Capabilities_Deck_2025.pdf</strong>
                <p className="mono">PDF · 14.2 MB · Updated Q1 2025</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <a
            href="#download"
            className={styles.downloadBtn}
            onClick={(e) => {
              e.preventDefault()
              alert('Downloading Capabilities Deck PDF...')
            }}
          >
            Download Capabilities Deck (PDF)
          </a>

          <button
            className={styles.projectBtn}
            onClick={() => {
              onClose()
              if (onOpenProject) onOpenProject()
            }}
          >
            Ready to discuss? Start a Project →
          </button>
        </div>
      </div>
    </div>
  )
}
