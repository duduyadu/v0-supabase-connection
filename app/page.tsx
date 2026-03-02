"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { RoadmapSection } from "@/components/roadmap-section";
import { GallerySection } from "@/components/gallery-section";
import { WhyUsSection } from "@/components/why-us-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { ZaloButton } from "@/components/zalo-button";

export default function Home() {
  const [lang, setLang] = useState<"vi" | "ko">("vi");

  return (
    <div className="min-h-screen bg-[#f5f0e8] relative">
      {/* Paper Texture Overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: -10,
          opacity: 0.08,
          mixBlendMode: "multiply",
          background: `
            repeating-radial-gradient(circle at 17% 32%, rgba(120, 100, 80, 0.7) 0px, transparent 1px),
            repeating-radial-gradient(circle at 83% 67%, rgba(100, 80, 60, 0.6) 0px, transparent 1px),
            repeating-radial-gradient(circle at 52% 14%, rgba(90, 70, 50, 0.65) 0px, transparent 1px),
            repeating-radial-gradient(circle at 29% 78%, rgba(110, 90, 70, 0.55) 0px, transparent 1px),
            repeating-radial-gradient(circle at 68% 41%, rgba(100, 80, 60, 0.6) 0px, transparent 1px)
          `,
          backgroundSize: "2px 2px, 3px 3px, 4px 4px, 3px 3px, 5px 5px",
        }}
      />

      <Header lang={lang} onLangChange={setLang} />

      <main>
        <HeroSection lang={lang} />
        <RoadmapSection lang={lang} />
        <GallerySection lang={lang} />
        <WhyUsSection lang={lang} />
        <ContactSection lang={lang} />
      </main>

      <Footer lang={lang} />
      <ZaloButton lang={lang} />
    </div>
  );
}
