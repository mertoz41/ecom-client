"use client";
import { useState, ReactElement, cloneElement } from "react";
import { FaPlus } from "react-icons/fa6";

type ModalButtonProps = {
  label: string;
  modal: ReactElement<any>; // allow any props
};

export default function ModalButton({ label, modal }: ModalButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center cursor-pointer gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        <FaPlus /> add {label}
      </button>

      {cloneElement(modal, {
        isOpen,
        onClose: handleClose,
      })}
    </div>
  );
}
