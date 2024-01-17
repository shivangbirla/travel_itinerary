import React from "react";
import img1 from "../assets/img1.svg";
import img2 from "../assets/img2.svg";
import img3 from "../assets/img3.svg";
import ExploreComponent from "./ExploreComponent";
import Landingimg from "../assets/Landing-img.png";

const Explore = () => {
  return (
    <>
      <div className="px-[8vw]">
        <div className="mb-[72px]">
          <h2 className="text-Grey-15 text-center font-Urbanist text-[50px] font-bold leading-150 mb-[8px]">
            Explore More
          </h2>
          <p className="text-Grey-20 text-center font-Urbanist text-[20px] font-medium leading-150">
            Eat Well, Live Well: Your Blueprint for Balanced Nutrition
          </p>
        </div>
        <div>
          <ExploreComponent
            imageSrc={img1}
            title="Meal Plan"
            description="A meal plan is like a yummy schedule for your tummy! It's a special plan that helps decide what tasty foods you get to eat during the day or week. It's not just about making sure your meals are super delicious, but also making sure you eat the right amount of food at the right times. This helps keep you strong, happy, and healthy!"
            reverse={false}
          />
          <ExploreComponent
            imageSrc={img2}
            title="Recipe"
            description="A recipe is like a magical spell for making yummy food! It's a special set of instructions that tells you exactly what ingredients to use and the fun steps to follow to create a delicious dish. Recipes are like treasure maps that help you make the best snacks and meals ever!"
            reverse={true}
          />
          <ExploreComponent
            imageSrc={img3}
            title="Ingredients"
            description="Ingredients are like the super cool stuff you use to make your favorite foods! They're the special things you mix and cook to create the tasty meals you love. Imagine you're a food explorer, and ingredients are your treasure hunt items!"
            reverse={false}
          />
        </div>
      </div>
    </>
  );
};

export default Explore;
