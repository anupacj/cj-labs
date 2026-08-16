import { useEffect } from 'react'

/**
 * Attaches IntersectionObserver to a ref,
 * adding 'visible' class when the element enters the viewport.
 */
export function useReveal (ref, delay = 0) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (delay) el.style.transitionDelay = `${delay}s`

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          obs.unobserve(entry.target)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -36px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref, delay])
}
