"use client";
import apiClient from "@/utils/apiClient";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Table({ products }: { products: any[] }) {
  const [selectedVariants, setSelectedVariants] = useState<string[]>([]);
  const router = useRouter();
  const handleSelectOrder = (id: string) => {
    setSelectedVariants((prev) =>
      prev.includes(id)
        ? prev.filter((orderId) => orderId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedVariants.length === allVariants.length) {
      setSelectedVariants([]);
    } else {
      setSelectedVariants(
        products.flatMap((p) => p.variants.map((v) => v._id))
      );
    }
  };
  const allVariants = products.flatMap((product) => product?.variants || []);
  const areAllSelected =
    selectedVariants.length === allVariants.length && allVariants.length > 0;
  const deleteVariant = async (id: string) => {
    try {
      await apiClient.delete(`/products/${id}`);
      router.refresh();
    } catch {
      console.error("err");
    }
  };
  const deleteSelectedVariants = async () => {
    try {
      await apiClient.delete("/products", {
        data: {
          ids: selectedVariants,
        },
      });
      router.refresh();
    } catch {
      console.error("err");
    }
  };
  return (
    <div>
      <div className="w-full flex justify-end">
        <button
          onClick={() => deleteSelectedVariants()}
          className="border p-3 self-end rounded-lg"
          disabled={!selectedVariants.length}
        >
          Delete Selected Products
        </button>
      </div>
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 uppercase">
          <tr className="bg-gray-100 border-b">
            <th className="p-3">
              <input
                type="checkbox"
                onChange={handleSelectAll} // you'll define this
                checked={areAllSelected}
              />
            </th>
            <th className="p-3 text-left">Image</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Stock</th>
            <th className="px-4 py-3 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.flatMap((product) =>
            product?.variants.map((variant, i) => (
              <tr key={variant._id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedVariants.includes(variant._id)}
                    onChange={() => handleSelectOrder(variant._id)}
                  />
                </td>
                <td className="p-3">
                  <Image
                    src={`http://localhost:3001/uploads/${variant.images[0]}`}
                    height={60}
                    width={60}
                    alt={product.name}
                  />
                  {/* {variant.images[0]} */}
                </td>
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.category.name}</td>

                <td className="p-3">${variant.price.toFixed(2)}</td>
                <td className="p-3">{variant.stock}</td>
                <td className="px-4 py-3 text-gray-600">
                  <div>
                    {" "}
                    <button
                      className="rounded-lg p-3 border cursor-pointer"
                      onClick={() => deleteVariant(variant._id)}
                    >
                      delete
                    </button>{" "}
                  </div>
                </td>
              </tr>
            ))
          )}

          {products.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-500">
                No products available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
