"use client";

import { useEffect } from "react";

import { useAuthStore } from "@/app/store/authStore";
export default function AuthInit() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth("customer");
  }, [checkAuth]);

  return null;
}
