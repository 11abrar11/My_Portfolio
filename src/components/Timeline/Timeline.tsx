"use client";

import { useRef, useEffect, useState } from "react";
import { TIMELINE, TIMELINE_ICON_MAP } from "@/data/timeline";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const glowPathRef = useRef<SVGPathElement>(null);
  const nodeRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [svgHeight, setSvgHeight] = useState(2000);

  // Responsive height calculation
  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setSvgHeight(containerRef.current.scrollHeight);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    // Timeout for dynamic content loading
    const timer = setTimeout(updateHeight, 500);
    return () => {
      window.removeEventListener("resize", updateHeight);
      clearTimeout(timer);
    };
  }, []);

  // Generate a gentle flowing curved path dynamically based on height
  const generatePath = (height: number) => {
    let d = `M 50 0`;
    const step = 400; // How far vertically between curves
    const bend = 200;  // EXTREMELY bumpy curve
    
    let currentY = 0;
    let direction = 1;

    while (currentY < height) {
      const nextY = currentY + step;
      // Cubic bezier: control point 1, control point 2, end point
      d += ` C ${50 + (bend * direction)} ${currentY + step/3}, ${50 + (bend * direction)} ${nextY - step/3}, 50 ${nextY}`;
      currentY = nextY;
      direction *= -1; // alternate bend direction
    }
    return d;
  };

  const pathD = generatePath(svgHeight);

  useGSAP(
    () => {
      if (!pathRef.current || !glowPathRef.current || !nodeRef.current || svgHeight <= 0) return;

      const pathLength = glowPathRef.current.getTotalLength();
      
      // Setup initial SVG path state (hidden)
      gsap.set(glowPathRef.current, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      // Show the node
      gsap.set(nodeRef.current, { opacity: 1 });

      const master = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 20%",
          end: "bottom 80%",
          scrub: 0.5,
          onUpdate: (self) => {
            // Perfectly track the glowing node along the exact SVG path curve
            if (glowPathRef.current && nodeRef.current) {
              const length = glowPathRef.current.getTotalLength();
              // self.progress goes from 0 to 1
              const point = glowPathRef.current.getPointAtLength(self.progress * length);
              
              // Move the node exactly to the x and y of the SVG path
              // viewBox is "-200 0 500 height", meaning SVG x=-200 is physical pixel 0.
              // To convert SVG coordinate to physical DOM coordinate, we must add 200 to x.
              gsap.set(nodeRef.current, {
                x: point.x + 200 - 7, // align to viewBox offset, then center the 14px node (-7)
                y: point.y - 7, 
              });
            }
          }
        }
      });

      // 1. Animate the line drawing
      master.to(glowPathRef.current, {
        strokeDashoffset: 0,
        ease: "none",
        duration: 1,
      }, 0);

      // 3. Card reveal triggers
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        
        // We trigger each card when it comes into the center of the viewport
        ScrollTrigger.create({
          trigger: card,
          start: "top 60%", // When top of card hits 60% of viewport
          onEnter: () => {
            const isOdd = i % 2 === 0; // 0-indexed, so 0 is first (odd row)
            
            // Fade and slide in
            gsap.to(card, {
              opacity: 1,
              y: 0,
              x: 0,
              scale: 1,
              duration: 0.6,
              ease: "power2.out",
            });

            // Subtly illuminate the icon
            if (iconsRef.current[i]) {
              iconsRef.current[i]?.classList.add("active");
            }
          },
          // We don't reverse the animation on leave back to keep the journey visible
        });
        
        // Initial setup for cards before scroll reaches them
        const isOdd = i % 2 === 0;
        gsap.set(card, {
          opacity: 0,
          y: 20,
          x: isOdd ? -30 : 30, // Start slightly pushed away from center
          scale: 0.98,
        });
      });
    },
    { scope: containerRef, dependencies: [svgHeight] }
  );

  return (
    <section id="timeline" className="timeline-section" ref={containerRef}>
      
      <div className="timeline-svg-container">
        <svg 
          width="500" 
          height={svgHeight} 
          viewBox={`-200 0 500 ${svgHeight}`} 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="timeline-gradient" x1="0" y1="0" x2="0" y2={svgHeight} gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="10%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="90%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#000000" />
            </linearGradient>
          </defs>
          {/* Base faint track */}
          <path ref={pathRef} className="timeline-path-base" d={pathD} />
          {/* Animated Glowing track */}
          <path ref={glowPathRef} className="timeline-path-glow" d={pathD} />
        </svg>

        {/* The node that moves down */}
        <div ref={nodeRef} className="timeline-node" />
      </div>

      {/* ─── Timeline Content ─── */}
      <div className="timeline-container">
        {TIMELINE.map((item, index) => {
          const Icon = TIMELINE_ICON_MAP[item.iconName];
          return (
            <div key={item.id} className="timeline-row">
              <div 
                className="timeline-card-wrap"
                ref={(el) => { cardsRef.current[index] = el; }}
              >
                <div className={`timeline-card ${item.isMajorProject ? "major-project" : ""}`}>
                  <div className="timeline-card-header">
                    <div 
                      className="timeline-card-icon"
                      ref={(el) => { iconsRef.current[index] = el; }}
                    >
                      <Icon size={20} strokeWidth={1.5} />
                    </div>
                    <span className="timeline-year">{item.year}</span>
                  </div>
                  
                  <h3 className="timeline-title">{item.title}</h3>
                  
                  {item.organization && (
                    <p className="timeline-org">{item.organization}</p>
                  )}
                  
                  {item.metrics && (
                    <div className="timeline-metrics">{item.metrics}</div>
                  )}
                  
                  <p className="timeline-desc">{item.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
