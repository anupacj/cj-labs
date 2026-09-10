import { useEffect, useRef } from 'react'
import styles from './Cursor.module.css'

export default function Cursor () {
  const dotRef = useRef()

  useEffect(() => {
    const onMove = e => {
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top = e.clientY + 'px'
      }
    }
    window.addEventListener('mousemove', onMove)

    const addHover = () => document.body.classList.add('cursor-hover')
    const rmHover = () => document.body.classList.remove('cursor-hover')
    const addClick = () => document.body.classList.add('cursor-click')
    const rmClick = () => document.body.classList.remove('cursor-click')

    const targets = document.querySelectorAll('button, a, [data-cursor]')
    targets.forEach(el => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', rmHover)
    })
    window.addEventListener('mousedown', addClick)
    window.addEventListener('mouseup', rmClick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', addClick)
      window.removeEventListener('mouseup', rmClick)
    }
  }, [])

  return (
    <div ref={dotRef} className={styles.dot} />
  )
}
