import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Particles({ count = 130 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null)

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sz = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8
      sz[i] = Math.random() * 0.04 + 0.01
    }
    return [pos, sz]
  }, [count])

  useFrame(({ clock }) => {
    if (!mesh.current) return
    mesh.current.rotation.y = clock.getElapsedTime() * 0.012
    mesh.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.008) * 0.06
  })

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    return geo
  }, [positions, sizes])

  return (
    <points ref={mesh} geometry={geometry}>
      <pointsMaterial
        size={0.035}
        color="#38bdf8"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function AuroraOrb({
  position,
  color,
  scale,
  speed,
}: {
  position: [number, number, number]
  color: string
  scale: number
  speed: number
}) {
  const mesh = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!mesh.current) return
    const t = clock.getElapsedTime() * speed
    mesh.current.position.x = position[0] + Math.sin(t) * 1.5
    mesh.current.position.y = position[1] + Math.cos(t * 0.7) * 1.0
  })

  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[scale, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.06} depthWrite={false} />
    </mesh>
  )
}

export default function ParticleBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <Particles count={130} />
        <AuroraOrb position={[-4, 2, -3]} color="#2563eb" scale={5} speed={0.08} />
        <AuroraOrb position={[4, -2, -4]} color="#7c3aed" scale={4.5} speed={0.06} />
        <AuroraOrb position={[0, 1, -5]} color="#38bdf8" scale={3.5} speed={0.05} />
      </Canvas>
    </div>
  )
}
