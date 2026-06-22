import React from "react";
import { stats } from "../../constants/stats";

export function StatsSection() {
  return (
    <section
      id="stats"
      className="py-20 bg-slate-900 text-white relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
            TaskFlow Telemetry
          </span>
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Kinerja Platform Real-Time
          </h3>
          <p className="text-slate-400 text-sm sm:text-base">
            Rangkuman data aktivitas pengguna aktif di platform kami dalam
            menuntaskan target harian mereka.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map(({ value, label, gradientClass }) => (
            <div
              key={label}
              className="bg-slate-800/50 border border-slate-750 p-6 rounded-2xl hover:bg-slate-800 transition-all text-center"
            >
              <div
                className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${gradientClass}`}
              >
                {value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-400 mt-2">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
