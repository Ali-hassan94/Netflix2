"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export function useAuthGuard() {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user || !user.activeProfile) {
      router.push("/login");
    }
  }, [user]);
}
