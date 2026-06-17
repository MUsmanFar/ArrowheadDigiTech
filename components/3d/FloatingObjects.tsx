'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, Sphere, Torus, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

function FloatingSphere({ position, color, speed }: { position: [number, number, number]; color: string; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * speed;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.2;
      
      const targetX = position[0] + state.pointer.x * 2.0;
      const targetY = position[1] + state.pointer.y * 2.0;
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.05);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[1, 16, 16]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

function FloatingTorus({ position, color, speed }: { position: [number, number, number]; color: string; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed;
      meshRef.current.rotation.z = state.clock.elapsedTime * speed * 0.5;

      const targetX = position[0] - state.pointer.x * 2.5;
      const targetY = position[1] - state.pointer.y * 2.5;
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.05);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[0.8, 0.2, 8, 24]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.2}
          speed={1.5}
          roughness={0.2}
          metalness={0.9}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
}

function FloatingIcosahedron({ position, color, speed }: { position: [number, number, number]; color: string; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * speed;
      
      const targetX = position[0] + state.pointer.x * 1.5;
      const targetY = position[1] + Math.sin(state.clock.elapsedTime) * 0.3 + state.pointer.y * 1.5;
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.05);
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.4}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[0.7, 0]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.25}
          speed={1.8}
          roughness={0.15}
          metalness={0.85}
          transparent
          opacity={0.75}
        />
      </mesh>
    </Float>
  );
}

export default function FloatingObjects() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance", precision: "mediump" }}
        dpr={[1, 1.2]}
        className="w-full h-full"
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        
        <FloatingSphere position={[-3, 2, -2]} color="#3b82f6" speed={0.3} />
        <FloatingTorus position={[3, -1, -3]} color="#06b6d4" speed={0.4} />
        <FloatingIcosahedron position={[0, 3, -4]} color="#8b5cf6" speed={0.35} />
        <FloatingSphere position={[2, 3, -2]} color="#ec4899" speed={0.25} />
        <FloatingTorus position={[-2, -2, -3]} color="#10b981" speed={0.45} />
        <FloatingIcosahedron position={[4, 0, -5]} color="#f59e0b" speed={0.3} />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
