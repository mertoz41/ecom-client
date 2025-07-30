export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import apiClient from "@/utils/apiClient";
import Table from "./Table";
export default async function Page() {
  let orders;
  try {
    const allCookies = await cookies();
    const token = allCookies.get("token")?.value;
    const response = await apiClient.get("/api/orders", {
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
        <div className="flex justify-between">
          <h1 className="text-[24px] font-bold p-5">Orders</h1>
          <button></button>
        </div>
        <Table orders={orders} />
      </div>
    </div>
  );
}
