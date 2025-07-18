"use client";

import { useState } from "react";
import Link from "next/link";
type Product = {
  id: number;
  name: string;
  price: number;
  status: "active" | "inactive";
};

const initialProducts: Product[] = [
  { id: 1, name: "T-Shirt", price: 29.99, status: "active" },
  { id: 2, name: "Sneakers", price: 89.99, status: "inactive" },
  { id: 3, name: "Backpack", price: 49.99, status: "active" },
];

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const isAllSelected = selectedIds.length === products.length;

  const toggleAll = () => {
    setSelectedIds(isAllSelected ? [] : products.map((p) => p.id));
  };

  const bulkUpdateStatus = (status: "active" | "inactive") => {
    const updated = products.map((product) =>
      selectedIds.includes(product.id) ? { ...product, status } : product
    );
    setProducts(updated);
    setSelectedIds([]);
  };

  const deleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const editProduct = (id: number) => {
    alert(`Edit product with ID: ${id} (implement form/modal here)`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <div className="flex gap-2">
          <button
            onClick={() => bulkUpdateStatus("active")}
            disabled={selectedIds.length === 0}
            className="px-4 py-1 bg-green-600 text-white rounded disabled:opacity-50"
          >
            Activate
          </button>
          <button
            onClick={() => bulkUpdateStatus("inactive")}
            disabled={selectedIds.length === 0}
            className="px-4 py-1 bg-yellow-500 text-white rounded disabled:opacity-50"
          >
            Deactivate
          </button>
        </div>
        <Link href={"/admin/products/create"}>
          <button>New Product</button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow text-sm">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={toggleAll}
                />
              </th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(product.id)}
                    onChange={() => toggleSelect(product.id)}
                  />
                </td>
                <td className="p-3">{product.name}</td>
                <td className="p-3">${product.price.toFixed(2)}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      product.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="p-3 space-x-2 text-center">
                  <button
                    onClick={() => editProduct(product.id)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
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
    </div>
  );
}
