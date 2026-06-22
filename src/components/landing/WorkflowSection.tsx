import React from "react";
import { workflowSteps } from "../../constants/workflow";

export function WorkflowSection() {
  return (
    <section
      id="workflow"
      className="py-24 bg-gradient-to-b from-slate-50 via-indigo-50/20 to-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-sm font-extrabold tracking-widest text-indigo-600 uppercase">
            Workspace Terintegrasi
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Alur Kerja Intuitif dalam 4 Langkah
          </p>
          <p className="text-slate-500 text-base sm:text-lg">
            Dirancang secara sistematis untuk mendukung perjalanan produktivitas
            profesional Anda dengan maksimal.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-1 bg-gradient-to-r from-indigo-100 via-purple-100 to-cyan-100 transform -translate-y-1/2 -z-10" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflowSteps.map((step, index) => (
              <div
                key={step.title}
                className="relative bg-white p-8 rounded-3xl border border-slate-100 shadow-md hover:shadow-lg transition-all text-center"
              >
                <span
                  className={`absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full ${step.badgeBackground} text-white font-bold text-sm flex items-center justify-center`}
                >
                  {index + 1}
                </span>
                <div
                  className={`w-16 h-16 mx-auto rounded-2xl ${step.iconBackground} flex items-center justify-center mb-6`}
                >
                  {step.icon}
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">
                  {step.title}
                </h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
