import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import PlanetOne from "../assets/planet-1.svg";
import PlanetTwo from "../assets/planet-2.svg";
import PlanetThree from "../assets/planet-3.svg";
import PlanetFour from "../assets/planet-4.svg";

const Section = styled.section`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #111827;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
  padding: 3rem calc((100vw - 1300px) / 2);

  @media screen and (max-width: 768px) {
    grid-grid-template-columns: 1fr;
  }
`;

const ColumnLeft = styled.div`
  display: flex;
  color: #fff;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 5rem 2rem;

  h1 {
    margin-bottom: 0rem;
    font-size: 3rem;
  }

  p {
    margin: 1rem 0;
    font-size: 1.2rem;
    line-height: 1.1;
  }
`;

const Button = styled(motion.button)`
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  border: 2px solid #fff;
  border-radius: 30px;
  outline: none;
  cursor: pointer;
  background: transparent;
  color: #fff;
  margin: 2rem 0;
`;

const Image = styled(motion.img)`
  position: absolute;
  width: 100%;
  height: 100%;
  max-width: 250px;
  max-height: 250px;
`;

const ColumnRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;

  ${Image}:nth-child(1) {
    top: 10px;
    left: 10px;
  }

  ${Image}:nth-child(2) {
    top: 170px;
    right: 10px;
  }

  ${Image}:nth-child(3) {
    top: 350px;
    left: 50px;
  }

  ${Image}:nth-child(4) {
    bottom: 100px;
    right: 75px;
  }
`;

const Hero = () => {
  const fadeLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <Section>
      <Container>
        <ColumnLeft>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Craft Unforgettable Itineraries
          </motion.h1>
          <motion.p
            variants={fadeLeft}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1 }}
          >
            PlanAI is your personal travel curator, shaping unique itineraries
            around your passions and wallet.
          </motion.p>
          <Button
            whileHover={{ scale: 1.05 }}
            whileTap={{
              scale: 0.95,
              backgroundColor: "#67F6E7",
              border: "none",
              color: "#000",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1.5 } }}
          >
            Get Started
          </Button>
        </ColumnLeft>
        <ColumnRight>
          <Image
            src={PlanetOne}
            alt="planet"
            whileTap={{ scale: 0.9 }}
            drag={true}
            dragConstraints={{ left: 0, right: 250, top: 0, bottom: 50 }}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
          />
          <Image
            src={PlanetTwo}
            alt="planet"
            whileTap={{ scale: 0.6 }}
            drag={true}
            dragConstraints={{ left: 50, right: 0, top: 0, bottom: 50 }}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 1 } }}
          />
          <Image
            src={PlanetThree}
            alt="planet"
            whileTap={{ scale: 0.8 }}
            drag={true}
            dragConstraints={{ left: 0, right: 250, top: 0, bottom: 50 }}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 1 } }}
          />
          <Image
            src={PlanetFour}
            alt="planet"
            whileTap={{ scale: 0.9 }}
            drag={true}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
          />
        </ColumnRight>
      </Container>
    </Section>
  );
};

export default Hero;
