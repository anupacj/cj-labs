import { motion } from 'framer-motion'
import GlassSurface from '../components/UI/GlassSurface/GlassSurface'
import RippleDistortion from '../components/UI/RippleDistortion/RippleDistortion'
import { useGlassSettings } from '../context/GlassContext'
import styles from './Hero.module.css'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }
})

export default function Hero () {
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

      {/* Main Title */}
      <motion.h1 className={styles.title} {...fadeUp(0.22)}>
        <span className={styles.line1}>We craft</span>
        <span className={styles.line2}>extraordinary</span>
        <span className={styles.line3}>interfaces.</span>
      </motion.h1>

      <motion.p className={styles.sub} {...fadeUp(0.36)}>
        CJ Labs is a premium digital design studio. We create interfaces,
        visual systems, and experiences that feel genuinely different.
      </motion.p>

      {/* React Bits GlassSurface Action Buttons (User Settings Synced) */}
      <motion.div className={styles.actions} {...fadeUp(0.48)}>
        <GlassSurface
          width="190px"
          height="52px"
          borderRadius={999}
          onClick={() => scrollTo('work')}
          data-cursor
        >
          <span className={styles.btnText}>View our work →</span>
        </GlassSurface>

        <GlassSurface
          width="170px"
          height="52px"
          borderRadius={999}
          onClick={() => scrollTo('lab')}
          data-cursor
        >
          <span className={styles.btnText}>See the lab ↗</span>
        </GlassSurface>
      </motion.div>

      <motion.div className={styles.scrollHint} {...fadeUp(1.2)}>
        <div className={styles.scrollLine} />
        <span className={`${styles.scrollText} mono`}>Scroll</span>
      </motion.div>
    </section>
  )
}
