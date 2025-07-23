import React from "react";
import Header from "./components/Header";
import CartInit from "./components/CartInit";
import AuthInit from "./components/AuthInit";
import { cookies } from "next/headers";
import { custom } from "zod";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const customerToken =  cookies().get("customer_token")?.value;
  return (
    <>
      <Header />
      <AuthInit token={customerToken} />
      <CartInit />
      <main>{children}</main>
    </>
  );
}
