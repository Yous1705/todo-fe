"use client";

import React from "react";
import { Github, LogoMark } from "../../lib/icons";
import { MobileMenu } from "./MobileMenu";

interface NavbarProps {
  scrolled: boolean;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  onOpenAuth: (type: "login" | "register") => void;
}

export function Navbar({
  scrolled,
  mobileMenuOpen,
  onToggleMobileMenu,
  onOpenAuth,
}: NavbarProps) {
  return (
    <header
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#0B0F19]/80 backdrop-blur-md shadow-sm border-b border-[#2D3139] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href="#" className="flex items-center space-x-2.5 group">
          <div className="bg-gradient-to-tr from-indigo-500 to-purple-500 p-2 rounded-xl shadow-md shadow-indigo-900/30 group-hover:scale-105 transition-transform">
            <LogoMark />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-100">
            Task
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Flow
            </span>
          </span>
        </a>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-300">
          <a
            href="#features"
            className="hover:text-indigo-600 transition-colors"
          >
            Fitur
          </a>
          <a
            href="#workflow"
            className="hover:text-indigo-600 transition-colors"
          >
            Alur Kerja
          </a>
          <a href="#stats" className="hover:text-indigo-600 transition-colors">
            Analitik
          </a>
          <a
            href="#roadmap"
            className="hover:text-indigo-600 transition-colors"
          >
            Roadmap
          </a>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-slate-300 hover:text-indigo-400 p-2 rounded-full hover:bg-[#151D30] transition-all"
            aria-label="GitHub Repository"
          >
            <Github />
          </a>
          <button
            onClick={() => onOpenAuth("login")}
            className="text-slate-300 hover:text-indigo-400 font-semibold text-sm px-4 py-2 transition-colors"
          >
            Masuk
          </button>
          <button
            onClick={() => onOpenAuth("register")}
            className="bg-[#1976D2] hover:bg-[#2196F3] text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-[#1976D2]/20 hover:shadow-[#1976D2]/30 hover:-translate-y-0.5 transition-all"
          >
            Mulai Free
          </button>
        </div>

        <button
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 rounded-xl bg-[#151D30] text-slate-200 hover:bg-[#23272F] transition-colors"
        >
          {mobileMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      <MobileMenu
        open={mobileMenuOpen}
        onClose={onToggleMobileMenu}
        onOpenAuth={onOpenAuth}
      />
    </header>
  );
}
