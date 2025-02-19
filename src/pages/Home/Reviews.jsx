import React from "react";
import { motion } from "framer-motion";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    comment: "Cloud Products is amazing! I found so many useful tools for my business.",
    rating: 5,
  },
  {
    id: 2,
    name: "Jane Smith",
    comment: "The platform is user-friendly and has a great collection of tech products.",
    rating: 4,
  },
  {
    id: 3,
    name: "Alex Johnson",
    comment: "I love how easy it is to discover and share new tech innovations here.",
    rating: 5,
  },
];

const Reviews = () => {
  return (
    <div className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-cardback p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="text-yellow-500">
                  {Array.from({ length: review.rating }, (_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
              <p className="text-text-light mb-4">{review.comment}</p>
              <p className="text-text-primary font-semibold">- {review.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;