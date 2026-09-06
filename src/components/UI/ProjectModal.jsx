import React, { useState } from 'react'
import styles from './ProjectModal.module.css'

const SERVICES = ['Branding & Identity', 'UX/UI & Product', 'Web & WebGL Engineering', '3D & Motion']
const BUDGETS = ['< $15k', '$15k – $35k', '$35k – $75k', '$75k+']

export default function ProjectModal ({ isOpen, onClose }) {
  const [selectedServices, setSelectedServices] = useState([])
  const [budget, setBudget] = useState('$15k – $35k')
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen) return null

  const toggleService = (s) => {
    setSelectedServices(prev =>
      prev.includes(s) ? prev.filter(item => item !== s) : [...prev, s]
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      onClose()
    }, 2500)
  }

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        {submitted ? (
          <div className={styles.successState}>
            <span className={styles.successIcon} style={{ display: 'flex', justifyContent: 'center' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#6ee7b7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </span>
            <h2>Project Inquiry Received!</h2>
            <p>Thank you for reaching out. We take on 3–4 select projects per quarter and will get back to you within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.header}>
              <span className={`${styles.badge} mono`}>START A COLLABORATION</span>
              <h2 className={styles.title}>Let's build something unforgettable.</h2>
              <p className={styles.subtitle}>
                Tell us about your project vision, timeline, and scope.
              </p>
            </div>

            {/* Services selection */}
            <div className={styles.fieldGroup}>
              <label className={styles.label}>1. What services do you need?</label>
              <div className={styles.chipGrid}>
                {SERVICES.map(s => (
                  <button
                    type="button"
                    key={s}
                    className={`${styles.chip} ${selectedServices.includes(s) ? styles.chipActive : ''}`}
                    onClick={() => toggleService(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget selection */}
            <div className={styles.fieldGroup}>
              <label className={styles.label}>2. Expected Budget Range (USD)</label>
              <div className={styles.chipGrid}>
                {BUDGETS.map(b => (
                  <button
                    type="button"
                    key={b}
                    className={`${styles.chip} ${budget === b ? styles.chipActive : ''}`}
                    onClick={() => setBudget(b)}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs */}
            <div className={styles.inputRow}>
              <div className={styles.inputWrap}>
                <label className={styles.label}>Name *</label>
                <input type="text" required placeholder="Alex Rivera" className={styles.input} />
              </div>
              <div className={styles.inputWrap}>
                <label className={styles.label}>Work Email *</label>
                <input type="email" required placeholder="alex@company.com" className={styles.input} />
              </div>
            </div>

            <div className={styles.inputWrap}>
              <label className={styles.label}>Project Details</label>
              <textarea rows={3} placeholder="Briefly describe your goals, timeline, or links..." className={styles.textarea} />
            </div>

            <button type="submit" className={styles.submitBtn}>
              Submit Project Inquiry →
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
