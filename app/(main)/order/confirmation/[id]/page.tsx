import apiClient from "@/utils/apiClient";
export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const response = await apiClient.get(`/orders/${id}`);
  const order = response.data;
  return (
    <div className="min-h-screen text-black bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl max-w-2xl w-full p-8">
        <h1 className="text-2xl font-bold text-green-600 mb-2">
          🎉 Order Placed Successfully!
        </h1>
        <p className="text-gray-700 mb-6">
          Order ID: <span className="font-mono text-sm">{order._id}</span>
        </p>

        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Shipping Info</h2>
            <p className="text-sm text-gray-600">
              {order.shippingAddress.fullName}
            </p>
            <p className="text-sm text-gray-600">
              {order.shippingAddress.addressLine1}
            </p>
            <p className="text-sm text-gray-600">
              {order.shippingAddress.city}, {order.shippingAddress.postalCode}
            </p>
            <p className="text-sm text-gray-600">
              {order.shippingAddress.country}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Order Summary</h2>
            <ul className="text-sm text-gray-700 list-disc pl-5">
              {order.items.map((item) => (
                <li key={item._id}>
                  Variant ID: <span className="font-mono">{item.variant._id}</span>{" "}
                  — Qty: {item.quantity}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Payment Info</h2>
            <p className="text-sm text-gray-700">Subtotal: ${order.subTotal}</p>
            <p className="text-sm text-gray-700">
              Shipping: ${order.shippingCost}
            </p>
            <p className="text-sm font-bold text-black">
              Total: ${order.total}
            </p>
          </div>

          <div className="text-sm text-gray-500">
            <p>
              Status: <span className="capitalize">{order.status}</span>
            </p>
            <p>
              Confirmation sent to:{" "}
              <span className="text-blue-500">{order.email}</span>
            </p>
            <p>Ordered on: {new Date(order.createdAt).toLocaleString()}</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    </div>
  );
}
