"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import apiClient from "@/utils/apiClient";
import { useRouter } from "next/navigation";

const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  image: z
    .custom<FileList>(
      (files) => files instanceof FileList && files.length > 0,
      {
        message: "Image is required",
      }
    )
    .nullable(),
});

type CategoryFormData = z.infer<typeof categorySchema>;

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CategoryModal({ isOpen, onClose }: Props) {
  const router = useRouter();

  if (!isOpen) return null;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(categorySchema),
  });

  const onSubmit = async (data: CategoryFormData) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      if (data.description) formData.append("description", data.description);
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]); // data.image is FileList from react-hook-form
      }
      await apiClient.post("/categories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      onClose();
      router.refresh();
    } catch {
      console.log("error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/25 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg relative">
        <button
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
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
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
              {...register("description")}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Image</label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="w-full"
            />
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
