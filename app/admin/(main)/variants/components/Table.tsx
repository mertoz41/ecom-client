"use client";
import apiClient from "@/utils/apiClient";
import { useRouter } from "next/navigation";
import { useToastStore } from "@/app/store/toastStore";
export default function Table({ variants }: { variants: any[] }) {
  const router = useRouter();
  const addToast = useToastStore((state) => state.addToast);
  const deleteVariant = async (id: string) => {
    try {
      await apiClient.delete(`/categoryVariants/${id}`);
      addToast({ message: "Variant deleted!", type: "success" });
      router.refresh();
    } catch {
      addToast({ message: "Something went wrong", type: "error" });
    }
  };
  return (
    <table className="min-w-full text-sm text-left">
      <thead className="bg-gray-100 text-gray-700 uppercase">
        <tr>
          <th className="px-4 py-3 border-b">
            <input
              type="checkbox"
              //   onChange={handleSelectAll} // you'll define this
              //   checked={areAllSelected} // this too
            />
          </th>
          <th className="px-4 py-3 border-b">Name</th>
          <th className="px-4 py-3 border-b">Options</th>
          <th className="px-4 py-3 border-b">actions</th>
        </tr>
      </thead>
      <tbody>
        {variants.map((variant, index) => (
          <tr key={variant._id} className="border-b hover:bg-gray-50">
            <td className="px-4 py-2 border">
              <input
                type="checkbox"
                //   checked={selectedCategories.includes(category._id)}
                //   onChange={() => handleSelectOrder(category._id)}
              />
            </td>
            <td className="px-4 py-3 text-black font-medium">{variant.name}</td>
            <td className="px-4 py-3 text-gray-600">{variant.options}</td>

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
        ))}
      </tbody>
    </table>
  );
}
