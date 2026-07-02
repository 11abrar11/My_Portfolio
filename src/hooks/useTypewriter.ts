/**
 * useTypewriter — streams text character by character, simulating a human typing.
 * 
 * - Realistic variable speed (faster on common characters, slight pause at punctuation)
 * - Returns the current visible string + a boolean `done`
 * - Calls onComplete when finished
 */

import { useState, useEffect, useRef, useCallback } from "react";

interface TypewriterOptions {
  text: string;
  baseSpeed?: number;       // ms per character (base)
  enabled?: boolean;        // start typing?
  onComplete?: () => void;
}

interface TypewriterState {
  displayed: string;
  done: boolean;
}

export function useTypewriter({
  text,
  baseSpeed = 18,
  enabled = true,
  onComplete,
}: TypewriterOptions): TypewriterState {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const reset = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    indexRef.current = 0;
    setDisplayed("");
    setDone(false);
  }, []);

  useEffect(() => {
    reset();
  }, [text, reset]);

  useEffect(() => {
    if (!enabled || !text) return;

    function tick() {
      const i = indexRef.current;
      if (i >= text.length) {
        setDone(true);
        onCompleteRef.current?.();
        return;
      }

      const char = text[i];
      setDisplayed(text.slice(0, i + 1));
      indexRef.current = i + 1;

      // Variable speed: pause slightly at sentence-ending punctuation
      let delay = baseSpeed;
      if (char === "." || char === "!" || char === "?") delay = baseSpeed * 8;
      else if (char === "," || char === ":" || char === ";") delay = baseSpeed * 4;
      else if (char === "\n") delay = baseSpeed * 3;
      else if (char === " ") delay = baseSpeed * 0.6;
      // Slight random jitter for human feel
      delay += (Math.random() - 0.5) * baseSpeed * 0.4;

      timerRef.current = setTimeout(tick, Math.max(4, delay));
    }

    timerRef.current = setTimeout(tick, 80); // initial pause before typing starts

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [text, baseSpeed, enabled]);

  return { displayed, done };
}
