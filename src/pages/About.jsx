import React, { useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import styles from './About.module.css'

const TEAM = [
  { name: 'Nick Shirokov', role: 'Founder & Creative Lead', color: '#a78bfa' },
  { name: 'Diana Shirokova', role: 'Co-Founder, Operations Manager', color: '#6ee7b7' },
  { name: 'Dmytro Kulyk', role: 'Art Director', color: '#60a5fa' },
  { name: 'Alex Hlovliuk', role: 'Front-End Team Lead', color: '#fb7185' },
  { name: 'Sasha Berezhnoi', role: 'Motion & 3D Designer', color: '#fbbf24' },
  { name: 'Evgen Merkulov', role: 'Backend Team Lead', color: '#38bdf8' },
  { name: 'Bohdan Cheshyk', role: 'UX & UI Designer', color: '#c084fc' },
  { name: 'Polina Ogarko', role: 'QA Team Lead', color: '#4ade80' },
]

export default function About () {
  const headRef = useRef()
  useReveal(headRef)

  return (
    <section id="about" style={{ position: 'relative', zIndex: 10 }}>
      <div className={styles.inner}>
        {/* Core Vision & Positioning */}
        <div className={styles.visionBlock}>
          <div ref={headRef} className={`${styles.head} reveal`}>
            <p className={`${styles.eyebrow} mono`}>Agency Philosophy</p>
            <h2 className={styles.title}>Vision. Clarity.<br /><em>Flow. Execution.</em></h2>
          </div>
          <div className={`${styles.visionBody} reveal`}>
            <p className={styles.leadText}>
              At CJ Labs, our passion lies in crafting fresh digital presences that help our clients stand out in today's dynamic landscape.
            </p>
            <p className={styles.bodyText}>
              Designing compelling brand narratives and innovative digital experiences is not just what we do — it's what we love.
              We think of our team like a creative community where every client is welcome, feels valued, and supported.
            </p>
            <p className={styles.bodyText}>
              We’ve created a nurturing space where creativity and technology fuse, enabling us to deliver exceptional results that truly resonate with your audience.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className={styles.teamSection}>
          <div className={`${styles.teamHeader} reveal`}>
            <p className={`${styles.teamEyebrow} mono`}>Our People</p>
            <h3 className={styles.teamTitle}>A Team Fueled by <em>Curiosity & Vision</em></h3>
          </div>

          {/* Bare Team Roster Grid */}
          <div className={styles.teamGrid}>
            {TEAM.map((member, i) => {
              const itemRef = useRef()
              useReveal(itemRef, i * 0.05)

              return (
                <div key={member.name} ref={itemRef} className={`${styles.teamCard} frosted reveal`} data-cursor>
                  <div className={styles.avatarPlaceholder} style={{ background: `${member.color}22`, borderColor: `${member.color}44` }}>
                    <span style={{ color: member.color, fontWeight: '700' }}>{member.name.charAt(0)}</span>
                  </div>
                  <div className={styles.memberInfo}>
                    <strong className={styles.memberName}>{member.name}</strong>
                    <span className={`${styles.memberRole} mono`}>{member.role}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
