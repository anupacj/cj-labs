import { useState, useEffect, Suspense } from 'react'
import { GlassProvider }  from './context/GlassContext'
import Cursor             from './components/UI/Cursor'
import Background         from './components/UI/Background'
import Nav                from './components/UI/Nav'
import Footer             from './components/UI/Footer'
import LiquidGlassFilter  from './components/UI/LiquidGlassFilter'
import CapabilitiesModal  from './components/UI/CapabilitiesModal'
import ProjectModal       from './components/UI/ProjectModal'
import Preloader          from './components/UI/Preloader/Preloader'
import Hero       from './pages/Hero'
import Work       from './pages/Work'
import About      from './pages/About'
import Services   from './pages/Services'
import Lab        from './pages/Lab'
import Contact    from './pages/Contact'
import Settings   from './pages/Settings'

const Sep = () => (
  <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '0 32px' }} />
)

export default function App () {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const [deckModalOpen, setDeckModalOpen] = useState(false)
  const [projectModalOpen, setProjectModalOpen] = useState(false)

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (path) => {
    window.history.pushState({}, '', path)
    setCurrentPath(path)
  }

  // Render dedicated /settings page view if path is /settings
  if (currentPath === '/settings') {
    return (
      <GlassProvider>
        <Settings onBack={() => navigate('/')} />
      </GlassProvider>
    )
  }

  return (
    <GlassProvider>
      {/* ── React Bits Strands WebGL Site Preloader ── */}
      <Preloader minDuration={1800} />

      {/* Black & White Custom Cursor */}
      <Cursor />

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

      {/* ── Navigation ── */}
      <Nav
        onOpenDeck={() => setDeckModalOpen(true)}
        onOpenProject={() => setProjectModalOpen(true)}
        onOpenSettings={() => navigate('/settings')}
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
