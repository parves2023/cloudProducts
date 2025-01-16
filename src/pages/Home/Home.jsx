import React from "react";
import Slider from "../../components/Slider";


const Home = () => {

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 relative">
      {/* Slider */}
      <div className="pt-4">
        <Slider />
      </div>
    </div>
  );
};

export default Home;
