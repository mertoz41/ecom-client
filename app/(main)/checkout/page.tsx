"use client";
import Form from "./Form";
import { useState } from "react";
import CartItems from "./CartItems";
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
    <div className="grid grid-cols-1 text-black lg:grid-cols-2 min-h-screen">
      {/* LEFT - FORM */}
      <div className="p-8 space-y-6 bg-white">
        <h1 className="text-2xl font-semibold">Checkout</h1>

        {/* Email */}
        {/* <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            defaultValue="josim.design@gmail.com"
            className="w-full border p-3 rounded mt-1"
          />
        </div> */}
        <Form />
        {/* Shipping address */}
        {/* <div className="space-y-4">
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
        </div> */}

        {/* Shipping method */}
        

       
      </div>

      {/* RIGHT - SUMMARY */}
      <CartItems />
    </div>
  );
}
