import ProductCard from "./ProductCard";

export default function ProductsContainer({ products }: { products?: any[] }) {
  return (
    <div className="flex-1 max-w-6xl">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 px-4">
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
    </div>
  );
}
