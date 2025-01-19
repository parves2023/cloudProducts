import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoThumbsUpOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";



function TrendingProducts() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [trendingProducts, setTrendingProducts] = useState([]);
  const axiosPublic = useAxiosPublic();

  // Fetch trending products
  const fetchTrendingProducts = async () => {
    try {
      const response = await axiosPublic.get("/products/trending?limit=6");
      if (response.status === 200) {
        setTrendingProducts(response.data.products);
      } else {
        console.error("Failed to fetch trending products");
      }
    } catch (error) {
      console.error("Error fetching trending products:", error);
    }
  };

  useEffect(() => {
    fetchTrendingProducts();
  }, []);

  const handleLike = async (productId,totalLikes) => {
    const newLikeCount = totalLikes  ;
    try {
      const response = await axiosPublic.patch(`/products/like/${productId}`, {
        userEmail: user.email,
        userName: user.name,
        likeCount: newLikeCount,
      });

      if (response.data.success) {
        setTrendingProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === productId
              ? {
                  ...product,
                  likes: product.likes.some((like) => like.email === user.email)
                    ? product.likes.filter((like) => like.email !== user.email)
                    : [...product.likes, { email: user.email, name: user.name }],
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

  return (
    <div className="max-w-6xl mx-auto my-8">
      <h2 className="text-3xl font-bold text-center mb-6">Trending Products</h2>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {trendingProducts.map((product) => (
          <div
            key={product._id}
            className="border flex flex-col justify-between p-4 rounded shadow hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-32 md:h-28 object-cover rounded mb-4"
            />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-600 mb-2">Category: {product.category}</p>
            <p className="text-sm text-gray-600 mb-2">Price: ${product.price}</p>
            <p className="text-sm text-gray-600 mb-4">{product.description}</p>
            <span className="text-sm text-gray-600">Total Likes: {product.likes?.length || 0}</span>
            <div className="flex items-center justify-between">
              <Link
                to={`/details/${product._id}`}
                className="mt-2 bg-green-500 flex-1 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                View Details
              </Link>

              {user ? (
                <motion.div
                  onClick={() => handleLike(product._id,product.likes?.length)}
                  whileHover={{ scale: 1.2, rotate: -7 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    backgroundColor: product.likes?.some(
                      (like) => like.email === user?.email
                    )
                      ? "#3B82F6"
                      : "#CBD5E1",
                  }}
                  className="size-10 w-16 mt-2 ml-2 p-2 rounded cursor-pointer flex items-center justify-center gap-2"
                >
                  <IoThumbsUpOutline
                    className={`${
                      product.likes?.some((like) => like.email === user?.email)
                        ? "text-white"
                        : "text-gray-700"
                    } size-6`}
                  />
                  <span
                    className={`${
                      product.likes?.some((like) => like.email === user?.email)
                        ? "text-white"
                        : "text-gray-700"
                    } text-sm font-medium`}
                  >
                    {product.likes?.length || 0}
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  onClick={() => navigate("/login")}
                  whileHover={{ scale: 1.2, rotate: -7 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-slate-300 size-10 mt-2 ml-2 p-1 rounded cursor-pointer flex items-center justify-center"
                >
                  <IoThumbsUpOutline className="text-gray-700 size-10" />
                </motion.div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Show All Products Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => navigate("/all-product")}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
        >
          Show All Products
        </button>
      </div>
    </div>
  );
}

export default TrendingProducts;
