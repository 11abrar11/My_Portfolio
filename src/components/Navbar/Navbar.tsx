"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLenis } from "lenis/react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If the section crosses the middle of the screen
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      // Create a thin horizontal band across the middle of the screen
      { root: null, rootMargin: "-50% 0px -49% 0px", threshold: 0 }
    );

    const sections = ["hero", "interview", "projects", "tech-stack", "timeline", "contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      if (lenis) {
        lenis.scrollTo(target);
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
      setMenuOpen(false); // Close menu when a link is clicked
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-container">
        
        {/* Logo / Name */}
        <a 
          href="#hero" 
          onClick={(e) => handleScrollTo(e, "hero")} 
          className="navbar-brand"
        >
          <span className="navbar-logo-text">Abrar.</span>
        </a>

        {/* Hamburger Toggle */}
        <button 
          className="navbar-mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={24} color="#fff" /> : <Menu size={24} color="#fff" />}
        </button>

        {/* Links */}
        <div className={`navbar-links ${menuOpen ? "mobile-open" : ""}`}>
          <a href="#hero" onClick={(e) => handleScrollTo(e, "hero")} className={`navbar-link ${activeSection === "hero" ? "active" : ""}`}>Home</a>
          <a href="#interview" onClick={(e) => handleScrollTo(e, "interview")} className={`navbar-link ${activeSection === "interview" ? "active" : ""}`}>Interview</a>
          <a href="#projects" onClick={(e) => handleScrollTo(e, "projects")} className={`navbar-link ${activeSection === "projects" ? "active" : ""}`}>Projects</a>
          <a href="#tech-stack" onClick={(e) => handleScrollTo(e, "tech-stack")} className={`navbar-link ${activeSection === "tech-stack" ? "active" : ""}`}>Tech</a>
          <a href="#timeline" onClick={(e) => handleScrollTo(e, "timeline")} className={`navbar-link ${activeSection === "timeline" ? "active" : ""}`}>My Journey</a>
          <a href="#contact" onClick={(e) => handleScrollTo(e, "contact")} className={`navbar-link ${activeSection === "contact" ? "active" : ""}`}>Contact</a>
        </div>
      </div>
    </nav>
  );
}
