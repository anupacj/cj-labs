import styles from './Background.module.css'
import { useEffect, useRef } from 'react'
import { useGlassSettings } from '../../context/GlassContext'

export default function Background () {
  const containerRef = useRef()
  const { wallpaperUrl } = useGlassSettings() || {}

  const currentBg = wallpaperUrl || '/assets/images/wallpaper.jpg'

  useEffect(() => {
    const blobs = Array.from(containerRef.current?.querySelectorAll('[data-blob]') || [])
    blobs.forEach((b, i) => {
      setTimeout(() => { b.style.opacity = '1' }, i * 280)
    })

    let ticking = false
    let mouseX = 0
    let mouseY = 0

    const onMove = e => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2

      if (!ticking) {
        requestAnimationFrame(() => {
          blobs.forEach((b, i) => {
            const d = 12 + i * 6
            b.style.transform = `translate3d(${mouseX * d}px, ${mouseY * d}px, 0)`
          })
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div className={styles.bg} ref={containerRef} aria-hidden="true">
      {/* 4K Apple Flowers wallpaper — glass refracts this */}
      <div
        className={styles.wallpaper}
        style={{ backgroundImage: `url("${currentBg}")` }}
      />
      {/* Dark contrast vignette overlay */}
      <div className={styles.overlay} />
      {/* Interactive color blobs */}
      <div data-blob className={styles.blob1} />
      <div data-blob className={styles.blob2} />
      <div data-blob className={styles.blob3} />
      <div data-blob className={styles.blob4} />
      <div className={styles.grid} />
    </div>
  )
}
