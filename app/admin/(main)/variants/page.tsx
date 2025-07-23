import apiClient from "@/utils/apiClient";
import ModalButton from "./components/ModalButton";
import Table from "../components/Table";
import { cookies } from "next/headers";

export default async function Page() {
  let variants: [];
  try {
    const allCookies = await cookies();
    const token = allCookies.get("token")?.value;
    const response = await apiClient.get("/categoryVariants", {
      headers: {
        Cookie: `token=${token}`,
      },
    });
    variants = response.data;
    console.log(variants);
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Variants</h1>
        <ModalButton />
      </div>
      <Table
        headers={["name", "options", "actions"]}
        usage="variants"
        data={variants}
      />
      {/* <CategoryTable categories={categories} /> */}
    </div>
  );
}
