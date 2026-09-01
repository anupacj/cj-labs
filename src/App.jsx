import { useState, Suspense } from 'react'
import { GlassProvider }  from './context/GlassContext'
import Cursor             from './components/UI/Cursor'
import Background         from './components/UI/Background'
import Nav                from './components/UI/Nav'
import Footer             from './components/UI/Footer'
import LiquidGlassFilter  from './components/UI/LiquidGlassFilter'
import GlassTuner         from './components/UI/GlassTuner/GlassTuner'
import CapabilitiesModal  from './components/UI/CapabilitiesModal'
import ProjectModal       from './components/UI/ProjectModal'
import Preloader          from './components/UI/Preloader/Preloader'
import Hero       from './pages/Hero'
import Work       from './pages/Work'
import About      from './pages/About'
import Services   from './pages/Services'
import Lab        from './pages/Lab'
import Contact    from './pages/Contact'
import RippleTest from './pages/RippleTest'

const Sep = () => (
  <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '0 32px' }} />
)

export default function App () {
  const [testMode, setTestMode] = useState(false)
  const [deckModalOpen, setDeckModalOpen] = useState(false)
  const [projectModalOpen, setProjectModalOpen] = useState(false)

  if (testMode) {
    return (
      <div style={{ position: 'relative' }}>
        <Cursor />
        <button
          onClick={() => setTestMode(false)}
          style={{
            position: 'fixed',
            top: 20,
            right: 20,
            zIndex: 999999,
            background: '#6ee7b7',
            color: '#062319',
            border: 'none',
            padding: '10px 18px',
            borderRadius: 999,
            fontWeight: 'bold',
            fontSize: 13,
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(0,0,0,0.5)'
          }}
        >
          ← Back to Full Site
        </button>
        <RippleTest />
      </div>
    )
  }

  return (
    <GlassProvider>
      {/* ── React Bits Strands WebGL Site Preloader ── */}
      <Preloader minDuration={1800} />

      {/* Black & White Custom Cursor */}
      <Cursor />

      {/* Quick Isolated Test Mode Button */}
      <button
        onClick={() => setTestMode(true)}
        style={{
          position: 'fixed',
          top: 20,
          left: 20,
          zIndex: 99999,
          background: '#a78bfa',
          color: '#1e1035',
          border: 'none',
          padding: '8px 16px',
          borderRadius: 999,
          fontWeight: 'bold',
          fontSize: 12,
          cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(0,0,0,0.5)'
        }}
      >
        🧪 Open Pure Ripple Test Page
      </button>

      {/* ── Modals ── */}
      <CapabilitiesModal
        isOpen={deckModalOpen}
        onClose={() => setDeckModalOpen(false)}
        onOpenProject={() => setProjectModalOpen(true)}
      />
      <ProjectModal
        isOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
      />

      {/* ── Fixed layers ── */}
      <Background />
      <LiquidGlassFilter />

      {/* ── Floating Live Glass Tuner Control Panel ── */}
      <GlassTuner />

      {/* ── Navigation ── */}
      <Nav
        onOpenDeck={() => setDeckModalOpen(true)}
        onOpenProject={() => setProjectModalOpen(true)}
      />

      {/* ── Page sections ── */}
      <main>
        <Hero
          onOpenDeck={() => setDeckModalOpen(true)}
          onOpenProject={() => setProjectModalOpen(true)}
        />
        <Sep />
        <Suspense fallback={null}>
          <Work />
        </Suspense>
        <Sep />
        <About />
        <Sep />
        <Services />
        <Sep />
        <Lab />
        <Sep />
        <Contact />
      </main>

      <Footer />
    </GlassProvider>
  )
}

