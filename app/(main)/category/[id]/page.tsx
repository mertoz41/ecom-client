import apiClient from "@/utils/apiClient";
import ProductsContainer from "../../components/ProductsContainer";
export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const response = await apiClient(`/categories/${id}`);

  return (
    <div>
      <ProductsContainer products={response.data} />
    </div>
  );
}
