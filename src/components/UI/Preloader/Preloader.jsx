import React, { useEffect, useState } from 'react'
import Strands from '../Strands/Strands'
import styles from './Preloader.module.css'

export default function Preloader ({ minDuration = 1800, onLoaded }) {
  const [fading, setFading] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFading(true)
      const unmountTimer = setTimeout(() => {
        setHidden(true)
        if (onLoaded) onLoaded()
      }, 600)
      return () => clearTimeout(unmountTimer)
    }, minDuration)

    return () => clearTimeout(timer)
  }, [minDuration, onLoaded])

  if (hidden) return null

  return (
    <div className={`${styles.preloaderOverlay} ${fading ? styles.fadeOut : ''}`}>
      {/* ── React Bits Strands WebGL Waves Canvas ── */}
      <div className={styles.canvasWrap}>
        <Strands
          colors={['#a78bfa', '#6ee7b7', '#60a5fa', '#fb7185']}
          count={4}
          speed={0.65}
          amplitude={1.2}
          waviness={1.1}
          thickness={0.75}
          glow={2.8}
          taper={2.8}
          spread={1.2}
          intensity={0.7}
          saturation={1.6}
          opacity={0.95}
          scale={1.4}
          glass={true}
          refraction={1.2}
          dispersion={1.1}
          glassSize={0.9}
        />
      </div>

      {/* ── Center Brand & Loading Text ── */}
      <div className={styles.content}>
        <div className={styles.brandBadge}>
          <span className={styles.logoDot} />
          <span className={styles.logoText}>CJ LABS</span>
        </div>
        <p className={`${styles.subtitle} mono`}>FULL-CYCLE DIGITAL STUDIO</p>
        <div className={styles.progressRow}>
          <div className={styles.loaderLine} />
          <span className={`${styles.loadingLabel} mono`}>LOADING EXPERIENCES</span>
        </div>
      </div>
    </div>
  )
}
