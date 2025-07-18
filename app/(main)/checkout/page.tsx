"use client";

import { useState } from "react";
import Image from "next/image";

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

export default function CheckoutPage() {
  const [shipping, setShipping] = useState("home");

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      {/* LEFT - FORM */}
      <div className="p-8 space-y-6 bg-white">
        <h1 className="text-2xl font-semibold">Checkout</h1>

        {/* Express */}
        <div className="space-y-2">
          <div className="flex gap-2">
            <button className="w-full bg-yellow-400 py-2 rounded font-semibold">
              PayPal
            </button>
            <button className="w-full bg-black text-white py-2 rounded font-semibold">
              Apple Pay
            </button>
            <button className="w-full bg-gray-100 py-2 rounded font-semibold">
              G Pay
            </button>
          </div>
          <div className="text-center text-sm text-gray-500">OR</div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            defaultValue="josim.design@gmail.com"
            className="w-full border p-3 rounded mt-1"
          />
        </div>

        {/* Shipping address */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="First name" className="border p-3 rounded" />
            <input placeholder="Last name" className="border p-3 rounded" />
          </div>
          <input
            placeholder="Phone number"
            className="border p-3 rounded w-full"
          />
          <input placeholder="Address" className="border p-3 rounded w-full" />
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="City" className="border p-3 rounded" />
            <input placeholder="State" className="border p-3 rounded" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="Country" className="border p-3 rounded" />
            <input placeholder="ZIP code" className="border p-3 rounded" />
          </div>
        </div>

        {/* Shipping method */}
        <div className="space-y-2">
          <p className="font-medium">Shipping method</p>
          <div className="space-y-2">
            <label className="flex items-center gap-3 border rounded p-3 cursor-pointer">
              <input
                type="radio"
                checked={shipping === "home"}
                onChange={() => setShipping("home")}
              />
              <div>
                <p className="font-semibold">Home delivery</p>
                <p className="text-sm text-gray-500">Takes 3–5 business days</p>
              </div>
            </label>

            <label className="flex items-center gap-3 border rounded p-3 cursor-pointer">
              <input
                type="radio"
                checked={shipping === "store"}
                onChange={() => setShipping("store")}
              />
              <div>
                <p className="font-semibold">In-store pickup</p>
                <p className="text-sm text-gray-500">
                  Pick from store location
                </p>
              </div>
            </label>
          </div>
        </div>

        <button className="w-full bg-black text-white py-3 rounded mt-4 font-semibold">
          Continue to Payment
        </button>
      </div>

      {/* RIGHT - SUMMARY */}
      <div className="bg-gray-50 p-8 space-y-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center gap-4 border-b pb-4">
            <Image
              src={item.image}
              alt={item.name}
              width={80}
              height={80}
              className="rounded border"
            />
            <div className="flex-1">
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500">Size: {item.size}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="border rounded px-2">−</button>
              <span>{item.quantity}</span>
              <button className="border rounded px-2">+</button>
            </div>
            <p className="font-semibold">${item.price.toFixed(2)}</p>
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
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-green-600">Free</span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-2">
            <span>Total</span>
            <span>USD ${subtotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
