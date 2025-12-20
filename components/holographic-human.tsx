"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

function HumanModel() {
  const groupRef = useRef<THREE.Group>(null)
  const time = useRef(0)

  // Animate hologram
  useFrame((state, delta) => {
    if (groupRef.current) {
      time.current += delta * 0.5
      // Subtle floating animation
      groupRef.current.position.y = Math.sin(time.current) * 0.1
    }
  })

  // Create human body geometry
  const bodyGeometry = useMemo(() => {
    const shape = new THREE.Shape()

    // Head
    shape.moveTo(0, 8.5)
    shape.bezierCurveTo(-0.6, 8.5, -0.8, 8.2, -0.8, 7.5)
    shape.lineTo(-0.8, 6.8)

    // Neck to shoulders
    shape.bezierCurveTo(-0.8, 6.5, -1.2, 6.3, -1.5, 6.3)

    // Right shoulder and arm
    shape.lineTo(-2.2, 6.2)
    shape.bezierCurveTo(-2.4, 6.1, -2.5, 5.8, -2.5, 5.5)
    shape.lineTo(-2.5, 3.5)
    shape.bezierCurveTo(-2.5, 3.2, -2.4, 2.8, -2.2, 2.5)
    shape.lineTo(-2, 1.5)
    shape.bezierCurveTo(-1.9, 1, -1.8, 0.5, -1.7, 0)

    // Right hand
    shape.bezierCurveTo(-1.65, -0.3, -1.8, -0.5, -2.1, -0.5)
    shape.bezierCurveTo(-2.3, -0.5, -2.4, -0.3, -2.3, -0.1)
    shape.bezierCurveTo(-2.2, 0.1, -2, 0.3, -1.9, 0.5)

    // Right side torso
    shape.lineTo(-1.8, 2)
    shape.bezierCurveTo(-1.7, 2.5, -1.6, 3, -1.5, 3.5)
    shape.lineTo(-1.5, 4.5)
    shape.bezierCurveTo(-1.4, 5, -1.3, 5.5, -1.2, 6)

    // Waist
    shape.lineTo(-1, 6.2)
    shape.bezierCurveTo(-0.9, 6.3, -0.8, 6.3, -0.7, 6.2)

    // Right hip and leg
    shape.lineTo(-1.2, 1)
    shape.lineTo(-1.2, -2)
    shape.bezierCurveTo(-1.2, -3, -1.1, -4, -1, -5)
    shape.lineTo(-0.9, -7)
    shape.bezierCurveTo(-0.85, -7.8, -0.8, -8.3, -0.7, -8.5)

    // Right foot
    shape.bezierCurveTo(-0.6, -8.6, -0.7, -8.8, -0.9, -8.8)
    shape.lineTo(-0.5, -8.8)
    shape.bezierCurveTo(-0.3, -8.8, -0.2, -8.6, -0.3, -8.4)

    // Between legs
    shape.lineTo(-0.3, -7)
    shape.lineTo(-0.3, 0)
    shape.lineTo(0.3, 0)
    shape.lineTo(0.3, -7)

    // Left foot
    shape.lineTo(0.3, -8.4)
    shape.bezierCurveTo(0.2, -8.6, 0.3, -8.8, 0.5, -8.8)
    shape.lineTo(0.9, -8.8)
    shape.bezierCurveTo(0.7, -8.8, 0.6, -8.6, 0.7, -8.5)

    // Left leg
    shape.lineTo(0.9, -7)
    shape.lineTo(1, -5)
    shape.bezierCurveTo(1.1, -4, 1.2, -3, 1.2, -2)
    shape.lineTo(1.2, 1)

    // Left waist
    shape.lineTo(0.7, 6.2)
    shape.bezierCurveTo(0.8, 6.3, 0.9, 6.3, 1, 6.2)
    shape.lineTo(1.2, 6)
    shape.bezierCurveTo(1.3, 5.5, 1.4, 5, 1.5, 4.5)
    shape.lineTo(1.5, 3.5)
    shape.bezierCurveTo(1.6, 3, 1.7, 2.5, 1.8, 2)

    // Left hand
    shape.lineTo(1.9, 0.5)
    shape.bezierCurveTo(2, 0.3, 2.2, 0.1, 2.3, -0.1)
    shape.bezierCurveTo(2.4, -0.3, 2.3, -0.5, 2.1, -0.5)
    shape.bezierCurveTo(1.8, -0.5, 1.65, -0.3, 1.7, 0)

    // Left arm
    shape.lineTo(2, 1.5)
    shape.lineTo(2.2, 2.5)
    shape.bezierCurveTo(2.4, 2.8, 2.5, 3.2, 2.5, 3.5)
    shape.lineTo(2.5, 5.5)
    shape.bezierCurveTo(2.5, 5.8, 2.4, 6.1, 2.2, 6.2)

    // Left shoulder
    shape.lineTo(1.5, 6.3)
    shape.bezierCurveTo(1.2, 6.3, 0.8, 6.5, 0.8, 6.8)
    shape.lineTo(0.8, 7.5)
    shape.bezierCurveTo(0.8, 8.2, 0.6, 8.5, 0, 8.5)

    const extrudeSettings = {
      steps: 1,
      depth: 0.3,
      bevelEnabled: false,
    }

    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }, [])

  // Lungs (orange)
  const lungsGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const vertices = new Float32Array([
      // Left lung
      -0.7, 5.5, 0.2, -0.2, 5.5, 0.2, -0.2, 3.5, 0.2, -0.7, 3.5, 0.2,
      // Right lung
      0.2, 5.5, 0.2, 0.7, 5.5, 0.2, 0.7, 3.5, 0.2, 0.2, 3.5, 0.2,
    ])

    const indices = new Uint16Array([
      0,
      1,
      2,
      0,
      2,
      3, // Left lung
      4,
      5,
      6,
      4,
      6,
      7, // Right lung
    ])

    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3))
    geometry.setIndex(new THREE.BufferAttribute(indices, 1))
    geometry.computeVertexNormals()

    return geometry
  }, [])

  // Digestive system (orange)
  const digestiveGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const vertices = new Float32Array([-0.4, 3, 0.2, 0.4, 3, 0.2, 0.5, 1, 0.2, -0.5, 1, 0.2])

    const indices = new Uint16Array([0, 1, 2, 0, 2, 3])

    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3))
    geometry.setIndex(new THREE.BufferAttribute(indices, 1))
    geometry.computeVertexNormals()

    return geometry
  }, [])

  // Pelvis area (orange)
  const pelvisGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const vertices = new Float32Array([-0.8, 1, 0.2, 0.8, 1, 0.2, 0.6, -1, 0.2, -0.6, -1, 0.2])

    const indices = new Uint16Array([0, 1, 2, 0, 2, 3])

    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3))
    geometry.setIndex(new THREE.BufferAttribute(indices, 1))
    geometry.computeVertexNormals()

    return geometry
  }, [])

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Body outline (cyan with transparency) */}
      <mesh geometry={bodyGeometry} position={[0, 0, -0.15]}>
        <meshStandardMaterial
          color="#00d9ff"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
          emissive="#00d9ff"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Body edge glow */}
      <lineSegments>
        <edgesGeometry args={[bodyGeometry]} />
        <lineBasicMaterial color="#00ffff" linewidth={2} />
      </lineSegments>

      {/* Internal organs - Lungs */}
      <mesh geometry={lungsGeometry}>
        <meshStandardMaterial color="#ff8c00" transparent opacity={0.7} emissive="#ff6600" emissiveIntensity={0.6} />
      </mesh>

      {/* Internal organs - Digestive */}
      <mesh geometry={digestiveGeometry}>
        <meshStandardMaterial color="#ff8c00" transparent opacity={0.7} emissive="#ff6600" emissiveIntensity={0.6} />
      </mesh>

      {/* Internal organs - Pelvis */}
      <mesh geometry={pelvisGeometry}>
        <meshStandardMaterial color="#ff8c00" transparent opacity={0.7} emissive="#ff6600" emissiveIntensity={0.6} />
      </mesh>
    </group>
  )
}

function HolographicPlatform() {
  const platformRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (platformRef.current) {
      // Rotate platform slowly
      platformRef.current.rotation.y += 0.002
    }
  })

  return (
    <group ref={platformRef} position={[0, -9, 0]}>
      {/* Base platform */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[4, 64]} />
        <meshStandardMaterial
          color="#00d9ff"
          transparent
          opacity={0.2}
          emissive="#00d9ff"
          emissiveIntensity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Concentric circles */}
      {[1, 1.5, 2, 2.5, 3, 3.5, 4].map((radius, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
          <ringGeometry args={[radius - 0.05, radius, 64]} />
          <meshBasicMaterial color="#00ffff" transparent opacity={0.4 - i * 0.05} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* Grid lines */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2
        const x1 = Math.cos(angle) * 0.5
        const z1 = Math.sin(angle) * 0.5
        const x2 = Math.cos(angle) * 4
        const z2 = Math.sin(angle) * 4

        return (
          <line key={`line-${i}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([x1, 0.02, z1, x2, 0.02, z2])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#00ffff" transparent opacity={0.3} />
          </line>
        )
      })}
    </group>
  )
}

export function HolographicHuman() {
  return (
    <div className="w-full h-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 2, 15]} fov={50} />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={10}
          maxDistance={25}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 3}
        />

        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#00ffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00ffff" />
        <pointLight position={[0, 0, 10]} intensity={0.4} color="#00d9ff" />

        <HumanModel />
        <HolographicPlatform />
      </Canvas>
    </div>
  )
}
