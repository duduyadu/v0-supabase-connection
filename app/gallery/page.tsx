"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Play, Heart, X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";

interface GalleryItem {
  id: string;
  type: "image" | "youtube";
  src: string;
  youtube_id: string | null;
  alt: string;
  caption: string | null;
  span: string;
  display_order: number;
}

const spanClasses: Record<string, string> = {
  normal: "col-span-1 row-span-1",
  wide: "col-span-2 row-span-1",
  tall: "col-span-1 row-span-2",
  large: "col-span-2 row-span-2",
};

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase
        .from("gallery_items")
        .select("*")
        .eq("section", "gallery")
        .order("display_order", { ascending: true });

      if (error) {
        console.error("Error fetching gallery items:", error);
        setLoading(false);
        return;
      }

      setItems(data || []);
      setLoading(false);
    };

    fetchItems();
  }, [supabase]);

  const openModal = (index: number) => {
    setSelectedIndex(index);
    setIsVideoPlaying(false);
  };

  const closeModal = () => {
    setSelectedIndex(null);
    setIsVideoPlaying(false);
  };

  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? items.length - 1 : selectedIndex - 1);
      setIsVideoPlaying(false);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === items.length - 1 ? 0 : selectedIndex + 1);
      setIsVideoPlaying(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, items.length]);

  const selectedItem = selectedIndex !== null ? items[selectedIndex] : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-navy" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-cream border-b border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-navy">
              Aju E&J
            </Link>
            <Link
              href="/"
              className="text-espresso/70 hover:text-espresso transition-colors"
            >
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-espresso mb-4">
            선배들의 유학 스토리
          </h1>
          <p className="text-lg text-espresso/60 max-w-2xl mx-auto">
            한국 유학 생활의 생생한 모습을 확인하세요
          </p>
          <p className="text-sm text-espresso/40 mt-2">
            총 {items.length}개의 스토리
          </p>
        </div>

        {/* Empty State */}
        {items.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-espresso/60 text-lg">아직 등록된 스토리가 없습니다.</p>
            <p className="text-espresso/40 text-sm mt-2">관리자 페이지에서 사진과 영상을 추가해주세요.</p>
          </div>
        ) : (
          /* Bento Grid Gallery */
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[180px] md:auto-rows-[200px]">
            {items.map((item, index) => (
              <div
                key={item.id}
                onClick={() => openModal(index)}
                className={`group relative overflow-hidden rounded-2xl bg-ivory border border-gold/20 cursor-pointer ${spanClasses[item.span] || spanClasses.normal}`}
              >
                {item.type === "youtube" && (item.youtube_id || item.src) ? (
                  <img
                    src={`https://img.youtube.com/vi/${item.youtube_id || item.src}/maxresdefault.jpg`}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <img
                    src={item.src || "/placeholder.svg"}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(to top, rgba(60,50,40,0.7) 0%, transparent 50%, transparent 100%)' }} />

                {/* Video Play Icon */}
                {item.type === "youtube" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-ivory/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-navy ml-0.5" />
                    </div>
                  </div>
                )}

                {/* Caption */}
                {item.caption && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-ivory text-sm font-medium">{item.caption}</p>
                  </div>
                )}

                {/* Like Icon */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Heart className="w-5 h-5 text-ivory drop-shadow-lg" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-espresso/90 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-50 w-12 h-12 rounded-full bg-ivory/10 hover:bg-ivory/20 flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6 text-ivory" />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-ivory/10 hover:bg-ivory/20 flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-ivory" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-ivory/10 hover:bg-ivory/20 flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-ivory" />
          </button>

          {/* Content */}
          <div
            className="max-w-5xl max-h-[85vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedItem.type === "youtube" && (selectedItem.youtube_id || selectedItem.src) ? (
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black">
                {isVideoPlaying ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedItem.youtube_id || selectedItem.src}?autoplay=1`}
                    title={selectedItem.alt}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <img
                      src={`https://img.youtube.com/vi/${selectedItem.youtube_id || selectedItem.src}/maxresdefault.jpg`}
                      alt={selectedItem.alt}
                      className="w-full h-full object-contain"
                    />
                    <button
                      onClick={() => setIsVideoPlaying(true)}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="w-20 h-20 rounded-full bg-ivory/90 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-navy ml-1" />
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <img
                src={selectedItem.src || "/placeholder.svg"}
                alt={selectedItem.alt}
                className="w-full max-h-[85vh] object-contain rounded-2xl"
              />
            )}

            {/* Caption below image */}
            {selectedItem.caption && (
              <div className="text-center mt-4">
                <p className="text-ivory text-lg">{selectedItem.caption}</p>
                <p className="text-ivory/50 text-sm mt-1">
                  {selectedIndex !== null && `${selectedIndex + 1} / ${items.length}`}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
