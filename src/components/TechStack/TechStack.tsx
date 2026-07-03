"use client";

import { useRef } from "react";
import { TECH_STACK } from "@/data/tech-stack";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);
  const rowsContainerRef = useRef<HTMLDivElement>(null);

  // Split the items into 3 roughly equal rows
  const itemsPerRow = Math.ceil(TECH_STACK.length / 3);
  const row1Data = TECH_STACK.slice(0, itemsPerRow);
  const row2Data = TECH_STACK.slice(itemsPerRow, itemsPerRow * 2);
  const row3Data = TECH_STACK.slice(itemsPerRow * 2, TECH_STACK.length);

  // Duplicate items to ensure we don't run out of content while scrubbing
  const repeatedRow1 = [...row1Data, ...row1Data, ...row1Data];
  const repeatedRow2 = [...row2Data, ...row2Data, ...row2Data];
  const repeatedRow3 = [...row3Data, ...row3Data, ...row3Data];

  useGSAP(
    () => {
      if (!containerRef.current || !stickyRef.current || !headerRef.current) return;

      // We want Row 1 and 3 to start shifted left so they can pan right.
      // We want Row 2 to start at 0 so it can pan left.
      gsap.set(row1Ref.current, { x: "-30%" });
      gsap.set(row2Ref.current, { x: "0%" });
      gsap.set(row3Ref.current, { x: "-30%" });

      // Create master timeline scrubbed by scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: stickyRef.current,
          scrub: 1, // Smooth scrub
        }
      });

      // The continuous panning (runs the entire scroll duration)
      // Row 1 goes RIGHT (moves from -30% towards 0%)
      tl.to(row1Ref.current, {
        x: "0%",
        ease: "none",
        duration: 1
      }, 0);

      // Row 2 goes LEFT (moves from 0% towards -30%)
      tl.to(row2Ref.current, {
        x: "-30%",
        ease: "none",
        duration: 1
      }, 0);

      // Row 3 goes RIGHT (moves from -30% towards 0%)
      tl.to(row3Ref.current, {
        x: "0%",
        ease: "none",
        duration: 1
      }, 0);

    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="tech-stack" className="tech-section">
      {/* Visual Transition from Projects (Ivory) to Cinematic Black */}
      <div className="tech-top-transition" />

      {/* Cinematic Backlight glow */}
      <div className="tech-cinematic-glow" />

      {/* Sticky container that holds the screen while we scroll the height */}
      <div ref={stickyRef} className="tech-sticky">
        
        <div ref={headerRef} className="tech-header">
          <span className="tech-label">Capabilities</span>
          <h2 className="tech-title">Engineering Stack</h2>
        </div>

        {/* The 3 Marquee Rows */}
        <div ref={rowsContainerRef} className="tech-rows-container">
          
          {/* ROW 1: Pans Right */}
          <div className="tech-row" ref={row1Ref}>
            {repeatedRow1.map((tech, i) => (
              <TechCard key={`${tech.name}-${i}`} tech={tech} />
            ))}
          </div>

          {/* ROW 2: Pans Left */}
          <div className="tech-row" ref={row2Ref}>
            {repeatedRow2.map((tech, i) => (
              <TechCard key={`${tech.name}-${i}`} tech={tech} />
            ))}
          </div>

          {/* ROW 3: Pans Right */}
          <div className="tech-row" ref={row3Ref}>
            {repeatedRow3.map((tech, i) => (
              <TechCard key={`${tech.name}-${i}`} tech={tech} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

function TechCard({ tech }: { tech: any }) {
  return (
    <div className="tech-mini-card">
      <div 
        className="tech-mini-glow"
        style={{ "--accent": tech.accentColor } as React.CSSProperties}
      />
      <div className="tech-mini-content">
        <div className="tech-mini-logo-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={tech.logoUrl} alt={tech.name} className="tech-mini-img" />
        </div>
        <div className="tech-mini-text">
          <h3 className="tech-mini-name">{tech.name}</h3>
          <span className="tech-mini-category">{tech.category}</span>
        </div>
      </div>
    </div>
  );
}
