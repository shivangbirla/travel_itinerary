import React from "react";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Landing from "./components/Landing";

import NewLanding from "./components/NewLanding";
import Layout from "./components/Layout";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<NewLanding />} />
        <Route path="/nutrichimp" element={<Home />} />
      </Route>
      <Route path="/login" element={<Login/>}/>
    </Routes>
  );
};

export default App;
