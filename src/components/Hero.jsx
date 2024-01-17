import React from "react";

const Hero = () => {
  return (
    <>
      <div className="bg-inherit flex flex-col gap-10  px-5 text-center  items-center justify-center pt-20 xl:pt-28 pb-10">
        <h1 className=" text-[#276b53]  font-bold text-5xl  xl:text-8xl">
          Nutri-Chimp
        </h1>
        <span className="text-blacktext-lg text-center overflow-hidden mt-4">
          Generate a meal plan using the given details.
        </span>
      </div>
    </>
  );
};

export default Hero;
