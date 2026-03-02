"use client";

import React from "react";
import { useState } from "react";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { ScrollAnimate } from "@/components/scroll-animate";
// import { createClient } from "@/lib/supabase/client"; // Supabase disabled for now

const content = {
  vi: {
    badge: "Consultation",
    title: "Dang Ky Tu Van Mien Phi",
    subtitle: "Hay de chung toi giup ban bat dau hanh trinh du hoc",
    form: {
      name: "Ho va ten",
      phone: "So dien thoai",
      email: "Email",
      major: "Nganh hoc quan tam",
      topik: "Trinh do TOPIK hien tai",
      submit: "Gui yeu cau tu van",
    },
    majors: ["Kinh te & Quan tri", "Cong nghe thong tin", "Ngon ngu Han", "Ky thuat", "Du lich & Khach san", "Khac"],
    topikLevels: ["Chua hoc", "Dang hoc", "TOPIK 1-2", "TOPIK 3-4", "TOPIK 5-6"],
    offices: {
      korea: { title: "Van phong Han Quoc", address: "123 Gangnam-daero, Gangnam-gu, Seoul", phone: "+82 2-1234-5678", email: "korea@ajuej.com" },
      vietnam: { title: "Van phong Viet Nam", address: "456 Nguyen Hue, Quan 1, TP.HCM", phone: "+84 28-1234-5678", email: "vietnam@ajuej.com" },
    },
    success: "Cam on ban! Chung toi se lien he som.",
    sending: "Dang gui...",
    directContact: "Lien he truc tiep",
  },
  ko: {
    badge: "Consultation",
    title: "\uBB34\uB8CC \uC0C1\uB2F4 \uC2E0\uCCAD",
    subtitle: "\uC720\uD559 \uC5EC\uC815\uC758 \uCCAB \uAC78\uC74C\uC744 \uD568\uAED8 \uC2DC\uC791\uD558\uC138\uC694",
    form: {
      name: "\uC131\uD568",
      phone: "\uC5F0\uB77D\uCC98",
      email: "\uC774\uBA54\uC77C",
      major: "\uAD00\uC2EC \uC804\uACF5",
      topik: "\uD604\uC7AC TOPIK \uC218\uC900",
      submit: "\uC0C1\uB2F4 \uC2E0\uCCAD\uD558\uAE30",
    },
    majors: ["\uACBD\uC601\uD559", "IT/\uCEF4\uD4E8\uD130\uACF5\uD559", "\uD55C\uAD6D\uC5B4\uD559", "\uACF5\uD559", "\uAD00\uAD11/\uD638\uD154\uACBD\uC601", "\uAE30\uD0C0"],
    topikLevels: ["\uBBF8\uD559\uC2B5", "\uD559\uC2B5 \uC911", "TOPIK 1-2\uAE09", "TOPIK 3-4\uAE09", "TOPIK 5-6\uAE09"],
    offices: {
      korea: { title: "\uD55C\uAD6D \uC0AC\uBB34\uC18C", address: "\uC11C\uC6B8\uD2B9\uBCC4\uC2DC \uAC15\uB0A8\uAD6C \uAC15\uB0A8\uB300\uB85C 123", phone: "+82 2-1234-5678", email: "korea@ajuej.com" },
      vietnam: { title: "\uBCA0\uD2B8\uB0A8 \uC0AC\uBB34\uC18C", address: "456 Nguyen Hue, Quan 1, TP.HCM", phone: "+84 28-1234-5678", email: "vietnam@ajuej.com" },
    },
    success: "\uAC10\uC0AC\uD569\uB2C8\uB2E4! \uACE7 \uC5F0\uB77D\uB4DC\uB9AC\uACA0\uC2B5\uB2C8\uB2E4.",
    sending: "\uC804\uC1A1 \uC911...",
    directContact: "\uC9C1\uC811 \uBB38\uC758",
  },
};

interface ContactSectionProps {
  lang: "vi" | "ko";
}

export function ContactSection({ lang }: ContactSectionProps) {
  const t = content[lang];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", major: "", topik_level: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Supabase disabled for now - just show success
      // const supabase = createClient();
      // await supabase.from("consultations").insert([formData]);
      console.log("Form submitted:", formData);
      alert(t.success);
      setFormData({ name: "", phone: "", email: "", major: "", topik_level: "" });
    } catch {
      alert("Error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 lg:py-40 bg-[#2b3a67] relative overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M0 0h1v1H0zM20 20h1v1h-1z\'/%3E%3C/g%3E%3C/svg%3E")' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Form Section */}
          <ScrollAnimate direction="left">
            <div>
              <span className="text-[#c4a265] text-sm tracking-widest uppercase mb-6 block">{t.badge}</span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight tracking-tight">
                {t.title}
              </h2>
              <p className="text-white/40 text-lg mb-12 font-light">{t.subtitle}</p>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className="block text-white/30 text-xs mb-3 uppercase tracking-[0.2em]">
                    {t.form.name}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border-b border-white/15 pb-3 text-white placeholder-white/20 focus:border-[#c4a265] focus:outline-none transition-colors duration-500 text-lg font-light"
                    placeholder={t.form.name}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-white/30 text-xs mb-3 uppercase tracking-[0.2em]">
                      {t.form.phone}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-transparent border-b border-white/15 pb-3 text-white placeholder-white/20 focus:border-[#c4a265] focus:outline-none transition-colors duration-500 text-lg font-light"
                      placeholder={t.form.phone}
                    />
                  </div>
                  <div>
                    <label className="block text-white/30 text-xs mb-3 uppercase tracking-[0.2em]">
                      {t.form.email}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent border-b border-white/15 pb-3 text-white placeholder-white/20 focus:border-[#c4a265] focus:outline-none transition-colors duration-500 text-lg font-light"
                      placeholder={t.form.email}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/30 text-xs mb-3 uppercase tracking-[0.2em]">
                    {t.form.major}
                  </label>
                  <select
                    value={formData.major}
                    onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                    className="w-full bg-transparent border-b border-white/15 pb-3 text-white focus:border-[#c4a265] focus:outline-none transition-colors duration-500 text-lg appearance-none cursor-pointer font-light"
                  >
                    <option value="" disabled className="bg-[#2b3a67] text-white/40">{t.form.major}</option>
                    {t.majors.map((major) => (
                      <option key={major} value={major} className="bg-[#2b3a67] text-white">{major}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white/30 text-xs mb-3 uppercase tracking-[0.2em]">
                    {t.form.topik}
                  </label>
                  <select
                    value={formData.topik_level}
                    onChange={(e) => setFormData({ ...formData, topik_level: e.target.value })}
                    className="w-full bg-transparent border-b border-white/15 pb-3 text-white focus:border-[#c4a265] focus:outline-none transition-colors duration-500 text-lg appearance-none cursor-pointer font-light"
                  >
                    <option value="" disabled className="bg-[#2b3a67] text-white/40">{t.form.topik}</option>
                    {t.topikLevels.map((level) => (
                      <option key={level} value={level} className="bg-[#2b3a67] text-white">{level}</option>
                    ))}
                  </select>
                </div>

                {/* Ghost button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-6 border border-[#c4a265] text-[#c4a265] hover:bg-[#c4a265] hover:text-[#2b3a67] font-medium py-4 px-8 flex items-center justify-center gap-3 transition-all duration-500 text-lg tracking-wide disabled:opacity-50"
                >
                  {isSubmitting ? t.sending : t.form.submit}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </ScrollAnimate>

          {/* Contact Info */}
          <ScrollAnimate direction="right" delay={200}>
            <div className="space-y-6 lg:pt-20">
              <h3 className="text-xs font-medium text-white/30 uppercase tracking-[0.2em] mb-8">
                {t.directContact}
              </h3>

              <div className="space-y-6">
                {Object.values(t.offices).map((office) => (
                  <div
                    key={office.title}
                    className="border border-white/10 p-6 hover:border-[#c4a265]/30 transition-colors duration-500"
                  >
                    <h4 className="font-serif font-semibold text-white mb-4 text-lg">{office.title}</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 text-sm text-white/40 font-light">
                        <MapPin className="w-4 h-4 mt-0.5 text-[#c4a265] flex-shrink-0" />
                        <span>{office.address}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-white/40 font-light">
                        <Phone className="w-4 h-4 text-[#c4a265] flex-shrink-0" />
                        <span>{office.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-white/40 font-light">
                        <Mail className="w-4 h-4 text-[#c4a265] flex-shrink-0" />
                        <span>{office.email}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollAnimate>
        </div>
      </div>
    </section>
  );
}
