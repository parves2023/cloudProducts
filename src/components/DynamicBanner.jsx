import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const banners = [
  {
    backgroundColor: "#A33B20", // Example color
    image:
      "https://workreap.amentotech.com/wp-content/uploads/2024/04/img-06-768x539.png",
  },
  {
    backgroundColor: "#1E824C", // Example color
    image:
      "https://workreap.amentotech.com/wp-content/uploads/2024/04/freelance-image01-600x445.png",
  },
];

const categories = [
  "Digital Marketing",
  "Graphics & Design",
  "Smart AI Services",
];

const DynamicBanner = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const { backgroundColor, image } = banners[currentBanner];

  return (
    <div className="container mx-auto p-4">
      <div
        style={{
          backgroundColor, // Dynamic background color
          transition: "background-color 1.5s ease", // Smooth transition for background color
        }}
        className="rounded-lg min-h-[300px] md:min-h-[400px] flex flex-col md:flex-row items-center justify-between p-6 md:p-10 text-white"
      >
        {/* Static Left Content */}
        <div className="text-center md:text-left flex-1">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Unlock The Potential Of Your Team’s Talent.
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Flourish in a thriving freelance ecosystem dedicated to excellence
            and limitless opportunities.
          </p>
          <div className="flex justify-center md:justify-start mb-6">
            <input
              type="text"
              placeholder="Search by keyword"
              className="p-4 rounded-full w-full md:w-80 border border-gray-300 outline-none shadow-sm focus:ring-2 focus:ring-green-700 focus:border-green-400 transition duration-200 ease-in-out text-gray-800 placeholder-gray-500"
            />

            <button
              type="submit"
              className="flex justify-center border-emerald-700 gap-2 items-center ml-2 shadow-xl text-lg bg-gray-300 text-black backdrop-blur-md lg:font-semibold isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-800 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group active:scale-95 active:bg-gray-200 transition duration-300"
            >
              Search
              <svg
                className="w-8 h-8 hidden md:flex justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
                viewBox="0 0 16 19"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                  className="fill-gray-800 group-hover:fill-gray-800"
                ></path>
              </svg>
            </button>
          </div>
          {/* Popular Categories */}
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            {categories.map((category, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-gray-100 text-black py-2 px-4 rounded-full shadow-md hover:bg-gray-200 transition"
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Dynamic Image */}
        <motion.div
          key={currentBanner}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 1.5 }}
          className="flex-1 flex justify-center mt-6 md:mt-0"
        >
          <img
            src={image}
            alt="Banner"
            className="rounded-lg max-h-72 md:max-h-96"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default DynamicBanner;
