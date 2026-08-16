/* eslint-disable react/no-unknown-property */
import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber'
import { useFBO, MeshTransmissionMaterial, RoundedBox } from '@react-three/drei'
import { easing } from 'maath'

/*
 * FluidGlass Refraction Engine (100% Local - No External HDR Downloads)
 * Uses useFBO + createPortal to render a colorful 3D scene into a texture buffer,
 * which MeshTransmissionMaterial then physically refracts in real time.
 */

/* ─── Colourful scene that lives inside the FBO ─── */
function SceneContent () {
  const s1 = useRef(), s2 = useRef(), s3 = useRef(), torus = useRef(), ico = useRef()

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (s1.current) { s1.current.position.y = Math.sin(t * 0.55) * 0.6; s1.current.rotation.y = t * 0.25 }
    if (s2.current) { s2.current.position.x = Math.cos(t * 0.4) * 0.5; s2.current.rotation.z = t * 0.2 }
    if (s3.current) { s3.current.position.y = Math.cos(t * 0.5) * 0.5; s3.current.position.x = Math.sin(t * 0.3) * 0.3 }
    if (torus.current) { torus.current.rotation.x = t * 0.2; torus.current.rotation.y = t * 0.3 }
    if (ico.current) { ico.current.rotation.x = t * 0.15; ico.current.rotation.z = t * 0.1 }
  })

  return (
    <>
      {/* Deep vibrant gradient background plane */}
      <mesh position={[0, 0, -5]}>
        <planeGeometry args={[40, 30]} />
        <meshBasicMaterial color="#0d0722" />
      </mesh>

      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <pointLight position={[ 4,  4, 6]} intensity={80} color="#a78bfa" />
      <pointLight position={[-4, -3, 5]} intensity={70} color="#6ee7b7" />
      <pointLight position={[ 2, -3, 6]} intensity={50} color="#fb7185" />
      <pointLight position={[-2,  4, 6]} intensity={45} color="#60a5fa" />

      {/* Violet sphere */}
      <mesh ref={s1} position={[-1.8, 0.5, 0]}>
        <sphereGeometry args={[0.95, 48, 48]} />
        <meshStandardMaterial color="#a78bfa" emissive="#7c3aed" emissiveIntensity={0.7} roughness={0.05} metalness={0.8} />
      </mesh>

      {/* Teal sphere */}
      <mesh ref={s2} position={[2.0, -0.3, 0.5]}>
        <sphereGeometry args={[0.75, 48, 48]} />
        <meshStandardMaterial color="#6ee7b7" emissive="#10b981" emissiveIntensity={0.7} roughness={0.05} metalness={0.8} />
      </mesh>

      {/* Rose sphere */}
      <mesh ref={s3} position={[0.3, -1.5, 1]}>
        <sphereGeometry args={[0.55, 36, 36]} />
        <meshStandardMaterial color="#fb7185" emissive="#e11d48" emissiveIntensity={0.7} roughness={0.05} metalness={0.8} />
      </mesh>

      {/* Blue Torus */}
      <mesh ref={torus} position={[-0.5, 0.8, 1.5]}>
        <torusGeometry args={[0.65, 0.16, 24, 60]} />
        <meshStandardMaterial color="#60a5fa" emissive="#2563eb" emissiveIntensity={0.6} roughness={0.05} metalness={0.8} />
      </mesh>

      {/* Amber Icosahedron */}
      <mesh ref={ico} position={[1.5, 1.2, 0.8]}>
        <icosahedronGeometry args={[0.45, 0]} />
        <meshStandardMaterial color="#fbbf24" emissive="#d97706" emissiveIntensity={0.6} roughness={0.05} metalness={0.8} />
      </mesh>

      {/* Background gradient color blocks for strong contrast */}
      <mesh position={[-3.5, 0, -2]} rotation={[0, 0.3, 0]}>
        <planeGeometry args={[5, 8]} />
        <meshBasicMaterial color="#3b0764" side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[3.5, -0.5, -2]} rotation={[0, -0.3, 0]}>
        <planeGeometry args={[4.5, 7]} />
        <meshBasicMaterial color="#064e3b" side={THREE.DoubleSide} />
      </mesh>
    </>
  )
}

/* ─── Glass lens that follows cursor ─── */
function GlassLens ({ shape, modeProps }) {
  const ref = useRef()
  const { viewport, pointer } = useThree()

  const isCircle = shape === 'circle'
  const w = isCircle ? 2.4 : shape === 'wide' ? 5.0 : 3.4
  const h = isCircle ? 2.4 : shape === 'wide' ? 0.75 : 0.95
  const depth = modeProps.thickness ?? 0.40
  const r = isCircle ? 1.2 : 0.47

  useFrame((_, delta) => {
    if (!ref.current) return
    easing.damp(ref.current.position, 'x', (pointer.x * viewport.width) / 2, 0.12, delta)
    easing.damp(ref.current.position, 'y', (pointer.y * viewport.height) / 2, 0.12, delta)
    ref.current.rotation.z += delta * 0.03
  })

  return (
    <mesh ref={ref} position={[0, 0, 2]}>
      <RoundedBox args={[w, h, depth]} radius={r} smoothness={12}>
        <MeshTransmissionMaterial
          transmission={modeProps.transmission ?? 0.97}
          thickness={depth * 3.5}
          roughness={modeProps.roughness ?? 0.02}
          chromaticAberration={modeProps.chromaticAberration ?? 0.10}
          anisotropicBlur={0.03}
          distortion={0.15}
          distortionScale={0.3}
          temporalDistortion={0.02}
          iridescence={0.8}
          iridescenceIOR={1.4}
          iridescenceThicknessRange={[0, 1400]}
          ior={modeProps.ior ?? 1.18}
          color="#ffffff"
        />
      </RoundedBox>
    </mesh>
  )
}

/* ─── Glass bar locked to bottom ─── */
function GlassBar ({ modeProps }) {
  const ref = useRef()
  const { viewport } = useThree()

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.position.y = -viewport.height / 2 + 0.45
  })

  const barW = viewport.width * 0.78

  return (
    <mesh ref={ref} position={[0, -viewport.height / 2 + 0.45, 2]}>
      <RoundedBox args={[barW, 0.58, 0.32]} radius={0.28} smoothness={10}>
        <MeshTransmissionMaterial
          transmission={modeProps.transmission ?? 0.98}
          thickness={modeProps.thickness ?? 0.55}
          roughness={modeProps.roughness ?? 0.01}
          chromaticAberration={modeProps.chromaticAberration ?? 0.08}
          ior={modeProps.ior ?? 1.18}
          color="#ffffff"
        />
      </RoundedBox>
    </mesh>
  )
}

/* ─── The core: FBO refraction wrapper ─── */
function RefractedScene ({ children, glassElement }) {
  const buffer = useFBO()
  const { viewport } = useThree()
  const [portalScene] = useState(() => new THREE.Scene())

  useFrame(({ gl, camera }) => {
    gl.setRenderTarget(buffer)
    gl.render(portalScene, camera)
    gl.setRenderTarget(null)
  })

  return (
    <>
      {/* Render 3D objects into FBO portal scene */}
      {createPortal(children, portalScene)}

      {/* Display FBO buffer texture on background quad */}
      <mesh position={[0, 0, -1]}>
        <planeGeometry args={[viewport.width * 2, viewport.height * 2]} />
        <meshBasicMaterial map={buffer.texture} />
      </mesh>

      {/* Main lights for the glass surface specular highlights */}
      <directionalLight position={[5, 5, 8]} intensity={2.0} color="#ffffff" />
      <pointLight position={[-4, 4, 6]} intensity={1.5} color="#e0e7ff" />

      {/* The glass mesh physically refracts the background buffer */}
      {glassElement}
    </>
  )
}

/* ─── Public component ─── */
export default function FluidGlass ({
  mode = 'lens',
  shape = 'pill',
  lensProps = {},
  barProps = {},
}) {
  const modeProps = mode === 'bar' ? barProps : lensProps

  const glassElement = mode === 'bar'
    ? <GlassBar modeProps={modeProps} />
    : <GlassLens shape={shape} modeProps={modeProps} />

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 22 }}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%', background: '#0d0722' }}
    >
      <RefractedScene glassElement={glassElement}>
        <SceneContent />
      </RefractedScene>
    </Canvas>
  )
}
