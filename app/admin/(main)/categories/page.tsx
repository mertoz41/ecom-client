import CategoryTable from "./components/Table";
import apiClient from "@/utils/apiClient";
import Table from "../components/Table";
import ModalButton from "./components/ModalButton";
export default async function Page() {
  let categories: [];
  try {
    const response = await apiClient.get("/categories");
    categories = response.data;
  } catch {
    console.error("err");
  }
  const categoryHeaders = ["Image", "Name", "Description"];

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <ModalButton />
      </div>
      {/* <Table
        data={categories}
        headers={categoryHeaders}
        imageFields={["image"]}
        usage="categories"
      /> */}
      <CategoryTable categories={categories} />
    </div>
  );
}
