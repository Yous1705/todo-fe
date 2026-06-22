export interface StatItem {
  value: string;
  label: string;
  gradientClass: string;
}

export const stats: StatItem[] = [
  {
    value: "1,250+",
    label: "Tugas Terselesaikan",
    gradientClass: "from-indigo-400 to-indigo-200",
  },
  {
    value: "250+",
    label: "Kategori Terbuat",
    gradientClass: "from-purple-400 to-purple-200",
  },
  {
    value: "92%",
    label: "Tingkat Kesuksesan",
    gradientClass: "from-cyan-400 to-cyan-200",
  },
  {
    value: "500+",
    label: "Sesi Fokus",
    gradientClass: "from-emerald-400 to-emerald-200",
  },
];
