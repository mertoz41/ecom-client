import React from "react";
import Header from "./components/Header";
import CartInit from "./components/CartInit";
import AuthInit from "./components/AuthInit";
import { cookies } from "next/headers";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const customerToken = cookieStore.get("customer_token")?.value;
  
  return (
    <>
      <Header />
      <AuthInit token={customerToken} />
      <CartInit />
      <main>{children}</main>
    </>
  );
}
