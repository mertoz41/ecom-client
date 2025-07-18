import React from "react";
import Sidebar from "./components/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen ">
      <Sidebar />
      <main className="flex-1 p-6 bg-gradient-to-tr from-blue-100 to-white">
        {children}
      </main>
    </div>
  );
}
