import { motion } from 'framer-motion'
import TextType from '../components/UI/TextType/TextType'
import styles from './Hero.module.css'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }
})

export default function Hero ({ onOpenProject }) {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.container}>
        {/* Quiet Studio Badge */}
        <motion.div {...fadeUp(0.12)} className={styles.badgeWrap}>
          <span className={`${styles.badge} mono`}>
            FULL-CYCLE STUDIO · EST 2024
          </span>
        </motion.div>

        {/* Clean Headline Zone — No lens collision */}
        <motion.h1 className={styles.title} {...fadeUp(0.20)}>
          <span className={styles.line1}>We build</span>
          <span className={styles.line2}>
            <TextType
              text={['fluid', 'resilient', 'focused']}
              typingSpeed={75}
              deletingSpeed={40}
              pauseDuration={1800}
              showCursor={true}
              cursorCharacter="|"
              textColors={['#f2f0eb']}
            />
          </span>
          <span className={styles.line3}>digital presences.</span>
        </motion.h1>

        {/* Studio Subtitle */}
        <motion.p className={styles.sub} {...fadeUp(0.32)}>
          Vision. Clarity. Flow. Execution. Our process spans strategy, design, and engineering under one roof.
        </motion.p>

        {/* Primary Actions */}
        <motion.div className={styles.actions} {...fadeUp(0.42)}>
          <button
            className={styles.primaryBtn}
            onClick={onOpenProject || (() => scrollTo('contact'))}
            data-cursor
          >
            Start a Project →
          </button>

          <button
            className={styles.secondaryBtn}
            onClick={() => scrollTo('lab')}
            data-cursor
          >
            View the Lab
          </button>
        </motion.div>
      </div>

      {/* Lens Negative Space Canvas Zone */}
      <div className={styles.lensZone} aria-hidden="true" />
    </section>
  )
}
