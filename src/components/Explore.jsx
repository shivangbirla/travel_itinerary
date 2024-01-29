import React from "react";
import img1 from "../assets/img1.svg";
import img2 from "../assets/img2.svg";
import img3 from "../assets/img3.svg";
import ExploreComponent from "./ExploreComponent";
// import Landingimg from "../assets/Landing-img.png";

const Explore = () => {
  return (
    <>
      <div className="px-[8vw]">
        <div className=" mt-20 mb-[72px]">
          <h2 className="text-Grey-15 text-center font-Urbanist text-3xl lg:text-[50px] font-bold leading-150 mb-[8px]">
            Balanced & Tasty Meals
          </h2>
          <p className="text-Grey-20 text-center font-Urbanist text-base md:text-[20px] font-medium leading-150">
            Eat Well, Live Well: Your Blueprint for Balanced Nutrition
          </p>
        </div>
        <div>
          <ExploreComponent
            imageSrc={img1}
            title="Meal Plan"
            description="7-day custom plan that is not only tasty but is created considering Govt nutrition guidelines for kids
"
            reverse={false}
          />
          <ExploreComponent
            imageSrc={img2}
            title="Recipe"
            description="Learn how to make any dish in the meal plan with just a click
"
            reverse={true}
          />
          <ExploreComponent
            imageSrc={img3}
            title="Ingredients"
            description="Quickly build your shopping list for the Meal Plan
"
            reverse={false}
          />
        </div>
      </div>
    </>
  );
};

export default Explore;
