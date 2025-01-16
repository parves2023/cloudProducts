import { useEffect, useState } from "react";

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  return (
    <div className="review-section my-10">
      <h2 className="text-center text-4xl font-bold mb-10">
        3940+ <span className="text-[#309255]">Happy Users</span>
      </h2>
      <div className="flex flex-wrap justify-center gap-10 mx-auto w-11/12">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="review-card border gap-3 bg-white p-6 rounded-lg shadow-lg max-w-lg flex items-center"
          >
            <img
              src={review.image}
              alt={review.name}
              className="rounded-full size-28 border-2 border-[#2fbe66] mb-4"
            />
            <div>
              <p className="text-lg font-medium text-gray-700 mb-2">
                "{review.comment}"
              </p>
              <p className="text-sm font-bold text-gray-800">{review.name}</p>
              <p className="text-xs text-gray-500">{review.company}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
