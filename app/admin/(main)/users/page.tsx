import apiClient from "@/utils/apiClient";
import { cookies } from "next/headers";
import UserTable from "./Table";
export default async function Page() {
  const allCookies = await cookies();
  const token = allCookies.get("token")?.value;
  const response = await apiClient.get("/api/users", {
    headers: {
      Cookie: `token=${token}`,
    },
  });
  return (
    <div>
      <UserTable users={response.data} />{" "}
    </div>
  );
}
