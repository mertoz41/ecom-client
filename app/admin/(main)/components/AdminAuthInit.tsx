"use client";

import { useEffect } from "react";

import { useAuthStore } from "@/app/store/authStore";
export default function AdminAuthInit() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    const customerToken = getCookie("token");
    if (customerToken) {
      checkAuth("admin");
    }
  }, [checkAuth]);

  return null;
}

function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() ?? null;
  return null;
}
