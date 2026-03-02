"use client";

import { useEffect, useRef, useState } from "react";

const content = {
  vi: {
    title: "Tr\u01B0\u1EDDng \u0111\u1EA1i h\u1ECDc \u0111\u1ED1i t\u00E1c",
    subtitle: "H\u1EE3p t\u00E1c v\u1EDBi c\u00E1c tr\u01B0\u1EDDng \u0111\u1EA1i h\u1ECDc h\u00E0ng \u0111\u1EA7u H\u00E0n Qu\u1ED1c",
  },
  ko: {
    title: "\uD568\uAED8\uD558\uB294 \uD30C\uD2B8\uB108 \uB300\uD559\uAD50",
    subtitle: "\uD55C\uAD6D \uC8FC\uC694 \uB300\uD559\uAD50\uC640\uC758 \uD611\uB825 \uB124\uD2B8\uC6CC\uD06C",
  },
};

const universities = [
  { name: "\uC11C\uC6B8\uB300\uD559\uAD50", nameVi: "\u0110\u1EA1i h\u1ECDc Qu\u1ED1c gia Seoul" },
  { name: "\uC5F0\uC138\uB300\uD559\uAD50", nameVi: "\u0110\u1EA1i h\u1ECDc Yonsei" },
  { name: "\uACE0\uB824\uB300\uD559\uAD50", nameVi: "\u0110\u1EA1i h\u1ECDc Korea" },
  { name: "\uC131\uADE0\uAD00\uB300\uD559\uAD50", nameVi: "\u0110\u1EA1i h\u1ECDc Sungkyunkwan" },
  { name: "\uD55C\uC591\uB300\uD559\uAD50", nameVi: "\u0110\u1EA1i h\u1ECDc Hanyang" },
  { name: "\uACBD\uD76C\uB300\uD559\uAD50", nameVi: "\u0110\u1EA1i h\u1ECDc Kyung Hee" },
];

interface PartnersSectionProps {
  lang: "vi" | "ko";
}

export function PartnersSection({ lang }: PartnersSectionProps) {
  const t = content[lang];
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;

    const scroll = () => {
      if (!isPaused && scrollContainer) {
        scrollPosition += 0.5;
        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
          scrollPosition = 0;
        }
        scrollContainer.scrollLeft = scrollPosition;
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  return (
    <section className="py-12 bg-muted/50 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">{t.subtitle}</p>
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground">{t.title}</h2>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-8 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {[...universities, ...universities].map((uni, index) => (
            <div key={index} className="flex-shrink-0 group cursor-pointer">
              <div className="w-48 h-24 flex items-center justify-center bg-card rounded-xl border border-border px-6 py-4 transition-all duration-300 grayscale hover:grayscale-0 hover:shadow-lg hover:border-gold/50 hover:scale-105">
                <div className="text-center">
                  <div className="font-semibold text-foreground/60 group-hover:text-navy transition-colors">
                    {lang === "ko" ? uni.name : uni.nameVi}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {lang === "ko" ? "\uD30C\uD2B8\uB108 \uB300\uD559" : "\u0110\u1ED1i t\u00E1c"}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
