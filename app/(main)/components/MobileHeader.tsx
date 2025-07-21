"use client";

import { FaBars, FaSearch, FaShoppingCart, FaWallet } from "react-icons/fa";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import CartDrawer from "./CartDrawer";
import Image from "next/image";
import Link from "next/link";

export default function MobileHeader({ categories }: { categories: any }) {
  return (
    <header className=" px-3 py-2 mt-5 border border-gray-300 rounded-full flex items-center justify-between w-full max-w-sm mx-auto">
      {/* Left: Menu Dropdown + Logo */}
      <div className="flex items-center gap-2 relative">
        <Menu as="div" className="relative inline-block self-center text-left">
          <MenuButton className=" cursor-pointer">
            <FaBars className="w-5 h-5 self-center" />
          </MenuButton>

          <MenuItems className="absolute left-0 z-50 mt-2 w-48 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {categories.map((category) => (
                <MenuItem key={category._id}>
                  {({ active }) => (
                    <Link
                      href={`/category/${category._id}`}
                      className={`block px-4 py-2 text-sm ${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      }`}
                    >
                      {category.name}
                    </Link>
                  )}
                </MenuItem>
              ))}
            </div>
          </MenuItems>
        </Menu>

        <Image
          src="/dark_gear.gif"
          alt="User"
          width={24}
          height={24}
          className="rounded-full self-center object-cover"
        />
      </div>

      {/* Right: Action Icons */}
      <div className="flex items-center gap-2">
        <IconButton>
          <FaSearch className="w-4 h-4" />
        </IconButton>
        <div className="bg-white text-black rounded-full">
          <CartDrawer buttonSize={16} />
        </div>
      </div>
    </header>
  );
}

function IconButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="bg-white text-black rounded-full p-2 flex items-center justify-center">
      {children}
    </button>
  );
}
