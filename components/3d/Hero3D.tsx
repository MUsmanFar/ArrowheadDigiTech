'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function HeroSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.1;
      
      // Mouse Parallax Follow
      const targetX = state.pointer.x * 1.8;
      const targetY = state.pointer.y * 1.8;
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.05);
    }
  });

  return (
    <Float speed={3.5} rotationIntensity={0.8} floatIntensity={0.8}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <MeshDistortMaterial
          color="#3b82f6"
          attach="material"
          distort={0.45}
          speed={2.2}
          roughness={0.05}
          metalness={0.95}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

function SmallSphere({ position, color, size }: { position: [number, number, number]; color: string; size: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      
      // Parallax depth movement: move in response to mouse
      const targetX = position[0] + state.pointer.x * 2.5;
      const targetY = position[1] + Math.sin(state.clock.elapsedTime * 1.5 + position[0]) * 0.4 + state.pointer.y * 2.5;
      
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.05);
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.35}
          speed={1.8}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.75}
        />
      </mesh>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#3b82f6" />
        <pointLight position={[10, -5, -5]} intensity={0.6} color="#06b6d4" />
        
        <HeroSphere />
        <SmallSphere position={[-4, 2, -2]} color="#06b6d4" size={0.8} />
        <SmallSphere position={[4, -2, -3]} color="#8b5cf6" size={0.6} />
        <SmallSphere position={[3, 3, -4]} color="#ec4899" size={0.5} />
        <SmallSphere position={[-3, -3, -3]} color="#10b981" size={0.7} />
      </Canvas>
    </div>
  );
}
