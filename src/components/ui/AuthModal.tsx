import React from "react";

interface AuthModalProps {
  type: "login" | "register";
  onClose: () => void;
  onToggleType: (type: "login" | "register") => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export function AuthModal({
  type,
  onClose,
  onToggleType,
  onSubmit,
}: AuthModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-all">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-slate-100 transform scale-100 transition-transform">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="text-xl font-bold text-slate-950">
                {type === "login"
                  ? "Selamat Datang Kembali!"
                  : "Mulai Bersama Kami"}
              </h4>
              <p className="text-xs text-slate-400">
                {type === "login"
                  ? "Masuk untuk mengakses workspace Anda"
                  : "Buat akun gratis dalam hitungan detik"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
              aria-label="Tutup modal"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            {type === "register" && (
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                  Nama Lengkap
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Jane Doe"
                  className="w-full bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                Alamat Email
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="nama@perusahaan.com"
                className="w-full bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                Kata Sandi
              </label>
              <input
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none"
              />
            </div>

            {type === "register" && (
              <div className="flex items-start">
                <input
                  type="checkbox"
                  required
                  id="terms"
                  className="mt-1 h-4 w-4 text-indigo-600 border-slate-200 rounded focus:ring-indigo-500"
                />
                <label
                  htmlFor="terms"
                  className="ml-2 text-xs text-slate-400 leading-normal"
                >
                  Saya menyetujui ketentuan layanan dan kebijakan sistem
                  TaskFlow.
                </label>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-indigo-100 transition-all text-sm mt-2"
            >
              {type === "login" ? "Masuk ke Workspace" : "Daftar Akun Gratis"}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400">
            {type === "login" ? (
              <p>
                Belum memiliki akun?{" "}
                <button
                  onClick={() => onToggleType("register")}
                  className="text-indigo-600 font-bold hover:underline"
                >
                  Daftar gratis
                </button>
              </p>
            ) : (
              <p>
                Sudah memiliki akun?{" "}
                <button
                  onClick={() => onToggleType("login")}
                  className="text-indigo-600 font-bold hover:underline"
                >
                  Masuk di sini
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
