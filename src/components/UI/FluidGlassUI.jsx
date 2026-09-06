/* eslint-disable react/no-unknown-property */
import * as THREE from 'three'
import { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial, RoundedBox } from '@react-three/drei'
import { easing } from 'maath'
import styles from './FluidGlassUI.module.css'

/* ═════════════════════════════════════════════════════════
   1. 3D WebGL Liquid Glass Mesh (Reusable R3F Mesh)
   Uses MeshTransmissionMaterial for real optical refraction,
   chromatic aberration, iridescence, and specular rim highlights.
═════════════════════════════════════════════════════════ */
function GlassPillMesh ({
  width = 3,
  height = 0.8,
  thickness = 0.5,
  radius = 0.4,
  isHovered = false,
  isClicked = false,
  color = '#ffffff',
  chromatic = 0.12,
  ior = 1.22
}) {
  const meshRef = useRef()

  useFrame((_, delta) => {
    if (!meshRef.current) return
    const targetScaleX = isClicked ? 0.95 : isHovered ? 1.05 : 1
    const targetScaleY = isClicked ? 0.95 : isHovered ? 1.05 : 1
    const targetRotZ   = isHovered ? 0.02 : 0

    easing.damp(meshRef.current.scale, 'x', targetScaleX, 0.12, delta)
    easing.damp(meshRef.current.scale, 'y', targetScaleY, 0.12, delta)
    easing.damp(meshRef.current.rotation, 'z', targetRotZ, 0.15, delta)
  })

  return (
    <group>
      {/* Specular & Ambient Lights */}
      <directionalLight position={[4, 6, 6]} intensity={2.2} color="#ffffff" />
      <directionalLight position={[-4, -4, -2]} intensity={0.8} color="#a78bfa" />
      <pointLight position={[0, 2, 3]} intensity={1.5} color="#ffffff" />

      <mesh ref={meshRef} position={[0, 0, 0]}>
        <RoundedBox args={[width, height, thickness]} radius={radius} smoothness={12}>
          <MeshTransmissionMaterial
            samples={12}
            resolution={512}
            transmission={0.98}
            thickness={thickness * 2.5}
            roughness={0.015}
            chromaticAberration={isHovered ? chromatic * 1.5 : chromatic}
            anisotropicBlur={0.03}
            distortion={0.2}
            distortionScale={0.3}
            temporalDistortion={0.02}
            iridescence={isHovered ? 0.95 : 0.65}
            iridescenceIOR={1.4}
            iridescenceThicknessRange={[0, 1400]}
            ior={ior}
            color={color}
          />
        </RoundedBox>
      </mesh>
    </group>
  )
}

/* ═════════════════════════════════════════════════════════
   2. 3D WebGL Circular Glass Mesh (Apple VisionOS Circle)
═════════════════════════════════════════════════════════ */
function GlassCircleMesh ({ size = 1.2, isHovered = false, isClicked = false }) {
  const meshRef = useRef()

  useFrame((_, delta) => {
    if (!meshRef.current) return
    const targetScale = isClicked ? 0.92 : isHovered ? 1.08 : 1
    easing.damp(meshRef.current.scale, 'x', targetScale, 0.12, delta)
    easing.damp(meshRef.current.scale, 'y', targetScale, 0.12, delta)
  })

  return (
    <group>
      <directionalLight position={[3, 5, 5]} intensity={2.5} color="#ffffff" />
      <pointLight position={[-2, -2, 2]} intensity={2.0} color="#6ee7b7" />

      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[size / 2, 48, 48]} />
        <MeshTransmissionMaterial
          samples={12}
          resolution={512}
          transmission={0.97}
          thickness={0.8}
          roughness={0.01}
          chromaticAberration={0.16}
          anisotropicBlur={0.04}
          distortion={0.25}
          iridescence={0.9}
          iridescenceIOR={1.45}
          iridescenceThicknessRange={[100, 1200]}
          ior={1.28}
          color="#ffffff"
        />
      </mesh>
    </group>
  )
}

/* ═════════════════════════════════════════════════════════
   3. Real 3D WebGL Liquid Glass Button Component
═════════════════════════════════════════════════════════ */
export function FluidGlassButton ({
  children,
  onClick,
  width = '180px',
  height = '52px',
  className = '',
  style = {}
}) {
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  return (
    <div
      className={`${styles.glassBtnWrap} ${className}`}
      style={{ width, height, ...style }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setClicked(false) }}
      onMouseDown={() => setClicked(true)}
      onMouseUp={() => setClicked(false)}
      onClick={onClick}
      data-cursor
    >
      {/* 3D R3F WebGL Refraction Layer */}
      <div className={styles.canvasContainer}>
        <Canvas
          camera={{ position: [0, 0, 4.5], fov: 25 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <GlassPillMesh
              width={2.8}
              height={0.82}
              thickness={0.4}
              radius={0.41}
              isHovered={hovered}
              isClicked={clicked}
              chromatic={0.14}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* HTML Label on Top */}
      <span className={styles.btnLabel}>
        {children}
      </span>
    </div>
  )
}

/* ═════════════════════════════════════════════════════════
   4. Real 3D WebGL Apple VisionOS Floating Glass Navigation Bar
═════════════════════════════════════════════════════════ */
export function FluidGlassNav ({ links = [], activeLink, onNavigate }) {
  const [activeItem, setActiveItem] = useState(activeLink || links[0]?.label)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [circleHovered, setCircleHovered] = useState(false)

  return (
    <header className={styles.navHeader}>
      {/* Logo */}
      <div className={styles.logo}>
        <span className={styles.logoDot} />
        <span className={styles.logoText}>CJ LABS</span>
      </div>

      {/* Floating Apple VisionOS 3D Glass Bar */}
      <div className={styles.navBarWrapper}>
        <div className={styles.navCanvasContainer}>
          <Canvas
            camera={{ position: [0, 0, 5], fov: 22 }}
            gl={{ antialias: true, alpha: true }}
            style={{ background: 'transparent' }}
          >
            <Suspense fallback={null}>
              <GlassPillMesh
                width={4.2}
                height={0.72}
                thickness={0.45}
                radius={0.36}
                isHovered={hoveredIndex !== null}
                chromatic={0.12}
                ior={1.20}
              />
            </Suspense>
          </Canvas>
        </div>

        {/* Nav Items Overlaid Pinned */}
        <div className={styles.navItemsRow}>
          {links.map((link, idx) => {
            const isActive = activeItem === link.label
            const isHover = hoveredIndex === idx

            return (
              <button
                key={link.label}
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => {
                  setActiveItem(link.label)
                  onNavigate?.(link)
                }}
                data-cursor
              >
                {/* Individual 3D Glass Active Pill highlight */}
                {isActive && (
                  <div className={styles.activePillCanvas}>
                    <Canvas
                      camera={{ position: [0, 0, 4], fov: 25 }}
                      gl={{ antialias: true, alpha: true }}
                    >
                      <Suspense fallback={null}>
                        <GlassPillMesh
                          width={1.4}
                          height={0.65}
                          thickness={0.3}
                          radius={0.32}
                          isHovered={isHover}
                          color="#ffffff"
                        />
                      </Suspense>
                    </Canvas>
                  </div>
                )}
                <span className={styles.navText}>{link.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Circular VisionOS Liquid Glass Action / Contact Button */}
      <div
        className={styles.circleBtnWrap}
        onMouseEnter={() => setCircleHovered(true)}
        onMouseLeave={() => setCircleHovered(false)}
        onClick={() => onNavigate?.({ link: '#contact' })}
        data-cursor
      >
        <div className={styles.circleCanvasContainer}>
          <Canvas
            camera={{ position: [0, 0, 4], fov: 25 }}
            gl={{ antialias: true, alpha: true }}
          >
            <Suspense fallback={null}>
              <GlassCircleMesh size={1.2} isHovered={circleHovered} />
            </Suspense>
          </Canvas>
        </div>
        <div className={styles.circleIcon} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
      </div>
    </header>
  )
}
