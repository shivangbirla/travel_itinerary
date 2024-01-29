import React from "react";

const Hero = () => {
  return (
    <>
      <div className="bg-inherit flex flex-col gap-4  px-5 text-center  items-center justify-center pt-20 xl:pt-28 ">
        <h1 className=" text-[#276b53]  font-bold text-4xl  xl:text-8xl">
          NutriChimp
        </h1>
        <span className="text-blacktext-lg text-center overflow-hidden mt-4">
          Share child’s food preferences to create a custom meal plan
        </span>
      </div>
    </>
  );
};

export default Hero;
