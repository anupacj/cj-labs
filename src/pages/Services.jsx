import { useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import styles from './Services.module.css'

const SERVICES = [
  { icon: '✦', color: 'rgba(110,231,183', name: 'Product Design',    desc: 'End-to-end product design — from research and wireframes to pixel-perfect UI and interactive prototypes.', tags: ['Research','UX/UI','Prototype'] },
  { icon: '◈', color: 'rgba(167,139,250', name: 'Brand Identity',    desc: 'Visual identities that feel inevitable — logos, colour systems, typography, and motion language.', tags: ['Logo','System','Motion'] },
  { icon: '⬡', color: 'rgba(96,165,250',  name: 'Web Experiences',  desc: 'Bespoke websites and interactive experiences that push what the browser can do.', tags: ['WebGL','Canvas','Motion'] },
  { icon: '⬣', color: 'rgba(251,113,133', name: 'Design Systems',   desc: 'Scalable, token-based design systems that bridge design and code at any team size.', tags: ['Tokens','Figma','Storybook'] },
  { icon: '◎', color: 'rgba(251,191,36',  name: 'Art Direction',    desc: 'Creative direction for campaigns, product launches, and editorial across digital and print.', tags: ['Direction','Editorial','Campaign'] },
  { icon: '◌', color: 'rgba(255,255,255', name: 'Fluid Glass Lab',  desc: 'Experimental interfaces with real-time WebGL refraction, haptic design, and next-gen UI patterns.', tags: ['WebGL','R3F','Experimental'] },
]

export default function Services () {
  return (
    <section id="services" style={{ position: 'relative', zIndex: 10 }}>
      <div className={styles.inner}>
        <div className={`${styles.header} reveal`}>
          <p className={`${styles.eyebrow} mono`}>What we do</p>
          <h2 className={styles.title}>Services built<br />for <em>ambition</em></h2>
        </div>
        <div className={styles.grid}>
          {SERVICES.map((s, i) => {
            const r = useRef(); useReveal(r, i * 0.07)
            return (
              <div key={s.name} ref={r} className={`${styles.card} frosted reveal`} data-cursor>
                <div className={styles.icon} style={{ background: `${s.color},0.12)`, border: `1px solid ${s.color},0.20)` }}>
                  {s.icon}
                </div>
                <h3 className={styles.name}>{s.name}</h3>
                <p className={styles.desc}>{s.desc}</p>
                <div className={styles.tags}>
                  {s.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
