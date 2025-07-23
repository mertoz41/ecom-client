import apiClient from "@/utils/apiClient";
import React from "react";

interface OrderSuccessPageProps {
  order: {
    _id: string;
    items: {
      variant: {
        name: string;
        image: string;
      };
      quantity: number;
      priceAtPurchase: number;
    }[];
    email: string;
    shippingAddress: {
      fullName: string;
      addressLine1: string;
      addressLine2?: string;
      city: string;
      postalCode: string;
      country: string;
    };
    subTotal: number;
    shippingCost: number;
    total: number;
    status: string;
  };
}

const OrderSuccessPage: React.FC<OrderSuccessPageProps> = async ({
  params,
}: {
  params: { id: string };
}) => {
    const {id} = await params
    let order;
    try{
        const response = await apiClient(`/orders/${id}`)
        console.log(response.data)
    } catch {
        console.error('ye')
    }
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-green-600">
        Thank you for your order!
      </h1>
      <p className="mb-6 text-gray-600">
        Order ID: <strong>{order._id}</strong>
      </p>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Shipping Information</h2>
        <div className="text-gray-700">
          <p>{order.shippingAddress.fullName}</p>
          <p>{order.shippingAddress.addressLine1}</p>
          {order.shippingAddress.addressLine2 && (
            <p>{order.shippingAddress.addressLine2}</p>
          )}
          <p>
            {order.shippingAddress.city}, {order.shippingAddress.postalCode}
          </p>
          <p>{order.shippingAddress.country}</p>
          <p>Email: {order.email}</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Order Items</h2>
        <div className="space-y-4">
          {order.items.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 border p-4 rounded-lg"
            >
              <img
                src={item.variant.image}
                alt={item.variant.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <p className="font-medium">{item.variant.name}</p>
                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>
              <p className="font-semibold">
                ${(item.priceAtPurchase * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-right space-y-2">
        <p>
          Subtotal: <strong>${order.subTotal.toFixed(2)}</strong>
        </p>
        <p>
          Shipping: <strong>${order.shippingCost.toFixed(2)}</strong>
        </p>
        <p className="text-xl font-bold">
          Total: <strong>${order.total.toFixed(2)}</strong>
        </p>
        <p className="text-sm text-gray-500">Status: {order.status}</p>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
