import React from "react";
import { Bell, Video, Sparkles, Users } from "../lib/icons";

export interface RoadmapItem {
  quarter: string;
  title: string;
  description: string;
  stage: string;
  icon: React.ComponentType<{ className?: string }>;
  badgeBg: string;
  badgeText: string;
}

export const roadmapItems: RoadmapItem[] = [
  {
    quarter: "Q3 2026",
    title: "Lampiran Video",
    description:
      "Dukungan unggah klip video singkat sebagai materi pendukung tugas Anda.",
    stage: "Tahap Desain",
    icon: Video,
    badgeBg: "bg-indigo-100",
    badgeText: "text-indigo-600",
  },
  {
    quarter: "Q3 2026",
    title: "Tampilan Kalender",
    description:
      "Sistem kalender terintegrasi yang memudahkan pengeseran tanggal target lewat drag-and-drop.",
    stage: "Rencana Awal",
    icon: () => (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    badgeBg: "bg-purple-50",
    badgeText: "text-purple-700",
  },
  {
    quarter: "Q4 2026",
    title: "Notifikasi Pintar",
    description:
      "Pengingat otomatis di browser atau desktop sebelum waktu pengerjaan tugas berakhir.",
    stage: "Daftar Backlog",
    icon: Bell,
    badgeBg: "bg-cyan-100",
    badgeText: "text-cyan-600",
  },
  {
    quarter: "Q4 2026",
    title: "Saran Berbasis AI",
    description:
      "Rekomendasi urutan prioritas kerja terpintar berdasarkan pola aktivitas harian Anda.",
    stage: "Tahap Analisis",
    icon: Sparkles,
    badgeBg: "bg-emerald-100",
    badgeText: "text-emerald-600",
  },
  {
    quarter: "Q1 2027",
    title: "Kolaborasi Tim",
    description:
      "Fitur berbagi papan workspace serta pendelegasian tugas secara fleksibel bersama rekan kerja.",
    stage: "Draft Desain",
    icon: Users,
    badgeBg: "bg-rose-100",
    badgeText: "text-rose-600",
  },
];
