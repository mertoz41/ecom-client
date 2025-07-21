import ProductCard from "./ProductCard";
import { FaRegHeart } from "react-icons/fa";
import Image from "next/image";
export default function ProductsContainer({ products }: { products?: any[] }) {
  return (
    <div className="flex-1 max-w-6xl">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 px-4">
        {Array.from({ length: 16 }).map((_, i) => (
          <StaticCard key={i} />
        ))}
        {/* {products?.flatMap((product) =>
          product.variants.map((variant, i) => (
            <ProductCard
              key={variant._id}
              product={product}
              variant={variant}
            />
          ))
        )} */}
      </div>
    </div>
  );
}

const StaticCard = () => (
  <div className="max-w-[400px] rounded-lg overflow-hidden cursor-pointer shadow hover:shadow-md border border-gray-100">
    <Image
      className="w-full object-cover aspect-[3/4]"
      src={`/oxford.webp`}
      width={170}
      height={180}
      alt="productimg"
    />

    {/* Product Info */}
    <div className="p-3 space-y-1">
      <div className="flex justify-between">
        <p className="text-sm text-gray-500">Adidas</p>
        <FaRegHeart />
      </div>
      <h3 className="text-sm font-semibold text-gray-800">
        adidas is a very good looking shoe
      </h3>
      <div className="flex items-center justify-between text-sm">
        <p className="text-blue-600 font-semibold">255</p>
        <p className="text-red-500 text-xs font-medium">48 items left!</p>
      </div>
    </div>
  </div>
);
