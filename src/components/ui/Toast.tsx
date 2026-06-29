import React from "react";

interface ToastProps {
  show: boolean;
  message: string;
  type: "success" | "error" | "info";
}

export function Toast({ show, message, type }: ToastProps) {
  if (!show) {
    return null;
  }

  const tone = {
    success: {
      icon: "✓",
      iconClass: "text-emerald-300",
      containerClass:
        "border-emerald-400/25 bg-[#14231D] shadow-emerald-500/10",
    },
    error: {
      icon: "!",
      iconClass: "text-rose-300",
      containerClass: "border-rose-400/25 bg-[#26161C] shadow-rose-500/10",
    },
    info: {
      icon: "i",
      iconClass: "text-sky-300",
      containerClass: "border-sky-400/25 bg-[#111C2E] shadow-sky-500/10",
    },
  }[type];

  return (
    <div
      className={`fixed bottom-5 right-5 z-[60] flex items-center space-x-3 border px-5 py-4 rounded-2xl shadow-2xl animate-float-fast transition-all duration-300 ${tone.containerClass}`}
    >
      <div className="text-xl flex-shrink-0">
        <span className={`font-bold ${tone.iconClass}`}>{tone.icon}</span>
      </div>
      <p className="text-sm font-semibold text-slate-100">{message}</p>
    </div>
  );
}
