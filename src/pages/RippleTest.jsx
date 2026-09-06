import { useState } from 'react'
import RippleDistortion from '../components/UI/RippleDistortion/RippleDistortion'

export default function RippleTest () {
  const [brushSize, setBrushSize] = useState(120)
  const [rings, setRings] = useState(1.25)
  const [strength, setStrength] = useState(0.25)
  const [swirl, setSwirl] = useState(0.5)

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', background: '#000', overflow: 'hidden' }}>
      {/* 100% Pure Isolated RippleDistortion Canvas */}
      <RippleDistortion
        src="/assets/images/wallpaper.jpg"
        brushSize={brushSize}
        rings={rings}
        strength={strength}
        swirl={swirl}
        style={{ width: '100%', height: '100%' }}
      />

      {/* Floating Control Box on Pure Test Page */}
      <div
        style={{
          position: 'fixed',
          top: 20,
          left: 20,
          zIndex: 99999,
          background: 'rgba(0,0,0,0.85)',
          border: '1px solid #333',
          padding: 20,
          borderRadius: 12,
          color: '#fff',
          fontFamily: 'sans-serif',
          fontSize: 12,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          width: 280
        }}
      >
        <h3 style={{ margin: 0, fontSize: 14, color: '#6ee7b7' }}>Pure Isolated Ripple Test</h3>
        <p style={{ margin: 0, color: '#aaa', fontSize: 11 }}>No CSS filters, no glass, no extra layers.</p>

        <div>
          <label>Brush Size: {brushSize}px</label>
          <input
            type="range"
            min="30"
            max="300"
            value={brushSize}
            onChange={e => setBrushSize(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <label>Rings: {rings}</label>
          <input
            type="range"
            min="0.2"
            max="4.0"
            step="0.05"
            value={rings}
            onChange={e => setRings(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <label>Strength: {strength}</label>
          <input
            type="range"
            min="0.05"
            max="0.8"
            step="0.01"
            value={strength}
            onChange={e => setStrength(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <label>Swirl: {swirl}</label>
          <input
            type="range"
            min="0"
            max="2.0"
            step="0.05"
            value={swirl}
            onChange={e => setSwirl(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </div>
  )
}
