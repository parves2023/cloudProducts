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
        <div
          key={review._id}
          className="p-4 border rounded-md bg-gray-50 shadow-sm"
        >
            <img src={review.userImg} alt="not Available" />
          <p className="font-medium text-lg">{review.userName}</p>
          <div className="flex items-center">
            <Rating
              count={5}
              size={20}
              value={review.rating}
              edit={false} // Disable editing for display purposes
              activeColor="#ffd700"
              isHalf={true} // Support half stars if needed
            />
            <span className="ml-2 text-gray-600 text-sm">
              {review.rating}/5
            </span>
          </div>
          <p className="text-gray-800 mt-2">{review.review}</p>
          <p className="text-sm text-gray-500 mt-1">
            Reviewed on: {new Date(review.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ShowReview;
