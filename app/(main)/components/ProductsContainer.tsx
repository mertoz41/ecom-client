import ProductCard from "./ProductCard";
export default function ProductsContainer({ products }: { products: any[] }) {
  return (
    <section className="w-full   py-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products?.flatMap((product) =>
          product.variants.map((variant, i) => (
            <ProductCard
              key={variant._id}
              product={product}
              variant={variant}
            />
          ))
        )}
      </div>
    </section>
  );
}
