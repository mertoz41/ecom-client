import CategoryTable from "./components/Table";
import apiClient from "@/utils/apiClient";
import ModalButton from "./components/ModalButton";
export default async function Page() {
  let categories: any[] = [];
  try {
    const response = await apiClient.get("/categories/");
    categories = response.data || [];
  } catch {
    console.error("err");
  }

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
      </div>
      <div className="flex gap-5 justify-end">
        <ModalButton />
      </div>
      {categories.length ? <CategoryTable categories={categories} /> : null}
    </div>
  );
}
