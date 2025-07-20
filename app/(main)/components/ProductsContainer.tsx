import ProductCard from "./ProductCard";
import apiClient from "@/utils/apiClient";
export default async function ProductsContainer() {
  const response = await apiClient.get("/products");
  // console.log(response.data);
  return (
    <section className="w-full   py-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {response?.data?.flatMap((product) =>
          product.variants.map((variant, i) => (
            <ProductCard
              key={variant._id}
              product={product}
              variant={variant}
            />
          ))
        )}
        {/* <ProductCard /> <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard /> <ProductCard />
        <ProductCard /> */}
      </div>
    </section>
  );
}
