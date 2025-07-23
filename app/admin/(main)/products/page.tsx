import apiClient from "@/utils/apiClient";
import Table from "./components/Table";

export default async function ProductsPage() {
  let products: any[] = [];
  try {
    const response = await apiClient.get("products");
    products = response.data || [];
  } catch {
    console.error("err");
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Product Management</h1>
      </div>

      <div className="overflow-x-auto">
        <Table products={products} />
      </div>
    </div>
  );
}
