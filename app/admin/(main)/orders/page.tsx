import { cookies } from "next/headers";
import apiClient from "@/utils/apiClient";
export default async function Page() {
  let orders;
  try {
    const allCookies = await cookies();
    const token = allCookies.get("token")?.value;
    const response = await apiClient.get("/orders", {
      headers: {
        Cookie: `token=${token}`,
      },
    });
    orders = response.data;
  } catch {
    console.error("e");
  }
  return (
    <div>
      <div className="overflow-x-auto p-4">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
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
                <td className="px-4 py-3 border-b">{order._id}</td>
                <td className="px-4 py-3 border-b">{order.email}</td>
                <td className="px-4 py-3 border-b whitespace-nowrap">
                  <div>{order.shippingAddress.fullName}</div>
                  <div>{order.shippingAddress.street}</div>
                  <div>
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.zipCode}
                  </div>
                  <div>{order.shippingAddress.country}</div>
                </td>
                <td className="px-4 py-3 border-b space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="border p-2 rounded bg-gray-50">
                      <div>
                        <span className="font-medium">Variant ID:</span>{" "}
                        <span className="text-xs text-gray-600">
                          {item.variant._id}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Product ID:</span>{" "}
                        <span className="text-xs text-gray-600">
                          {item.variant.product}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Options:</span>{" "}
                        {/* {item.variant.options
                          ?.map((opt) => `${opt.name}: ${opt.value}`)
                          .join(", ")} */}
                      </div>
                      <div>
                        <span className="font-medium">Price:</span> $
                        {item.variant.price}
                      </div>
                      <div>
                        <span className="font-medium">Quantity:</span>{" "}
                        {item.quantity}
                      </div>
                      <div className="space-x-2 mt-1">
                        {item.variant.images.map((img: string, i: number) => (
                          <a
                            key={i}
                            href={img}
                            className="text-blue-500 underline text-xs"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Image {i + 1}
                          </a>
                        ))}
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
      </div>
    </div>
  );
}
