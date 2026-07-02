"use client";

/**
 * ChatMessage — renders a single message bubble.
 * 
 * For assistant messages, the `streaming` prop triggers the blinking cursor.
 * Supports markdown-lite: **bold**, *italic*, \n line breaks, and numbered lists.
 */

import { memo } from "react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  streaming?: boolean;       // shows blinking cursor
  thinking?: boolean;        // shows thinking dots instead of content
}

/** Very lightweight markdown renderer — no external deps */
function renderContent(text: string): React.ReactNode[] {
  const lines = text.split("\n");
  const nodes: React.ReactNode[] = [];

  lines.forEach((line, li) => {
    if (line.trim() === "") {
      nodes.push(<br key={`br-${li}`} />);
      return;
    }

    // Inline bold/italic via regex
    const parts = line.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
    const inline = parts.map((part, pi) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={pi}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        return <em key={pi}>{part.slice(1, -1)}</em>;
      }
      return <span key={pi}>{part}</span>;
    });

    nodes.push(<span key={`line-${li}`} className="block">{inline}</span>);
  });

  return nodes;
}

export const ChatMessage = memo(function ChatMessage({
  role,
  content,
  timestamp,
  streaming = false,
  thinking = false,
}: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex gap-3 w-full",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {/* Assistant avatar */}
      {!isUser && (
        <div className="interview-avatar flex-shrink-0 mt-1" aria-hidden>
          <span className="text-xs font-bold text-white/70">AI</span>
        </div>
      )}

      <div className={cn("flex flex-col gap-1 max-w-[82%]", isUser && "items-end")}>
        <div
          className={cn(
            "interview-bubble",
            isUser ? "interview-bubble-user" : "interview-bubble-assistant"
          )}
        >
          {thinking ? (
            /* Thinking dots */
            <div className="interview-thinking" aria-label="Thinking">
              <span />
              <span />
              <span />
            </div>
          ) : (
            <div className="interview-content">
              {renderContent(content)}
              {streaming && <span className="interview-cursor" aria-hidden />}
            </div>
          )}
        </div>
        <span className="text-[11px] text-white/20 px-1">{timestamp}</span>
      </div>

      {/* User avatar */}
      {isUser && (
        <div className="interview-avatar interview-avatar-user flex-shrink-0 mt-1" aria-hidden>
          <span className="text-xs font-bold text-white/70">You</span>
        </div>
      )}
    </div>
  );
});
