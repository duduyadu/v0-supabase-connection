"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Eye, Compass, Heart, Users, Medal, ArrowRight, Quote as Quotes, Flag, Handshake, Building, Trophy } from "lucide-react";
import Link from "next/link";

const content = {
  vi: {
    pageTitle: "Giới thiệu công ty",
    pageSubtitle: "Cầu nối an toàn từ Việt Nam đến Hàn Quốc",
    
    // Vision & Mission
    visionTitle: "Tầm nhìn & Sứ mệnh",
    vision: {
      title: "Tầm nhìn",
      description: "Trở thành cầu nối đáng tin cậy nhất giữa sinh viên Việt Nam và cơ hội giáo dục, việc làm tại Hàn Quốc.",
      highlight: "Cầu nối tin cậy nhất"
    },
    mission: {
      title: "Sứ mệnh", 
      description: "Đồng hành cùng sinh viên Việt Nam trong hành trình du học và lập nghiệp tại Hàn Quốc, mang đến dịch vụ tư vấn chuyên nghiệp và hỗ trợ toàn diện.",
      highlight: "Đồng hành toàn diện"
    },
    values: [
      { icon: Heart, title: "Tận tâm", desc: "Luôn đặt lợi ích học sinh lên hàng đầu", stat: "100%" },
      { icon: Medal, title: "Chuyên nghiệp", desc: "Đội ngũ giàu kinh nghiệm và chuyên môn", stat: "5+" },
      { icon: Users, title: "Đồng hành", desc: "Hỗ trợ 24/7 từ Việt Nam đến Hàn Quốc", stat: "24/7" },
    ],
    
    // CEO
    ceoTitle: "Lời chào từ Giám đốc",
    ceoName: "Tên Giám đốc",
    ceoRole: "Giám đốc điều hành / Nhà sáng lập",
    ceoMessage: `Xin chào các bạn sinh viên và phụ huynh,

Với hơn 5 năm kinh nghiệm trong lĩnh vực tư vấn du học Hàn Quốc, tôi hiểu rằng quyết định du học là một bước ngoặt quan trọng trong cuộc đời mỗi người.

Aju E&J được thành lập với sứ mệnh trở thành người bạn đồng hành đáng tin cậy, giúp các bạn sinh viên Việt Nam thực hiện ước mơ học tập và làm việc tại Hàn Quốc một cách an toàn và hiệu quả.

Chúng tôi cam kết mang đến dịch vụ tư vấn chuyên nghiệp, minh bạch và luôn đặt lợi ích của học sinh lên hàng đầu.`,
    
    // Team
    teamTitle: "Đội ngũ của chúng tôi",
    teamSubtitle: "Những chuyên gia tận tâm đồng hành cùng bạn",
    
    ctaTitle: "Bắt đầu hành trình của bạn",
    ctaButton: "Liên hệ tư vấn",
  },
  ko: {
    pageTitle: "회사소개",
    pageSubtitle: "베트남에서 한국까지 안전한 다리",
    
    // Vision & Mission
    visionTitle: "비전 & 미션",
    vision: {
      title: "비전",
      description: "베트남 학생들과 한국의 교육 및 취업 기회를 연결하는 가장 신뢰할 수 있는 다리가 됩니다.",
      highlight: "가장 신뢰할 수 있는 다리"
    },
    mission: {
      title: "미션",
      description: "베트남 학생들의 한국 유학 및 취업 여정을 함께하며, 전문적인 상담과 종합적인 지원을 제공합니다.",
      highlight: "종합적인 동행"
    },
    values: [
      { icon: Heart, title: "헌신", desc: "항상 학생의 이익을 최우선으로", stat: "100%" },
      { icon: Medal, title: "전문성", desc: "풍부한 경험과 전문 지식을 갖춘 팀", stat: "5+" },
      { icon: Users, title: "동행", desc: "베트남에서 한국까지 24/7 지원", stat: "24/7" },
    ],
    
    // CEO
    ceoTitle: "대표 인사말",
    ceoName: "대표자 이름",
    ceoRole: "대표이사 / 설립자",
    ceoMessage: `안녕하세요, 학생 여러분과 학부모님께,

한국 유학 컨설팅 분야에서 5년 이상의 경험을 바탕으로, 유학 결정이 인생에서 얼마나 중요한 전환점인지 잘 알고 있습니다.

Aju E&J는 베트남 학생들이 안전하고 효과적으로 한국에서 학업과 취업의 꿈을 이룰 수 있도록 돕는 신뢰할 수 있는 동반자가 되고자 설립되었습니다.

저희는 전문적이고 투명한 상담 서비스를 제공하며, 항상 학생의 이익을 최우선으로 생각합니다.`,
    
    // Team
    teamTitle: "우리 팀",
    teamSubtitle: "여러분과 함께하는 헌신적인 전문가들",
    
    ctaTitle: "여정을 시작하세요",
    ctaButton: "상담 문의하기",
  }
};

// 팀원 데이터 (더미 - 나중에 수정 가능)
const teamMembers = [
  {
    name: { vi: "Tên nhân viên 1", ko: "팀원 1" },
    role: { vi: "Tư vấn viên", ko: "상담사" },
    description: { vi: "Chuyên tư vấn hồ sơ và visa", ko: "서류 및 비자 상담 전문" },
    image: "/placeholder.svg?height=300&width=300"
  },
  {
    name: { vi: "Tên nhân viên 2", ko: "팀원 2" },
    role: { vi: "Hỗ trợ sinh viên", ko: "학생 지원" },
    description: { vi: "Hỗ trợ sinh viên tại Hàn Quốc", ko: "한국 내 학생 지원 담당" },
    image: "/placeholder.svg?height=300&width=300"
  },
  {
    name: { vi: "Tên nhân viên 3", ko: "팀원 3" },
    role: { vi: "Tư vấn việc làm", ko: "취업 상담" },
    description: { vi: "Kết nối cơ hội việc làm", ko: "취업 기회 연결 담당" },
    image: "/placeholder.svg?height=300&width=300"
  },
  {
    name: { vi: "Tên nhân viên 4", ko: "팀원 4" },
    role: { vi: "Giảng viên tiếng Hàn", ko: "한국어 강사" },
    description: { vi: "Giảng dạy tiếng Hàn và chuẩn bị TOPIK", ko: "한국어 교육 및 TOPIK 준비" },
    image: "/placeholder.svg?height=300&width=300"
  },
  {
    name: { vi: "Tên nhân viên 5", ko: "팀원 5" },
    role: { vi: "Điều phối viên", ko: "코디네이터" },
    description: { vi: "Điều phối chương trình và sự kiện", ko: "프로그램 및 행사 조율" },
    image: "/placeholder.svg?height=300&width=300"
  },
  {
    name: { vi: "Tên nhân viên 6", ko: "팀원 6" },
    role: { vi: "Hỗ trợ hành chính", ko: "행정 지원" },
    description: { vi: "Quản lý hồ sơ và thủ tục hành chính", ko: "서류 및 행정 절차 관리" },
    image: "/placeholder.svg?height=300&width=300"
  },
];

export default function AboutPage() {
  const [lang, setLang] = useState<"vi" | "ko">("vi");
  const t = content[lang];

  return (
    <div className="min-h-screen bg-[#F9F7F2] relative">
      {/* Paper Texture Overlay - CSS-only noise pattern */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: -10,
          opacity: 0.08,
          mixBlendMode: 'multiply',
          background: `
            repeating-radial-gradient(circle at 17% 32%, rgba(120, 100, 80, 0.7) 0px, transparent 1px),
            repeating-radial-gradient(circle at 83% 67%, rgba(100, 80, 60, 0.6) 0px, transparent 1px),
            repeating-radial-gradient(circle at 52% 14%, rgba(90, 70, 50, 0.65) 0px, transparent 1px),
            repeating-radial-gradient(circle at 29% 78%, rgba(110, 90, 70, 0.55) 0px, transparent 1px),
            repeating-radial-gradient(circle at 68% 41%, rgba(100, 80, 60, 0.6) 0px, transparent 1px)
          `,
          backgroundSize: '2px 2px, 3px 3px, 4px 4px, 3px 3px, 5px 5px',
        }}
      />
      <Header lang={lang} onLangChange={setLang} />
      
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4" style={{ background: 'linear-gradient(to bottom, #F5F3EE 0%, #F9F7F2 100%)' }}>
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-navy/10 text-navy text-sm font-medium rounded-full mb-4">
              Aju E&J
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-espresso mb-4">
              {t.pageTitle}
            </h1>
            <p className="text-lg text-espresso/70">{t.pageSubtitle}</p>
          </div>
        </section>

        {/* Vision & Mission Section - Bento Grid Style */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-navy text-ivory text-sm font-medium rounded-full mb-4">
                Brand Value
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy">
                {t.visionTitle}
              </h2>
            </div>
            
            {/* Vision & Mission - Bento Grid Top */}
            <div className="grid md:grid-cols-5 gap-6 mb-6">
              {/* Vision - Larger Card with Campus Pattern */}
              <div className="md:col-span-3 bg-white p-8 lg:p-10 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gold/10 relative overflow-hidden group">
                {/* Campus Line Art Pattern Background */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                  <svg className="w-full h-full" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Building silhouettes */}
                    <rect x="20" y="150" width="60" height="100" stroke="currentColor" strokeWidth="1" className="text-navy"/>
                    <rect x="30" y="170" width="15" height="20" stroke="currentColor" strokeWidth="0.5" className="text-navy"/>
                    <rect x="55" y="170" width="15" height="20" stroke="currentColor" strokeWidth="0.5" className="text-navy"/>
                    <rect x="100" y="120" width="80" height="130" stroke="currentColor" strokeWidth="1" className="text-navy"/>
                    <polygon points="140,120 100,80 180,80" stroke="currentColor" strokeWidth="1" fill="none" className="text-navy"/>
                    <rect x="200" y="140" width="70" height="110" stroke="currentColor" strokeWidth="1" className="text-navy"/>
                    <rect x="290" y="100" width="90" height="150" stroke="currentColor" strokeWidth="1" className="text-navy"/>
                    <rect x="300" y="120" width="20" height="30" stroke="currentColor" strokeWidth="0.5" className="text-navy"/>
                    <rect x="350" y="120" width="20" height="30" stroke="currentColor" strokeWidth="0.5" className="text-navy"/>
                    {/* Trees */}
                    <circle cx="250" cy="220" r="20" stroke="currentColor" strokeWidth="0.5" className="text-navy"/>
                    <line x1="250" y1="240" x2="250" y2="260" stroke="currentColor" strokeWidth="0.5" className="text-navy"/>
                  </svg>
                </div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Eye className="w-8 h-8 text-navy" strokeWidth={1.5} />
                  </div>
                  <span className="inline-block px-3 py-1 bg-navy/10 text-navy text-xs font-semibold rounded-full mb-4">
                    VISION
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-bold text-navy mb-4">
                    {t.vision.title}
                  </h3>
                  <p className="text-espresso/70 leading-relaxed text-lg mb-4">{t.vision.description}</p>
                  <p className="text-gold font-semibold text-sm">"{t.vision.highlight}"</p>
                </div>
              </div>
              
              {/* Mission - Smaller Card */}
              <div className="md:col-span-2 bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gold/10 group">
                <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Compass className="w-8 h-8 text-navy" strokeWidth={1.5} />
                </div>
                <span className="inline-block px-3 py-1 bg-navy/10 text-navy text-xs font-semibold rounded-full mb-4">
                  MISSION
                </span>
                <h3 className="text-xl lg:text-2xl font-bold text-navy mb-4">
                  {t.mission.title}
                </h3>
                <p className="text-espresso/70 leading-relaxed">{t.mission.description}</p>
                <p className="text-gold font-semibold text-sm mt-4">"{t.mission.highlight}"</p>
              </div>
            </div>

            {/* Core Values - Asymmetric Layout */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {t.values.map((value, index) => (
                <div 
                  key={index} 
                  className={`
                    bg-white p-6 rounded-3xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gold/10 group
                    ${index === 0 ? 'col-span-2 md:col-span-2' : ''}
                    ${index === 1 ? 'col-span-2 md:col-span-2' : ''}
                    ${index === 2 ? 'col-span-2 md:col-span-2' : ''}
                  `}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <value.icon className="w-6 h-6 text-navy" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-navy text-lg">{value.title}</h4>
                        <span className="text-gold font-bold text-xl">{value.stat}</span>
                      </div>
                      <p className="text-espresso/60 text-sm leading-relaxed">{value.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CEO Section */}
        <section className="py-20 px-4 bg-[#F5F3EE]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-navy text-ivory text-sm font-medium rounded-full mb-4">
                CEO Message
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-espresso">
                {t.ceoTitle}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 items-start">
              {/* CEO Photo */}
              <div className="md:col-span-1">
                <div className="bg-white p-4 rounded-3xl shadow-sm">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden relative" style={{ background: 'linear-gradient(to bottom right, rgba(30,58,95,0.05) 0%, rgba(200,175,130,0.1) 100%)' }}>
                    <img 
                      src="/placeholder.svg?height=400&width=300" 
                      alt={t.ceoName}
                      className="w-full h-full object-cover"
                    />
                    {/* Watermark effect for placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                      <span className="text-4xl font-bold text-navy">Aju</span>
                    </div>
                  </div>
                  <div className="text-center mt-6 pb-2">
                    <h3 className="text-xl font-bold text-espresso">{t.ceoName}</h3>
                    <span className="inline-block px-3 py-1 bg-navy/10 text-navy text-sm font-medium rounded-full mt-2">
                      {t.ceoRole}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* CEO Message */}
              <div className="md:col-span-2">
                <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-gold/10 relative">
                  {/* Large Quote Icon - Top Left */}
                  <div className="absolute top-6 left-6 w-12 h-12 rounded-full bg-cream flex items-center justify-center">
                    <Quotes className="w-6 h-6 text-navy/30" strokeWidth={1.5} />
                  </div>
                  
                  <div className="relative z-10 pt-8">
                    <div className="text-espresso/80 leading-relaxed whitespace-pre-line text-base sm:text-lg">
                      {t.ceoMessage}
                    </div>
                    
                    {/* Signature area */}
                    <div className="mt-8 pt-6 border-t border-gold/20 flex items-center gap-4">
                      <div className="w-16 h-0.5 bg-navy/30" />
                      <span className="text-navy font-semibold italic text-lg">
                        {t.ceoName}
                      </span>
                    </div>
                  </div>
                  
                  {/* Large Quote Icon - Bottom Right */}
                  <div className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-cream flex items-center justify-center">
                    <Quotes className="w-6 h-6 text-navy/30 rotate-180" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 px-4 bg-[#F9F7F2]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-navy text-ivory text-sm font-medium rounded-full mb-4">
                Our Team
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-espresso mb-3">
                {t.teamTitle}
              </h2>
              <p className="text-espresso/60">{t.teamSubtitle}</p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member, index) => (
                <div 
                  key={index} 
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gold/10"
                >
                  {/* Image with hover zoom */}
                  <div className="aspect-square overflow-hidden relative" style={{ background: 'linear-gradient(to bottom right, rgba(30,58,95,0.05) 0%, rgba(200,175,130,0.1) 100%)' }}>
                    <img 
                      src={member.image || "/placeholder.svg"} 
                      alt={member.name[lang]}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Watermark for placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                      <span className="text-5xl font-bold text-navy">Aju</span>
                    </div>
                  </div>
                  
                  {/* Content - seamless transition */}
                  <div className="p-6 text-center">
                    <h3 className="font-bold text-espresso text-lg mb-2">
                      {member.name[lang]}
                    </h3>
                    {/* Role as badge */}
                    <span className="inline-block px-3 py-1 bg-navy text-ivory text-xs font-medium rounded-full mb-3">
                      {member.role[lang]}
                    </span>
                    <p className="text-espresso/60 text-sm leading-relaxed">{member.description[lang]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 relative overflow-hidden" style={{ background: 'linear-gradient(to right, #1e3a5f 0%, rgba(30,58,95,0.9) 100%)' }}>
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-ivory/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-ivory mb-6">
              {t.ctaTitle}
            </h2>
            <Link href="/#contact">
              <Button size="lg" className="bg-gold text-espresso hover:bg-gold/90 rounded-full px-8 shadow-lg hover:shadow-xl transition-all">
                {t.ctaButton}
                <ArrowRight className="ml-2 h-5 w-5" strokeWidth={1.5} />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
