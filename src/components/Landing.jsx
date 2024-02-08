import React from "react";
import { motion } from "framer-motion";
import PlanetOne from "../assets/planet-1.svg";
import PlanetTwo from "../assets/planet-2.svg";
import PlanetThree from "../assets/planet-3.svg";
import PlanetFour from "../assets/planet-4.svg";
import landingImg from "../assets/landing-img.png";
import { useNavigate } from "react-router-dom";

const Hero = () => {

  const navigate = useNavigate()
  const fadeLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section className="mt-[8vh] md:mt-0 h-screen flex justify-center items-center bg-[#111827]">
      <div className="md:grid md:grid-cols-2 h-screen">
        <div className="flex flex-col justify-center items-start p-5">
          <img
            src={landingImg}
            alt="landing-img"
            className="w-[200px] md:hidden flex items-center justify-center mx-auto rounded-full mb-16"
          />
          <motion.h1
            variants={fadeLeft}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1 }}
            className="text-white text-2xl md:text-3xl"
          >
            Nutrichimp
          </motion.h1>
          <motion.p
            variants={fadeLeft}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1 }}
            className="text-gray-300 mt-1 md:text-xl text-base"
          >
            An AI-driven tool providing quick and personalized kid-friendly meal
            suggestions and recipes based on dietary preferences and taste
            profiles.
          </motion.p>
          <motion.button
            variants={fadeRight}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 1 }}
            whileTap={{
              scale: 0.95,
            }}
            className="cursor-pointer py-1 px-2 md:py-2 md:px-4 border-2 border-white text-white rounded-full mt-5 text-[13px] md:text-[16px]"
            onClick={()=>{
              navigate("/nutrichimp");
            }}
          >
            Get Started
          </motion.button>
        </div>
        <div className="hidden md:flex justify-center items-center p-2 relative">
          <motion.img
            src={PlanetOne}
            alt="planet"
            whileTap={{ scale: 0.9 }}
            drag={true}
            dragConstraints={{ left: 0, right: 250, top: 0, bottom: 50 }}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
            className="absolute w-full h-full max-w-[250px] max-h-[250px] cursor-grab select-none top-[10px] left-[10px]"
          />
          <motion.img
            src={PlanetTwo}
            alt="planet"
            whileTap={{ scale: 0.6 }}
            drag={true}
            dragConstraints={{ left: 50, right: 0, top: 0, bottom: 50 }}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 1 } }}
            className="absolute w-full h-full max-w-[250px] max-h-[250px] cursor-grab select-none top-[170px] right-[10px]"
          />
          <motion.img
            src={PlanetThree}
            alt="planet"
            whileTap={{ scale: 0.8 }}
            drag={true}
            dragConstraints={{ left: 0, right: 250, top: 0, bottom: 50 }}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 1 } }}
            className="absolute w-full h-full max-w-[250px] max-h-[250px] cursor-grab select-none top-[350px] left-[50px]"
          />
          <motion.img
            src={PlanetFour}
            alt="planet"
            whileTap={{ scale: 0.9 }}
            drag={true}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
            className="absolute w-full h-full max-w-[250px] max-h-[250px] cursor-grab select-none bottom-[100px] right-[75px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
