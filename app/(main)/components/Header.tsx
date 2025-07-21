import CartDrawer from "./CartDrawer";
import Link from "next/link";
import apiClient from "@/utils/apiClient";
import Image from "next/image";
import MobileHeader from "./MobileHeader";

export default async function Header() {
  // const categories = [
  //   { _id: "cat1", name: "Electronics" },
  //   { _id: "cat2", name: "Books" },
  //   { _id: "cat3", name: "Clothing" },
  //   { _id: "cat4", name: "Home & Garden" },
  //   { _id: "cat5", name: "Sports & Outdoors" },
  //   { _id: "cat6", name: "Toys & Games" },
  // ];
  let categories = [];
  try {
    const response = await apiClient.get("/categories");
    categories = response.data;
  } catch (err) {
    console.error(err);
  }

  const renderCategories = () => (
    <nav className=" self-center">
      <ul className="flex gap-5">
        {categories.map((category) => (
          <li key={category._id}>
            <Link
              href={`/category/${category._id}`}
              className="text-gray-700 hover:text-blue-600 text-sm block self-center"
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
  const renderTopRow = () => (
    <div className="flex items-center px-5 py-3 justify-between  border-b border-b-gray-300">
      <div className="flex gap-5">
        <div className="text-xl font-bold">
          <Link href={"/"}>
            <Image
              src="/dark_gear.gif"
              height={90}
              width={90}
              alt="logo"
              className="cursor-pointer"
            />
          </Link>
        </div>
        {renderCategories()}
      </div>

      <div className="flex  gap-5  ">
        <input
          type="text"
          placeholder="Search products..."
          className="w-3/4 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex gap-3 ">
          <CartDrawer buttonSize={30} />
        </div>
      </div>
    </div>
  );
  return (
    <header className="bg-white">
      <div className="hidden md:block">{renderTopRow()}</div>
      <div className="block md:hidden">
        <MobileHeader categories={categories} />
      </div>
    </header>
  );
}
