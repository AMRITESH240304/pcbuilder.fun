"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Float, Text3D, Center, Environment, MeshTransmissionMaterial, useGLTF } from "@react-three/drei";
import { motion } from "framer-motion";
import { Suspense, useRef } from "react";
import * as THREE from "three";

// Glowing PC Component Box
function PCComponentBox({ position, rotation, color, delay = 0 }: { position: [number, number, number]; rotation?: [number, number, number]; color: string; delay?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
      <mesh ref={meshRef} position={position} rotation={rotation || [0, 0, 0]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

// CPU Chip
function CPUChip({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
      <group position={position}>
        <mesh castShadow>
          <boxGeometry args={[1.2, 0.2, 1.2]} />
          <meshStandardMaterial
            color="#2563eb"
            emissive="#2563eb"
            emissiveIntensity={0.4}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        {/* Pins */}
        {Array.from({ length: 5 }).map((_, i) =>
          Array.from({ length: 5 }).map((_, j) => (
            <mesh key={`${i}-${j}`} position={[-0.4 + i * 0.2, -0.15, -0.4 + j * 0.2]}>
              <cylinderGeometry args={[0.02, 0.02, 0.1]} />
              <meshStandardMaterial color="#fbbf24" metalness={1} />
            </mesh>
          ))
        )}
      </group>
    </Float>
  );
}

// GPU Card
function GPUCard({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.6}>
      <group position={position}>
        {/* PCB */}
        <mesh castShadow>
          <boxGeometry args={[2, 0.1, 1]} />
          <meshStandardMaterial
            color="#10b981"
            emissive="#10b981"
            emissiveIntensity={0.3}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
        {/* Cooler */}
        <mesh position={[0, 0.3, 0]} castShadow>
          <boxGeometry args={[1.5, 0.4, 0.8]} />
          <meshStandardMaterial
            color="#1f2937"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        {/* Fans */}
        <mesh position={[-0.4, 0.35, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.05]} />
          <meshStandardMaterial color="#374151" metalness={0.9} />
        </mesh>
        <mesh position={[0.4, 0.35, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.05]} />
          <meshStandardMaterial color="#374151" metalness={0.9} />
        </mesh>
      </group>
    </Float>
  );
}

// RAM Stick
function RAMStick({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.4}>
      <group position={position}>
        <mesh castShadow>
          <boxGeometry args={[0.3, 1.5, 0.1]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={0.4}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        {/* Heat spreader */}
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[0.32, 0.3, 0.12]} />
          <meshStandardMaterial color="#1f2937" metalness={0.9} />
        </mesh>
      </group>
    </Float>
  );
}

// Motherboard
function Motherboard({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.3}>
      <group position={position} rotation={[0, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[3, 0.05, 2.5]} />
          <meshStandardMaterial
            color="#1e40af"
            emissive="#1e40af"
            emissiveIntensity={0.2}
            metalness={0.6}
            roughness={0.4}
          />
        </mesh>
        {/* Circuit lines */}
        {Array.from({ length: 10 }).map((_, i) => (
          <mesh key={i} position={[-1.4 + i * 0.3, 0.03, 0]}>
            <boxGeometry args={[0.02, 0.01, 2]} />
            <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.5} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

// 3D Scene
function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#3b82f6" />
      <pointLight position={[10, -10, -5]} intensity={0.5} color="#8b5cf6" />
      
      {/* Environment */}
      <Environment preset="city" />
      
      {/* PC Components */}
      <Motherboard position={[0, 0, 0]} />
      <CPUChip position={[0, 0.5, 0]} />
      <GPUCard position={[2, -0.5, 1]} />
      <RAMStick position={[-1.5, 0.5, 0.5]} />
      <RAMStick position={[-1.5, 0.5, -0.5]} />
      
      {/* Glowing boxes representing other components */}
      <PCComponentBox position={[3, 1, -1]} color="#ef4444" delay={0.2} />
      <PCComponentBox position={[-3, 1, -1]} color="#f59e0b" delay={0.4} />
      <PCComponentBox position={[0, 2, -2]} color="#10b981" delay={0.6} />
      
      {/* Camera and Controls */}
      <PerspectiveCamera makeDefault position={[5, 3, 5]} fov={50} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
      />
    </>
  );
}

// Loading fallback
function Loader() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
    </div>
  );
}

// Main 3D Hero Component
export default function Hero3D({ onStartBuilding }: { onStartBuilding?: () => void }) {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-background via-background/95 to-background">
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas shadows>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-4xl"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium backdrop-blur-sm">
              🤖 AI-Powered PC Building
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            Build Your Dream PC
            <br />
            <span className="text-4xl md:text-5xl">in Minutes, Not Hours</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto backdrop-blur-sm bg-background/30 p-6 rounded-2xl"
          >
            No more compatibility headaches. Our AI instantly checks every component,
            suggests perfect matches, and warns you about conflicts — all powered by{" "}
            <span className="text-primary font-semibold">Algolia's lightning-fast search</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto"
          >
            <button
              onClick={() => {
                if (onStartBuilding) {
                  onStartBuilding();
                } else {
                  const searchSection = document.getElementById('search-section');
                  searchSection?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all hover:scale-105 shadow-lg hover:shadow-primary/50"
            >
              Start Building Now →
            </button>
            <button
              onClick={() => {
                const featuresSection = document.getElementById('features-section');
                featuresSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-background/50 backdrop-blur-md text-foreground border border-border rounded-xl font-semibold text-lg hover:bg-background/70 transition-all hover:scale-105"
            >
              See How It Works
            </button>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-10 left-0 right-0 px-4"
        >
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "⚡", title: "Instant Compatibility", desc: "Real-time checking" },
              { icon: "🎯", title: "Smart Suggestions", desc: "AI-powered recommendations" },
              { icon: "🔧", title: "Auto-Fix Issues", desc: "One-click solutions" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 + i * 0.1 }}
                className="backdrop-blur-md bg-background/30 border border-border/50 rounded-xl p-4 text-center hover:bg-background/50 transition-all"
              >
                <div className="text-3xl mb-2">{feature.icon}</div>
                <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-muted-foreground text-sm flex flex-col items-center gap-2"
        >
          <span>Scroll to explore</span>
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
