"use client";

import { useEffect } from "react";

import { useCartStore } from "@/app/store/cartStore";
export default function CartInit() {
  const fetchCart = useCartStore((state) => state.fetchCart);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return null;
}
