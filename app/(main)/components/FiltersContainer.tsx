import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { IoIosArrowDown } from "react-icons/io";

export default function FiltersContainer() {
  const renderFilterSection = (label: string) => (
    <div className="bg-white p-1 rounded-xl">
      <Disclosure>
        <DisclosureButton className="group py-2 px-2 flex justify-between  w-full">
          {label}{" "}
          <IoIosArrowDown
            className="group-data-open:rotate-180 self-center"
            size={30}
          />
        </DisclosureButton>
        <DisclosurePanel className="text-gray-500">
          Yes! You can purchase a license that you can share with your entire
          team.
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
  return (
    <div className="bg-gray-100 p-3 text-[14px] flex flex-col gap-5 font-[600] rounded-lg">
      <h1>Filters</h1>
      {renderFilterSection("Categories")}
      {renderFilterSection("Price")}

      {renderFilterSection("Sizes")}
    </div>
  );
}
