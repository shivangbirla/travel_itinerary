import React from "react";
import Logo from "../assets/logo.jpg";

const Navbar = () => {
  return (
    <nav className="py-4">
      <div className="container mx-auto pb-4 shadow-lg">
        <div className="flex justify-start items-center gap-[25vw]">
          <div className="flex items-center gap-4 text-white font-semibold text-lg ml-8">
            <img src={Logo} alt="logo" className="w-10 rounded-lg" />
            <h1 className="text-white hover:text-gray-300">PlanAI</h1>
          </div>
          <div className="flex space-x-10">
            <a href="#" className="text-white hover:text-gray-300">
              Blog
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              Trip Planner
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              Deals
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              Feedback
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
