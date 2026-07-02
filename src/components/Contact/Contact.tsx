"use client";

import { useRef, useState, useEffect } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mouse tracking for the "ticket" tilting effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    // Normalized mouse coordinates between -0.5 and 0.5
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <section id="contact" className="contact-section">
      <div 
        ref={containerRef}
        className="contact-container"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div 
          className="contact-ticket"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        >
          <div className="contact-ticket-inner">
            
            {/* Left Header Side */}
            <div className="contact-funky-header">
              <h2 className="contact-funky-title">
                SAY<br/>
                HELLO!
              </h2>
              <div className="contact-funky-divider" />
              <p className="contact-funky-sub">
                Let's build something crazy together. Drop a line below.
              </p>

              <div className="contact-socials">
                <a href="mailto:hello@example.com" className="funky-social-link">Email</a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="funky-social-link">LinkedIn</a>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="funky-social-link">GitHub</a>
              </div>
            </div>

            {/* Right Form Side */}
            <div className="contact-funky-form-wrap">
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="contact-success-funky"
                >
                  <CheckCircle2 size={80} strokeWidth={3} className="text-black mb-4" />
                  <h3>BOOM!</h3>
                  <p>Message sent. Talk soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-funky-form">
                  <div className="funky-input-group">
                    <label htmlFor="name">NAME</label>
                    <input type="text" id="name" required placeholder="John Doe" />
                  </div>
                  
                  <div className="funky-input-group">
                    <label htmlFor="email">EMAIL</label>
                    <input type="email" id="email" required placeholder="john@example.com" />
                  </div>
                  
                  <div className="funky-input-group">
                    <label htmlFor="message">MESSAGE</label>
                    <textarea id="message" required placeholder="What's up?" rows={4} className="resize-none" />
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95, y: 4, boxShadow: "0px 0px 0px rgba(0,0,0,1)" }}
                    type="submit" 
                    disabled={isSubmitting} 
                    className="funky-submit-btn"
                  >
                    <span>{isSubmitting ? "SENDING..." : "SEND IT"}</span>
                    {!isSubmitting && <ArrowRight size={24} strokeWidth={3} />}
                  </motion.button>
                </form>
              )}
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
