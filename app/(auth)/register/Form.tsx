"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import apiClient from "@/utils/apiClient";
import { useToastStore } from "@/app/store/toastStore";
import { useRouter } from "next/navigation";

const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  phoneNumber: z.string().regex(/^\+?\d{10,15}$/, "Invalid phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });
  const addToast = useToastStore((s) => s.addToast);
  const router = useRouter();
  const onSubmit = async (data: RegisterFormData) => {
    try {
      const res = await apiClient.post("/auth/register", {
        ...data,
        role: "customer",
      });
      console.log(res.data);
      addToast({ message: "Account created!", type: "success" });
      router.push("/login");
    } catch (err) {
      addToast({ message: err.response.data.message, type: "error" });
    }
    // TODO: Handle registration API call
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            {...register("firstName")}
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
          />
          {errors.firstName && (
            <p className="text-sm text-red-600 mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            {...register("lastName")}
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
          />
          {errors.lastName && (
            <p className="text-sm text-red-600 mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <input
          type="email"
          {...register("email")}
          className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
        />
        {errors.email && (
          <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="tel"
          {...register("phoneNumber")}
          placeholder="+1234567890"
          className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
        />
        {errors.phoneNumber && (
          <p className="text-sm text-red-600 mt-1">
            {errors.phoneNumber.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          {...register("password")}
          className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
        />
        {errors.password && (
          <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
      >
        Register
      </button>
    </form>
  );
}
