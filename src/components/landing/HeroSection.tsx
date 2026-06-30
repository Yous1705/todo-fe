"use client";

import React from "react";
import { Github } from "../../lib/icons";

interface HeroSectionProps {
  onOpenAuth: (type: "login" | "register") => void;
}

export function HeroSection({ onOpenAuth }: HeroSectionProps) {
  return (
    <section className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden bg-gradient-to-b from-[#0B0F19] via-[#0B0F19] to-[#181A20]">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-indigo-100/40 to-cyan-100/30 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute top-44 right-10 w-72 h-72 bg-purple-100/30 rounded-full blur-[80px] -z-10 pointer-events-none animate-float-medium" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <div className="lg:col-span-6 text-center lg:text-left space-y-6">
          <div className="inline-flex items-center space-x-2 bg-[#151D30] border border-[#2D3139] px-4 py-2 rounded-full text-xs font-semibold text-[#B0BEC5] tracking-wide shadow-sm animate-pulse-subtle">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600" />
            </span>
            <span>TaskFlow Startup Launch — V2.6 Release</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
            Organize Your Tasks. <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
              Track Your Progress.
            </span>{" "}
            <br />
            Achieve More.
          </h1>

          <p className="text-base sm:text-lg text-[#B0BEC5] max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Sebuah platform produktivitas modern yang dirancang untuk membantu
            Anda mengelola tugas harian, memetakan prioritas, memantau kemajuan,
            dan tetap fokus pada pencapaian terbaik Anda.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button
              onClick={() => onOpenAuth("register")}
              className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-indigo-100 hover:shadow-indigo-200 transition-all transform hover:-translate-y-0.5 text-center"
            >
              Mulai Gratis Sekarang
            </button>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold transition-all shadow-sm hover:shadow-md"
            >
              <Github className="w-5 h-5 text-slate-600" />
              <span>Lihat Source Code</span>
            </a>
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-wrap justify-center lg:justify-start gap-6 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <div className="flex items-center space-x-1.5">
              <span>⚡ CEPAT & RESPONSIF</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span>🛡️ ARSITEKTUR AMAN</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span>✨ API MODERN</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 relative w-full max-w-xl mx-auto">
          <div className="absolute -top-6 -left-6 z-20 bg-white shadow-xl rounded-2xl p-4 flex items-center space-x-3 border border-indigo-50/50 animate-float-slow">
            <div className="bg-emerald-100 p-2 rounded-xl">
              <svg
                className="w-5 h-5 text-emerald-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">
                Live Demo
              </div>
              <div className="text-xs font-bold text-slate-800">
                Tugas Selesai!
              </div>
            </div>
          </div>

          <div className="absolute -bottom-4 right-4 z-20 bg-white shadow-xl rounded-2xl p-4 flex items-center space-x-3 border border-indigo-50/50 animate-float-medium">
            <div className="bg-amber-100 p-2.5 rounded-xl">
              <svg
                className="w-5 h-5 text-amber-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">
                Produktivitas
              </div>
              <div className="text-xs font-bold text-slate-800">
                Sesi Deep Work Berjalan
              </div>
            </div>
          </div>

          <div className="relative bg-white border border-slate-200/80 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <span className="w-3.5 h-3.5 bg-rose-400 rounded-full" />
                <span className="w-3.5 h-3.5 bg-amber-400 rounded-full" />
                <span className="w-3.5 h-3.5 bg-emerald-400 rounded-full" />
              </div>
              <div className="text-xs font-bold text-indigo-600 tracking-widest uppercase bg-indigo-50 px-3 py-1 rounded-full">
                TaskFlow Workspace
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-800">
                  Fokus Hari Ini 🎯
                </h3>
                <p className="text-xs text-slate-400">
                  Pertahankan konsistensi Anda hari ini!
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-indigo-50/50 border border-indigo-100/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 rounded border-2 border-indigo-500 bg-indigo-500 flex items-center justify-center">
                      <svg
                        className="w-3.5 h-3.5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-xs font-semibold text-indigo-900 line-through decoration-indigo-200">
                      Refactoring landing page components
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 uppercase">
                    Code
                  </span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-slate-150">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 rounded border-2 border-slate-300" />
                    <span className="text-xs font-semibold text-slate-700">
                      Write deployment pipeline documentation
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-700 uppercase">
                    Docs
                  </span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-slate-150">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 rounded border-2 border-slate-300" />
                    <span className="text-xs font-semibold text-slate-700">
                      Audit React memo rendering tree
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-700 uppercase">
                    Perf
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="font-bold text-slate-600">
                    Rasio Penyelesaian
                  </span>
                  <span className="font-bold text-indigo-600">82%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full"
                    style={{ width: "82%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
