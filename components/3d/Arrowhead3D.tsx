'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  MeshTransmissionMaterial,
  Float,
  Environment,
  GradientTexture,
  Sphere,
} from '@react-three/drei';
import * as THREE from 'three';

function ArrowheadMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const shape = useMemo(() => {
    const s = new THREE.Shape();
    const w = 0.65;
    const h = 1.3;
    const stem = 0.18;
    const stemH = 0.4;

    s.moveTo(-stem, -h);
    s.lineTo(-stem, -stemH);
    s.lineTo(-w, -stemH);
    s.lineTo(0, h);
    s.lineTo(w, -stemH);
    s.lineTo(stem, -stemH);
    s.lineTo(stem, -h);
    s.closePath();

    return s;
  }, []);

  const extrudeSettings = useMemo(
    () => ({
      depth: 0.2,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.05,
      bevelSegments: 12,
      curveSegments: 24,
    }),
    []
  );

  const geometry = useMemo(
    () => new THREE.ExtrudeGeometry(shape, extrudeSettings),
    [shape, extrudeSettings]
  );

  geometry.center();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.06;
    }
  });

  return (
    <group>
      <group ref={groupRef}>
        <mesh geometry={geometry} rotation={[0, 0, 0]}>
          <MeshTransmissionMaterial
            backside
            backsideThickness={0.15}
            thickness={0.5}
            chromaticAberration={0.06}
            anisotropy={0.4}
            distortion={0.08}
            distortionScale={0.2}
            temporalDistortion={0.03}
            clearcoat={0.9}
            clearcoatRoughness={0.15}
            metalness={0.05}
            roughness={0.1}
            ior={1.6}
            reflectivity={0.7}
            color="#f97316"
            transmissionSampler={false}
            samples={4}
            resolution={128}
          />
        </mesh>
      </group>

      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]} position={[0, -0.15, 0]}>
        <torusGeometry args={[1.1, 0.015, 16, 80]} />
        <meshStandardMaterial
          color="#f97316"
          metalness={0.6}
          roughness={0.3}
          transparent
          opacity={0.25}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.3, 0]}>
        <torusGeometry args={[0.9, 0.008, 12, 60]} />
        <meshStandardMaterial
          color="#2563eb"
          metalness={0.4}
          roughness={0.4}
          transparent
          opacity={0.12}
        />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={['#ffffff']} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.0} />
      <directionalLight position={[-3, 4, -5]} intensity={0.3} />
      <pointLight position={[0, 3, 2]} intensity={0.6} color="#f97316" />
      <pointLight position={[-2, -1, 3]} intensity={0.2} color="#2563eb" />
      <pointLight position={[3, -2, 1]} intensity={0.3} color="#ffffff" />

      <group position={[0, -0.7, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3, 3]} />
          <meshBasicMaterial transparent opacity={0.03} color="#f97316" />
        </mesh>
      </group>

      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
        <ArrowheadMesh />
      </Float>

      <Environment resolution={128}>
        <GradientTexture stops={[0, 0.5, 1]} colors={['#fef3c7', '#ffffff', '#dbeafe']} size={128} />
      </Environment>
    </>
  );
}

export default function Arrowhead3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 30, near: 0.1, far: 10 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
