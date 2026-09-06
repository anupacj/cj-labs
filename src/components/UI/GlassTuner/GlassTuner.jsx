import { useState } from 'react'
import {
  useGlassSettings,
  DEFAULT_GLASS_SETTINGS,
  DEFAULT_RIPPLE_SETTINGS,
  DEFAULT_WALLPAPER
} from '../../../context/GlassContext'
import styles from './GlassTuner.module.css'

const PRESET_WALLPAPERS = [
  { name: 'Apple Flowers 4K', url: '/assets/images/wallpaper.jpg' },
  { name: 'Aurora Borealis',  url: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1920&q=80' },
  { name: 'Deep Space Nebula', url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&q=80' },
  { name: 'Vibrant Abstract',  url: 'https://images.unsplash.com/photo-1505506874110-6a7a69069a08?w=1920&q=80' },
]

export default function GlassTuner ({ embedded = false }) {
  const {
    settings, updateSetting, setSettings,
    rippleSettings, updateRippleSetting, setRippleSettings,
    wallpaperUrl, setWallpaperUrl
  } = useGlassSettings()

  const [tab, setTab] = useState('glass') // 'glass' | 'ripple' | 'wallpaper'
  const [open, setOpen] = useState(true)
  const [copied, setCopied] = useState(false)

  const copyConfig = () => {
    const code = JSON.stringify({ glass: settings, ripple: rippleSettings, wallpaper: wallpaperUrl }, null, 2)
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const resetConfig = () => {
    setSettings(DEFAULT_GLASS_SETTINGS)
    setRippleSettings(DEFAULT_RIPPLE_SETTINGS)
    setWallpaperUrl(DEFAULT_WALLPAPER)
  }

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setWallpaperUrl(url)
    }
  }

  return (
    <div className={`${styles.tunerWrap} ${embedded ? styles.embeddedWrap : ''} ${open ? styles.open : styles.closed}`}>
      {/* Toggle Header */}
      <button className={styles.toggleBtn} onClick={() => setOpen(!open)} data-cursor>
        <span>Studio Controls</span>
        <span className={styles.arrow}>{open ? '▼' : '▲'}</span>
      </button>

      {open && (
        <div className={styles.tunerBody}>
          {/* Tab Navigation */}
          <div className={styles.tabBar}>
            <button className={`${styles.tabBtn} ${tab === 'glass' ? styles.tabActive : ''}`} onClick={() => setTab('glass')}>
              Glass
            </button>
            <button className={`${styles.tabBtn} ${tab === 'ripple' ? styles.tabActive : ''}`} onClick={() => setTab('ripple')}>
              Ripple
            </button>
            <button className={`${styles.tabBtn} ${tab === 'wallpaper' ? styles.tabActive : ''}`} onClick={() => setTab('wallpaper')}>
              Wallpaper
            </button>
          </div>

          {/* Tab 1: Glass Surface Controls */}
          {tab === 'glass' && (
            <div className={styles.slidersGrid}>
              <SliderRow
                label="Blur (Frosted Amount)"
                value={settings.blur}
                min={0} max={25} step={1}
                unit="px"
                hint="0 = crystal clear, 20 = frosted"
                onChange={val => updateSetting('blur', val)}
              />
              <SliderRow
                label="Displacement (Refraction)"
                value={settings.displace}
                min={0} max={45} step={1}
                unit=""
                hint="Bends background content"
                onChange={val => updateSetting('displace', val)}
              />
              <SliderRow
                label="Brightness (Transmission)"
                value={settings.brightness}
                min={0.5} max={2.5} step={0.05}
                unit="x"
                hint="Light transmission boost"
                onChange={val => updateSetting('brightness', val)}
              />
              <SliderRow
                label="Saturation"
                value={settings.saturation}
                min={0.5} max={3.5} step={0.1}
                unit="x"
                hint="Color vibrancy through glass"
                onChange={val => updateSetting('saturation', val)}
              />
              <SliderRow
                label="Red Chromatic Shift"
                value={settings.redOffset}
                min={-15} max={15} step={1}
                unit="px"
                onChange={val => updateSetting('redOffset', val)}
              />
              <SliderRow
                label="Green Chromatic Shift"
                value={settings.greenOffset}
                min={-15} max={15} step={1}
                unit="px"
                onChange={val => updateSetting('greenOffset', val)}
              />
              <SliderRow
                label="Blue Chromatic Shift"
                value={settings.blueOffset}
                min={-15} max={20} step={1}
                unit="px"
                onChange={val => updateSetting('blueOffset', val)}
              />
            </div>
          )}

          {/* Tab 2: Ripple Distortion Controls */}
          {tab === 'ripple' && (
            <div className={styles.slidersGrid}>
              <SliderRow
                label="Brush Size"
                value={rippleSettings.brushSize}
                min={20} max={300} step={5}
                unit="px"
                hint="Size of water ripple wave"
                onChange={val => updateRippleSetting('brushSize', val)}
              />
              <SliderRow
                label="Rings"
                value={rippleSettings.rings}
                min={0.2} max={4.0} step={0.05}
                unit=""
                hint="Number of concentric wave rings"
                onChange={val => updateRippleSetting('rings', val)}
              />
              <SliderRow
                label="Strength"
                value={rippleSettings.strength}
                min={0.05} max={0.8} step={0.01}
                unit=""
                hint="Wave distortion intensity"
                onChange={val => updateRippleSetting('strength', val)}
              />
              <SliderRow
                label="Swirl"
                value={rippleSettings.swirl}
                min={0} max={2.0} step={0.05}
                unit=""
                hint="Spiral rotation amount"
                onChange={val => updateRippleSetting('swirl', val)}
              />
              <SliderRow
                label="Dispersion"
                value={rippleSettings.dispersion}
                min={0} max={0.25} step={0.01}
                unit=""
                hint="Chromatic color split"
                onChange={val => updateRippleSetting('dispersion', val)}
              />
              <SliderRow
                label="Glint (Specular Light)"
                value={rippleSettings.glint}
                min={0} max={1.0} step={0.05}
                unit=""
                hint="Water surface shine highlight"
                onChange={val => updateRippleSetting('glint', val)}
              />
              <SliderRow
                label="Tint Amount"
                value={rippleSettings.tintAmount}
                min={0} max={1.0} step={0.05}
                unit=""
                onChange={val => updateRippleSetting('tintAmount', val)}
              />
            </div>
          )}

          {/* Tab 3: Wallpaper Image Switcher */}
          {tab === 'wallpaper' && (
            <div className={styles.wallpaperTab}>
              <p className={styles.subText}>Select or upload background wallpaper:</p>
              <div className={styles.presetGrid}>
                {PRESET_WALLPAPERS.map(p => (
                  <button
                    key={p.url}
                    className={`${styles.presetBtn} ${wallpaperUrl === p.url ? styles.presetActive : ''}`}
                    onClick={() => setWallpaperUrl(p.url)}
                  >
                    {p.name}
                  </button>
                ))}
              </div>

              <div className={styles.uploadBlock}>
                <label className={styles.uploadLabel}>
                  <span>Upload Custom Local Image</span>
                  <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
                </label>

                <div className={styles.urlInputWrap}>
                  <span className={styles.urlLabel}>Or Image URL:</span>
                  <input
                    type="text"
                    value={wallpaperUrl}
                    onChange={e => setWallpaperUrl(e.target.value)}
                    className={styles.urlInput}
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className={styles.actions}>
            <button className={styles.copyBtn} onClick={copyConfig} data-cursor>
              {copied ? 'Copied All Config' : 'Copy All Settings'}
            </button>
            <button className={styles.resetBtn} onClick={resetConfig} data-cursor>
              Reset Defaults
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function SliderRow ({ label, value, min, max, step, unit, hint, onChange }) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div className={styles.sliderBlock}>
      <div className={styles.labelRow}>
        <span className={styles.sliderLabel}>{label}</span>
        <span className={styles.sliderVal}>{typeof value === 'number' && !Number.isInteger(value) ? value.toFixed(2) : value}{unit}</span>
      </div>
      <div className={styles.sliderWrap}>
        <div className={styles.sliderFill} style={{ width: `${pct}%` }} />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(parseFloat(e.target.value))}
          className={styles.slider}
        />
      </div>
      {hint && <span className={styles.hintText}>{hint}</span>}
    </div>
  )
}
