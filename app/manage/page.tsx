"use client";

import React from "react";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ImageIcon,
  Youtube,
  Trash2,
  Upload,
  Loader2,
  Lock,
  LogOut,
  ArrowLeft,
  Camera,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

interface GalleryItem {
  id: string;
  type: "image" | "youtube";
  section: "youtube" | "gallery";
  src: string;
  alt: string;
  caption: string | null;
  span: string;
  created_at: string;
}

interface ReviewItem {
  id: string;
  title_ko: string;
  title_vi: string;
  excerpt_ko: string;
  excerpt_vi: string;
  image_url: string | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
}

const ADMIN_PASSWORD = "admin12345";

export default function ManagePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);

  const [allItems, setAllItems] = useState<GalleryItem[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // YouTube section states
  const [ytUrl, setYtUrl] = useState("");
  const [ytTitle, setYtTitle] = useState("");
  const [ytCaption, setYtCaption] = useState("");

  // Gallery section states
  const [galImageFile, setGalImageFile] = useState<File | null>(null);
  const [galImageAlt, setGalImageAlt] = useState("");
  const [galImageCaption, setGalImageCaption] = useState("");
  const [galImageSpan, setGalImageSpan] = useState("normal");
  const [galYtUrl, setGalYtUrl] = useState("");
  const [galYtTitle, setGalYtTitle] = useState("");
  const [galYtCaption, setGalYtCaption] = useState("");

  // Review states
  const [reviewTitleKo, setReviewTitleKo] = useState("");
  const [reviewTitleVi, setReviewTitleVi] = useState("");
  const [reviewExcerptKo, setReviewExcerptKo] = useState("");
  const [reviewExcerptVi, setReviewExcerptVi] = useState("");
  const [reviewImageFile, setReviewImageFile] = useState<File | null>(null);
  const [reviewUploading, setReviewUploading] = useState(false);

  const supabase = createClient();

  // Derived lists
  const youtubeItems = allItems.filter((i) => i.section === "youtube");
  const galleryItems = allItems.filter((i) => i.section === "gallery");

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth");
    if (auth === "true") setIsAuthenticated(true);
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
      setAuthError(null);
    } else {
      setAuthError("비밀번호가 올바르지 않습니다.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_auth");
  };

  const fetchItems = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("gallery_items")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setAllItems(data);
    setLoading(false);
  }, [supabase]);

  const fetchReviews = useCallback(async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("display_order", { ascending: true });
    if (!error && data) setReviews(data);
  }, [supabase]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchItems();
      fetchReviews();
    }
  }, [isAuthenticated, fetchItems, fetchReviews]);

  const extractYoutubeId = (url: string): string | null => {
    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
    );
    return match ? match[1] : null;
  };

  // ---- YouTube Section Handlers ----
  const handleYtAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const videoId = extractYoutubeId(ytUrl);
    if (!videoId) {
      alert("올바른 유튜브 URL을 입력해주세요.");
      return;
    }
    setUploading(true);
    try {
      const { error } = await supabase.from("gallery_items").insert({
        type: "youtube",
        section: "youtube",
        src: videoId,
        alt: ytTitle || "유튜브 영상",
        caption: ytCaption || null,
        span: "wide",
      });
      if (error) throw error;
      setYtUrl("");
      setYtTitle("");
      setYtCaption("");
      fetchItems();
    } catch (error) {
      console.error("YouTube add error:", error);
      alert("추가 중 오류가 발생했습니다.");
    }
    setUploading(false);
  };

  // ---- Gallery Section Handlers ----
  const handleGalImageUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galImageFile) return;
    setUploading(true);
    try {
      const fileExt = galImageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `gallery/${fileName}`;
      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(filePath, galImageFile);
      if (uploadError) throw uploadError;
      const {
        data: { publicUrl },
      } = supabase.storage.from("gallery").getPublicUrl(filePath);
      const { error: insertError } = await supabase
        .from("gallery_items")
        .insert({
          type: "image",
          section: "gallery",
          src: publicUrl,
          alt: galImageAlt || "갤러리 이미지",
          caption: galImageCaption || null,
          span: galImageSpan,
        });
      if (insertError) throw insertError;
      setGalImageFile(null);
      setGalImageAlt("");
      setGalImageCaption("");
      setGalImageSpan("normal");
      fetchItems();
    } catch (error) {
      console.error("Upload error:", error);
      alert("업로드 중 오류가 발생했습니다.");
    }
    setUploading(false);
  };

  const handleGalYtAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const videoId = extractYoutubeId(galYtUrl);
    if (!videoId) {
      alert("올바른 유튜브 URL을 입력해주세요.");
      return;
    }
    setUploading(true);
    try {
      const { error } = await supabase.from("gallery_items").insert({
        type: "youtube",
        section: "gallery",
        src: videoId,
        alt: galYtTitle || "갤러리 영상",
        caption: galYtCaption || null,
        span: "wide",
      });
      if (error) throw error;
      setGalYtUrl("");
      setGalYtTitle("");
      setGalYtCaption("");
      fetchItems();
    } catch (error) {
      console.error("Gallery YouTube add error:", error);
      alert("추가 중 오류가 발생했습니다.");
    }
    setUploading(false);
  };

  // ---- Delete Handler ----
  const handleDelete = async (item: GalleryItem) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    try {
      if (item.type === "image" && item.src.includes("supabase")) {
        const path = item.src.split("/gallery/")[1];
        if (path) {
          await supabase.storage.from("gallery").remove([`gallery/${path}`]);
        }
      }
      const { error } = await supabase
        .from("gallery_items")
        .delete()
        .eq("id", item.id);
      if (error) throw error;
      fetchItems();
    } catch (error) {
      console.error("Delete error:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  // ---- Review Handlers ----
  const handleReviewUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewTitleKo) return;
    setReviewUploading(true);
    try {
      let imageUrl = null;
      if (reviewImageFile) {
        const fileExt = reviewImageFile.name.split(".").pop();
        const fileName = `review_${Date.now()}.${fileExt}`;
        const filePath = `reviews/${fileName}`;
        const { error: uploadError } = await supabase.storage
          .from("gallery")
          .upload(filePath, reviewImageFile);
        if (uploadError) throw uploadError;
        const {
          data: { publicUrl },
        } = supabase.storage.from("gallery").getPublicUrl(filePath);
        imageUrl = publicUrl;
      }
      const maxOrder =
        reviews.length > 0
          ? Math.max(...reviews.map((r) => r.display_order))
          : 0;
      const { error: insertError } = await supabase.from("reviews").insert({
        title_ko: reviewTitleKo,
        title_vi: reviewTitleVi || reviewTitleKo,
        excerpt_ko: reviewExcerptKo,
        excerpt_vi: reviewExcerptVi || reviewExcerptKo,
        image_url: imageUrl,
        display_order: maxOrder + 1,
        is_published: true,
      });
      if (insertError) throw insertError;
      setReviewTitleKo("");
      setReviewTitleVi("");
      setReviewExcerptKo("");
      setReviewExcerptVi("");
      setReviewImageFile(null);
      fetchReviews();
    } catch (error) {
      console.error("Review upload error:", error);
      alert("후기 등록 중 오류가 발생했습니다.");
    }
    setReviewUploading(false);
  };

  const handleReviewDelete = async (review: ReviewItem) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    try {
      if (review.image_url && review.image_url.includes("supabase")) {
        const path = review.image_url.split("/gallery/")[1];
        if (path) {
          await supabase.storage.from("gallery").remove([`gallery/${path}`]);
        }
      }
      const { error } = await supabase
        .from("reviews")
        .delete()
        .eq("id", review.id);
      if (error) throw error;
      fetchReviews();
    } catch (error) {
      console.error("Review delete error:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const toggleReviewPublish = async (review: ReviewItem) => {
    try {
      const { error } = await supabase
        .from("reviews")
        .update({ is_published: !review.is_published })
        .eq("id", review.id);
      if (error) throw error;
      fetchReviews();
    } catch (error) {
      console.error("Toggle publish error:", error);
    }
  };

  // ---- Item Card Component ----
  const ItemCard = ({ item }: { item: GalleryItem }) => (
    <div className="relative group bg-muted rounded-lg overflow-hidden aspect-square">
      {item.type === "image" ? (
        <img
          src={item.src || "/placeholder.svg"}
          alt={item.alt}
          className="w-full h-full object-cover"
        />
      ) : (
        <img
          src={`https://img.youtube.com/vi/${item.src}/hqdefault.jpg`}
          alt={item.alt}
          className="w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
        <span className="text-white text-xs text-center line-clamp-2">
          {item.alt}
        </span>
        <span className="text-white/60 text-xs">
          {item.type === "youtube" ? "유튜브" : "이미지"}
        </span>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => handleDelete(item)}
        >
          <Trash2 className="w-4 h-4 mr-1" />
          삭제
        </Button>
      </div>
    </div>
  );

  // ---- Login Form ----
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-navy/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-navy" />
            </div>
            <CardTitle className="text-2xl">관리자 로그인</CardTitle>
            <p className="text-muted-foreground mt-2">
              관리자 비밀번호를 입력해주세요
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuth} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="관리자 비밀번호"
                  required
                />
              </div>
              {authError && (
                <p className="text-sm text-red-500">{authError}</p>
              )}
              <Button type="submit" className="w-full bg-navy hover:bg-navy/90">
                로그인
              </Button>
              <div className="text-center">
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  홈으로 돌아가기
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ---- Admin Dashboard ----
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                홈으로
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-foreground">콘텐츠 관리</h1>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            로그아웃
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="youtube" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-3">
            <TabsTrigger value="youtube">
              <Youtube className="w-4 h-4 mr-2" />
              유튜브 ({youtubeItems.length})
            </TabsTrigger>
            <TabsTrigger value="gallery">
              <Camera className="w-4 h-4 mr-2" />
              갤러리 ({galleryItems.length})
            </TabsTrigger>
            <TabsTrigger value="reviews">
              <MessageSquare className="w-4 h-4 mr-2" />
              유학후기 ({reviews.length})
            </TabsTrigger>
          </TabsList>

          {/* ===== Tab 1: 유튜브 관리 ===== */}
          <TabsContent value="youtube" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Youtube className="w-5 h-5" />
                  Aju E&J 유튜브 영상 추가
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  메인 페이지 상단 유튜브 섹션에 표시됩니다.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleYtAdd} className="space-y-4">
                  <div className="space-y-2">
                    <Label>유튜브 URL *</Label>
                    <Input
                      value={ytUrl}
                      onChange={(e) => setYtUrl(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=..."
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>영상 제목</Label>
                    <Input
                      value={ytTitle}
                      onChange={(e) => setYtTitle(e.target.value)}
                      placeholder="영상 제목을 입력하세요"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>설명 (선택)</Label>
                    <Textarea
                      value={ytCaption}
                      onChange={(e) => setYtCaption(e.target.value)}
                      placeholder="영상 설명"
                      rows={2}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={uploading || !ytUrl}
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        추가 중...
                      </>
                    ) : (
                      <>
                        <Youtube className="w-4 h-4 mr-2" />
                        유튜브 영상 추가
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  등록된 유튜브 영상 ({youtubeItems.length}개)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                  </div>
                ) : youtubeItems.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Youtube className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>아직 등록된 영상이 없습니다.</p>
                    <p className="text-xs mt-1">
                      영상을 추가하면 메인 페이지에 표시됩니다.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {youtubeItems.map((item) => (
                      <ItemCard key={item.id} item={item} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ===== Tab 2: 갤러리 관리 ===== */}
          <TabsContent value="gallery" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Image Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5" />
                    사진 업로드
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    선배들의 생활 갤러리에 표시됩니다.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleGalImageUpload} className="space-y-4">
                    <div className="space-y-2">
                      <Label>이미지 선택 *</Label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setGalImageFile(e.target.files?.[0] || null)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>설명</Label>
                      <Input
                        value={galImageAlt}
                        onChange={(e) => setGalImageAlt(e.target.value)}
                        placeholder="이미지 설명"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>캡션 (선택)</Label>
                      <Textarea
                        value={galImageCaption}
                        onChange={(e) => setGalImageCaption(e.target.value)}
                        placeholder="캡션"
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>크기</Label>
                      <Select
                        value={galImageSpan}
                        onValueChange={setGalImageSpan}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">기본 (1x1)</SelectItem>
                          <SelectItem value="wide">가로 넓게 (2x1)</SelectItem>
                          <SelectItem value="tall">세로 길게 (1x2)</SelectItem>
                          <SelectItem value="large">크게 (2x2)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={uploading || !galImageFile}
                    >
                      {uploading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          업로드 중...
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 mr-2" />
                          사진 업로드
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Gallery YouTube Add */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Youtube className="w-5 h-5" />
                    갤러리 영상 추가
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    선배들의 생활 갤러리에 영상도 추가할 수 있습니다.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleGalYtAdd} className="space-y-4">
                    <div className="space-y-2">
                      <Label>유튜브 URL *</Label>
                      <Input
                        value={galYtUrl}
                        onChange={(e) => setGalYtUrl(e.target.value)}
                        placeholder="https://www.youtube.com/watch?v=..."
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>영상 제목</Label>
                      <Input
                        value={galYtTitle}
                        onChange={(e) => setGalYtTitle(e.target.value)}
                        placeholder="영상 제목"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>설명 (선택)</Label>
                      <Textarea
                        value={galYtCaption}
                        onChange={(e) => setGalYtCaption(e.target.value)}
                        placeholder="영상 설명"
                        rows={2}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={uploading || !galYtUrl}
                    >
                      {uploading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          추가 중...
                        </>
                      ) : (
                        <>
                          <Youtube className="w-4 h-4 mr-2" />
                          갤러리 영상 추가
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>
                  갤러리 아이템 ({galleryItems.length}개)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                  </div>
                ) : galleryItems.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Camera className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>아직 갤러리 아이템이 없습니다.</p>
                    <p className="text-xs mt-1">
                      사진이나 영상을 추가하면 메인 페이지에 표시됩니다.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {galleryItems.map((item) => (
                      <ItemCard key={item.id} item={item} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ===== Tab 3: 유학후기 관리 ===== */}
          <TabsContent value="reviews" className="space-y-6">
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              유학후기는 현재 메인 페이지에서 숨김 상태입니다. 여기서 미리 등록해두면 나중에 공개할 때 바로 표시됩니다.
            </div>

            <Card>
              <CardHeader>
                <CardTitle>유학후기 등록</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleReviewUpload} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>제목 (한국어) *</Label>
                      <Input
                        value={reviewTitleKo}
                        onChange={(e) => setReviewTitleKo(e.target.value)}
                        placeholder="한국어 제목"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>제목 (베트남어)</Label>
                      <Input
                        value={reviewTitleVi}
                        onChange={(e) => setReviewTitleVi(e.target.value)}
                        placeholder="Tieu de tieng Viet (선택)"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>요약 (한국어)</Label>
                      <Textarea
                        value={reviewExcerptKo}
                        onChange={(e) => setReviewExcerptKo(e.target.value)}
                        placeholder="한국어 요약"
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>요약 (베트남어)</Label>
                      <Textarea
                        value={reviewExcerptVi}
                        onChange={(e) => setReviewExcerptVi(e.target.value)}
                        placeholder="Tom tat tieng Viet (선택)"
                        rows={3}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>대표 이미지</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setReviewImageFile(e.target.files?.[0] || null)
                      }
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={reviewUploading || !reviewTitleKo}
                  >
                    {reviewUploading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        등록 중...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        후기 등록
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>등록된 유학후기 ({reviews.length}개)</CardTitle>
              </CardHeader>
              <CardContent>
                {reviews.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>아직 등록된 후기가 없습니다.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div
                        key={review.id}
                        className="flex items-center gap-4 p-4 border border-border rounded-lg"
                      >
                        {review.image_url ? (
                          <img
                            src={review.image_url || "/placeholder.svg"}
                            alt={review.title_ko}
                            className="w-20 h-16 object-cover rounded-lg flex-shrink-0"
                          />
                        ) : (
                          <div className="w-20 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                            <ImageIcon className="w-6 h-6 text-muted-foreground" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {review.title_ko}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {review.excerpt_ko}
                          </p>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${
                              review.is_published
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {review.is_published ? "공개" : "비공개"}
                          </span>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleReviewPublish(review)}
                          >
                            {review.is_published ? "숨기기" : "공개"}
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleReviewDelete(review)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
