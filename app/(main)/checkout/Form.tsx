"use client";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCartStore } from "@/app/store/cartStore";
import apiClient from "@/utils/apiClient";
import { removeCartIdCookie } from "@/utils/cart";
import OrderSuccessModal from "./OrderSuccessModal";
import { useToastStore } from "@/app/store/toastStore";

import { useAuthStore } from "@/app/store/authStore";
export const checkoutSchema = z.object({
  email: z.string().email("Invalid email"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(5, "Phone number is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  zip: z.string().min(1, "ZIP code is required"),
});
type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function Form() {
  const [showModal, setShowModal] = useState(true);
  const [newOrderId, setNewOrderId] = useState(null);
  const addToast = useToastStore((s) => s.addToast);

  const user = useAuthStore((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: user?.email || "",
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phone: user?.phoneNumber || "",
    },
  });
  const cart = useCartStore((state) => state.cart);
  const onSubmit = async (data: CheckoutForm) => {
    const objee = {
      cartId: cart._id,
      email: data.email,
      shippingAddress: {
        fullName: `${data.firstName} ${data.lastName}`,
        addressLine1: data.address,
        city: data.city,
        postalCode: data.zip,
        country: data.country,
      },
      subTotal: cart.subTotal,
      ...(user && { userId: user._id }),
    };

    try {
      const response = await apiClient.post("/api/orders", objee);
      removeCartIdCookie();
      setNewOrderId(response.data.order._id);
    } catch {
      addToast({ message: "Something went wrong", type: "error" });
    }
  };

  return (
    <div>
      {newOrderId && (
        <OrderSuccessModal
          orderId={newOrderId}
          onClose={() => setShowModal(false)}
        />
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full border p-3 rounded mt-1"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Shipping address */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                placeholder="First name"
                {...register("firstName")}
                className="border p-3 rounded w-full"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <input
                placeholder="Last name"
                {...register("lastName")}
                className="border p-3 rounded w-full"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <input
              placeholder="Phone number"
              {...register("phone")}
              className="border p-3 rounded w-full"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>
          <div>
            <input
              placeholder="Address"
              {...register("address")}
              className="border p-3 rounded w-full"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                placeholder="City"
                {...register("city")}
                className="border p-3 rounded w-full"
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city.message}</p>
              )}
            </div>
            <div>
              <input
                placeholder="State"
                {...register("state")}
                className="border p-3 rounded w-full"
              />
              {errors.state && (
                <p className="text-red-500 text-sm">{errors.state.message}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                placeholder="Country"
                {...register("country")}
                className="border p-3 rounded w-full"
              />
              {errors.country && (
                <p className="text-red-500 text-sm">{errors.country.message}</p>
              )}
            </div>
            <div>
              <input
                placeholder="ZIP code"
                {...register("zip")}
                className="border p-3 rounded w-full"
              />
              {errors.zip && (
                <p className="text-red-500 text-sm">{errors.zip.message}</p>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <p className="font-medium">Shipping method</p>
          <div className="space-y-2">
            <label className="flex items-center gap-3 border rounded p-3 cursor-pointer">
              <input type="radio" />
              <div>
                <p className="font-semibold">Home delivery</p>
                <p className="text-sm text-gray-500">Takes 3–5 business days</p>
              </div>
            </label>

            <label className="flex items-center gap-3 border rounded p-3 cursor-pointer">
              <input type="radio" />
              <div>
                <p className="font-semibold">In-store pickup</p>
                <p className="text-sm text-gray-500">
                  Pick from store location
                </p>
              </div>
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded mt-4 font-semibold"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}
