"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/authStore";
import { useState } from "react";
import { useToastStore } from "@/app/store/toastStore";
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Form() {
  const { login } = useAuthStore();
  const [loginError, setLoginError] = useState("");
  const addToast = useToastStore((state) => state.addToast)
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = async (data: LoginFormData) => {
    try {
      const loggedInUser = await login(data.email, data.password);

      if (loggedInUser.role === "customer") {
        router.push("/");
      } else {
        router.push("/admin/dashboard");
      }
    } catch (err) {
      setLoginError(err.response.data.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <input
          type="email"
          {...register("email")}
          className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          {...register("password")}
          className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="rounded" />
          Remember me
        </label>
        <a href="#" className="text-blue-600 hover:underline">
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
      >
        Sign in
      </button>
      {loginError.length ? (
        <div>
          <h1 className="text-center text-red-500">{loginError}</h1>
        </div>
      ) : null}
    </form>
  );
}
