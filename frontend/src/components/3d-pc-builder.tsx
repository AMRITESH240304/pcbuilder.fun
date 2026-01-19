"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment, Grid, Text, Html } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import MultiIndexSearch, { PC_COMPONENT_INDEXES } from "@/components/multi-index-search";

// PC Case Component
function PCCase() {
  return (
    <group position={[0, 0, 0]}>
      {/* Main case body */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[4, 5, 4.5]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.7}
          roughness={0.3}
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {/* Case frame edges */}
      <lineSegments>
        <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(4, 5, 4.5)]} />
        <lineBasicMaterial attach="material" color="#3b82f6" linewidth={2} />
      </lineSegments>

      {/* Front panel */}
      <mesh position={[0, 2, 2.26]}>
        <boxGeometry args={[3.8, 4.8, 0.05]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Power button */}
      <mesh position={[1.5, 4, 2.3]}>
        <cylinderGeometry args={[0.1, 0.1, 0.05]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

// Component Slot Marker
function ComponentSlot({ position, label, isEmpty, onClick }: { 
  position: [number, number, number]; 
  label: string; 
  isEmpty: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      {isEmpty && (
        <>
          <mesh
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={onClick}
          >
            <boxGeometry args={[1.5, 0.8, 1]} />
            <meshStandardMaterial
              color={hovered ? "#3b82f6" : "#334155"}
              transparent
              opacity={0.3}
              wireframe
            />
          </mesh>
          <Html position={[0, 0.6, 0]} center>
            <div className="bg-background/90 backdrop-blur-sm px-3 py-1 rounded-lg border border-border text-xs whitespace-nowrap pointer-events-none">
              {label}
            </div>
          </Html>
        </>
      )}
    </group>
  );
}

// 3D CPU Component
function CPU3D({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[1.2, 0.2, 1.2]} />
        <meshStandardMaterial
          color="#2563eb"
          emissive="#2563eb"
          emissiveIntensity={0.3}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      {/* CPU pins */}
      {Array.from({ length: 5 }).map((_, i) =>
        Array.from({ length: 5 }).map((_, j) => (
          <mesh key={`${i}-${j}`} position={[-0.4 + i * 0.2, -0.15, -0.4 + j * 0.2]}>
            <cylinderGeometry args={[0.02, 0.02, 0.1]} />
            <meshStandardMaterial color="#fbbf24" metalness={1} />
          </mesh>
        ))
      )}
      <Html position={[0, 0.3, 0]} center>
        <div className="bg-blue-500/90 backdrop-blur-sm px-2 py-1 rounded text-xs text-white whitespace-nowrap pointer-events-none">
          CPU
        </div>
      </Html>
    </group>
  );
}

// 3D GPU Component
function GPU3D({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* PCB */}
      <mesh castShadow>
        <boxGeometry args={[2, 0.1, 0.8]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={0.3}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      {/* Cooler shroud */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[1.8, 0.4, 0.7]} />
        <meshStandardMaterial color="#1f2937" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Fans */}
      <mesh position={[-0.5, 0.35, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.05]} />
        <meshStandardMaterial color="#374151" metalness={0.9} />
      </mesh>
      <mesh position={[0.5, 0.35, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.05]} />
        <meshStandardMaterial color="#374151" metalness={0.9} />
      </mesh>
      <Html position={[0, 0.6, 0]} center>
        <div className="bg-green-500/90 backdrop-blur-sm px-2 py-1 rounded text-xs text-white whitespace-nowrap pointer-events-none">
          GPU
        </div>
      </Html>
    </group>
  );
}

// 3D RAM Component
function RAM3D({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[0.2, 1, 0.8]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[0.22, 0.2, 0.82]} />
        <meshStandardMaterial color="#1f2937" metalness={0.9} />
      </mesh>
      <Html position={[0, 0.7, 0]} center>
        <div className="bg-purple-500/90 backdrop-blur-sm px-2 py-1 rounded text-xs text-white whitespace-nowrap pointer-events-none">
          RAM
        </div>
      </Html>
    </group>
  );
}

// 3D Motherboard Component
function Motherboard3D({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[3.5, 0.05, 3]} />
        <meshStandardMaterial
          color="#1e40af"
          emissive="#1e40af"
          emissiveIntensity={0.2}
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>
      {/* Circuit traces */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[-1.6 + i * 0.4, 0.03, 0]}>
          <boxGeometry args={[0.02, 0.01, 2.5]} />
          <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.4} />
        </mesh>
      ))}
      <Html position={[0, 0.2, 0]} center>
        <div className="bg-blue-600/90 backdrop-blur-sm px-2 py-1 rounded text-xs text-white whitespace-nowrap pointer-events-none">
          Motherboard
        </div>
      </Html>
    </group>
  );
}

// 3D PSU Component
function PSU3D({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[1.5, 0.8, 1.2]} />
        <meshStandardMaterial color="#ef4444" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.61]}>
        <cylinderGeometry args={[0.3, 0.3, 0.05]} />
        <meshStandardMaterial color="#1f2937" metalness={0.9} />
      </mesh>
      <Html position={[0, 0.6, 0]} center>
        <div className="bg-red-500/90 backdrop-blur-sm px-2 py-1 rounded text-xs text-white whitespace-nowrap pointer-events-none">
          PSU
        </div>
      </Html>
    </group>
  );
}

// 3D Storage Component
function Storage3D({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[0.6, 0.1, 1]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.8} roughness={0.2} />
      </mesh>
      <Html position={[0, 0.2, 0]} center>
        <div className="bg-amber-500/90 backdrop-blur-sm px-2 py-1 rounded text-xs text-white whitespace-nowrap pointer-events-none">
          Storage
        </div>
      </Html>
    </group>
  );
}

// 3D Scene
function BuilderScene({ 
  selectedComponents, 
  onSlotClick 
}: { 
  selectedComponents: Record<string, any>;
  onSlotClick: (slotType: string) => void;
}) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-5, 5, 5]} intensity={0.5} color="#3b82f6" />
      <spotLight position={[0, 8, 0]} intensity={0.8} angle={0.6} penumbra={1} castShadow />
      
      {/* Environment */}
      <Environment preset="studio" />
      
      {/* Grid floor */}
      <Grid
        args={[20, 20]}
        cellSize={0.5}
        cellThickness={0.5}
        cellColor="#6b7280"
        sectionSize={2}
        sectionThickness={1}
        sectionColor="#3b82f6"
        fadeDistance={25}
        fadeStrength={1}
        followCamera={false}
        position={[0, -0.5, 0]}
      />

      {/* PC Case */}
      <PCCase />

      {/* Component slots and components */}
      {/* Motherboard */}
      {selectedComponents.motherboard ? (
        <Motherboard3D position={[0, 0.5, 0]} />
      ) : (
        <ComponentSlot 
          position={[0, 0.5, 0]} 
          label="Add Motherboard" 
          isEmpty={!selectedComponents.motherboard}
          onClick={() => onSlotClick('motherboard')}
        />
      )}

      {/* CPU */}
      {selectedComponents.cpu ? (
        <CPU3D position={[0, 0.8, 0.5]} />
      ) : (
        <ComponentSlot 
          position={[0, 0.8, 0.5]} 
          label="Add CPU" 
          isEmpty={!selectedComponents.cpu}
          onClick={() => onSlotClick('cpu')}
        />
      )}

      {/* GPU */}
      {selectedComponents["video-card"] ? (
        <GPU3D position={[0, 1.5, 0]} />
      ) : (
        <ComponentSlot 
          position={[0, 1.5, 0]} 
          label="Add GPU" 
          isEmpty={!selectedComponents["video-card"]}
          onClick={() => onSlotClick('video-card')}
        />
      )}

      {/* RAM */}
      {selectedComponents.memory ? (
        <>
          <RAM3D position={[-0.8, 0.8, -0.5]} />
          <RAM3D position={[-0.5, 0.8, -0.5]} />
        </>
      ) : (
        <ComponentSlot 
          position={[-0.65, 0.8, -0.5]} 
          label="Add RAM" 
          isEmpty={!selectedComponents.memory}
          onClick={() => onSlotClick('memory')}
        />
      )}

      {/* PSU */}
      {selectedComponents["power-supply"] ? (
        <PSU3D position={[0, -0.1, -1.5]} />
      ) : (
        <ComponentSlot 
          position={[0, -0.1, -1.5]} 
          label="Add PSU" 
          isEmpty={!selectedComponents["power-supply"]}
          onClick={() => onSlotClick('power-supply')}
        />
      )}

      {/* Storage */}
      {selectedComponents["internal-hard-drive"] ? (
        <Storage3D position={[1.2, 1, -1]} />
      ) : (
        <ComponentSlot 
          position={[1.2, 1, -1]} 
          label="Add Storage" 
          isEmpty={!selectedComponents["internal-hard-drive"]}
          onClick={() => onSlotClick('internal-hard-drive')}
        />
      )}

      {/* Camera and Controls */}
      <PerspectiveCamera makeDefault position={[6, 4, 6]} fov={50} />
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={0}
        minDistance={5}
        maxDistance={15}
      />
    </>
  );
}

// Main 3D PC Builder Component
interface PC3DBuilderProps {
  selectedComponents: Record<string, any>;
  onSelectComponent: (component: any, indexName: string) => void;
  onClose: () => void;
}

export default function PC3DBuilder({ selectedComponents, onSelectComponent, onClose }: PC3DBuilderProps) {
  const [focusedSlot, setFocusedSlot] = useState<string | null>(null);

  const handleSlotClick = (slotType: string) => {
    setFocusedSlot(slotType);
  };

  const handleComponentSelect = (component: any, indexName: string) => {
    onSelectComponent(component, indexName);
    setFocusedSlot(null);
  };

  const componentCount = Object.keys(selectedComponents).length;
  const totalSlots = 6; // motherboard, cpu, gpu, ram, psu, storage

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">3D PC Builder</h1>
            <p className="text-sm text-muted-foreground">
              {componentCount} of {totalSlots} components added
            </p>
          </div>
          <div className="flex items-center gap-4">
            <MultiIndexSearch
              applicationId={process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!}
              apiKey={process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY!}
              placeholder={focusedSlot ? `Search ${focusedSlot}...` : "Search components..."}
              hitsPerPage={5}
              onSelectComponent={handleComponentSelect}
            />
            <button
              onClick={onClose}
              className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg text-foreground transition-colors"
            >
              Exit Builder
            </button>
          </div>
        </div>
      </div>

      {/* 3D Canvas */}
      <Canvas shadows className="w-full h-full">
        <Suspense fallback={null}>
          <BuilderScene 
            selectedComponents={selectedComponents} 
            onSlotClick={handleSlotClick}
          />
        </Suspense>
      </Canvas>

      {/* Component Info Panel */}
      <AnimatePresence>
        {componentCount > 0 && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="absolute right-4 top-24 w-80 bg-background/95 backdrop-blur-md border border-border rounded-xl p-4 shadow-xl"
          >
            <h3 className="text-lg font-semibold mb-3 text-foreground">Your Components</h3>
            <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
              {Object.entries(selectedComponents).map(([indexName, component]) => {
                const indexConfig = PC_COMPONENT_INDEXES.find(idx => idx.name === indexName);
                return (
                  <div
                    key={indexName}
                    className="p-3 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-xl">{indexConfig?.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                          {indexConfig?.label}
                        </p>
                        <p className="font-medium text-foreground text-sm truncate">
                          {component.name}
                        </p>
                        {component.price && (
                          <p className="text-xs text-primary mt-1">
                            ${typeof component.price === 'number' ? component.price.toFixed(2) : component.price}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Price:</span>
                <span className="text-lg font-bold text-primary">
                  ${Object.values(selectedComponents).reduce((sum, comp: any) => {
                    const price = typeof comp.price === 'number' ? comp.price : parseFloat(comp.price) || 0;
                    return sum + price;
                  }, 0).toFixed(2)}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      {componentCount === 0 && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-background/95 backdrop-blur-md border border-border rounded-xl p-6 max-w-md text-center"
        >
          <h3 className="text-lg font-semibold mb-2 text-foreground">Get Started!</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Click on the blue outlined slots in the 3D case or use the search bar to add components.
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <div>🖱️ Drag to rotate</div>
            <div>🔍 Scroll to zoom</div>
            <div>👆 Click slots to add</div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
