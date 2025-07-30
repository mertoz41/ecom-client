"use client";

import { useEffect } from "react";

import { useAuthStore } from "@/app/store/authStore";
export default function AdminAuthInit({ token }: { token: string }) {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    if (token) {
      checkAuth();
    }
  }, [checkAuth, token]);

  return null;
}
