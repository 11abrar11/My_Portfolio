"use client";

/**
 * AIInterview — The signature section of the portfolio.
 *
 * Feels like a premium ChatGPT interface.
 * 
 * Section loading sequence:
 * 1. Section enters viewport (light bg)
 * 2. Skeleton placeholders appear briefly
 * 3. Chat interface loads in
 * 4. Pre-loaded "Tell me about yourself" answer streams in
 * 5. User can then interact with suggested prompts
 *
 * Scroll behaviour: the section owns the viewport — the next section
 * only becomes visible after the interview section has fully exited.
 */

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";
import { ChatMessage } from "./ChatMessage";
import { SuggestedPrompts } from "./SuggestedPrompts";
import { SUGGESTED_PROMPTS, QA } from "@/data/interview-qa";
import { Send } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Phase = "skeleton" | "loading" | "intro-streaming" | "idle" | "thinking" | "streaming";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  thinking?: boolean;
}

function timestamp() {
  return new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

// Autoplay intro QA
const INTRO_QA = SUGGESTED_PROMPTS[0];

/** Picks a random answer variation */
function pickAnswer(qa: QA): string {
  const idx = Math.floor(Math.random() * qa.answers.length);
  return qa.answers[idx];
}

export function AIInterview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [phase, setPhase] = useState<Phase>("skeleton");
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeAnswer, setActiveAnswer] = useState<string>("");
  const [inputValue, setInputValue] = useState("");
  const [sectionLoaded, setSectionLoaded] = useState(false);
  const [askedPromptIds, setAskedPromptIds] = useState<Set<string>>(new Set([INTRO_QA.id]));

  const isStreaming = phase === "streaming" || phase === "intro-streaming";
  const isThinking = phase === "thinking";

  // Cycle available prompts: always show up to 3 that haven't been asked yet
  const currentPrompts = useMemo(() => {
    return SUGGESTED_PROMPTS.filter((qa) => !askedPromptIds.has(qa.id)).slice(0, 3);
  }, [askedPromptIds]);

  // Typewriter for the currently streaming answer
  const { displayed: streamedText, done: streamDone } = useTypewriter({
    text: activeAnswer,
    baseSpeed: 14,
    enabled: isStreaming && activeAnswer.length > 0,
  });

  // Keep chat scrolled to bottom
  const scrollToBottom = useCallback(() => {
    if (chatScrollRef.current) {
      // Use 'auto' behavior to track perfectly without animation fighting during rapid text streaming
      chatScrollRef.current.scrollTo({
        top: chatScrollRef.current.scrollHeight,
        behavior: "auto",
      });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamedText, scrollToBottom]);

  useGSAP(() => {
    if (!sectionRef.current || !headerRef.current || !chatWindowRef.current) return;

    // Use a GSAP timeline purely for the scroll-linked fade animations.
    // The "locking" is handled flawlessly by CSS position: sticky.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%", // start animation when section is 60% down the screen
        onEnter: () => {
          // Trigger the fake loading sequence when we hit the section
          if (!sectionLoaded) {
            setTimeout(() => setPhase("loading"), 500);
            setTimeout(() => {
              setSectionLoaded(true);
              setMessages([{
                id: "intro-q",
                role: "user",
                content: INTRO_QA.question,
                timestamp: timestamp(),
              }]);
              setPhase("thinking");
            }, 1000);
            setTimeout(() => {
              setActiveAnswer(pickAnswer(INTRO_QA));
              setPhase("intro-streaming");
            }, 2000);
          }
        }
      }
    });

    // 1. Fade in the header
    tl.fromTo(headerRef.current, 
      { opacity: 0, y: 40 }, 
      { opacity: 1, y: 0, duration: 1 }
    )
    // 2. Chat window is already there, but let's fade it in slightly overlapping
    .fromTo(chatWindowRef.current,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 1 },
      "-=0.5" 
    );

  }, { scope: sectionRef });

  // When streaming finishes, commit the streamed message and go idle
  useEffect(() => {
    if (!streamDone || !isStreaming) return;
    const content = streamedText;
    setMessages((prev) => {
      // Remove any placeholder thinking message, then add the real answer
      const filtered = prev.filter((m) => !m.thinking);
      return [
        ...filtered,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content,
          timestamp: timestamp(),
        },
      ];
    });
    setActiveAnswer("");
    setPhase("idle");
  }, [streamDone, isStreaming, streamedText]);

  const handlePromptSelect = useCallback(
    (qa: QA) => {
      if (isStreaming || isThinking) return;

      const userMsg: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content: qa.question,
        timestamp: timestamp(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setPhase("thinking");
      setAskedPromptIds((prev) => new Set(prev).add(qa.id));

      // Thinking delay: 1.2–2.2s
      const delay = 1200 + Math.random() * 1000;
      setTimeout(() => {
        setActiveAnswer(pickAnswer(qa));
        setPhase("streaming");
      }, delay);
    },
    [isStreaming, isThinking]
  );

  const handleInputSubmit = useCallback(() => {
    const q = inputValue.trim();
    if (!q || isStreaming || isThinking) return;

    // Find a matching QA or use the closest one
    const match =
      SUGGESTED_PROMPTS.find((qa) =>
        qa.question.toLowerCase().includes(q.toLowerCase()) ||
        q.toLowerCase().includes(qa.question.toLowerCase().split(" ")[0])
      ) || SUGGESTED_PROMPTS[4]; // fallback to "challenges"

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: q,
      timestamp: timestamp(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setPhase("thinking");
    setAskedPromptIds((prev) => new Set(prev).add(match.id));

    const delay = 1200 + Math.random() * 1000;
    setTimeout(() => {
      setActiveAnswer(pickAnswer(match));
      setPhase("streaming");
    }, delay);
  }, [inputValue, isStreaming, isThinking]);

  return (
    <section ref={sectionRef} id="interview" className="interview-section" style={{ height: "250vh" }}>
      <div
        ref={innerRef}
        className="interview-inner"
        style={{ position: "sticky", top: 0, height: "100vh" }}
      >
        {/* Left Side Header */}
        <div
          ref={headerRef}
          className="interview-header"
          style={{ opacity: 0 }}
        >
          <span className="interview-label">AI Interview</span>
          <h2 className="interview-heading">
            Interview this<br />
            <span className="interview-heading-accent">AI Engineer.</span>
          </h2>
          <p className="interview-subheading">
            Ask me anything — about my projects, my architecture decisions, or why I'd be a great hire.
          </p>
        </div>

        {/* Right Side Chat Window */}
        <div
          ref={chatWindowRef}
          className="interview-chat-window"
          style={{ opacity: 0 }}
        >
          {/* Premium Header */}
          <div className="interview-chrome">
            <div className="interview-chrome-title">
              Abrar AI
              <span className="interview-chrome-subtitle">• Live Session</span>
            </div>
            <div className="interview-status-dot" title="Live" />
          </div>

          {/* Message list */}
          <div
            ref={chatScrollRef}
            className="interview-messages"
            role="log"
            aria-live="polite"
            data-lenis-prevent="true"
          >
            <AnimatePresence mode="popLayout">
              {phase === "skeleton" && (
                <motion.div
                  key="skeleton"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="interview-skeleton-wrap"
                >
                  <div className="interview-skeleton skeleton-short" />
                  <div className="interview-skeleton skeleton-long" />
                  <div className="interview-skeleton skeleton-medium" />
                </motion.div>
              )}

              {sectionLoaded && messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                >
                  <ChatMessage
                    role={msg.role}
                    content={msg.content}
                    timestamp={msg.timestamp}
                    thinking={msg.thinking}
                  />
                </motion.div>
              ))}

              {/* Thinking indicator */}
              {isThinking && sectionLoaded && (
                <motion.div
                  key="thinking"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChatMessage
                    role="assistant"
                    content=""
                    timestamp={timestamp()}
                    thinking
                  />
                </motion.div>
              )}

              {/* Live streaming answer */}
              {isStreaming && streamedText && (
                <motion.div
                  key="stream"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChatMessage
                    role="assistant"
                    content={streamedText}
                    timestamp={timestamp()}
                    streaming={!streamDone}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Suggested prompts */}
          {sectionLoaded && currentPrompts.length > 0 && (
            <div className="interview-prompts">
              <SuggestedPrompts
                prompts={currentPrompts}
                onSelect={handlePromptSelect}
                disabled={isStreaming || isThinking}
              />
            </div>
          )}

          {/* Input area */}
          <div className="interview-input-bar">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleInputSubmit()}
              placeholder="Ask a question…"
              disabled={isStreaming || isThinking}
              className="interview-input"
              aria-label="Ask Abrar a question"
            />
            <button
              onClick={handleInputSubmit}
              disabled={!inputValue.trim() || isStreaming || isThinking}
              className="interview-send-btn"
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
