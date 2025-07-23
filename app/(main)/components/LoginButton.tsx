"use client";
import { useAuthStore } from "@/app/store/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";

export default function LoginButton({ token }: { token: string }) {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const handleLogout = async () => {
    // Replace this with your logout logic
    await logout("customer");
    router.push("/");
    // await logout(); router.push('/');
  };
  const handleLogin = () => router.push("/login");
  const handleProfile = () => router.push("/profile");

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        {user ? user.firstName : "Login"}
      </MenuButton>

      <MenuItems className="absolute right-0 mt-2 w-40 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
        {user ? (
          <>
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={handleProfile}
                  className={`${
                    active ? "bg-gray-100" : ""
                  } w-full text-left px-4 py-2 text-sm`}
                >
                  Go to Profile
                </button>
              )}
            </MenuItem>
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={handleLogout}
                  className={`${
                    active ? "bg-gray-100" : ""
                  } w-full text-left px-4 py-2 text-sm`}
                >
                  Logout
                </button>
              )}
            </MenuItem>
          </>
        ) : (
          <MenuItem>
            {({ active }) => (
              <button
                onClick={handleLogin}
                className={`${
                  active ? "bg-gray-100" : ""
                } w-full text-left px-4 py-2 text-sm`}
              >
                Login
              </button>
            )}
          </MenuItem>
        )}
      </MenuItems>
    </Menu>
  );
}
