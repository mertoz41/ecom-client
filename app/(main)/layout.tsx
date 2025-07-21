import React from "react";
import Header from "./components/Header";
import CartInit from "./components/CartInit";
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {/* <CartInit /> */}
      <main>{children}</main>
    </>
  );
}
