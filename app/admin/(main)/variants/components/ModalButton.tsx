"use client";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import VariantModal from "./Modal";
export default function ModalButton() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center cursor-pointer gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        <FaPlus /> add variant
      </button>
      <VariantModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
