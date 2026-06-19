import { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Environment, Lightformer } from '@react-three/drei'
import type { Mesh } from 'three'

function Crystal() {
  const mesh = useRef<Mesh>(null)

  useFrame((state) => {
    if (!mesh.current) return
    const t = state.clock.elapsedTime
    // slow idle spin
    mesh.current.rotation.y = t * 0.18
    mesh.current.rotation.z = Math.sin(t * 0.3) * 0.12
    // gentle mouse-reactive tilt
    const { x, y } = state.pointer
    mesh.current.rotation.x += (y * 0.5 - mesh.current.rotation.x) * 0.04
    mesh.current.position.x += (x * 0.4 - mesh.current.position.x) * 0.04
  })

  return (
    <Float speed={1.3} rotationIntensity={0.5} floatIntensity={1.2}>
      <mesh ref={mesh} scale={1.7}>
        <icosahedronGeometry args={[1, 6]} />
        <MeshDistortMaterial
          color="#c29a5e"
          roughness={0.28}
          metalness={0.78}
          distort={0.42}
          speed={1.5}
          envMapIntensity={0.7}
        />
      </mesh>
    </Float>
  )
}

export default function Scene3D() {
  // pause rendering when the hero is scrolled out of view (saves FPS/battery)
  const [active, setActive] = useState(true)
  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0.05 })
    io.observe(hero)
    return () => io.disconnect()
  }, [])

  // skip the GPU work entirely for reduced-motion users
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return null
  }
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [0, 0, 6], fov: 42 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={2.2} color="#fff4e0" />
      <directionalLight position={[-5, -2, -5]} intensity={1.1} color="#8a6f3d" />
      <Suspense fallback={null}>
        <Crystal />
        {/* Procedural environment — built in-GPU from lightformers, no external HDRI fetch (CSP-safe) */}
        <Environment resolution={256}>
          <Lightformer intensity={2.4} position={[5, 5, 5]} scale={[10, 10, 1]} color="#fff0d8" />
          <Lightformer intensity={1.2} position={[-5, -1, -4]} scale={[8, 8, 1]} color="#8a6f3d" />
          <Lightformer intensity={1.6} position={[0, 4, -6]} scale={[12, 6, 1]} color="#ffffff" />
          <Lightformer intensity={0.8} position={[2, -4, 2]} scale={[6, 6, 1]} color="#c29a5e" />
        </Environment>
      </Suspense>
    </Canvas>
  )
}
