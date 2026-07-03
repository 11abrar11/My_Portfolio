"use client";

import { useRef } from "react";
import { PROJECTS } from "@/data/projects";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ARCH_NODES: Record<string, string[]> = {
  "ai-voice-agent": ["WebRTC / SIP", "Whisper STT", "LangGraph", "TTS Engine"],
  "whatsapp-assistant": ["WhatsApp API", "n8n Orchestrator", "RAG Pipeline", "Qdrant / PG"],
  "workflow-automation": ["Document Input", "LLM Extractor", "Validator Agent", "ERP / Output"],
};

export function ProjectStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      if (!cards.length) return;

      const vh = window.innerHeight;
      const PEEK_OFFSET = 55; // Pixels the previous card moves UP to peek
      const SCALE_STEP = 0.05; // Amount to shrink previous cards

      // 1. Initial State Setup
      cards.forEach((card, i) => {
        // Card 0 starts visible, others start below the viewport.
        // z-index ensures Card 2 is on top of Card 1, etc.
        gsap.set(card, {
          y: i === 0 ? 0 : vh + 100, // Card 0 is visible at y:0
          scale: 1,
          transformOrigin: "top center",
          zIndex: i,
        });
      });

      const master = gsap.timeline({ paused: true });

      // Phase 2: Sequential card stacking on scroll
      const numSwaps = cards.length - 1;
      const budgetPerSwap = 1.0 / numSwaps; // Use full duration

      for (let i = 1; i <= numSwaps; i++) {
        const swapStart = (i - 1) * budgetPerSwap;
        
        // The new card rises from below to become active
        master.to(
          cards[i],
          {
            y: 0,
            duration: budgetPerSwap * 0.8, // leave a small gap between swaps
            ease: "power3.inOut",
          },
          swapStart
        );

        // All previous cards move backward and scale down simultaneously
        for (let j = 0; j < i; j++) {
          const level = i - j; // How many levels deep is this card now?
          master.to(
            cards[j],
            {
              y: -(level * PEEK_OFFSET),
              scale: 1 - (level * SCALE_STEP),
              duration: budgetPerSwap * 0.8,
              ease: "power3.inOut",
            },
            swapStart
          );
        }
      }

      // Create the ScrollTrigger
      // Reduced total scroll height so it feels faster and punchier
      const totalScrollHeight = `${100 + cards.length * 100}vh`;
      if (containerRef.current) {
        containerRef.current.style.height = totalScrollHeight;
      }

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: stickyRef.current,
        scrub: 1, // Momentum scrubbing for heavy physical feel
        animation: master,
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="projects" className="projects-section">
      <div className="projects-bg" />

      <div ref={stickyRef} className="projects-sticky">
        <div
          ref={headerRef}
          className="projects-header"
        >
          <span className="projects-label">Selected Work</span>
          <h2 className="projects-title">Selected Engineering Work</h2>
        </div>

        <div className="project-cards-container">
          {PROJECTS.map((project, i) => {
            const nodes = ARCH_NODES[project.id] ?? [];
            return (
              <div
                key={project.id}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                className="project-card-wrap"
              >
                <div className="project-card">
                  <div className="project-card-inner">
                    {/* Header */}
                    <div className="project-card-header">
                      <span className="project-category">{project.category}</span>
                      <h3 className="project-card-title">{project.title}</h3>
                    </div>

                    {/* Body */}
                    <div className="project-card-body">
                      <div className="project-desc-col">
                        <p className="project-desc">{project.description}</p>
                        <div className="project-highlights">
                          {project.highlights.map((h) => (
                            <div key={h.label} className="project-highlight-row">
                              <span className="project-highlight-label">{h.label}</span>
                              <span className="project-highlight-detail">{h.detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="project-arch-preview">
                        {nodes.map((node, ni) => (
                          <div key={node} style={{ display: "contents" }}>
                            <div className="arch-node">
                              <span className="arch-node-label">{node}</span>
                            </div>
                            {ni < nodes.length - 1 && (
                              <div className="arch-connector" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="project-card-footer">
                      <div className="project-tech-list">
                        {project.tech.map((t) => (
                          <span key={t} className="project-tech-pill">
                            {t}
                          </span>
                        ))}
                      </div>
                      <a href={project.cta.href} className="project-cta-btn">
                        {project.cta.label}
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
