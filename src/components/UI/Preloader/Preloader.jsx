import React, { useEffect, useState } from 'react'
import Strands from '../Strands/Strands'
import ShinyText from '../ShinyText/ShinyText'
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
          count={3}
          speed={0.5}
          amplitude={1}
          waviness={1}
          thickness={0.7}
          glow={2.6}
          taper={3}
          spread={1}
          intensity={0.6}
          saturation={1.5}
          opacity={1}
          scale={1.5}
          glass={false}
        />
      </div>

      {/* ── Shiny Text Below Waves ── */}
      <div className={styles.bottomTextWrap}>
        <ShinyText
          text="... preparing the magic ..."
          speed={2}
          color="#94a3b8"
          shineColor="#ffffff"
          spread={120}
          className={styles.shinyText}
        />
      </div>
    </div>
  )
}
