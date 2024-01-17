import React from "react";
import Starter from "./Starter";
import Explore from "./Explore";

const NewLanding = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <Starter />
      <Explore />
    </div>
  );
};

export default NewLanding;
