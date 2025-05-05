import React from "react";

import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  return (
    <div className="flex">
      <div className="border-r border-gray-300">
        <Sidebar />
      </div>

      <div className="pt-20 px-5 pb-5 flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
