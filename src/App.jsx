import React from "react";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import NewLanding from "./components/NewLanding";

const App = () => {
  return (
    <div className=" bg-[#FFFFFF] min-h-screen min-w-screen">
      <Navbar />
      <div className="pt-10">
        <Routes>
          <Route path="/" element={<NewLanding />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
