import { useState, useRef, Suspense } from 'react'
import FluidGlass from '../components/FluidGlass/FluidGlass'
import { useReveal } from '../hooks/useReveal'
import styles from './Lab.module.css'

const MODES = ['lens', 'bar']
const SHAPES = ['pill', 'wide', 'circle']

export default function Lab () {
  const [mode,      setMode]      = useState('lens')
  const [shape,     setShape]     = useState('pill')
  const [thickness, setThickness] = useState(0.40)
  const [ior,       setIor]       = useState(1.15)
  const [chromatic, setChromatic] = useState(0.08)
  const [roughness, setRoughness] = useState(0.03)

  const sRef = useRef()
  useReveal(sRef)

  const activeProps = { thickness, ior, chromaticAberration: chromatic, roughness }

  return (
    <section id="lab" className={styles.section}>
      <div className={styles.container}>
        <div ref={sRef} className={`${styles.header} reveal`}>
          <span className={`${styles.eyebrow} mono`}>EXPERIMENTAL LAB</span>
          <h2 className={styles.title}>Real fluid glass <em>refraction</em></h2>
          <p className={styles.sub}>
            Interactive WebGL shader canvas rendering physical transmission glass via <code>useFBO</code> framebuffers and <code>MeshTransmissionMaterial</code>.
          </p>
        </div>

        <div className={styles.panel}>
          <div className={styles.toolbar}>
            {/* Mode picker */}
            <div className={styles.segGroup}>
              {MODES.map(m => (
                <button
                  key={m}
                  className={`${styles.seg} ${mode === m ? styles.segActive : ''}`}
                  onClick={() => setMode(m)}
                  data-cursor
                >
                  {m}
                </button>
              ))}
            </div>

            {/* Shape picker (only for lens mode) */}
            {mode === 'lens' && (
              <div className={styles.segGroup}>
                {SHAPES.map(s => (
                  <button
                    key={s}
                    className={`${styles.seg} ${shape === s ? styles.segActive : ''}`}
                    onClick={() => setShape(s)}
                    data-cursor
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div className={styles.sliderRow}>
              <MiniSlider label="Thickness"  value={thickness} min={0.10} max={1.0}  step={0.01}  onChange={setThickness} id="fg-t" />
              <MiniSlider label="IOR"        value={ior}       min={1.0}  max={2.0}  step={0.01}  onChange={setIor}       id="fg-i" />
              <MiniSlider label="Chromatic"  value={chromatic}  min={0}   max={0.25} step={0.005} onChange={setChromatic} id="fg-c" />
              <MiniSlider label="Roughness"  value={roughness}  min={0}   max={0.4}  step={0.01}  onChange={setRoughness} id="fg-r" />
            </div>
          </div>

          <div className={styles.canvasWrap}>
            <Suspense fallback={<div className={styles.loading}>Initialising WebGL…</div>}>
              <FluidGlass
                mode={mode}
                shape={shape}
                lensProps={mode === 'lens' ? activeProps : {}}
                barProps={mode === 'bar' ? activeProps : {}}
              />
            </Suspense>
          </div>

          <p className={`${styles.hint} mono`}>
            [ move cursor over canvas to drag transmission lens ]
          </p>
        </div>
      </div>
    </section>
  )
}

function MiniSlider ({ label, value, min, max, step, onChange, id }) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div className={styles.miniSlider}>
      <label htmlFor={id} className={`${styles.miniLabel} mono`}>
        <span>{label}</span>
        <span className={styles.miniVal}>{value.toFixed(2)}</span>
      </label>
      <div className={styles.sliderWrap}>
        <div className={styles.sliderFill} style={{ width: pct + '%' }} />
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(parseFloat(e.target.value))}
          className={styles.slider}
        />
      </div>
    </div>
  )
}
