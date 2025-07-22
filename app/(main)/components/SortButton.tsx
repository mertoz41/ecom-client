import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { CgSortAz } from "react-icons/cg";

export default function SortButton() {
  return (
    <Menu>
      <MenuButton
        className={
          " self-end p-2 bg-white text-black rounded-lg shadow-lg border border-gray-200 flex gap-4"
        }
      >
        <CgSortAz className="self-center" size={30} />
        <p className="self-center">
          Sort by: <span className="font-bold">Popular</span>
        </p>
      </MenuButton>
      <MenuItems anchor="bottom" className={"bg-red-500 p-5"}>
        <MenuItem>
          <a className="block data-focus:bg-blue-100" href="/settings">
            Settings
          </a>
        </MenuItem>
        <MenuItem>
          <a className="block data-focus:bg-blue-100" href="/support">
            Support
          </a>
        </MenuItem>
        <MenuItem>
          <a className="block data-focus:bg-blue-100" href="/license">
            License
          </a>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
