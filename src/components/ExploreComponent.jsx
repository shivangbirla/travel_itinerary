import React from "react";

const ExploreComponent = ({ imageSrc, title, description, reverse }) => {
  const flexClass = reverse ? "flex-row-reverse" : "flex-row";

  return (
    <div className={`flex ${flexClass} gap-4 justify-around items-start mb-[88px]`}>
      <div className="hidden md:block w-full ">
        <img src={imageSrc} alt="Image" className="w-[556px] h-[350px]" />
      </div>
      <div className="flex pt-6 flex-col first-letter gap-5 w-full">
        <h3 className="text-[#070707] font-Poppins text-2xl  md:text-[40px] font-semibold leading-150">
          {title}
        </h3>
        <p className="text-[#070707] font-Poppins text-base md:text-[20px] font-normal leading-150">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ExploreComponent;
