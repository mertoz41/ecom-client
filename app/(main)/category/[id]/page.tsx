import apiClient from "@/utils/apiClient";
import ProductsContainer from "../../components/ProductsContainer";
import FiltersContainer from "../../components/FiltersContainer";
import SortButton from "../../components/SortButton";
import Banner from "./Banner";
export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const response = await apiClient.get(`/categories/${id}/products`);
  return (
    <div className="w-full text-black overflow-auto h-screen bg-white py-4">
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
          <Banner title={response.data.name} bgImg={response.data.image} />
          {response.data?.products.length ? (
            <ProductsContainer products={response.data.products} />
          ) : (
            <div>No products found under {response.data.name} category</div>
          )}
        </div>
      </div>
    </div>
  );
}
