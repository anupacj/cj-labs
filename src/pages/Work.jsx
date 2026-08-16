import { useRef } from 'react'
import GlassSurface from '../components/UI/GlassSurface/GlassSurface'
import { useReveal } from '../hooks/useReveal'
import styles from './Work.module.css'

const PROJECTS = [
  {
    id: '01', span: 'large',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80',
    tag: 'Brand Identity · Motion',
    name: 'Nebula Finance — Redefining wealth',
    desc: 'Complete visual identity for a next-gen fintech, built around transparency and fluid motion.',
  },
  {
    id: '02', span: 'tall',
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=80',
    tag: 'UI/UX · Design System',
    name: 'Orbit OS — Control surfaces',
    desc: 'Full design system for a satellite operations platform.',
  },
  {
    id: '03', span: 'tall',
    img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=80',
    tag: 'Web · Interaction',
    name: 'Verdant — Living interface',
    desc: 'Nature-inspired interactive web experience with generative visuals.',
  },
  {
    id: '04', span: 'tall',
    img: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=900&q=80',
    tag: 'Mobile · Animation',
    name: 'Crimson Health — Care reimagined',
    desc: 'Award-winning mobile app design for personalised healthcare.',
  },
]

function WorkCard ({ project, delay }) {
  const ref = useRef()
  useReveal(ref, delay)

  return (
    <div ref={ref} className={`${styles.card} ${styles[project.span]} reveal`}>
      <div className={styles.cardBg} style={{ backgroundImage: `url(${project.img})` }} />
      <div className={styles.scrim} />

      {/* Hover Overlay with User Selected Crystal Liquid Glass View Pill */}
      <div className={styles.hoverOverlay}>
        <GlassSurface
          width="160px"
          height="48px"
          borderRadius={999}
          data-cursor
        >
          <span className={styles.viewPillText}>View case →</span>
        </GlassSurface>
      </div>

      <span className={styles.num}>{project.id}</span>
      <div className={styles.content}>
        <p className={`${styles.tag} mono`}>{project.tag}</p>
        <h3 className={styles.name}>{project.name}</h3>
        <p className={styles.desc}>{project.desc}</p>
      </div>
    </div>
  )
}

export default function Work () {
  return (
    <section id="work" style={{ position: 'relative', zIndex: 10 }}>
      <div className={styles.inner}>
        <div className={`${styles.header} reveal`}>
          <p className={`${styles.eyebrow} mono`}>Selected work</p>
          <h2 className={styles.title}>Projects that<br /><em>move</em> people</h2>
        </div>
        <div className={styles.grid}>
          {PROJECTS.map((p, i) => <WorkCard key={p.id} project={p} delay={i * 0.08} />)}
        </div>
      </div>
    </section>
  )
}
