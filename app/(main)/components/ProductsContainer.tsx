import ProductCard from "./ProductCard";

export default function ProductsContainer() {
  return (
    <section className="w-full   py-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard /> <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard /> <ProductCard />
        <ProductCard />
      </div>
    </section>
  );
}
