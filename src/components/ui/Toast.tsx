import React from "react";

interface ToastProps {
  show: boolean;
  message: string;
  type: "success" | "info";
}

export function Toast({ show, message, type }: ToastProps) {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center space-x-3 bg-white border border-indigo-100 px-5 py-4 rounded-2xl shadow-2xl animate-float-fast transition-all duration-300">
      <div className="text-xl">
        {type === "success" ? (
          <span className="text-emerald-500 font-bold">✓</span>
        ) : (
          <span className="text-indigo-500 font-bold">i</span>
        )}
      </div>
      <p className="text-sm font-semibold text-slate-800">{message}</p>
    </div>
  );
}
