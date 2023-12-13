import React from "react";

const Hero = () => {
  return (
    <>
      <div className="bg-inherit flex flex-col gap-10  px-5 text-center  items-center justify-center pt-20 xl:pt-28 pb-10">
        <h1 className=" text-transparent  bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 drop-shadow-[0_5px_10px_rgba(255, 253, 253, 1)]   font-bold text-5xl  xl:text-8xl">
          Travel Itinerary Generator
        </h1>
        <span className="text-[#D4DCE5] text-lg text-center overflow-hidden mt-4">
          Craft an expertly designed travel plan using the given details.
        </span>
      </div>
    </>
  );
};

export default Hero;
