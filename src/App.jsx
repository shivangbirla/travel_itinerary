import React from "react";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="dark bg-[#111827] min-h-screen">
      <Navbar />
      <div className="pt-10">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
