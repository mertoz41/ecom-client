"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import apiClient from "@/utils/apiClient";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToastStore } from "@/app/store/toastStore";

const variantSchema = z.object({
  name: z.string().min(1, "Name is required"),
  options: z
    .array(z.string().min(1, "Option cannot be empty"))
    .default([]) // makes sure it's always at least an empty array
    .refine((val) => val.length > 0, {
      message: "Options are required",
    }),
});

type VariantFormData = z.infer<typeof variantSchema>;

type Props = {
  isOpen?: boolean;
  onClose?: () => void;
};

export default function VariantModal({ isOpen, onClose }: Props) {
  const router = useRouter();
  const addToast = useToastStore((s) => s.addToast);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(variantSchema),
    defaultValues: {
      name: "",
      options: [],
    },
  });

  const onSubmit = async (data: VariantFormData) => {
    try {
      await apiClient.post("/api/categoryVariants", data);
      onClose();
      addToast({ message: "Variant created!", type: "success" });
      reset();
      router.refresh();
    } catch {
      addToast({ message: "Something went wrong", type: "error" });
    }
  };
  const [optionInput, setOptionInput] = useState("");
  const options = watch("options");

  const addOption = () => {
    const trimmed = optionInput.trim();
    if (trimmed && !options?.includes(trimmed)) {
      setValue("options", [...options, trimmed], { shouldValidate: true });
      setOptionInput("");
    }
  };

  const removeOption = (optToRemove: string) => {
    setValue(
      "options",
      options?.filter((opt) => opt !== optToRemove),
      { shouldValidate: true }
    );
  };

  const onEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addOption();
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/25 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg relative">
        <button
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-semibold mb-4">Add New Category Variant</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              {...register("name")}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          <label htmlFor="option-input" className="block font-medium">
            Add Option
          </label>
          <div className="flex gap-2">
            <input
              id="option-input"
              type="text"
              value={optionInput}
              onChange={(e) => setOptionInput(e.target.value)}
              // onKeyDown={(e) => {
              //   if (e.key === "Enter") {
              //     e.preventDefault();
              //     addOption();
              //   }
              // }}
              placeholder="Enter option and press Enter"
              className="border rounded px-3 py-2 flex-grow"
            />
            <button
              onClick={addOption}
              type="button"
              className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>

          {/* Display added options */}
          <div className="flex flex-wrap gap-2">
            {options?.map((opt) => (
              <div
                key={opt}
                className="flex items-center gap-1 bg-gray-200 px-3 py-1 rounded"
              >
                <span>{opt}</span>
                <button
                  onClick={() => removeOption(opt)}
                  className="text-red-600 font-bold hover:text-red-800"
                  aria-label={`Remove option ${opt}`}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
