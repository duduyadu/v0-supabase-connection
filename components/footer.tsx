"use client";

import { Facebook, Instagram, Youtube } from "lucide-react";

const content = {
  vi: {
    company: "Aju E&J Education & Job",
    description: "Cau noi an toan tu Viet Nam den su nghiep tai Han Quoc. Chung toi dong hanh cung ban tren moi buoc duong.",
    links: {
      services: { title: "Dich vu", items: ["Tu van du hoc", "Dao tao TOPIK", "Ho tro visa", "Viec lam"] },
      support: { title: "Ho tro", items: ["Lien he", "FAQ", "Chinh sach", "Dieu khoan"] },
    },
    copyright: "2024 Aju E&J. Bao luu moi quyen.",
    legal: "Giay phep kinh doanh: 123-45-67890",
  },
  ko: {
    company: "Aju E&J Education & Job",
    description: "\uBCA0\uD2B8\uB0A8\uC5D0\uC11C \uD55C\uAD6D \uCDE8\uC5C5\uAE4C\uC9C0 \uAC00\uC7A5 \uC548\uC804\uD55C \uC720\uD559\uC758 \uAE38. \uBAA8\uB4E0 \uACFC\uC815\uC5D0\uC11C \uD568\uAED8\uD569\uB2C8\uB2E4.",
    links: {
      services: { title: "\uC11C\uBE44\uC2A4", items: ["\uC720\uD559 \uC0C1\uB2F4", "TOPIK \uAD50\uC721", "\uBE44\uC790 \uC9C0\uC6D0", "\uCDE8\uC5C5 \uC9C0\uC6D0"] },
      support: { title: "\uACE0\uAC1D\uC9C0\uC6D0", items: ["\uBB38\uC758\uD558\uAE30", "\uC790\uC8FC \uBB3B\uB294 \uC9C8\uBB38", "\uAC1C\uC778\uC815\uBCF4\uCC98\uB9AC\uBC29\uCE68", "\uC774\uC6A9\uC57D\uAD00"] },
    },
    copyright: "2024 Aju E&J. All rights reserved.",
    legal: "\uC0AC\uC5C5\uC790\uB4F1\uB85D\uBC88\uD638: 123-45-67890",
  },
};

interface FooterProps {
  lang: "vi" | "ko";
}

export function Footer({ lang }: FooterProps) {
  const t = content[lang];

  return (
    <footer className="bg-[#3d2c2e] text-white relative">
      <div className="absolute left-0 right-0 top-0 h-px bg-[#c4a265]/20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          <div className="lg:col-span-2">
            <a href="#" className="inline-block mb-6">
              <span className="font-serif text-3xl font-bold text-white tracking-tight">
                {"Aju "}
                <span className="text-[#c4a265]">{"E&J"}</span>
              </span>
            </a>
            <p className="text-white/30 leading-relaxed mb-8 max-w-md text-sm font-light">{t.description}</p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-[#c4a265] hover:text-[#c4a265] transition-all duration-500 text-white/40" aria-label="Facebook"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-[#c4a265] hover:text-[#c4a265] transition-all duration-500 text-white/40" aria-label="Instagram"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-[#c4a265] hover:text-[#c4a265] transition-all duration-500 text-white/40" aria-label="YouTube"><Youtube className="w-4 h-4" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-medium text-white/25 uppercase tracking-[0.2em] mb-6">{t.links.services.title}</h4>
            <ul className="space-y-3">
              {t.links.services.items.map((item) => (
                <li key={item}><a href="#" className="text-sm text-white/40 hover:text-[#c4a265] transition-colors duration-300 font-light">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium text-white/25 uppercase tracking-[0.2em] mb-6">{t.links.support.title}</h4>
            <ul className="space-y-3">
              {t.links.support.items.map((item) => (
                <li key={item}><a href="#" className="text-sm text-white/40 hover:text-[#c4a265] transition-colors duration-300 font-light">{item}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20 font-light">{t.copyright}</p>
          <p className="text-xs text-white/20 font-light">{t.legal}</p>
        </div>
      </div>
    </footer>
  );
}
