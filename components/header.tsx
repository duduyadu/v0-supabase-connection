"use client";

import { useState } from "react";
import { Menu, X, Facebook, Instagram, Youtube } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = {
  vi: [
    { label: "Lo trinh du hoc", href: "/#roadmap" },
    { label: "Nhat ky du hoc", href: "/#gallery" },
    { label: "Tai sao chon chung toi", href: "/#why-us" },
    { label: "Lien he", href: "/#contact" },
  ],
  ko: [
    { label: "\uC720\uD559 \uB85C\uB4DC\uB9F5", href: "/#roadmap" },
    { label: "\uC720\uD559 \uC2A4\uD1A0\uB9AC", href: "/#gallery" },
    { label: "\uC65C Aju E&J\uC778\uAC00", href: "/#why-us" },
    { label: "\uBB38\uC758\uD558\uAE30", href: "/#contact" },
  ],
};

interface HeaderProps {
  lang: "vi" | "ko";
  onLangChange: (lang: "vi" | "ko") => void;
}

export function Header({ lang, onLangChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#f5f0e8]/80 backdrop-blur-md border-b border-[#2b3a67]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="/" className="flex items-center gap-2">
            <span className="font-serif text-xl md:text-2xl font-bold text-[#2b3a67] tracking-tight">
              {"Aju "}
              <span className="text-[#c4a265]">{"E&J"}</span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-10">
            {menuItems[lang].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-light text-[#3d2c2e]/70 hover:text-[#2b3a67] transition-colors duration-300 tracking-wide"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center border border-[#2b3a67]/15 overflow-hidden">
              <button
                onClick={() => onLangChange("vi")}
                className={cn(
                  "px-2.5 sm:px-3 py-1.5 text-xs font-medium transition-all duration-300",
                  lang === "vi" ? "bg-[#2b3a67] text-white" : "text-[#3d2c2e]/50 hover:bg-[#2b3a67]/5"
                )}
              >
                VI
              </button>
              <button
                onClick={() => onLangChange("ko")}
                className={cn(
                  "px-2.5 sm:px-3 py-1.5 text-xs font-medium transition-all duration-300",
                  lang === "ko" ? "bg-[#2b3a67] text-white" : "text-[#3d2c2e]/50 hover:bg-[#2b3a67]/5"
                )}
              >
                KO
              </button>
            </div>

            <div className="hidden md:flex items-center gap-1">
              <a href="#" className="p-2 text-[#3d2c2e]/30 hover:text-[#2b3a67] transition-colors duration-300" aria-label="Facebook"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="p-2 text-[#3d2c2e]/30 hover:text-[#2b3a67] transition-colors duration-300" aria-label="Instagram"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="p-2 text-[#3d2c2e]/30 hover:text-[#2b3a67] transition-colors duration-300" aria-label="YouTube"><Youtube className="w-4 h-4" /></a>
            </div>

            <button
              type="button"
              className="lg:hidden p-2 text-[#3d2c2e]/60 hover:text-[#2b3a67] transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-[#f5f0e8] border-t border-[#2b3a67]/10">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {menuItems[lang].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-3 text-sm font-light text-[#3d2c2e]/70 hover:text-[#2b3a67] transition-all tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="flex items-center justify-between px-4 py-3 border-t border-[#2b3a67]/10 mt-2">
              <div className="flex items-center gap-3">
                <a href="#" className="text-[#3d2c2e]/40 hover:text-[#2b3a67]"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="text-[#3d2c2e]/40 hover:text-[#2b3a67]"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="text-[#3d2c2e]/40 hover:text-[#2b3a67]"><Youtube className="w-5 h-5" /></a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
