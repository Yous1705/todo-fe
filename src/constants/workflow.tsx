import React from "react";

export interface WorkflowStep {
  title: string;
  description: string;
  iconBackground: string;
  badgeBackground: string;
  icon: React.ReactNode;
}

export const workflowSteps: WorkflowStep[] = [
  {
    title: "Buat Tugas",
    description:
      "Tulis daftar kegiatan, berikan detail deskripsi, tag, dan tingkat kepentingan tugas.",
    iconBackground: "bg-indigo-50",
    badgeBackground: "bg-indigo-600",
    icon: (
      <svg
        className="w-8 h-8 text-indigo-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  {
    title: "Petakan Kategori",
    description:
      "Kelompokkan pekerjaan ke dalam papan kategori khusus untuk merapikan workspace Anda.",
    iconBackground: "bg-purple-50",
    badgeBackground: "bg-purple-600",
    icon: (
      <svg
        className="w-8 h-8 text-purple-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
  },
  {
    title: "Pantau Progress",
    description:
      "Gunakan metrik visual informatif untuk memastikan perkembangan target harian terjaga.",
    iconBackground: "bg-cyan-50",
    badgeBackground: "bg-cyan-500",
    icon: (
      <svg
        className="w-8 h-8 text-cyan-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z"
        />
      </svg>
    ),
  },
  {
    title: "Pencapaian Selesai",
    description:
      "Selesaikan setiap item tugas dengan klik konfirmasi dan simpan riwayat produktivitas.",
    iconBackground: "bg-emerald-50",
    badgeBackground: "bg-emerald-500",
    icon: (
      <svg
        className="w-8 h-8 text-emerald-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
];
