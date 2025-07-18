import ProductsContainer from "./components/ProductsContainer";
import FiltersContainer from "./components/FiltersContainer";
import SortButton from "./components/SortButton";
export default function Home() {
  return (
    <div className="flex p-6 gap-6  w-4/5 mx-auto">
      <aside className="w-1/5 sticky top-6 self-start">
        <FiltersContainer />
      </aside>
      <main className="">
        <div className="flex justify-end ">
          <SortButton />
        </div>
        <ProductsContainer />
      </main>
    </div>
  );
}
