"use client";

import { useEffect, useRef, useState } from "react";

interface GrayscaleImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function GrayscaleImage({ src, alt, className = "" }: GrayscaleImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;

    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (!isTouchDevice) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        rootMargin: "-30% 0px -30% 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      src={src || "/placeholder.svg"}
      alt={alt}
      className={`${className} grayscale hover:grayscale-0 transition-all duration-700 ${isInView ? "!grayscale-0" : ""}`}
    />
  );
}
