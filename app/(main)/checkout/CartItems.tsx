import Image from "next/image";
import { useCartStore } from "@/app/store/cartStore";
const cartItems = [
  {
    id: 1,
    name: "The Quilted Pop-Over In Multiple Color",
    price: 240,
    quantity: 2,
    size: "XL",
    image: "/images/shirt1.jpg",
  },
  {
    id: 2,
    name: "The Corduroy Hoodie",
    price: 110,
    quantity: 1,
    size: "XL",
    image: "/images/shirt2.jpg",
  },
  {
    id: 3,
    name: "The Worker Wool Jacket in Light Grey",
    price: 100,
    quantity: 1,
    size: "XL",
    image: "/images/shirt3.jpg",
  },
];
export default function CartItems() {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const cart = useCartStore((state) => state.cart);
  console.log(cart);
  return (
    <div className="bg-gray-50 p-8 space-y-6">
      {cart?.items?.map((item) => (
        <div
          key={item.variant._id}
          className="flex items-center gap-4 border-b pb-4"
        >
          <Image
            src={`http://localhost:3001/uploads/${item.variant.images[0]}`}
            alt={`product-${item.variant._id}`}
            width={80}
            height={80}
            className="rounded border"
          />
          <div className="flex-1">
            <p className="font-semibold">{item.variant.product.name}</p>
            <p className="text-sm text-gray-500">Size: {item.size}</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="border rounded px-2">−</button>
            <span>{item.quantity}</span>
            <button className="border rounded px-2">+</button>
          </div>
          <p className="font-semibold">${item.variant.price}</p>
        </div>
      ))}

      {/* Discount */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Discount code or gift card"
          className="flex-1 border p-2 rounded"
        />
        <button className="bg-gray-800 text-white px-4 rounded">Apply</button>
      </div>

      {/* Summary */}
      <div className="space-y-1 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${cart?.subTotal}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="text-green-600">Free</span>
        </div>
        <div className="flex justify-between font-bold text-lg pt-2">
          <span>Total</span>
          <span>USD ${cart?.subTotal}</span>
        </div>
      </div>
    </div>
  );
}
