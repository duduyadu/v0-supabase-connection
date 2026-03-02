"use client";

import React from "react";
import { useEffect, useState, useRef } from "react";
import { Play, ChevronLeft, ChevronRight, X, ArrowRight } from "lucide-react";
import { ScrollAnimate } from "@/components/scroll-animate";
import { GrayscaleImage } from "@/components/grayscale-image";

const content = {
  vi: {
    youtubeTitle: "Aju E&J YouTube",
    youtubeSubtitle: "Xem video thuc te ve cuoc song du hoc tai Han Quoc",
    galleryTitle: "Cuoc song cua cac anh chi",
    gallerySubtitle: "Hinh anh va video thuc te ve cuoc song du hoc sinh tai Han Quoc",
    viewMore: "Xem them",
    views: "Luot xem",
    emptyYoutube: "Chua co video nao.",
    emptyGallery: "Chua co hinh anh nao.",
  },
  ko: {
    youtubeTitle: "Aju E&J \uC720\uD29C\uBE0C",
    youtubeSubtitle: "\uD55C\uAD6D \uC720\uD559 \uC0DD\uD65C\uC758 \uC0DD\uC0DD\uD55C \uC601\uC0C1\uC744 \uD655\uC778\uD558\uC138\uC694",
    galleryTitle: "\uC120\uBC30\uB4E4\uC758 \uC0DD\uD65C",
    gallerySubtitle: "\uD55C\uAD6D\uC5D0\uC11C\uC758 \uC720\uD559 \uC0DD\uD65C\uC744 \uC0AC\uC9C4\uACFC \uC601\uC0C1\uC73C\uB85C \uB9CC\uB098\uBCF4\uC138\uC694",
    viewMore: "\uB354\uBCF4\uAE30",
    views: "\uC870\uD68C\uC218",
    emptyYoutube: "\uC544\uC9C1 \uB4F1\uB85D\uB41C \uC601\uC0C1\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.",
    emptyGallery: "\uC544\uC9C1 \uB4F1\uB85D\uB41C \uCF58\uD150\uCE20\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",
  },
};

const placeholderYoutubeVideos = [
  { id: "1", youtube_id: "dQw4w9WgXcQ", title_ko: "\uD55C\uAD6D \uC720\uD559 \uC0DD\uD65C \uBE0C\uC774\uB85C\uADF8 | \uC11C\uC6B8\uC5D0\uC11C\uC758 \uCCAB \uD55C \uB2EC", title_vi: "Vlog du hoc Han Quoc | Thang dau tien o Seoul", views: 1453, date: "2026/01/25" },
  { id: "2", youtube_id: "dQw4w9WgXcQ", title_ko: "\uD55C\uAD6D\uC5B4 \uC218\uC5C5 \uD558\uB8E8 \uC77C\uACFC | \uC5B4\uD559\uB2F9 \uC0DD\uD65C", title_vi: "Mot ngay hoc tieng Han | Cuoc song o truong ngon ngu", views: 706, date: "2026/01/24" },
  { id: "3", youtube_id: "dQw4w9WgXcQ", title_ko: "\uD55C\uAD6D \uB300\uD559 \uAE30\uC219\uC0AC \uD22C\uC5B4 | \uC2DC\uC124 \uC18C\uAC1C", title_vi: "Tour ky tuc xa dai hoc Han Quoc | Gioi thieu co so vat chat", views: 515, date: "2026/01/23" },
  { id: "4", youtube_id: "dQw4w9WgXcQ", title_ko: "\uD55C\uAD6D \uC720\uD559 \uBE44\uC6A9 \uCD1D\uC815\uB9AC | \uD604\uC2E4\uC801\uC778 \uBE44\uC6A9 \uC548\uB0B4", title_vi: "Tong chi phi du hoc Han Quoc | Huong dan chi phi thuc te", views: 94, date: "2026/01/22" },
  { id: "5", youtube_id: "dQw4w9WgXcQ", title_ko: "\uBCA0\uD2B8\uB0A8 \uC720\uD559\uC0DD\uC758 \uD55C\uAD6D \uC801\uC751\uAE30", title_vi: "Hanh trinh thich nghi tai Han Quoc cua du hoc sinh Viet Nam", views: 208, date: "2026/01/19" },
];

interface GallerySectionProps {
  lang: "vi" | "ko";
}

function ScrollableRow({ children, emptyMessage, isEmpty }: { children: React.ReactNode; emptyMessage: string; isEmpty: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", checkScroll);
    return () => { if (el) el.removeEventListener("scroll", checkScroll); };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.7;
    scrollRef.current.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  if (isEmpty) {
    return <div className="flex justify-center items-center h-48 text-[#3d2c2e]/40">{emptyMessage}</div>;
  }

  return (
    <div className="relative group">
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 border border-[#2b3a67]/15 bg-[#f5f0e8]/90 backdrop-blur-sm flex items-center justify-center hover:bg-[#2b3a67] hover:text-white hover:border-[#2b3a67] transition-all duration-300 opacity-0 group-hover:opacity-100"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {children}
      </div>

      {canScrollRight && (
        <button
          type="button"
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 border border-[#2b3a67]/15 bg-[#f5f0e8]/90 backdrop-blur-sm flex items-center justify-center hover:bg-[#2b3a67] hover:text-white hover:border-[#2b3a67] transition-all duration-300 opacity-0 group-hover:opacity-100"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export function GallerySection({ lang }: GallerySectionProps) {
  const t = content[lang];
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Supabase disabled for now - using placeholder data
  const youtubeItems: any[] = [];
  const galleryItems: any[] = [];

  return (
    <section id="gallery" className="py-32 lg:py-40 bg-[#f5f0e8] relative">
      <div className="absolute left-0 right-0 top-0 h-px bg-[#2b3a67]/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* YouTube Section */}
        <div className="mb-24">
          <ScrollAnimate>
            <div className="mb-12 border-b border-[#2b3a67]/20 pb-8">
              <span className="text-[#c4a265] text-sm tracking-widest uppercase mb-4 block">YouTube</span>
              <h2 className="font-serif text-4xl md:text-5xl text-[#2b3a67] tracking-tight mb-3">{t.youtubeTitle}</h2>
              <p className="text-[#3d2c2e]/60 font-light text-lg">{t.youtubeSubtitle}</p>
            </div>
          </ScrollAnimate>

          <ScrollableRow emptyMessage={t.emptyYoutube} isEmpty={false}>
              {(youtubeItems.length > 0 ? youtubeItems : placeholderYoutubeVideos).map((video: any) => {
                const videoId = video.youtube_id || video.src;
                const thumbnail = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
                const title = lang === "ko" ? (video.title_ko || video.alt || video.caption) : (video.title_vi || video.alt || video.caption);
                return (
                  <button
                    type="button"
                    key={video.id}
                    onClick={() => setSelectedVideo(videoId)}
                    className="flex-shrink-0 w-[280px] text-left group cursor-pointer"
                  >
                    <div className="relative overflow-hidden mb-4 aspect-video bg-[#ebe5dc]">
                      <GrayscaleImage
                        src={thumbnail || "/placeholder.svg"}
                        alt={title || "YouTube video"}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 border border-white/40 flex items-center justify-center group-hover:bg-white/20 transition-all duration-500">
                          <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                        </div>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-[#2b3a67] line-clamp-2 leading-snug mb-1.5 group-hover:text-[#c4a265] transition-colors duration-300">
                      {title}
                    </p>
                    <p className="text-xs text-[#3d2c2e]/40">
                      {t.views} {video.views?.toLocaleString() || "0"} · {video.date || ""}
                    </p>
                  </button>
                );
              })}
            </ScrollableRow>
        </div>

        {/* Gallery Section */}
        <div>
          <ScrollAnimate>
            <div className="mb-12 border-b border-[#2b3a67]/20 pb-8 flex flex-col md:flex-row md:items-end justify-between">
              <div>
                <span className="text-[#c4a265] text-sm tracking-widest uppercase mb-4 block">Gallery</span>
                <h2 className="font-serif text-4xl md:text-5xl text-[#2b3a67] tracking-tight mb-3">{t.galleryTitle}</h2>
                <p className="text-[#3d2c2e]/60 font-light text-lg">{t.gallerySubtitle}</p>
              </div>
              <a
                href="/gallery"
                className="inline-flex items-center gap-2 mt-6 md:mt-0 text-sm font-light text-[#3d2c2e]/50 hover:text-[#2b3a67] transition-colors duration-300 tracking-wide border-b border-[#3d2c2e]/20 hover:border-[#2b3a67] pb-1"
              >
                {t.viewMore} <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </ScrollAnimate>

          {galleryItems.length === 0 ? (
            <div className="flex justify-center items-center h-48 text-[#3d2c2e]/40">
              {t.emptyGallery}
            </div>
          ) : (
            <ScrollableRow emptyMessage={t.emptyGallery} isEmpty={galleryItems.length === 0}>
              {galleryItems.map((item: any) => {
                if (item.type === "youtube") {
                  const videoId = item.src;
                  const thumbnail = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setSelectedVideo(videoId)}
                      className="flex-shrink-0 w-[280px] text-left group cursor-pointer"
                    >
                      <div className="relative overflow-hidden mb-4 aspect-video bg-[#ebe5dc]">
                        <GrayscaleImage
                          src={thumbnail}
                          alt={item.alt}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 border border-white/40 flex items-center justify-center group-hover:bg-white/20 transition-all duration-500">
                            <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                          </div>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-[#2b3a67] line-clamp-2 leading-snug group-hover:text-[#c4a265] transition-colors duration-300">
                        {item.alt}
                      </p>
                    </button>
                  );
                }
                return (
                  <div key={item.id} className="flex-shrink-0 w-[280px] group cursor-pointer">
                    <div className="overflow-hidden mb-4 aspect-[4/3] bg-[#ebe5dc]">
                      <GrayscaleImage
                        src={item.src}
                        alt={item.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm font-medium text-[#2b3a67] line-clamp-2 leading-snug">{item.alt}</p>
                    {item.caption && <p className="text-xs text-[#3d2c2e]/40 mt-1 line-clamp-2">{item.caption}</p>}
                  </div>
                );
              })}
            </ScrollableRow>
          )}
        </div>
      </div>

      {/* YouTube Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedVideo(null)}>
          <button type="button" onClick={() => setSelectedVideo(null)} className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors">
            <X className="w-7 h-7" />
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
              className="w-full aspect-video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube video"
            />
          </div>
        </div>
      )}
    </section>
  );
}
