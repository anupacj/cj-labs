import { motion } from 'framer-motion'
import GlassSurface from '../components/UI/GlassSurface/GlassSurface'
import RippleDistortion from '../components/UI/RippleDistortion/RippleDistortion'
import TextType from '../components/UI/TextType/TextType'
import { useGlassSettings } from '../context/GlassContext'
import styles from './Hero.module.css'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }
})

export default function Hero ({ onOpenDeck, onOpenProject }) {
  const { rippleSettings, wallpaperUrl } = useGlassSettings() || {}

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const bgImage = wallpaperUrl || '/assets/images/wallpaper.jpg'

  return (
    <section className={styles.hero} id="hero">
      {/* React Bits RippleDistortion Interactive Water Wave Background */}
      <div className={styles.rippleCanvasWrap}>
        <RippleDistortion
          src={bgImage}
          brushSize={rippleSettings?.brushSize ?? 120}
          rings={rippleSettings?.rings ?? 1.25}
          strength={rippleSettings?.strength ?? 0.25}
          swirl={rippleSettings?.swirl ?? 0.5}
          dispersion={rippleSettings?.dispersion ?? 0.08}
          glint={rippleSettings?.glint ?? 0.3}
          tintAmount={rippleSettings?.tintAmount ?? 0.35}
          tint={rippleSettings?.tint ?? '#8b5cf6'}
          highlightColor={rippleSettings?.highlightColor ?? '#6ee7b7'}
        />
      </div>

      {/* Establishing Badge */}
      <motion.div {...fadeUp(0.15)} style={{ marginBottom: 12 }}>
        <span className="mono" style={{ fontSize: 12, color: '#6ee7b7', letterSpacing: '0.12em', background: 'rgba(110,231,183,0.1)', padding: '6px 14px', borderRadius: 999, border: '1px solid rgba(110,231,183,0.2)' }}>
          FULL-CYCLE DIGITAL AGENCY · EST. 2024
        </span>
      </motion.div>

      {/* Main Title */}
      <motion.h1 className={styles.title} {...fadeUp(0.22)}>
        <span className={styles.line1}>We create</span>
        <span className={styles.line2}>
          <TextType
            text={['extraordinary', 'unforgettable', 'high-impact', 'next-gen']}
            typingSpeed={75}
            deletingSpeed={40}
            pauseDuration={1800}
            showCursor={true}
            cursorCharacter="|"
            textColors={['#a78bfa', '#6ee7b7', '#60a5fa', '#fb7185']}
          />
        </span>
        <span className={styles.line3}>digital presences.</span>
      </motion.h1>

      <motion.p className={styles.sub} {...fadeUp(0.36)}>
        Vision. Clarity. Flow. Execution. We express brand stories through
        design craft, functional tech, and strategic thinking.
      </motion.p>

      {/* Primary Agency CTAs */}
      <motion.div className={styles.actions} {...fadeUp(0.48)}>
        <GlassSurface
          width="230px"
          height="52px"
          borderRadius={999}
          onClick={onOpenDeck}
          data-cursor
        >
          <span className={styles.btnText}>📥 Get Capabilities Deck</span>
        </GlassSurface>

        <GlassSurface
          width="190px"
          height="52px"
          borderRadius={999}
          onClick={onOpenProject}
          data-cursor
        >
          <span className={styles.btnText}>💬 Start a Project →</span>
        </GlassSurface>
      </motion.div>

      <motion.div className={styles.scrollHint} {...fadeUp(1.2)}>
        <div className={styles.scrollLine} />
        <span className={`${styles.scrollText} mono`}>Scroll</span>
      </motion.div>
    </section>
  )
}
