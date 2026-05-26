"use client";

import LeftSideImage from "@/components/layout/login/LeftSideImage";
import { SignInForm } from "@/components/layout/login/SignInForm";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !loading) {
      router.push("/favorites");
    }
  }, [user, loading, router]);

  // Jika masih loading atau sudah ada user, jangan render halaman login
  if (loading || user) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-[#131313]">
      <div className="flex flex-col md:flex-row h-screen overflow-hidden">
        {/* left side */}
        <div className="hidden md:flex md:w-3/5 lg:w-2/3 relative overflow-hidden items-center justify-center p-20">
          <LeftSideImage />
        </div>

        {/* right side*/}
        <div className="flex-1 flex md:flex items-center justify-center">
          <div className="absolute top-2 right-2">
            <AnimatedThemeToggler className="border-gray-200 dark:border-gray-700/70" />
          </div>
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
