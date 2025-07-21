import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";

export default function ProductCard({
  product,
  variant,
}: {
  product: any;
  variant: any;
}) {
  console.log("PROD", product);
  console.log("VARIANT", variant);
  return (
    <div className="max-w-[400px] rounded-lg overflow-hidden cursor-pointer shadow hover:shadow-md border border-gray-100">
      <Image
        className="w-full object-cover aspect-[3/4]"
        src={`http://localhost:3001/uploads/${variant.images[0]}`}
        width={170}
        height={180}
        alt="productimg"
      />

      {/* Product Info */}
      <div className="p-3 space-y-1">
        <div className="flex justify-between">
          <p className="text-sm text-gray-500">{product.name}</p>
          <FaRegHeart />
        </div>
        <h3 className="text-sm font-semibold text-gray-800">
          {product.description}
        </h3>
        <div className="flex items-center justify-between text-sm">
          <p className="text-blue-600 font-semibold">{variant.price}</p>
          <p className="text-red-500 text-xs font-medium">
            {variant.stock} items left!
          </p>
        </div>
      </div>
    </div>
  );
}
