"use client";

import { MessageCircle } from "lucide-react";

interface ZaloButtonProps {
  lang: "vi" | "ko";
}

export function ZaloButton({ lang }: ZaloButtonProps) {
  return (
    <a
      href="https://zalo.me/your-zalo-id"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label={lang === "vi" ? "Chat qua Zalo" : "Zalo \uBB38\uC758"}
    >
      <div className="absolute inset-0 bg-[#0068FF] rounded-full animate-ping opacity-15" />
      <div className="relative w-14 h-14 bg-[#0068FF] rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-500">
        <MessageCircle className="w-6 h-6 text-white" />
      </div>
      <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-[#2b3a67] text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-light">
        {lang === "vi" ? "Chat voi chung toi" : "\uCC44\uD305 \uBB38\uC758"}
        <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-[#2b3a67]" />
      </div>
    </a>
  );
}
