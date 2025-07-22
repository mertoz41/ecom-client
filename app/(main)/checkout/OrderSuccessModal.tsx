"use client";
import React from "react";
import { useRouter } from "next/navigation";
interface OrderSuccessModalProps {
  onClose: () => void;
  orderId: string;
}

const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  onClose,
  orderId,
}) => {
  const router = useRouter();
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md text-center animate-fadeIn">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          🎉 Order Placed Successfully!
        </h2>
        <p className="text-gray-700 mb-2">Thank you for your purchase.</p>
        <p className="text-sm text-gray-500 mb-6"></p>
        <button
          onClick={() => {
            router.push(`/order/confirmation/${orderId}`);
            onClose();
          }}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessModal;
