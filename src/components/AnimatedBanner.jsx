import React from "react";
import Lottie from 'lottie-react';

import travelAnimation from "../assets/Animation - 1733505845521.json";

const AnimatedBanner = () => {
  return (
    <div className="flex justify-center items-center">
    <Lottie animationData={travelAnimation} loop={true} />
  </div>
  );
};

export default AnimatedBanner;
