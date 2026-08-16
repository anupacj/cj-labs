import { useEffect, useRef } from 'react'
import styles from './Cursor.module.css'

export default function Cursor () {
  const dotRef  = useRef()
  const ringRef = useRef()
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const ring = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })

  useEffect(() => {
    const onMove = e => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top  = e.clientY + 'px'
      }
    }
    window.addEventListener('mousemove', onMove)

    // Hover state
    const addHover = () => document.body.classList.add('cursor-hover')
    const rmHover  = () => document.body.classList.remove('cursor-hover')
    const addClick = () => document.body.classList.add('cursor-click')
    const rmClick  = () => document.body.classList.remove('cursor-click')

    const targets = document.querySelectorAll('button, a, [data-cursor]')
    targets.forEach(el => { el.addEventListener('mouseenter', addHover); el.addEventListener('mouseleave', rmHover) })
    window.addEventListener('mousedown', addClick)
    window.addEventListener('mouseup',   rmClick)

    // Lagging ring
    let rafId
    const animRing = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.11
      ring.current.y += (pos.current.y - ring.current.y) * 0.11
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px'
        ringRef.current.style.top  = ring.current.y + 'px'
      }
      rafId = requestAnimationFrame(animRing)
    }
    animRing()

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', addClick)
      window.removeEventListener('mouseup',   rmClick)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className={styles.dot}  />
      <div ref={ringRef} className={styles.ring} />
    </>
  )
}
