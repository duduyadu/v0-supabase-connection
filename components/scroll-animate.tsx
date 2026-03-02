"use client";

import type { ReactNode } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

interface ScrollAnimateProps {
  children: ReactNode;
  direction?: "up" | "left" | "right" | "none";
  delay?: number;
  className?: string;
}

export function ScrollAnimate({ children, direction = "up", delay = 0, className = "" }: ScrollAnimateProps) {
  const { ref, isVisible } = useScrollAnimation();

  const getTransform = () => {
    if (isVisible) return "translate3d(0, 0, 0)";
    switch (direction) {
      case "up": return "translate3d(0, 20px, 0)";
      case "left": return "translate3d(-20px, 0, 0)";
      case "right": return "translate3d(20px, 0, 0)";
      case "none": return "translate3d(0, 0, 0)";
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity 1s ease-out ${delay}ms, transform 1s ease-out ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
