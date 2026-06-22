import React from "react";
import { features } from "../../constants/features";

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-white relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-50/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-sm font-extrabold tracking-widest text-indigo-600 uppercase">
            Fitur Berkelas Startup
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Didesain dengan Kejelasan Visual & Presisi
          </p>
          <p className="text-slate-500 text-base sm:text-lg">
            Hilangkan tumpukan daftar tugas yang membosankan. TaskFlow hadir
            dengan arsitektur canggih yang dirancang selayaknya produk SaaS siap
            rilis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(
            ({
              title,
              description,
              Icon,
              iconBackground,
              iconHoverBackground,
              borderHover,
            }) => (
              <div
                key={title}
                className={`group p-8 rounded-3xl bg-slate-50 hover:bg-white border border-slate-100 ${borderHover} transition-all duration-300 transform hover:-translate-y-1`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl ${iconBackground} ${iconHoverBackground} flex items-center justify-center transition-colors duration-300`}
                >
                  <Icon />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">
                  {title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
