import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei'
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
  // skip the GPU work entirely for reduced-motion users
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return null
  }
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 42 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={2.2} color="#fff4e0" />
      <directionalLight position={[-5, -2, -5]} intensity={1.1} color="#8a6f3d" />
      <Suspense fallback={null}>
        <Crystal />
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  )
}
