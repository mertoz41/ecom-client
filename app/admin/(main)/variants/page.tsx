export const dynamic = "force-dynamic";

import apiClient from "@/utils/apiClient";
import ModalButton from "./components/ModalButton";
import { cookies } from "next/headers";
import Table from "./components/Table";
export default async function Page() {
  let variants: [];
  const allCookies = await cookies();
  try {
    const token = allCookies.get("token")?.value;
    const response = await apiClient.get("/api/categoryVariants", {
      headers: {
        Cookie: `token=${token}`,
      },
    });
    variants = response.data;
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Variants</h1>
        <ModalButton />
      </div>
      <Table variants={variants} />

      {/* <CategoryTable categories={categories} /> */}
    </div>
  );
}
