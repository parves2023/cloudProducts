import React from "react";
import Slider from "../../components/Slider";
import DynamicBanner from "../../components/DynamicBanner";
import Featured from "../../components/Fetured";
import TrendingProducts from "../../components/TrendingProducts";
import Coupon from "../Adminpages/Coupon";
import CouponSlider from "./CouponSlider";


const Home = () => {

  return (
    <div className="min-h-screen bg-[#FBFBFB] dark:bg-gray-900 text-gray-900 dark:text-gray-100 relative">
      {/* Slider */}
      <div className="pt-4">
      <DynamicBanner></DynamicBanner>
      <Featured></Featured>
      <TrendingProducts></TrendingProducts>
      <CouponSlider></CouponSlider>
      </div>
    </div>
  );
};

export default Home;
