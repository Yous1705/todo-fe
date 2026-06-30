"use client";

import React, { useEffect, useState } from "react";
import "../styles/animations.css";
import { Navbar } from "../components/landing/Navbar";
import { HeroSection } from "../components/landing/HeroSection";
import { FeaturesSection } from "../components/landing/FeaturesSection";
import { WorkflowSection } from "../components/landing/WorkflowSection";
import { StatsSection } from "../components/landing/StatsSection";
import { RoadmapSection } from "../components/landing/RoadmapSection";
import { CTASection } from "../components/landing/CTASection";
import { Footer } from "../components/landing/Footer";
import { Toast } from "../components/ui/Toast";
import { AuthModal } from "../components/ui/AuthModal";
import { useAuth } from "@/hooks/useAuth";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";

type AuthType = "login" | "register";

type ToastState = {
  show: boolean;
  message: string;
  type: "success" | "info";
};

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalType, setAuthModalType] = useState<AuthType>("login");
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: "",
    type: "success",
  });
  const { login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const triggerToast = (
    message: string,
    type: "success" | "info" = "success",
  ) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 4000);
  };

  const handleAuthSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      if (authModalType === "login") {
        const result = await authService.login({
          email: formData.get("email") as string,
          password: formData.get("password") as string,
        });

        login(result.access_token);

        triggerToast("Berhasil masuk ke workspace TaskFlow!", "success");
        setAuthModalOpen(false);

        router.push("/todo");
      } else {
        await authService.register({
          name: formData.get("name") as string,
          email: formData.get("email") as string,
          password: formData.get("password") as string,
        });

        triggerToast("Akun berhasil dibuat, silakan login.", "success");

        setAuthModalType("login");
        return;
      }

      setAuthModalOpen(false);
    } catch (error: any) {
      triggerToast(
        error.response?.data?.message || "Terjadi kesalahan.",
        "info",
      );
      console.log("error response: ", error.response?.data);
      console.log("error: ", error);
    }
  };

  const handleOpenAuth = (type: AuthType) => {
    setAuthModalType(type);
    setAuthModalOpen(true);
  };

  const handleToggleMobileMenu = () => {
    setMobileMenuOpen((current) => !current);
  };

  return (
    <div className="bg-[#0B0F19] text-slate-200 font-sans min-h-screen relative selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      <Toast show={toast.show} message={toast.message} type={toast.type} />
      <Navbar
        scrolled={scrolled}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={handleToggleMobileMenu}
        onOpenAuth={handleOpenAuth}
      />
      <HeroSection onOpenAuth={handleOpenAuth} />
      <FeaturesSection />
      <WorkflowSection />
      <StatsSection />
      <RoadmapSection />
      <CTASection onOpenAuth={handleOpenAuth} />
      <Footer />
      {authModalOpen && (
        <AuthModal
          type={authModalType}
          onClose={() => setAuthModalOpen(false)}
          onToggleType={setAuthModalType}
          onSubmit={handleAuthSubmit}
        />
      )}
    </div>
  );
}
