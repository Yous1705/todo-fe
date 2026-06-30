import React from "react";

interface CTASectionProps {
  onOpenAuth: (type: "login" | "register") => void;
}

export function CTASection({ onOpenAuth }: CTASectionProps) {
  return (
    <section className="py-24 bg-[#0B0F19] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative bg-gradient-to-tr from-[#1976D2] to-[#7C3AED] rounded-3xl p-10 sm:p-16 text-center text-white overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none animate-float-slow" />
          <div className="absolute -bottom-10 left-10 w-60 h-60 bg-cyan-400/25 rounded-full blur-2xl pointer-events-none animate-float-medium" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Mulai Organisasikan Tugas Anda Hari Ini
            </h3>
            <p className="text-indigo-100/90 text-sm sm:text-base leading-relaxed">
              Ambil kendali atas agenda kerja Anda dan bangun kebiasaan
              produktif bersama TaskFlow. Bergabunglah sekarang juga secara
              gratis.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => onOpenAuth("register")}
                className="w-full sm:w-auto bg-[#1976D2] hover:bg-[#2196F3] text-white font-extrabold px-8 py-4 rounded-2xl shadow-lg shadow-[#1976D2]/20 transition-all transform hover:-translate-y-0.5"
              >
                Mulai Sekarang
              </button>
              <a
                href="#features"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#1976D2]/20 hover:bg-[#1976D2]/30 text-white font-semibold transition-all border border-[#1976D2]/40"
              >
                Jelajahi Fitur
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
