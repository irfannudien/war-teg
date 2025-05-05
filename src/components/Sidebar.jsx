import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@heroui/react";
import { FaChevronDown, FaUser } from "react-icons/fa";
import { TbWashGentle } from "react-icons/tb";
import { MdFoodBank } from "react-icons/md";

const Sidebar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col p-5 gap-4 w-[200px] h-screen">
      <div className="flex gap-x-3 justify-center pb-4">
        {/* <TbWashGentle size={35} color="#666666" /> */}
        <h1 className="font-poiret font-bold text-2xl tracking-widest flex items-center gap-x-2">
          WAR{" "}
          <span>
            <MdFoodBank size={35} color="#666666" />
          </span>{" "}
          TEG
        </h1>
      </div>
      <NavLink
        to="/menus"
        className={({ isActive }) =>
          `sidebar-link p-2 rounded text-center text-black bg-gray-300 
     hover:bg-gray-500 hover:text-white transition duration-200
     ${isActive ? "bg-gray-500 text-white" : ""}`
        }
      >
        Menu
      </NavLink>

      <NavLink
        to="/customers"
        className={({ isActive }) =>
          `sidebar-link p-2 rounded text-center text-black bg-gray-300 
     hover:bg-gray-500 hover:text-white transition duration-200
     ${isActive ? "bg-gray-500 text-white" : ""}`
        }
      >
        Customers
      </NavLink>

      <NavLink
        to="/tables"
        className={({ isActive }) =>
          `sidebar-link p-2 rounded text-center text-black bg-gray-300 
     hover:bg-gray-500 hover:text-white transition duration-200
     ${isActive ? "bg-gray-500 text-white" : ""}`
        }
      >
        Table
      </NavLink>

      <NavLink
        to="/transaction"
        className={({ isActive }) =>
          `sidebar-link p-2 rounded text-center text-black bg-gray-300 
     hover:bg-gray-500 hover:text-white transition duration-200
     ${isActive ? "bg-gray-500 text-white" : ""}`
        }
      >
        Transactions
      </NavLink>
      <div className="flex justify-center border-t border-gray-300 mt-4 p-2">
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <User
              as="button"
              avatarProps={{
                isBordered: true,
                icon: <FaUser size={16} />,
                size: "sm",
              }}
              className="transition-transform flex items-center gap-x-4 capitalize font-semibold pt-2"
              name={
                <div className="flex items-center gap-x-1">
                  {user?.role ? user.role : "Guest"}
                  <FaChevronDown />
                </div>
              }
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions" variant="flat">
            <DropdownItem
              key="profile"
              className="h-14 gap-2"
              textValue="Sign in as"
            >
              <p className="font-bold">Signed in as</p>
              <p className="font-bold capitalize">
                {user?.role ? user.role : "Guest"}
              </p>
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onPress={logout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Sidebar;
