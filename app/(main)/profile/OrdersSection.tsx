import apiClient from "@/utils/apiClient";
import React from "react";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function OrdersSection() {
  const allCookies = await cookies();
  const token = allCookies.get("customer_token")?.value;
  const response = await apiClient.get("/orders/user", {
    headers: {
      Cookie: `token=${token}`,
    },
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Orders</h2>
      <div className="overflow-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
              <th className="px-4 py-2 border">Order ID</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Full Name</th>
              <th className="px-4 py-2 border">Address</th>
              <th className="px-4 py-2 border">Items</th>
              <th className="px-4 py-2 border">Total</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Created At</th>
            </tr>
          </thead>
          <tbody>
            {response.data?.map((order) => (
              <tr key={order._id} className="text-sm border-t">
                <td className="px-4 py-2 border">{order._id}</td>
                <td className="px-4 py-2 border">{order.email}</td>
                <td className="px-4 py-2 border">
                  {order.shippingAddress.fullName}
                </td>
                <td className="px-4 py-2 border">
                  {order.shippingAddress.addressLine1},{" "}
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
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
                <td className="px-4 py-2 border">${order.total}</td>
                <td className="px-4 py-2 border capitalize">{order.status}</td>
                <td className="px-4 py-2 border">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
