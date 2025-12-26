"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { useRef, useMemo } from "react"
import * as THREE from "three"

// Create shader material function
function createGradientMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      colorLeft: { value: new THREE.Color(0x00d9ff) }, // Neon blue
      colorRight: { value: new THREE.Color(0xff00ff) }, // Neon pink/magenta
    },
    vertexShader: `
      varying vec3 vPosition;
      varying vec3 vNormal;
      void main() {
        vPosition = position;
        vNormal = normal;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 colorLeft;
      uniform vec3 colorRight;
      varying vec3 vPosition;
      varying vec3 vNormal;
      
      void main() {
        // Create gradient from left (blue) to right (pink)
        float gradient = (vPosition.x + 2.5) / 5.0; // Normalize x position
        gradient = clamp(gradient, 0.0, 1.0);
        vec3 color = mix(colorLeft, colorRight, gradient);
        
        // Add glow effect
        float glow = dot(vNormal, vec3(0.0, 0.0, 1.0));
        glow = abs(glow);
        glow = pow(glow, 0.5);
        
        // Add scan line effect
        float scanLine = sin(vPosition.y * 10.0 + time * 2.0) * 0.5 + 0.5;
        scanLine = pow(scanLine, 8.0) * 0.3;
        
        // Combine effects
        vec3 finalColor = color * (1.0 + glow * 2.0 + scanLine);
        float alpha = 0.4 + glow * 0.4 + scanLine * 0.2;
        
        gl_FragColor = vec4(finalColor, alpha);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
  })
}

function SkeletonBone({ position, rotation, scale, color }: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
        transparent
        opacity={0.9}
      />
    </mesh>
  )
}

function Skeleton() {
  const groupRef = useRef<THREE.Group>(null)
  const time = useRef(0)

  useFrame((state, delta) => {
    time.current += delta
    if (groupRef.current) {
      // Subtle floating animation
      groupRef.current.position.y = Math.sin(time.current * 0.5) * 0.05
    }
  })

  // Colors with gradient
  const blueColor = "#00d9ff"
  const pinkColor = "#ff00ff"
  const midColor = "#ff00ff" // Blend color

  return (
    <group ref={groupRef}>
      {/* Skull */}
      <mesh position={[0, 7.5, 0]}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshStandardMaterial
          color={midColor}
          emissive={midColor}
          emissiveIntensity={2}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Spine */}
      {Array.from({ length: 24 }).map((_, i) => {
        const y = 7 - i * 0.3
        const x = Math.sin(i * 0.1) * 0.05
        const color = i < 12 ? blueColor : i < 18 ? midColor : pinkColor
        return (
          <SkeletonBone
            key={`spine-${i}`}
            position={[x, y, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[1, 0.3, 1]}
            color={color}
          />
        )
      })}

      {/* Ribs */}
      {Array.from({ length: 12 }).map((_, i) => {
        const y = 5.5 - i * 0.25
        const angle = (i % 2 === 0 ? 1 : -1) * 0.4
        const color = i < 6 ? blueColor : pinkColor
        return (
          <group key={`rib-${i}`}>
            <SkeletonBone
              position={[-0.4, y, 0]}
              rotation={[0, 0, angle]}
              scale={[1, 0.4, 1]}
              color={color}
            />
            <SkeletonBone
              position={[0.4, y, 0]}
              rotation={[0, 0, -angle]}
              scale={[1, 0.4, 1]}
              color={color}
            />
          </group>
        )
      })}

      {/* Pelvis */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.8, 0.3, 0.4]} />
        <meshStandardMaterial
          color={midColor}
          emissive={midColor}
          emissiveIntensity={2}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Left arm */}
      <group>
        <SkeletonBone position={[-1.2, 6, 0]} rotation={[0, 0, 0.3]} scale={[1, 0.8, 1]} color={blueColor} />
        <SkeletonBone position={[-1.8, 4.5, 0]} rotation={[0, 0, 0.2]} scale={[1, 0.8, 1]} color={blueColor} />
        <SkeletonBone position={[-2.2, 2.5, 0]} rotation={[0, 0, -0.1]} scale={[1, 0.6, 1]} color={blueColor} />
        {/* Hand bones */}
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonBone
            key={`left-hand-${i}`}
            position={[-2.4, 1.5 - i * 0.15, 0]}
            rotation={[0, 0, -0.2]}
            scale={[1, 0.2, 1]}
            color={blueColor}
          />
        ))}
      </group>

      {/* Right arm */}
      <group>
        <SkeletonBone position={[1.2, 6, 0]} rotation={[0, 0, -0.3]} scale={[1, 0.8, 1]} color={pinkColor} />
        <SkeletonBone position={[1.8, 4.5, 0]} rotation={[0, 0, -0.2]} scale={[1, 0.8, 1]} color={pinkColor} />
        <SkeletonBone position={[2.2, 2.5, 0]} rotation={[0, 0, 0.1]} scale={[1, 0.6, 1]} color={pinkColor} />
        {/* Hand bones */}
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonBone
            key={`right-hand-${i}`}
            position={[2.4, 1.5 - i * 0.15, 0]}
            rotation={[0, 0, 0.2]}
            scale={[1, 0.2, 1]}
            color={pinkColor}
          />
        ))}
      </group>

      {/* Left leg */}
      <group>
        <SkeletonBone position={[-0.5, -1, 0]} rotation={[0, 0, 0.1]} scale={[1, 1.2, 1]} color={blueColor} />
        <SkeletonBone position={[-0.6, -3, 0]} rotation={[0, 0, 0.05]} scale={[1, 1.2, 1]} color={blueColor} />
        <SkeletonBone position={[-0.7, -5.5, 0]} rotation={[0, 0, -0.1]} scale={[1, 0.8, 1]} color={blueColor} />
        {/* Foot bones */}
        <SkeletonBone position={[-0.8, -7.5, 0]} rotation={[0, 0, 0.3]} scale={[1, 0.3, 1]} color={blueColor} />
      </group>

      {/* Right leg */}
      <group>
        <SkeletonBone position={[0.5, -1, 0]} rotation={[0, 0, -0.1]} scale={[1, 1.2, 1]} color={pinkColor} />
        <SkeletonBone position={[0.6, -3, 0]} rotation={[0, 0, -0.05]} scale={[1, 1.2, 1]} color={pinkColor} />
        <SkeletonBone position={[0.7, -5.5, 0]} rotation={[0, 0, 0.1]} scale={[1, 0.8, 1]} color={pinkColor} />
        {/* Foot bones */}
        <SkeletonBone position={[0.8, -7.5, 0]} rotation={[0, 0, -0.3]} scale={[1, 0.3, 1]} color={pinkColor} />
      </group>
    </group>
  )
}

function BodyOutline() {
  const bodyRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const time = useRef(0)

  const gradientMaterial = useMemo(() => createGradientMaterial(), [])
  const outlineMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.8,
        side: THREE.BackSide,
      }),
    [],
  )

  useFrame((state, delta) => {
    time.current += delta
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = time.current
    }
  })

  // Create human body outline shape
  const bodyShape = useMemo(() => {
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

    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.1,
      bevelEnabled: false,
    })
  }, [])

  return (
    <group>
      {/* Main body with gradient shader */}
      <mesh ref={bodyRef} geometry={bodyShape}>
        <primitive object={gradientMaterial} ref={materialRef} attach="material" />
      </mesh>

      {/* Glowing outline */}
      <mesh geometry={bodyShape} scale={1.02}>
        <primitive object={outlineMaterial} attach="material" />
      </mesh>
    </group>
  )
}

function ScanLines() {
  const linesRef = useRef<THREE.Group>(null)
  const time = useRef(0)

  useFrame((state, delta) => {
    time.current += delta
    if (linesRef.current) {
      linesRef.current.position.y = Math.sin(time.current * 2) * 0.5
    }
  })

  return (
    <group ref={linesRef}>
      {Array.from({ length: 30 }).map((_, i) => {
        const y = -9 + (i * 18) / 30
        const opacity = Math.random() * 0.3 + 0.1
        const color = i % 2 === 0 ? "#00d9ff" : "#ff00ff"
        return (
          <mesh key={`scanline-${i}`} position={[0, y, 0.1]}>
            <planeGeometry args={[6, 0.02]} />
            <meshBasicMaterial color={color} transparent opacity={opacity} />
          </mesh>
        )
      })}
    </group>
  )
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null)
  const time = useRef(0)

  const particles = useMemo(() => {
    const count = 200
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 5
      const y = (Math.random() - 0.5) * 18
      const z = (Math.random() - 0.5) * 2

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      const color = x < 0 ? new THREE.Color(0x00d9ff) : new THREE.Color(0xff00ff)
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    return { positions, colors }
  }, [])

  useFrame((state, delta) => {
    time.current += delta
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time.current * 0.1
    }
  })

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry()
    geom.setAttribute("position", new THREE.BufferAttribute(particles.positions, 3))
    geom.setAttribute("color", new THREE.BufferAttribute(particles.colors, 3))
    return geom
  }, [])

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.6} />
    </points>
  )
}

function ReflectiveFloor() {
  const floorRef = useRef<THREE.Mesh>(null)

  return (
    <mesh ref={floorRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -9, 0]}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial
        color="#000000"
        metalness={0.95}
        roughness={0.05}
        transparent
        opacity={0.5}
      />
    </mesh>
  )
}

export function HolographicHuman() {
  return (
    <div className="w-full h-full bg-black">
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

        {/* Dark background lighting */}
        <ambientLight intensity={0.1} />
        <pointLight position={[5, 5, 5]} intensity={0.3} color="#00d9ff" />
        <pointLight position={[-5, 5, 5]} intensity={0.3} color="#ff00ff" />

        {/* Main components */}
        <BodyOutline />
        <Skeleton />
        <ScanLines />
        <Particles />
        <ReflectiveFloor />
      </Canvas>
    </div>
  )
}
