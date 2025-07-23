import React from "react";
import Header from "./components/Header";
import CartInit from "./components/CartInit";
import AuthInit from "./components/AuthInit";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <CartInit />
      <AuthInit />
      <main>{children}</main>
    </>
  );
}
