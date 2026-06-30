import React from "react";
import { roadmapItems } from "../../constants/roadmap";

export function RoadmapSection() {
  return (
    <section id="roadmap" className="py-24 bg-[#0B0F19] relative">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-purple-50/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-300">
            Product Pipeline
          </span>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Roadmap Masa Depan
          </h3>
          <p className="text-slate-400 text-sm sm:text-base">
            Rencana rilis fitur canggih berikutnya yang dijadwalkan pada rilis
            mendatang di tahun 2026.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {roadmapItems.map(
            ({
              quarter,
              title,
              description,
              stage,
              icon: Icon,
              badgeBg,
              badgeText,
            }) => (
              <div
                key={title}
                className="p-6 rounded-2xl border border-[#2D3139] hover:border-indigo-300/40 bg-[#151D30] hover:bg-[#23272F] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md bg-indigo-50 text-indigo-700">
                    {quarter}
                  </span>
                  <h4 className="font-bold text-white mt-4 mb-2 flex items-center space-x-2">
                    <span className={`p-1 rounded ${badgeBg} ${badgeText}`}>
                      <Icon className="w-5 h-5" />
                    </span>
                    <span>{title}</span>
                  </h4>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {description}
                  </p>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase mt-4">
                  {stage}
                </span>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
