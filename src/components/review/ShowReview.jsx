import React, { useEffect, useState } from "react";
import axios from "axios";
import Rating from "react-rating-stars-component"; // Install with `npm install react-rating-stars-component`

const ShowReview = ({ productId ,isreviewModalOpen }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/${productId}/reviews`
        );
        if (response.data.success) {
          setReviews(response.data.reviews);
        } else {
          
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId,isreviewModalOpen]);

  if (loading) return <p>Loading reviews...</p>;

  if (!reviews.length) return <p>No reviews available for this product.</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Customer Reviews</h2>
      {reviews.map((review) => (
  <figure
    key={review._id}
    className="flex flex-col md:flex-row items-center bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-6"
  >
    {/* User Image */}
    <img
      className="w-24 h-24 md:w-32 md:h-32 rounded-full md:rounded-l-lg object-cover mx-auto md:mx-0"
      src={review.userImg || "https://via.placeholder.com/150"} // Fallback image
      alt={review.userName}
    />
    
    {/* Review Content */}
    <div className="p-6 md:p-8 flex-1">
      <blockquote>
        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 leading-relaxed">
          {review.review}
        </p>
      </blockquote>
      <div className="flex items-center mt-4">
        <Rating
          count={5}
          size={24}
          value={review.rating}
          edit={false}
          activeColor="#fbbf24"
          isHalf={true}
        />
        <span className="ml-3 text-gray-600 dark:text-gray-400 text-sm font-medium">
          {review.rating}/5
        </span>
      </div>
      <figcaption className="mt-4">
        <div className="text-sky-600 dark:text-sky-400 font-semibold text-base">
          {review.userName}
        </div>
        <div className="text-gray-500 dark:text-gray-400 text-sm">
          Reviewed on: {new Date(review.createdAt).toLocaleDateString()}
        </div>
      </figcaption>
    </div>
  </figure>
))}


    </div>
  );
};

export default ShowReview;
