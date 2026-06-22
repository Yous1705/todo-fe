import React from "react";
import {
  Task,
  Categories,
  Calendar,
  Priority,
  Progress,
  Media,
} from "../lib/icons";

export interface FeatureItem {
  title: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
  iconBackground: string;
  iconHoverBackground: string;
  borderHover: string;
}

export const features: FeatureItem[] = [
  {
    title: "Task Management",
    description:
      "Buat, perbarui, dan kelola tugas Anda dengan mudah. Lengkap dengan transisi status, detail catatan, dan pembaruan state responsif secara real-time.",
    Icon: Task,
    iconBackground: "bg-indigo-50",
    iconHoverBackground: "group-hover:bg-indigo-600",
    borderHover:
      "hover:border-indigo-100/80 hover:shadow-xl hover:shadow-indigo-100/30",
  },
  {
    title: "Kategori Kustom",
    description:
      "Organisasikan daftar tugas Anda ke dalam papan kategori atau kelompok kerja kustom dengan warna tag serta visualisasi penanda yang fleksibel.",
    Icon: Categories,
    iconBackground: "bg-purple-50",
    iconHoverBackground: "group-hover:bg-purple-600",
    borderHover:
      "hover:border-purple-100/80 hover:shadow-xl hover:shadow-purple-100/30",
  },
  {
    title: "Tenggat Waktu",
    description:
      "Pantau setiap pencapaian utama Anda. Penghitungan otomatis akan mengingatkan Anda saat ada tenggat waktu penting yang mendekat.",
    Icon: Calendar,
    iconBackground: "bg-cyan-50",
    iconHoverBackground: "group-hover:bg-cyan-500",
    borderHover:
      "hover:border-cyan-150 hover:shadow-xl hover:shadow-cyan-100/30",
  },
  {
    title: "Tingkat Prioritas",
    description:
      "Tetapkan bobot kepentingan rendah, sedang, atau tinggi. Fokus terlebih dahulu pada tugas berdampak besar dan kesampingkan gangguan lain.",
    Icon: Priority,
    iconBackground: "bg-rose-50",
    iconHoverBackground: "group-hover:bg-rose-500",
    borderHover:
      "hover:border-rose-100/80 hover:shadow-xl hover:shadow-rose-100/30",
  },
  {
    title: "Progress Tracking",
    description:
      "Gunakan metrik visual dan indikator persentase interaktif untuk memonitor intensitas kerja dan menjaga performa harian Anda.",
    Icon: Progress,
    iconBackground: "bg-emerald-50",
    iconHoverBackground: "group-hover:bg-emerald-500",
    borderHover:
      "hover:border-emerald-100/80 hover:shadow-xl hover:shadow-emerald-100/30",
  },
  {
    title: "Lampiran Media",
    description:
      "Sematkan gambar dan dokumentasi penunjang langsung pada daftar periksa Anda untuk menangkap konteks tugas secara utuh.",
    Icon: Media,
    iconBackground: "bg-violet-50",
    iconHoverBackground: "group-hover:bg-violet-600",
    borderHover:
      "hover:border-violet-100/80 hover:shadow-xl hover:shadow-violet-100/30",
  },
];
