import React, { useState } from "react";
import Rating from "react-rating-stars-component";
import axios from "axios";
import Swal from "sweetalert2";

const ReviewModal = ({ productId, user, isOpen, onClose }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  

  const handleSubmit = async () => {
    if (!rating || !review.trim()) {
      alert("Please provide a rating and a review!");
      return;
    }

    const feedback = {
      productId,
      userEmail: user.email,
      userName: user.displayName,
      userImg: user.photoURL,
      rating,
      review,
      createdAt: new Date(),
    };

    try {
        // Save review to MongoDB
        const response = await axios.post(`http://localhost:5000/reviews`, feedback);
        if (response.data.success) {
          Swal.fire({
            icon: "success",
            title: "Review Submitted!",
            text: "Thank you for your feedback.",
          });
          onClose(); // Close the modal
        } else {
          Swal.fire({
            icon: "error",
            title: "Submission Failed",
            text: "Failed to submit review. Please try again.",
          });
        }
      } catch (error) {
        console.error("Error submitting review:", error.message);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong! Please try again later.",
        });


  }};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
        {/* Modal Title */}
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Submit Your Review
        </h2>

        {/* Rating Section */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating:
          </label>
          <Rating
            count={5}
            size={30}
            activeColor="#ffd700"
            value={rating}
            onChange={(value) => setRating(value)}
          />
        </div>

        {/* Review Section */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Review:
          </label>
          <textarea
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500"
            rows="4"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review here..."
          ></textarea>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-md"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
