"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { Toast } from "@/components/ui/Toast";

type ToastType = "success" | "error" | "info";

type ToastState = {
  show: boolean;
  message: string;
  type: ToastType;
};

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useAppToast() {
  return useContext(ToastContext);
}

export function AntdAppProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: "",
    type: "success",
  });

  const showToast = useCallback(
    (message: string, type: ToastType = "success") => {
      setToast({ show: true, message, type });
      window.setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
      }, 4000);
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast show={toast.show} message={toast.message} type={toast.type} />
      {children}
    </ToastContext.Provider>
  );
}
