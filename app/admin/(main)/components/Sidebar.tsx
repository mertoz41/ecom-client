"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/app/store/authStore";
import { useRouter } from "next/navigation";
const navItems = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Products", path: "/admin/products" },
  { name: "Orders", path: "/admin/orders" },
  { name: "Categories", path: "/admin/categories" },
  { name: "Variants", path: "/admin/variants" },
  { name: "Users", path: "/admin/users" },

];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  return (
    <aside className="w-64 bg-gray-800 flex flex-col justify-between text-white p-4">
      <div>
        <h1 className="text-xl font-bold mb-6">Admin Panel</h1>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`block px-4 py-2 rounded hover:bg-gray-700 ${
                pathname === item.path ? "bg-gray-700 font-semibold" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex flex-col gap-5">
        <button
          className="border border-gray-100 rounded-lg px-4 py-2 cursor-pointer"
          onClick={() => {
            router.push("/admin/products/create");
          }}
        >
          Add New Product
        </button>
        <button
          onClick={() => {
            logout("token");
            router.push("/admin/login");
          }}
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
