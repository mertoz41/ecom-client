import apiClient from "@/utils/apiClient";
import Table from "./components/Table";

export default async function ProductsPage() {
  let products: any[] = [];
  console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

  try {
    const response = await apiClient.get("/api/products");
    products = response.data || [];
  } catch (err) {
    console.error(err);
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
