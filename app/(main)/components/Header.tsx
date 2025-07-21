import CartDrawer from "./CartDrawer";
import { FaRegHeart } from "react-icons/fa";
import Link from "next/link";
import apiClient from "@/utils/apiClient";
export default async function Header() {
  let categories = [];
  try {
    const response = await apiClient.get("/categories");
    categories = response.data;
  } catch {
    console.error("error");
  }
  const renderBottomRow = () => (
    <div className="flex items-center justify-center border-b border-b-gray-300 py-3">
      {/* Categories */}
      <nav>
        <ul className="space-y-2 flex gap-2">
          {categories.map((category) => (
            <li key={category._id}>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 text-sm block"
              >
                {category.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );

  const renderTopRow = () => (
    <div className="flex items-center justify-between px-6 py-4 border-b border-b-gray-300">
      <div className="text-xl font-bold">ShopLogo</div>

      <div className="flex-1 max-w-xl mx-6">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex gap-3">
        <FaRegHeart className="text-2xl text-gray-700 hover:text-blue-600" />
        <CartDrawer />
        {/* Optional cart count */}

        <Link href={"/login"}>
          <button className="text-sm font-medium text-blue-600 hover:underline">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
  return (
    <header className="border-b border-gray-200">
      {renderTopRow()}
      {renderBottomRow()}
    </header>
  );
}
