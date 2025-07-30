import ProductsContainer from "./components/ProductsContainer";
import FiltersContainer from "./components/FiltersContainer";
import SortButton from "./components/SortButton";
import apiClient from "@/utils/apiClient";
export default async function Home() {
  const response = await apiClient.get("/api/products");

  return (
    <div className="w-full bg-white h-screen overflow-auto py-4">
      <div className="grid px-4 grid-cols-1 md:grid-cols-5 gap-6">
        <div className=" flex  md:col-span-1">
          <aside className=" w-full sticky top-6 self-start">
            <FiltersContainer />
          </aside>
        </div>
        <div className="flex flex-col md:col-span-3 ">
          <div className="sticky mb-5 self-end top-6">
            <SortButton />
          </div>

          <ProductsContainer products={response.data} />
        </div>
      </div>
    </div>
  );
}
