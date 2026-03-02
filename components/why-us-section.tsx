"use client";

import { ShieldCheck, Users, Briefcase, GraduationCap, Handshake, Clock } from "lucide-react";
import { ScrollAnimate } from "@/components/scroll-animate";
import { GrayscaleImage } from "@/components/grayscale-image";

interface WhyUsSectionProps {
  lang: "vi" | "ko";
}

const content = {
  vi: {
    badge: "Our Excellence",
    title: "Su khac biet cua Aju E&J",
    subtitle: "Chung toi cam ket mang den trai nghiem du hoc an toan va thanh cong cho moi hoc vien",
    features: [
      { icon: ShieldCheck, title: "An toan tuyet doi", description: "Quy trinh minh bach, khong phi an", highlight: "100%", highlightText: "Minh bach", image: "/images/why-us-1.jpg" },
      { icon: Users, title: "Doi ngu chuyen nghiep", description: "Tu van vien co kinh nghiem thuc te tai Han Quoc", highlight: "5+", highlightText: "Nam kinh nghiem", image: "/images/why-us-2.jpg" },
      { icon: GraduationCap, title: "Doi tac uy tin", description: "Hop tac chinh thuc voi dai hoc Han Quoc", highlight: "5+", highlightText: "Doi tac chinh thuc", image: "/images/why-us-3.jpg" },
      { icon: Handshake, title: "Ho tro toan dien", description: "Dong hanh tu ngay dau den khi on dinh", highlight: "24/7", highlightText: "Ho tro", image: "/images/why-us-4.jpg" },
      { icon: Briefcase, title: "Co hoi viec lam", description: "Ket noi mang luoi doanh nghiep Han-Viet", highlight: "500+", highlightText: "Viec lam", image: "/images/why-us-5.jpg" },
      { icon: Clock, title: "Tiet kiem thoi gian", description: "Quy trinh toi uu, rut ngan thoi gian chuan bi", highlight: "2X", highlightText: "Nhanh hon", image: "/images/why-us-6.jpg" },
    ],
  },
  ko: {
    badge: "Our Excellence",
    title: "Aju E&J\uB9CC\uC758 \uCC28\uBCC4\uC810",
    subtitle: "\uBAA8\uB4E0 \uD559\uC0DD\uC5D0\uAC8C \uC548\uC804\uD558\uACE0 \uC131\uACF5\uC801\uC778 \uC720\uD559 \uACBD\uD5D8\uC744 \uC81C\uACF5\uD558\uAE30 \uC704\uD574 \uCD5C\uC120\uC744 \uB2E4\uD569\uB2C8\uB2E4",
    features: [
      { icon: ShieldCheck, title: "\uC644\uBCBD\uD55C \uC548\uC804", description: "\uD22C\uBA85\uD55C \uC808\uCC28, \uC228\uC740 \uBE44\uC6A9 \uC5C6\uC74C", highlight: "100%", highlightText: "\uD22C\uBA85\uC131", image: "/images/why-us-1.jpg" },
      { icon: Users, title: "\uC804\uBB38 \uC0C1\uB2F4\uD300", description: "\uD55C\uAD6D \uD604\uC9C0 \uACBD\uD5D8\uC774 \uD48D\uBD80\uD55C \uC0C1\uB2F4\uC0AC", highlight: "5+", highlightText: "\uB144 \uACBD\uB825", image: "/images/why-us-2.jpg" },
      { icon: GraduationCap, title: "\uC2E0\uB8B0\uD560 \uC218 \uC788\uB294 \uD30C\uD2B8\uB108", description: "\uD55C\uAD6D \uB300\uD559\uACFC \uACF5\uC2DD \uD611\uB825", highlight: "5+", highlightText: "\uACF5\uC2DD \uD611\uB825", image: "/images/why-us-3.jpg" },
      { icon: Handshake, title: "\uC885\uD569 \uC9C0\uC6D0", description: "\uCCAB\uB0A0\uBD80\uD130 \uC815\uCC29\uAE4C\uC9C0 \uBAA8\uB4E0 \uACFC\uC815 \uB3D9\uD589", highlight: "24/7", highlightText: "\uC9C0\uC6D0", image: "/images/why-us-4.jpg" },
      { icon: Briefcase, title: "\uCDE8\uC5C5 \uAE30\uD68C", description: "\uD55C-\uBCA0 \uAE30\uC5C5 \uB124\uD2B8\uC6CC\uD06C \uC5F0\uACB0", highlight: "500+", highlightText: "\uC77C\uC790\uB9AC", image: "/images/why-us-5.jpg" },
      { icon: Clock, title: "\uC2DC\uAC04 \uC808\uC57D", description: "\uCD5C\uC801\uD654\uB41C \uC808\uCC28\uB85C \uC2DC\uAC04 \uB2E8\uCD95", highlight: "2X", highlightText: "\uB354 \uBE60\uB974\uAC8C", image: "/images/why-us-6.jpg" },
    ],
  },
};

export function WhyUsSection({ lang }: WhyUsSectionProps) {
  const t = content[lang];

  return (
    <section id="why-us" className="py-32 lg:py-40 bg-[#f5f0e8] relative">
      {/* Top fine line */}
      <div className="absolute left-0 right-0 top-0 h-px bg-[#2b3a67]/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - editorial */}
        <ScrollAnimate>
          <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between border-b border-[#2b3a67]/20 pb-8">
            <div>
              <span className="text-[#c4a265] text-sm tracking-widest uppercase mb-4 block">{t.badge}</span>
              <h2 className="font-serif text-4xl md:text-5xl text-[#2b3a67] tracking-tight">
                {t.title}
              </h2>
            </div>
            <p className="text-lg text-[#3d2c2e]/60 max-w-md mt-6 md:mt-0 font-light">
              {t.subtitle}
            </p>
          </div>
        </ScrollAnimate>

        {/* Features Grid - editorial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-16">
          {t.features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <ScrollAnimate key={index} delay={index * 120}>
                <div className="group cursor-default">
                  {/* Image thumbnail - grayscale, no rounded corners */}
                  <div className="relative aspect-[4/3] overflow-hidden mb-6 bg-[#ebe5dc]">
                    <GrayscaleImage
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Highlight overlay */}
                    <div className="absolute bottom-4 left-4 flex items-baseline gap-1.5 bg-white/90 px-3 py-1.5">
                      <span className="text-2xl font-bold text-[#2b3a67]">{feature.highlight}</span>
                      <span className="text-[10px] text-[#2b3a67]/60 uppercase tracking-wider font-medium">{feature.highlightText}</span>
                    </div>
                  </div>

                  {/* Text area */}
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 text-[#c4a265]">
                      <Icon size={22} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl text-[#2b3a67] mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-[#3d2c2e]/70 leading-relaxed font-light text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollAnimate>
            );
          })}
        </div>
      </div>
    </section>
  );
}
