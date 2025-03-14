import React, { useState } from "react";
import { motion } from "framer-motion";

const ContactUs = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const images = [
    {
      src: "https://previews.123rf.com/images/sugardragon/sugardragon1901/sugardragon190100030/126253670-landing-page-template-of-success-and-achievement-illustration-concept-modern-flat-design-concept-of.jpg",
      alt: "Success and Achievement",
      title: "Success and Achievement",
      description:
        "Empowering your tech journey to achieve success and growth.",
    },
    {
      src: "https://thumbs.dreamstime.com/b/landing-page-template-student-online-help-illustration-concept-modern-flat-design-concept-web-page-design-landing-page-137172722.jpg",
      alt: "Student Online Help",
      title: "Student Online Help",
      description: "Connecting learners with the tools they need for success.",
    },
    {
      src: "https://img.freepik.com/premium-photo/start-up-concepts-with-rocket-male-hand-blue-desk-table_254791-1693.jpg",
      alt: "Startup Rocket",
      title: "Innovative Startups",
      description: "Ignite your startup's journey with the best tech tools.",
    },
    {
      src: "https://thumbs.dreamstime.com/z/impress-your-clients-customers-elegant-chic-advertising-backdrop-offering-polished-professional-setting-308811364.jpg",
      alt: "Professional Setting",
      title: "Professional Setting",
      description:
        "Create an impression with modern and professional solutions.",
    },
    {
      src: "https://www.thewebsurgery.com/wp-content/uploads/2015/02/Web-Design-London-The-Web-Surgery.jpg",
      alt: "Web Design",
      title: "Modern Web Design",
      description:
        "Crafting beautiful digital experiences with cutting-edge design.",
    },
  ];

  return (
    <section className="py-12 px-4 lg:px-24 bg-background">
      {/* Page Heading */}
      <motion.h1
        className="text-4xl font-bold text-center mb-8 text-text-primary"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Contact Us
      </motion.h1>

      {/* Image Carousel */}
      <div className="overflow-hidden bg-cardback rounded-2xl shadow-lg py-8 mb-12">
        <motion.div
          className="flex transition-transform duration-500"
          initial={{ x: 0 }}
          animate={{ x: `-${selectedTab * 100}%` }}
        >
          {images.map((img, index) => (
            <div key={index} className="min-w-full h-[36rem] relative">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex flex-col justify-center items-center text-white">
                <h2 className="text-6xl font-semibold">{img.title}</h2>
                <p className="text-lg mt-2">{img.description}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Carousel Navigation */}
        <div className="flex justify-center space-x-3 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                selectedTab === index ? "bg-blue-500" : "bg-gray-400"
              }`}
              onClick={() => setSelectedTab(index)}
            ></button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Contact Details */}
        <motion.div
          className="bg-cardback p-8 rounded-2xl shadow-lg mb-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl text-text-primary font-semibold mb-4">Contact Information</h2>
          <ul className="space-y-4 text-text-light">
            <li>
              <strong>Location:</strong> 123 Tech Street, Innovation City
            </li>
            <li>
              <strong>Phone:</strong> +1 (555) 123-4567
            </li>
            <li>
              <strong>Email:</strong> contact@cloudproducts.com
            </li>
          </ul>
        </motion.div>

        {/* Our Location */}
        <motion.div
          className="rounded-2xl overflow-hidden shadow-lg mb-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <iframe
            title="Our Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.81270822892!2d-122.08424968469312!3d37.42199997982598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fba2ec9b2b29d%3A0x808fba2ec9b2b29d!2sGoogleplex!5e0!3m2!1sen!2s!4v1615930188664!5m2!1sen!2s"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </motion.div>
      </div>

      {/* Our Aim */}
      <motion.div
        className="bg-cardback p-8 rounded-2xl shadow-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl text-text-primary font-semibold mb-4">Our Aim</h2>
        <p className="text-text-light">
          At Cloud Products, our mission is to empower tech enthusiasts to
          discover and share innovative tools. We foster a vibrant community
          where ideas thrive, and technology evolves.
        </p>
      </motion.div>
    </section>
  );
};

export default ContactUs;
