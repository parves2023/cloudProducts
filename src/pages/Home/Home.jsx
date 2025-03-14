import React from "react";
import DynamicBanner from "../../components/DynamicBanner";
import Featured from "../../components/Fetured";
import TrendingProducts from "../../components/TrendingProducts";
import CouponSlider from "./CouponSlider";
import Reviews from "./Reviews";
import Newsletter from "./Newsletter";
import Contact from "./Contact";
import FAQ from "./FAQ";


const Home = () => {

  return (
    <div className="min-h-screen bg-[#FBFBFB] dark:bg-gray-900 text-gray-900 dark:text-gray-100 relative">
      {/* Slider */}
      <div className="pt-4">
      <DynamicBanner></DynamicBanner>
      <Featured></Featured>
      <TrendingProducts></TrendingProducts>
      <CouponSlider></CouponSlider>
      <Reviews></Reviews>
      <FAQ></FAQ>
      <Contact></Contact>
   
      </div>
    </div>
  );
};

export default Home;
