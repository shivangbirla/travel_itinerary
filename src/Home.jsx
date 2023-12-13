import React from "react";
import Hero from "./components/Hero";
import Form from "./components/Form";
import Navbar from "./components/Navbar";

const Home = () => {
  return (
    <>
      <div className="bg-[#111827] min-h-screen">
        {/* <Navbar /> */}
        <Hero />
        <Form />
      </div>
    </>
  );
};

export default Home;
