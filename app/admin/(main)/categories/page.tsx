import CategoryTable from "./components/Table";
import apiClient from "@/utils/apiClient";

export default async function Page() {
  let categories: [];
  try {
    const response = await apiClient.get("/categories/");
    categories = response.data;
  } catch {
    console.error("err");
  }

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
      </div>

      <CategoryTable categories={categories} />
    </div>
  );
}
