import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-neutral-100 text-gray-900 flex flex-col">
      <Navbar />
      <main className="flex-1 py-6 px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="max-w-6xl mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
