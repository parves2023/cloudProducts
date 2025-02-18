import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import UpvoteButton from "./UpvoteButton";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";
import { IoThumbsUpOutline } from "react-icons/io5";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Vortex } from "react-loader-spinner";

const Featured = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [fetchAgain, setfetchagain] = useState(false);
  const axiosPublic = useAxiosPublic();

  const fetchFeaturedProducts = async () => {
    try {
      const response = await axios.get(
        "https://cloudproducts.vercel.app/api/featured-products"
      );
      if (response.headers["content-type"]?.includes("application/json")) {
        // console.log(response.data);

        setFeaturedProducts(response.data); // Assume it's an array
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching featured products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchAgain]);

  const handleLike = async (productId, totalLikes) => {
    const newLikeCount = totalLikes;
    try {
      const response = await axiosPublic.patch(`/products/like/${productId}`, {
        userEmail: user.email,
        userName: user.name,
        likeCount: newLikeCount,
      });

      if (response.data.success) {
        setFeaturedProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === productId
              ? {
                  ...product,
                  likes: product.likes.some((like) => like.email === user.email)
                    ? product.likes.filter((like) => like.email !== user.email)
                    : [
                        ...product.likes,
                        { email: user.email, name: user.name },
                      ],
                }
              : product
          )
        );
      } else {
        console.error("Failed to like product");
      }
    } catch (error) {
      console.error("Error liking product:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-start mt-10 h-screen">
        <Vortex
          visible={true}
          height={100}
          width={100}
          ariaLabel="vortex-loading"
          wrapperStyle={{}}
          wrapperClass="vortex-wrapper"
          colors={[
            "#E6F0FF",
            "#F6EBD2",
            "#D94848",
            "#4D8B92",
            "#A5D0CC",
            "#FFD7D7",
            "#F2F8E1",
          ]}
        />
      </div>
    );
  }

  if (featuredProducts.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">
          No featured products available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white py-8 px-4 sm:px-6 lg:px-8 container mx-auto">
      <h2 className="text-2xl font-bold  text-center mb-6 text-[#135D66]">
        Featured Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <div
            key={product._id}
            className="bg-[#faffff] shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col justify-end w-auto h-auto">
              <div className="flex-col ">
                <h3 className="text-lg font-semibold text-[#003C43]">
                  {product.name}
                </h3>
                <p className="text-[#135D66]">{product.category}</p>
                <p className="text-[#946220] mt-2">${product.price}</p>
                <div className="flex flex-wrap mt-2 mb-3 ">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-[#E3FEF7] text-[#003C43] text-xs font-semibold px-2 py-1 rounded-full mr-2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between mt-auto  ">
                <button
                  type="submit"
                  onClick={() => navigate(`/details/${product._id}`)}
                  className="flex justify-center border-[#135D66] gap-2 items-center ml-2 shadow-xl text-xs bg-gray-300 text-black backdrop-blur-md lg:font-semibold isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#135D66] hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-2 py-1 overflow-hidden border-2 rounded-full group active:scale-95 active:bg-gray-200 transition duration-300"
                >
                  View Details
                  <svg
                    className="w-5 h-5 hidden md:flex justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-1 rotate-45"
                    viewBox="0 0 16 19"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                      className="fill-gray-800 group-hover:fill-gray-800"
                    ></path>
                  </svg>
                </button>

                {/* <UpvoteButton  ></UpvoteButton>   */}

                {!user && (
                  <motion.div
                    onClick={() => navigate("/login")}
                    whileHover={{ backgroundColor: "#135D66" }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div className="flex items-center">
                      <UpvoteButton></UpvoteButton>
                      <h1 className="btn">{product.likes?.length || 0}</h1>
                    </div>
                  </motion.div>
                )}

                {user && (
                  <motion.div
                    onClick={() =>
                      handleLike(product._id, product.likes?.length)
                    }
                    whileHover={{ scale: 1.2, rotate: -7 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      backgroundColor: product.likes?.some(
                        (like) => like.email === user?.email
                      )
                        ? "#135D66" // blue-500
                        : "#CBD5E1", // slate-300
                    }}
                    className={`${
                      product.creatorEmail !== user?.email ? "block" : "hidden"
                    } size-10 w-16 mt-2 ml-2 p-2 rounded cursor-pointer flex items-center justify-center gap-2`}
                  >
                    <IoThumbsUpOutline
                      className={`${
                        product.likes?.some(
                          (like) => like.email === user?.email
                        )
                          ? "text-white"
                          : "text-gray-700"
                      } size-6`}
                    />
                    <span
                      className={`${
                        product.likes?.some(
                          (like) => like.email === user?.email
                        )
                          ? "text-white"
                          : "text-gray-700"
                      } text-sm font-medium`}
                    >
                      {product.likes?.length || 0}
                    </span>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
