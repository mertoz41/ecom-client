import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { IoIosArrowDown } from "react-icons/io";

export default function FiltersContainer() {
  // category
  // price range
  // ratings
  return (
    <div className="bg-gray-100 p-3 text-[21px] font-[600] rounded-lg">
      <h1>Filter</h1>
      <div className="bg-white p-1 rounded-xl">
        <Disclosure>
          <DisclosureButton className="group py-2 flex justify-between  w-full">
            Category{" "}
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
    </div>
  );
}
