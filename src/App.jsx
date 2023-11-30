import React from "react";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
