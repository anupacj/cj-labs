import styles from './Background.module.css'
import { useEffect, useRef } from 'react'

export default function Background () {
  const containerRef = useRef()

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
            const d = 10 + i * 5
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
      {/* Calm VisionOS Low-Detail Ambient Background */}
      <div className={styles.baseCanvas} />

      {/* Quiet Ambient Refraction Light Nodes */}
      <div data-blob className={styles.blob1} />
      <div data-blob className={styles.blob2} />
      <div data-blob className={styles.blob3} />

      {/* Subtle Micro Mesh */}
      <div className={styles.grid} />
    </div>
  )
}
