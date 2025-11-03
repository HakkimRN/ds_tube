import React from "react";
import Sidebar from "./Sidebar";
import { MainComponent } from "./MainComponent";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const Body = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  return (
    <div className="flex flex-1 text-white overflow-y-auto h-screen">
      <Sidebar />
      <div
        className={`transition-all duration-300 pt-3 pl-3 ${ isMenuOpen ? `blur-sm`: `` }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Body;
