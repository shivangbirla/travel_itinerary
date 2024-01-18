import React from "react";
import starter from "../assets/starter.svg";
import { useNavigate } from "react-router-dom";

const Starter = () => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full flex-row mt-8 gap-5 mb-8">
      <div className="hidden min-w-[45vw] md:block w-1/2 h-fit">
        <img src={starter} alt="starter-img" className="w-[712px] " />
      </div>
      <div className="flex flex-col gap-2 p-4 md:p-0 px-3 first-letter md:w-1/2   justify-center">
        <h3 className="text-Dark-Green-15 text-center md:text-left font-Urbanist text-[22px] font-semibold underline">
          Transform Your Health with
        </h3>
        <div className="text-dark-green-15  text-center md:text-left  font-poppins text-[50px] font-bold">
          Nutrichimp
        </div>
        <div className="text-Grey-20 font-Inter lg:leading-9 text-center md:text-left md:pr-4 text-base lg:text-[30px] font-normal">
          An AI-driven tool providing quick and personalized kid-friendly meal
          suggestions and recipes based on dietary preferences and taste
          profiles.
        </div>

        <button
          className="bg-[#CBEA7B] mx-auto max-w-[300px] md:mx-0 p-4 lg:px-7 lg:py-8 rounded-lg text-base md:text-[24px] text-[#262626] font-semibold"
          onClick={() => {
            navigate("/home");
          }}
        >
          Get Started Today
        </button>
      </div>
    </div>
  );
};

export default Starter;
