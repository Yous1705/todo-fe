import React from "react";
import { Github, LogoMark } from "../../lib/icons";

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-100 text-slate-500 text-sm py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-4">
          <div className="flex items-center space-x-2.5">
            <div className="bg-gradient-to-tr from-indigo-500 to-purple-500 p-2 rounded-xl shadow-sm">
              <LogoMark />
            </div>
            <span className="text-lg font-bold text-slate-900">TaskFlow</span>
          </div>
          <p className="text-xs leading-relaxed">
            TaskFlow adalah platform manajemen tugas modern berkualitas tinggi
            yang dioptimalkan untuk presentasi portofolio rekayasa perangkat
            lunak berkelas dunia.
          </p>
        </div>

        <div>
          <h5 className="font-bold text-slate-800 mb-4 text-xs uppercase tracking-wider">
            Produk
          </h5>
          <ul className="space-y-2 text-xs">
            <li>
              <a
                href="#features"
                className="hover:text-indigo-600 transition-colors"
              >
                Fitur Utama
              </a>
            </li>
            <li>
              <a
                href="#workflow"
                className="hover:text-indigo-600 transition-colors"
              >
                Alur Kerja
              </a>
            </li>
            <li>
              <a
                href="#stats"
                className="hover:text-indigo-600 transition-colors"
              >
                Statistik Penggunaan
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-slate-800 mb-4 text-xs uppercase tracking-wider">
            Rencana Mendatang
          </h5>
          <ul className="space-y-2 text-xs">
            <li>
              <a
                href="#roadmap"
                className="hover:text-indigo-600 transition-colors"
              >
                Integrasi AI
              </a>
            </li>
            <li>
              <a
                href="#roadmap"
                className="hover:text-indigo-600 transition-colors"
              >
                Sistem Kalender
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-slate-800 mb-4 text-xs uppercase tracking-wider">
            Kontak & Repositori
          </h5>
          <ul className="space-y-2 text-xs">
            <li>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1.5 hover:text-indigo-600"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Portfolio Repository</span>
              </a>
            </li>
            <li className="text-[11px] leading-normal pt-2 text-slate-400">
              Dibuat dengan komitmen tinggi untuk menunjukkan implementasi
              visual antarmuka modern tahun 2026.
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-200/50 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 space-y-4 sm:space-y-0">
        <p>&copy; 2026 TaskFlow. Hak cipta dilindungi undang-undang.</p>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-indigo-600">
            Kebijakan Privasi
          </a>
          <a href="#" className="hover:text-indigo-600">
            Ketentuan Layanan
          </a>
        </div>
      </div>
    </footer>
  );
}
