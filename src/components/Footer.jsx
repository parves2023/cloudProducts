import React from "react";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaGooglePlay,
  FaApple,
} from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-nav-footer-bg font-sans">
      <div className="container px-6 py-12 mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-5"
        >
          {/* Subscription Section */}
          <div className="sm:col-span-2">
            <Link to="/" className="md:flex">
              <h1 className="md:text-4xl text-text-secondary text-2xl ralewayfont font-bold">
                Product<span className="text-text-primary">Hunt</span>
              </h1>
            </Link>
            <br />
            <br />

            <h1 className="max-w-lg text-xl font-semibold tracking-tight text-text-primary xl:text-2xl dark:text-white">
              Subscribe to our newsletter to get updates.
            </h1>
            <div className="flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
              <motion.input
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                type="text"
                placeholder="Email Address"
                className="px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="w-full px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none bg-[#135D66] rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80"
              >
                Subscribe
              </motion.button>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <p className="font-semibold text-gray-800 dark:text-white">
              Quick Links
            </p>
            <div className="flex flex-col items-start mt-5 space-y-2">
              {["Home", "Who We Are", "Our Philosophy"].map((link, index) => (
                <motion.p
                  key={index}
                  whileHover={{ scale: 1.1, color: "#2563EB" }}
                  className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500"
                >
                  {link}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Industries Section */}
          <div>
            <p className="font-semibold text-gray-800 dark:text-white">
              Industries
            </p>
            <div className="flex flex-col items-start mt-5 space-y-2">
              {[
                "Retail & E-Commerce",
                "Information Technology",
                "Finance & Insurance",
              ].map((industry, index) => (
                <motion.p
                  key={index}
                  whileHover={{ scale: 1.1, color: "#2563EB" }}
                  className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500"
                >
                  {industry}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <p className="font-semibold text-gray-800 dark:text-white">
              Contact
            </p>
            <div className="flex flex-col items-start mt-5 space-y-4">
              {/* Phone Number */}
              <motion.div
                whileHover={{ scale: 1.05, color: "#2563EB" }}
                className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500 flex items-center space-x-2"
              >
                <span className="material-icons">phone</span>
                <a href="tel:+1234567890" className="hover:underline">
                  +1 (234) 567-890
                </a>
              </motion.div>

              {/* Email */}
              <motion.div
                whileHover={{ scale: 1.05, color: "#2563EB" }}
                className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500 flex items-center space-x-2"
              >
                <span className="material-icons">email</span>
                <a
                  href="mailto:ProductHunt@gmail.com"
                  className="hover:underline"
                >
                  ProductHunt@gmail.com
                </a>
              </motion.div>

              {/* Location */}
              <motion.div
                whileHover={{ scale: 1.05, color: "#2563EB" }}
                className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500 flex items-center space-x-2"
              >
                <span className="material-icons">location_on</span>
                <p>123 Main Street, Anytown, USA</p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <hr className="my-6 border-gray-200 md:my-8 dark:border-gray-700" />

        <div className="sm:flex sm:items-center sm:justify-between">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="flex flex-1 gap-4 hover:cursor-pointer "
          >
            <FaGooglePlay className="w-8 h-8 text-gray-700 hover:text-blue-500" />
            <FaApple className="w-8 h-8 text-gray-700 hover:text-blue-500" />
          </motion.div>

          <p className="w-full divider border-x-2 px-4  text-center text-gray-600 dark:text-gray-300">
            © 2025 Product Hunt Inc. All rights reserved.
          </p>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="flex gap-4 mt-4 sm:mt-0"
          >
            <FaFacebook className="w-6 h-6 text-gray-700 hover:text-blue-500" />
            <FaTwitter className="w-6 h-6 text-gray-700 hover:text-blue-500" />
            <FaInstagram className="w-6 h-6 text-gray-700 hover:text-blue-500" />
            <FaLinkedin className="w-6 h-6 text-gray-700 hover:text-blue-500" />
            <FaGithub className="w-6 h-6 text-gray-700 hover:text-blue-500" />
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
