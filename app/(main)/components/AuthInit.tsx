"use client";

import { useEffect } from "react";

import { useAuthStore } from "@/app/store/authStore";
export default function AuthInit({ token }: { token: string }) {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    if (token) {
      checkAuth("customer");
    }
  }, [checkAuth, token]);

  return null;
}
