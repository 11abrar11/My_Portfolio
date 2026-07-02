"use client";

/**
 * HeroPortrait — the visual centerpiece of the hero section.
 *
 * The portrait image sits at the center with:
 *  - A deep volumetric blue glow radiating behind it
 *  - A warm gold rim light from upper-right
 *  - A secondary cool-blue fill light from lower-left
 *  - An ambient haze layer for depth
 *  - A faint edge-glow border ring
 *
 * To use your real portrait:
 *   1. Place your transparent-background PNG at /public/portrait.png
 *   2. Change src from "/portrait.svg" to "/portrait.png"
 *   3. Remove the `unoptimized` prop
 */

import Image from "next/image";

export function HeroPortrait() {
  return (
    <div className="hero-portrait-outer">
      {/* === Lighting layers (all behind the portrait) === */}

      {/* Primary volumetric blue glow — emanates from behind */}
      <div className="hp-glow-primary" />

      {/* Secondary deep blue fill — lower ambient */}
      <div className="hp-glow-secondary" />

      {/* Warm gold rim light — upper right */}
      <div className="hp-rim-gold" />

      {/* Cool blue-white accent — lower left */}
      <div className="hp-rim-blue" />

      {/* Ambient haze for depth */}
      <div className="hp-haze" />

      {/* Very subtle edge ring — one pixel border glow */}
      <div className="hp-edge-ring" />

      {/* === Portrait image === */}
      <div className="hp-image-wrap">
        <Image
          src="/me.png"
          alt="Mohammed Abrar Hussain — AI Engineer"
          width={700}
          height={840}
          priority
          draggable={false}
          className="hp-image"
        />
      </div>
    </div>
  );
}
