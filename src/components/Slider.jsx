import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Typewriter } from 'react-simple-typewriter';  // Import useTypewriter hook

// Import images
import banner3 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner1 from "../assets/banner.jpg";

const Slider = () => {
  const banners = [
    {
      image: banner1,
      heading: "Seamless Visa Applications",
      text: "Experience hassle-free visa processing with our expert guidance.",
    },
    {
      image: banner2,
      heading: "Affordable Flights Worldwide",
      text: "Find the best deals on flights to your dream destinations.",
    },
    {
      image: banner3,
      heading: "Your Gateway to the World",
      text: "Get your visa and book flights with ease for global adventures.",
    },
  ];

  return (
    <div className="w-full h-[45vh] md:h-[35rem] container mx-auto">
      <Carousel
        showArrows
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        className="text-center"
      >
        {banners.map((banner, index) => {
          const { text } = banner;
          
          return (
            <div key={index} className="relative h-full">
              {/* Background Image */}
              <img
                src={banner.image}
                alt={`Slide ${index + 1}`}
                className="w-full h-[45vh] md:h-[35rem] object-cover brightness-50 rounded-2xl"
              />

              {/* Centered Text with Typewriter Effect */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center">
                {/* Typewriter Effect for Heading */}
                <h2 className="text-3xl md:text-5xl font-bold">
                  <span>
                    {/* Typewriter effect applied to the heading */}
                    <Typewriter 
                      words={[banners[0].heading,banners[1].heading,banners[2].heading]} 
                      loop={6} 
                      cursor
                      typeSpeed={100}
                      deleteSpeed={50}
                      delaySpeed={2000}
                    />
                  </span>
                </h2>
                <p className="mt-4 text-lg md:text-xl text-green-300">{text}</p>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Slider;
