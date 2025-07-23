import React from "react";
import Header from "./components/Header";
import CartInit from "./components/CartInit";
import AuthInit from "./components/AuthInit";
import Toast from "./components/Toast";
export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <Toast />
      <CartInit />
      <AuthInit />
      <main>{children}</main>
    </>
  );
}
