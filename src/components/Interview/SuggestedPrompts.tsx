"use client";

/**
 * SuggestedPrompts — horizontal chip row that renders suggested questions.
 * Chips animate in with a stagger and disable during active streaming.
 */

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { QA } from "@/data/interview-qa";

interface SuggestedPromptsProps {
  prompts: QA[];
  onSelect: (qa: QA) => void;
  disabled?: boolean;
}

export function SuggestedPrompts({ prompts, onSelect, disabled }: SuggestedPromptsProps) {
  return (
    <div className="interview-prompts-wrap" role="list" aria-label="Suggested questions">
      <p className="text-[11px] uppercase tracking-[0.12em] text-white/25 mb-2.5 font-mono">
        Suggested
      </p>
      <div className="flex flex-wrap gap-2">
        {prompts.map((qa, i) => (
          <motion.button
            key={qa.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
            onClick={() => !disabled && onSelect(qa)}
            disabled={disabled}
            role="listitem"
            className={cn(
              "interview-prompt-chip",
              disabled && "opacity-40 cursor-not-allowed"
            )}
          >
            {qa.question}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
