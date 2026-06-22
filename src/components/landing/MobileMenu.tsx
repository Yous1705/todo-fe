import React from "react";
import { Github } from "../../lib/icons";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  onOpenAuth: (type: "login" | "register") => void;
}

export function MobileMenu({ open, onClose, onOpenAuth }: MobileMenuProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="md:hidden mt-3 mx-4 p-4 bg-white/95 backdrop-blur-md rounded-2xl border border-indigo-50 shadow-xl space-y-3">
      <a
        href="#features"
        onClick={onClose}
        className="block px-3 py-2 rounded-xl text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium transition-colors"
      >
        Fitur
      </a>
      <a
        href="#workflow"
        onClick={onClose}
        className="block px-3 py-2 rounded-xl text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium transition-colors"
      >
        Alur Kerja
      </a>
      <a
        href="#stats"
        onClick={onClose}
        className="block px-3 py-2 rounded-xl text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium transition-colors"
      >
        Analitik
      </a>
      <a
        href="#roadmap"
        onClick={onClose}
        className="block px-3 py-2 rounded-xl text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium transition-colors"
      >
        Roadmap
      </a>
      <hr className="border-slate-100" />
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => {
            onClose();
            onOpenAuth("login");
          }}
          className="text-slate-600 font-semibold px-4 py-2"
        >
          Masuk
        </button>
        <button
          onClick={() => {
            onClose();
            onOpenAuth("register");
          }}
          className="bg-indigo-600 text-white font-semibold px-5 py-2.5 rounded-xl text-center"
        >
          Daftar
        </button>
      </div>
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-sm text-slate-400">
        <span>GitHub</span>
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="text-slate-600 hover:text-indigo-600"
          aria-label="GitHub Repository"
        >
          <Github />
        </a>
      </div>
    </div>
  );
}
