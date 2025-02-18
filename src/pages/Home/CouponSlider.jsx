import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const CouponSlider = () => {
  const [coupons, setCoupons] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axiosSecure.get("/api/coupons");
        const validCoupons = response.data;
        setCoupons(validCoupons);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };

    fetchCoupons();
  }, [axiosSecure]);

  // Helper function to group coupons into sets of 2 for larger screens
  const groupCoupons = (coupons, groupSize) => {
    const grouped = [];
    for (let i = 0; i < coupons.length; i += groupSize) {
      grouped.push(coupons.slice(i, i + groupSize));
    }
    return grouped;
  };

  // Determine the number of coupons per slide based on screen size
  const groupedCoupons = groupCoupons(coupons, 2); // Show 2 coupons per slide


// Function to copy coupon code to clipboard
const copyCouponCode = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      Swal.fire({
        icon: "success",
        title: "Coupon code copied!",
        text: "The coupon code has been copied to your clipboard.",
        confirmButtonText: "Okay",
      });
    }).catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to copy coupon code.",
      });
      console.error("Failed to copy coupon code:", error);
    });
  };



  return (
    <div className="my-8 container mx-auto w-full bg-gray-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#135D66]">Trending Coupons</h2>
      {groupedCoupons.length > 0 ? (
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop
          autoPlay
          interval={3000}
          transitionTime={800}
          swipeable
          emulateTouch
          className="coupon-carousel"
        >
          {/* Render grouped coupons */}
          {groupedCoupons.map((group, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {group.map((coupon) => (
              <div
                key={coupon._id}
                className="bg-[#fcfffd] relative shadow-md rounded-lg p-6 transition-transform transform hover:scale-105"
              >
                <button
                  onClick={() => copyCouponCode(coupon.code)}
                  className="absolute right-4 top-4 bg-[#135D66] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#003C43] transition"
                >
                  Copy Code
                </button>
          
                <h3 className="text-xl font-bold text-[#003C43] mb-4">{coupon.code}</h3>
                <p className="text-sm text-[#135D66] mb-3">{coupon.description}</p>
                <p className="text-lg font-semibold text-[#77B0AA]">
                  Discount: {coupon.discount}%
                </p>
                <p className="text-sm text-[#135D66] mt-2">
                  Expires on:{" "}
                  <span className="text-[#003C43] font-medium">
                    {new Date(coupon.expiryDate).toLocaleDateString()}
                  </span>
                </p>
              </div>
            ))}
          </div>
          
          ))}
        </Carousel>
      ) : (
        <p className="text-center text-gray-500">No coupons available.</p>
      )}
    </div>
  );
};

export default CouponSlider;
