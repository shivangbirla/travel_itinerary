import React from "react";
import starter from "../assets/starter.svg";

const Starter = () => {
  return (
    <>
      <div className="flex flex-row mt-8 gap-[5vw] mb-[20vh]">
        <div className="w-[45vw]">
          <img src={starter} alt="starter-img" className="w-[712px] h-auto" />
        </div>
        <div className="w-[45vw] mt-[20vh]">
          <div className="mb-[40px]">
            <h3 className="text-Dark-Green-15 font-Urbanist text-[22px] font-semibold underline">
              Transform Your Health with
            </h3>
            <div className="text-dark-green-15 font-poppins text-[50px] font-bold">
              Nutrichimp
            </div>
            <div className="text-Grey-20 font-Inter text-[30px] font-normal">
              An AI-driven tool providing quick and personalized kid-friendly
              meal suggestions and recipes based on dietary preferences and
              taste profiles.
            </div>
          </div>
          <button className="bg-[#CBEA7B] px-[30px] py-[24px] rounded-lg text-[24px] text-[#262626] font-semibold">
            Get Starter Today
          </button>
        </div>
      </div>
    </>
  );
};

export default Starter;
