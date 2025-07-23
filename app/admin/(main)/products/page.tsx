import apiClient from "@/utils/apiClient";
import Table from "./components/Table";

export default async function ProductsPage() {
  const response = await apiClient.get("products");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Product Management</h1>
      </div>

      <div className="overflow-x-auto">
        <Table products={response?.data} />
      </div>
    </div>
  );
}
