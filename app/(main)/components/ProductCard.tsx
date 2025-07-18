import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";

export default function ProductCard() {
  return (
    <div className="max-w-[400px] rounded-lg overflow-hidden cursor-pointer shadow hover:shadow-md border border-gray-100">
      {/* Badge */}
      {/* <div className="p-2">
        <span className="text-xs text-white bg-teal-400 px-2 py-0.5 rounded-md font-medium">
          New Arrival
        </span>
      </div> */}

      {/* Product Image */}
      <Image
        className="w-full object-cover aspect-[3/4]"
        src={"/black.png"}
        width={170}
        height={180}
        alt="productimg"
      />

      {/* Product Info */}
      <div className="p-3 space-y-1">
        <div className="flex justify-between">
          <p className="text-sm text-gray-500">Uniqlo</p>
          <FaRegHeart />
        </div>
        <h3 className="text-sm font-semibold text-gray-800">
          Shirt Soft Cotton
        </h3>
        <div className="flex items-center justify-between text-sm">
          <p className="text-blue-600 font-semibold">SAR 40.00</p>
          <p className="text-red-500 text-xs font-medium">12 items left!</p>
        </div>
      </div>
    </div>
  );
}
