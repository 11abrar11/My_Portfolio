"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { Download, ArrowRight } from "lucide-react";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { HeroPortrait } from "./HeroPortrait";

const HeroParticles = dynamic(() => import("./Hero3D"), { ssr: false });

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const nameLineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const lightingRef = useRef<HTMLDivElement>(null);
  const mouse = useMouseParallax(0.4);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Set all elements invisible initially
      gsap.set([portraitRef.current, taglineRef.current, buttonsRef.current], {
        opacity: 0,
      });
      gsap.set(taglineRef.current, { y: 16 }); // start slightly low for fade-up
      gsap.set(nameLineRefs.current, { opacity: 0, y: 70 });
      gsap.set(lightingRef.current, { opacity: 0 });
      gsap.set(particlesRef.current, { opacity: 0 });

      // Master cinematic timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Step 1: Ambient particles emerge from darkness
      tl.to(particlesRef.current, {
        opacity: 1,
        duration: 1.8,
        ease: "power1.inOut",
      });

      // Step 2: Portrait lighting warms up (overlaps particles)
      tl.to(
        lightingRef.current,
        { opacity: 1, duration: 2, ease: "power2.inOut" },
        "-=1.0"
      );

      // Step 3: Portrait fades in (overlaps with lighting)
      tl.to(
        portraitRef.current,
        {
          opacity: 1,
          duration: 1.4,
          ease: "power2.out",
        },
        "-=1.2"
      );

      // Step 4–6: Name lines animate in with clip-path reveal, staggered
      tl.fromTo(
        nameLineRefs.current,
        {
          opacity: 0,
          y: 70,
          clipPath: "inset(110% 0 0 0)",
        },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0% 0 0 0)",
          duration: 0.9,
          stagger: 0.18,
          ease: "power4.out",
        },
        "-=0.5"
      );

      // Step 7: Tagline fades upward smoothly
      tl.to(
        taglineRef.current,
        { opacity: 1, y: 0, duration: 0.85, ease: "power2.out" },
        "-=0.25"
      );

      // Step 8: Buttons appear with a gentle drift up
      tl.fromTo(
        buttonsRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.65, ease: "power2.out" },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="hero-section relative w-full min-h-screen bg-[#050507] text-white overflow-hidden flex items-center"
    >
      {/* Layer 0: Film grain noise */}
      <div className="hero-noise" />

      {/* Layer 1: Faint dot grid */}
      <div className="hero-dot-grid" />

      {/* Layer 2: Global depth radials */}
      <div className="hero-depth-radial" />

      {/* Layer 3: R3F ambient particles */}
      <div ref={particlesRef} className="absolute inset-0 z-[1] pointer-events-none">
        <HeroParticles />
      </div>

      {/* Layer 4: Portrait lighting halo (behind portrait, above particles) */}
      <div ref={lightingRef} className="hero-portrait-lighting-halo" />

      {/* Main layout */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 h-full min-h-screen flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_55%] gap-12 lg:gap-8 items-center">

          {/* Left column: Typography */}
          <div className="flex flex-col justify-center space-y-7">

            {/* Name composition */}
            <h1 className="hero-name-group leading-none space-y-1">
              {/* Mohammed */}
              <span className="hero-name-line-wrap block overflow-hidden">
                <span
                  ref={(el) => { nameLineRefs.current[0] = el; }}
                  className="block font-heading font-bold tracking-tight text-white/95 hero-name-size"
                >
                  Mohammed
                </span>
              </span>

              {/* Abrar — elegant gold italic */}
              <span className="hero-name-line-wrap block overflow-hidden">
                <span
                  ref={(el) => { nameLineRefs.current[1] = el; }}
                  className="block font-signature hero-name-abrar hero-name-size-abrar"
                >
                  Abrar
                </span>
              </span>

              {/* Hussain */}
              <span className="hero-name-line-wrap block overflow-hidden">
                <span
                  ref={(el) => { nameLineRefs.current[2] = el; }}
                  className="block font-heading font-bold tracking-tight text-white/95 hero-name-size"
                >
                  Hussain
                </span>
              </span>
            </h1>

            {/* Tagline — narrower column for comfortable reading measure */}
            <p
              ref={taglineRef}
              className="text-[14.5px] sm:text-[15px] md:text-base text-white/38 max-w-[320px] leading-[1.75] font-sans tracking-[0.008em]"
            >
              Building production-ready AI systems that automate
              businesses and solve real-world problems.
            </p>

            {/* CTAs */}
            <div ref={buttonsRef} className="flex flex-wrap items-center gap-3 pt-1">
              <button className="hero-btn hero-btn-primary group">
                <span className="relative z-10">Explore Projects</span>
                <ArrowRight className="relative z-10 ml-2 h-[15px] w-[15px] transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:translate-x-[5px]" />
              </button>
              <button className="hero-btn hero-btn-secondary group">
                <span className="relative z-10">Download Resume</span>
                <Download className="relative z-10 ml-2 h-[15px] w-[15px] transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:translate-y-[2px]" />
              </button>
            </div>
          </div>

          {/* Right column: Portrait */}
          <div
            ref={portraitRef}
            className="flex items-center justify-center lg:justify-end"
            style={{
              transform: `translate(${mouse.normalizedX * 6}px, ${mouse.normalizedY * 6}px)`,
              transition: "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
              willChange: "transform",
            }}
          >
            <HeroPortrait />
          </div>

        </div>
      </div>
    </section>
  );
}
