import React from "react";
import { Fade, Slide } from "react-awesome-reveal";

const Services = () => {
  return (
    <div className="bg-gray-100 py-20">
      <div className="container mx-auto text-center">
        <Fade>
          <h2 className="text-4xl font-bold text-green-600">Our Visa Services</h2>
          <p className="mt-4 text-xl text-gray-700">
            Fast, reliable, and seamless visa processing services.
          </p>
        </Fade>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Slide direction="left">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-green-600">Fast Processing</h3>
              <p className="mt-2 text-gray-600">
                Get your visa processed quickly and efficiently.
              </p>
            </div>
          </Slide>
          <Slide direction="up">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-green-600">Expert Guidance</h3>
              <p className="mt-2 text-gray-600">
                Our experts guide you through every step of the process.
              </p>
            </div>
          </Slide>
          <Slide direction="right">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-green-600">Online Applications</h3>
              <p className="mt-2 text-gray-600">
                Apply for your visa online, anytime, anywhere.
              </p>
            </div>
          </Slide>
        </div>
      </div>
    </div>
  );
};

export default Services;
