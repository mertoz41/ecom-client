"use client";
import Image from "next/image";
import { useState } from "react";
export default function Table({ orders }: { orders: any[] }) {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const handleSelectOrder = (id: string) => {
    setSelectedOrders((prev) =>
      prev.includes(id)
        ? prev.filter((orderId) => orderId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(orders.map((order) => order._id));
    }
  };

  const areAllSelected =
    selectedOrders.length === orders.length && orders.length > 0;
  return (
    <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
      <thead>
        <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
          <th className="px-4 py-3 border-b">
            <input
              type="checkbox"
              onChange={handleSelectAll} // you'll define this
              checked={areAllSelected} // this too
            />
          </th>
          <th className="px-4 py-3 border-b">Order ID</th>
          <th className="px-4 py-3 border-b">Customer Email</th>
          <th className="px-4 py-3 border-b">Shipping Address</th>
          <th className="px-4 py-3 border-b">Items</th>
          <th className="px-4 py-3 border-b">Subtotal</th>
          <th className="px-4 py-3 border-b">Shipping</th>
          <th className="px-4 py-3 border-b">Total</th>
          <th className="px-4 py-3 border-b">Status</th>
          <th className="px-4 py-3 border-b">Created At</th>
        </tr>
      </thead>
      <tbody className="text-sm text-gray-800">
        {orders.map((order) => (
          <tr key={order._id} className="hover:bg-gray-50">
            <td className="px-4 py-2 border">
              <input
                type="checkbox"
                checked={selectedOrders.includes(order._id)}
                onChange={() => handleSelectOrder(order._id)}
              />
            </td>
            <td className="px-4 py-3 border-b">{order._id}</td>
            <td className="px-4 py-3 border-b">{order.email}</td>
            <td className="px-4 py-3 border-b whitespace-nowrap">
              <div>{order.shippingAddress.fullName}</div>
              <div>{order.shippingAddress.street}</div>
              <div>
                {order.shippingAddress.city}, {order.shippingAddress.zipCode}
              </div>
              <div>{order.shippingAddress.country}</div>
            </td>
            <td className="px-4 py-2 border">
              {order.items.map((item) => (
                <div key={item._id} className="mb-4 flex items-start gap-4">
                  {/* Image */}
                  {/* process.env.NEXT_PUBLIC_API_URL */}
                  <Image
                    src={`http://localhost:3001/uploads/${item.variant.images[0]}`}
                    alt="Variant"
                    className="w-16 h-16 object-cover rounded border"
                    width={34}
                    height={34}
                  />

                  {/* Details */}
                  <div className="text-sm space-y-1">
                    <div>
                      <strong>Color:</strong> {item.variant.options.color}
                    </div>
                    <div>
                      <strong>Size:</strong> {item.variant.options.size}
                    </div>
                    <div>
                      <strong>Price:</strong> $
                      {(item.variant.price / 100).toFixed(2)}
                    </div>
                    <div>
                      <strong>Quantity:</strong> {item.quantity}
                    </div>
                  </div>
                </div>
              ))}
            </td>
            <td className="px-4 py-3 border-b">${order.subTotal}</td>
            <td className="px-4 py-3 border-b">$0</td>
            <td className="px-4 py-3 border-b font-semibold">
              ${order.subTotal}
            </td>
            <td className="px-4 py-3 border-b">
              <span className="px-2 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded">
                {order.status}
              </span>
            </td>
            <td className="px-4 py-3 border-b whitespace-nowrap">
              {new Date(order.createdAt).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
