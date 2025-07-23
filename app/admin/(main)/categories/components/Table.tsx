"use client";

import Image from "next/image";
import { useState } from "react";
import ModalButton from "./ModalButton";
import { useToastStore } from "@/app/store/toastStore";
import apiClient from "@/utils/apiClient";
import { useRouter } from "next/navigation";
type Category = {
  _id: string;
  name: string;
  image: string;
  description: string;
};

type Props = {
  categories: Category[];
};
export default function CategoryTable({ categories }: Props) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const addToast = useToastStore((state) => state.addToast);
  const router = useRouter();
  const handleSelectOrder = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id)
        ? prev.filter((orderId) => orderId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedCategories.length === categories.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(categories.map((order) => order._id));
    }
  };

  const areAllSelected =
    selectedCategories.length === categories.length && categories.length > 0;

  const deleteSelected = async () => {
    try {
      await apiClient.delete("/categories", {
        data: {
          ids: selectedCategories,
        },
      });
      setSelectedCategories([]);
      addToast({ message: "Categories deleted", type: "success" });

      router.refresh();
    } catch {
      addToast({ message: "Something went wrong", type: "error" });
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      await apiClient.delete(`/categories/${id}`);
      addToast({ message: "Category deleted", type: "success" });

      router.refresh();
    } catch {
      addToast({ message: "Something went wrong", type: "error" });
    }
  };
  return (
    <div className="overflow-x-auto flex flex-col gap-5 rounded-lg shadow">
      <div className="flex gap-5 justify-end">
        <ModalButton />
        <button
          onClick={() => deleteSelected()}
          className="border rounded-lg cursor-pointer p-2"
          disabled={!selectedCategories.length}
        >
          delete selected Categories
        </button>
      </div>
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 uppercase">
          <tr>
            <th className="px-4 py-3 border-b">
              <input
                type="checkbox"
                onChange={handleSelectAll} // you'll define this
                checked={areAllSelected} // this too
              />
            </th>
            <th className="px-4 py-3 border-b">#</th>
            <th className="px-4 py-3 border-b">Image</th>
            <th className="px-4 py-3 border-b">Name</th>
            <th className="px-4 py-3 border-b">Description</th>
            <th className="px-4 py-3 border-b">Variants</th>
            <th className="px-4 py-3 border-b">Primary Variant</th>
            <th className="px-4 py-3 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category._id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2 border">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category._id)}
                  onChange={() => handleSelectOrder(category._id)}
                />
              </td>
              <td className="px-4 py-3">{index + 1}</td>
              <td className="px-4 py-3">
                <Image
                  src={`http://localhost:3001/uploads/categories/${category.image}`}
                  height={60}
                  width={60}
                  alt={category.name}
                  className="w-12 h-12 object-cover rounded"
                />
              </td>
              <td className="px-4 py-3 text-black font-medium">
                {category.name}
              </td>
              <td className="px-4 py-3 text-gray-600">
                {category.description}
              </td>
              <td className="px-4 py-3 text-gray-600">
                {category.variants.map((variant, i) => (
                  <div key={i}>{variant.name}</div>
                ))}
              </td>
              <td className="px-4 py-3 text-gray-600">
                {category.primaryVariant?.name}
              </td>
              <td className="px-4 py-3 text-gray-600">
                <div>
                  {" "}
                  <button
                    className="rounded-lg p-3 border cursor-pointer"
                    onClick={() => deleteCategory(category._id)}
                  >
                    delete
                  </button>{" "}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
