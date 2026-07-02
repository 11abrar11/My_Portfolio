"use client";

import { useState, useEffect, useCallback } from "react";

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

export function useMouseParallax(intensity: number = 1) {
  const [mouse, setMouse] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const normalizedX = (e.clientX / window.innerWidth - 0.5) * 2 * intensity;
      const normalizedY = (e.clientY / window.innerHeight - 0.5) * 2 * intensity;

      setMouse({
        x: e.clientX,
        y: e.clientY,
        normalizedX,
        normalizedY,
      });
    },
    [intensity]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return mouse;
}
