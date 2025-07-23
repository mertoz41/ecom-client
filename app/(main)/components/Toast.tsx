"use client";
import { useToastStore } from "@/app/store/toastStore";

export default function Toast() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`w-80 p-4 rounded-xl shadow-lg text-white flex justify-between items-start gap-2 transition-all
            ${toast.type === "success" && "bg-green-500"}
            ${toast.type === "error" && "bg-red-500"}
            ${toast.type === "info" && "bg-blue-500"}`}
        >
          <span>{toast.message}</span>
          <button onClick={() => removeToast(toast.id)}>
            {/* <XMarkIcon className="w-4 h-4" /> */}
          </button>
        </div>
      ))}
    </div>
  );
}
