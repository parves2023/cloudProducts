import React, { useState } from "react";
import { motion } from "framer-motion";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing, ${email}!`);
    setEmail("");
  };

  return (
    <div className="py-12 bg-gradient-to-r from-blue-500 to-purple-600  my-8">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-white mb-4"
        >
          Subscribe to Our Newsletter
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-200 mb-8"
        >
          Stay updated with the latest tech products and innovations.
        </motion.p>
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-l-lg w-64 md:w-80 outline-none"
            required
          />
          <button
            type="submit"
            className="bg-white text-blue-600 font-semibold px-6 rounded-r-lg hover:bg-gray-100 transition duration-300"
          >
            Subscribe
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default Newsletter;