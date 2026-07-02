"use client";

/**
 * HeroParticles — ambient R3F canvas.
 *
 * Three tiers of particles:
 *  1. Sparse slow blue particles (far field)
 *  2. Even sparser warm gold particles (mid field)
 *  3. Tiny bright white star-like flecks (foreground scatter)
 *
 * The canvas is purely decorative — pointer-events: none, low dpr.
 * All particles are intentionally faint so they never compete with the portrait.
 */

import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";

export default function HeroParticles() {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        dpr={[1, 1.2]}
        gl={{ alpha: true, antialias: false }}
        style={{ pointerEvents: "none", background: "transparent" }}
      >
        {/* Very dim ambient fill */}
        <ambientLight intensity={0.15} />

        {/* Tier 1: Sparse slow blue particles — wide spread, far field */}
        <Sparkles
          count={40}
          scale={[16, 12, 8]}
          size={1.4}
          speed={0.15}
          opacity={0.095}
          color="#3b82f6"
          noise={1}
        />

        {/* Tier 2: Warm gold particles — sparser, gentler */}
        <Sparkles
          count={16}
          scale={[12, 9, 5]}
          size={1.0}
          speed={0.10}
          opacity={0.055}
          color="#d4a84b"
          noise={0.8}
        />

        {/* Tier 3: Tiny white star-like flecks — very subtle scatter */}
        <Sparkles
          count={24}
          scale={[18, 14, 6]}
          size={0.6}
          speed={0.08}
          opacity={0.038}
          color="#ffffff"
          noise={1.2}
        />
      </Canvas>
    </div>
  );
}
