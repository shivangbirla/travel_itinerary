import React from "react";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
