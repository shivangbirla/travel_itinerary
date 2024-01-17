import React from "react";

const ExploreComponent = ({ imageSrc, title, description, reverse }) => {
  const flexClass = reverse ? "flex-row-reverse" : "flex-row";

  return (
    <div className={`flex ${flexClass} justify-around mb-[88px]`}>
      <div className="w-[35vw]">
        <img src={imageSrc} alt="Image" className="w-[556px] h-[350px]" />
      </div>
      <div className="gap-[20px] w-[35vw]">
        <h3 className="text-[#070707] font-Poppins text-[40px] font-semibold leading-150">
          {title}
        </h3>
        <p className="text-[#070707] font-Poppins text-[20px] font-normal leading-150">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ExploreComponent;
