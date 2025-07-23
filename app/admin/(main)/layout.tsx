import React from "react";
import Sidebar from "./components/Sidebar";
import Toast from "@/app/(main)/components/Toast";
import AdminAuthInit from "./components/AdminAuthInit";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen ">
      <Sidebar />
      <Toast />
      <AdminAuthInit />
      <main className="flex-1 p-6 bg-gradient-to-tr overflow-auto from-blue-100 to-white text-black">
        {children}
      </main>
    </div>
  );
}
