import React, { useState } from "react";
import { motion } from "framer-motion";
import Lottie from "react-lottie";
import techAnimationData from "./../../assets/Animation - faq.json";

const FAQ = () => {
  const faqs = [
    {
      question: "What is Cloud Products?",
      answer:
        "Cloud Products is a platform where users can discover, share, and upvote their favorite tech products, including web apps, AI tools, software, games, and more.",
    },
    {
      question: "How do I submit a product?",
      answer:
        "You can submit a product by signing up for an account and using the 'Submit Product' feature. Provide details like the product name, description, and category.",
    },
    {
      question: "Is Cloud Products free to use?",
      answer:
        "Yes, Cloud Products is completely free for users to explore and submit products. We aim to make tech discovery accessible to everyone.",
    },
    {
      question: "Can I upvote products?",
      answer:
        "Yes, you can upvote products you like. Upvoting helps highlight the best tech innovations on the platform.",
    },
    {
      question: "How are products categorized?",
      answer:
        "Products are categorized into sections like AI Tools, Web Apps, Mobile Apps, Games, and more to make discovery easier.",
    },
    {
      question: "Can I leave reviews for products?",
      answer:
        "Yes, you can leave reviews and ratings for products to share your experience and help others make informed decisions.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: techAnimationData, // Replace with a tech-related Lottie animation
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl text-center mb-8 bg-[#135d66] font-semibold py-3 text-white rounded-2xl"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border rounded-lg shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-4 bg-cardback text-left text-lg font-semibold flex justify-between items-center hover:bg-gray-100 transition duration-200"
                >
                  {faq.question}
                  <motion.span
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    ⌄
                  </motion.span>
                </button>
                {openIndex === index && (
                  <motion.div
                    className="p-4 bg-gray-100 text-gray-700"
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </div>
            ))}
          </motion.div>
          <motion.div
            className="hidden md:flex items-center justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Lottie options={defaultOptions} height={400} width={400} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;