import React from 'react'
import GlassTuner from '../components/UI/GlassTuner/GlassTuner'
import Background from '../components/UI/Background'
import Cursor from '../components/UI/Cursor'
import styles from './Settings.module.css'

export default function Settings ({ onBack }) {
  const handleGoBack = () => {
    if (onBack) {
      onBack()
    } else {
      window.location.href = '/'
    }
  }

  return (
    <div className={styles.settingsPage}>
      <Background />
      <Cursor />

      <div className={styles.container}>
        <header className={styles.header}>
          <button className={styles.backBtn} onClick={handleGoBack} data-cursor>
            ← Back to Website
          </button>
          <div className={styles.titleWrap}>
            <h1 className={styles.title}>Studio Controls & Settings</h1>
            <p className={styles.subtitle}>
              Customize live WebGL liquid glass refraction, ripple water physics, and background wallpapers.
            </p>
          </div>
        </header>

        <main className={styles.tunerContainer}>
          <GlassTuner forceOpen={true} embedded={true} />
        </main>
      </div>
    </div>
  )
}
