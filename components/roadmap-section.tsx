"use client";

import {
  GraduationCap,
  PlaneTakeoff,
  Building2,
  Briefcase,
  BookOpen,
  Home,
  HeartPulse,
  Medal,
} from "lucide-react";
import { ScrollAnimate } from "@/components/scroll-animate";
import { GrayscaleImage } from "@/components/grayscale-image";

const stepImages = [
  "/images/roadmap-step1.jpg",
  "/images/roadmap-step2.jpg",
  "/images/roadmap-step3.jpg",
];

const content = {
  vi: {
    badge: "Quy trinh",
    title: "Lo Trinh Du Hoc Aju",
    subtitle: "Hanh trinh 3 buoc den thanh cong",
    steps: [
      {
        phase: "Giai doan 1",
        title: "Chuan Bi Tai Viet Nam",
        description: "Xay dung nen tang vung chac truoc khi khoi hanh",
        items: [
          { icon: GraduationCap, title: "Tu van huong nghiep", desc: "Phan tich nang luc, goi y nganh hoc va truong phu hop" },
          { icon: BookOpen, title: "Dao tao tieng Han", desc: "Dat TOPIK cap 2 voi giang vien ban xu & cuu du hoc sinh" },
        ],
      },
      {
        phase: "Giai doan 2",
        title: "Dinh Cu Tai Han Quoc",
        description: "Ho tro toan dien khi ban dat chan den Han Quoc",
        items: [
          { icon: PlaneTakeoff, title: "Visa & Thu tuc", desc: "Ho tro hoan tat visa, bao hiem va cac giay to can thiet" },
          { icon: Home, title: "Cho o an toan", desc: "Dich vu moi gioi nha o da kiem duyet gan truong" },
          { icon: HeartPulse, title: "Y te & Phap ly", desc: "Huong dan kham chua benh va tu van phap luat" },
          { icon: Briefcase, title: "Viec lam ban thoi gian", desc: "Huong dan lam them hop phap sau 6 thang" },
        ],
      },
      {
        phase: "Giai doan 3",
        title: "Hoc Tap & Nghe Nghiep",
        description: "Dong hanh den khi ban thanh cong",
        items: [
          { icon: Medal, title: "Hoc bong TOPIK", desc: "Ho tro dat TOPIK 5-6 va san hoc bong" },
          { icon: Building2, title: "Tu van viec lam", desc: "Ket noi co hoi viec lam tai Han Quoc & Viet Nam" },
        ],
      },
    ],
  },
  ko: {
    badge: "\uD504\uB85C\uC138\uC2A4",
    title: "\uC544\uC8FC \uB85C\uB4DC\uB9F5",
    subtitle: "\uC131\uACF5\uC744 \uD5A5\uD55C 3\uB2E8\uACC4 \uC5EC\uC815",
    steps: [
      {
        phase: "1\uB2E8\uACC4",
        title: "\uBCA0\uD2B8\uB0A8 \uD604\uC9C0 \uC900\uBE44",
        description: "\uCD9C\uAD6D \uC804 \uD0C4\uD0C4\uD55C \uAE30\uBC18 \uAD6C\uCD95",
        items: [
          { icon: GraduationCap, title: "\uB9DE\uCDA4\uD615 \uC9C4\uB85C \uC0C1\uB2F4", desc: "\uC801\uC131 \uBD84\uC11D\uC744 \uD1B5\uD55C \uC804\uACF5 \uBC0F \uB300\uD559\uAD50 \uCD94\uCC9C" },
          { icon: BookOpen, title: "\uD55C\uAD6D\uC5B4 \uAD50\uC721", desc: "TOPIK 2\uAE09 \uB2EC\uC131 (\uC6D0\uC5B4\uBBFC & \uC720\uD559\uD30C \uAC15\uC0AC)" },
        ],
      },
      {
        phase: "2\uB2E8\uACC4",
        title: "\uD55C\uAD6D \uC815\uCC29 \uAD00\uB9AC",
        description: "\uD55C\uAD6D \uB3C4\uCC29 \uD6C4 \uC885\uD569 \uC9C0\uC6D0",
        items: [
          { icon: PlaneTakeoff, title: "\uBE44\uC790 & \uD589\uC815", desc: "\uBE44\uC790, \uBCF4\uD5D8, \uD544\uC694 \uC11C\uB958 \uCC98\uB9AC \uC9C0\uC6D0" },
          { icon: Home, title: "\uC548\uC804 \uC219\uC18C", desc: "\uD559\uAD50 \uC778\uADFC \uAC80\uC99D\uB41C \uBD80\uB3D9\uC0B0 \uC911\uAC1C \uC11C\uBE44\uC2A4" },
          { icon: HeartPulse, title: "\uC758\uB8CC & \uBC95\uB960", desc: "\uBCD1\uC6D0 \uC774\uC6A9 \uC548\uB0B4 \uBC0F \uBC95\uB960 \uC0C1\uB2F4" },
          { icon: Briefcase, title: "\uD30C\uD2B8\uD0C0\uC784", desc: "6\uAC1C\uC6D4 \uC774\uD6C4 \uD569\uBC95\uC801 \uC544\uB974\uBC14\uC774\uD2B8 \uAC00\uC774\uB4DC" },
        ],
      },
      {
        phase: "3\uB2E8\uACC4",
        title: "\uB300\uD559\uAD50 \uC785\uD559 \uBC0F \uCDE8\uC5C5",
        description: "\uC131\uACF5\uAE4C\uC9C0 \uB3D9\uD589",
        items: [
          { icon: Medal, title: "\uC7A5\uD559\uAE08 \uB9E4\uCE6D", desc: "TOPIK 5-6\uAE09 \uB2EC\uC131 \uC9C0\uC6D0 \uBC0F \uC7A5\uD559\uAE08 \uC5F0\uACB0" },
          { icon: Building2, title: "\uCDE8\uC5C5 \uC9C0\uC6D0", desc: "\uD55C\uAD6D/\uBCA0\uD2B8\uB0A8 \uB0B4 \uC9C4\uB85C \uC0C1\uB2F4 \uBC0F \uC9C1\uC7A5 \uB9E4\uCE6D" },
        ],
      },
    ],
  },
};

interface RoadmapSectionProps {
  lang: "vi" | "ko";
}

export function RoadmapSection({ lang }: RoadmapSectionProps) {
  const t = content[lang];

  return (
    <section id="roadmap" className="py-32 lg:py-40 bg-[#f5f0e8] relative">
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

        {/* Steps */}
        <div className="relative space-y-16">
          {t.steps.map((step, index) => (
            <ScrollAnimate key={step.phase} delay={index * 150}>
              <div className="border-b border-[#2b3a67]/10 pb-16 last:border-b-0 last:pb-0">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
                  {/* Image */}
                  <div className={`relative aspect-[4/3] overflow-hidden bg-[#ebe5dc] ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <GrayscaleImage
                      src={stepImages[index] || "/placeholder.svg"}
                      alt={step.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Step number overlay */}
                    <div className="absolute top-6 left-6 font-serif text-6xl font-bold text-white/80" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <span className="text-[#c4a265] text-sm tracking-widest uppercase mb-3">
                      {step.phase}
                    </span>
                    <h3 className="font-serif text-3xl md:text-4xl text-[#2b3a67] mb-3 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-[#3d2c2e]/60 mb-8 font-light text-lg">
                      {step.description}
                    </p>

                    <div className="space-y-4">
                      {step.items.map((item) => (
                        <div
                          key={item.title}
                          className="flex gap-4 p-4 border border-[#2b3a67]/10 hover:border-[#c4a265]/40 transition-colors duration-500"
                        >
                          <div className="flex-shrink-0 mt-0.5 text-[#c4a265]">
                            <item.icon className="w-5 h-5" strokeWidth={1.5} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-[#2b3a67] mb-1 text-sm">{item.title}</h4>
                            <p className="text-[#3d2c2e]/60 text-sm leading-relaxed font-light">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimate>
          ))}
        </div>
      </div>
    </section>
  );
}
