import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { IoThumbsUpOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";

function AllProducts() {
  const {user} = useAuth();
  
  const [products, setProducts] = useState([]); // Products for the current page
  const { dataFetching, setDataFetching } = useContext(AuthContext); // Loading state context
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const axiosPublic = useAxiosPublic();
  const limit = 6; // Items per page

  // Fetch products from the server
  const fetchProducts = async (page) => {
    setDataFetching(true);
    try {
      const response = await axiosPublic.get(`/products?page=${page}&limit=${limit}`);
      if (response.status === 200) {
        const { products, totalPages } = response.data;
        setProducts(products);
        setTotalPages(totalPages);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setDataFetching(false);
    }
  };

  // Fetch products on page load and page change
  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage , user]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Show loading spinner while fetching data
  if (dataFetching) {
    return (
      <div className="max-w-4xl mx-auto mt-8">
        <h1 className="text-3xl font-bold text-center mb-6">All Products</h1>
        <div className="flex justify-center h-screen">
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            visible={true}
          />
        </div>
      </div>
    );
  }

  const handleLike = async (productId) => {
    console.log(productId);
    
    try {
      const response = await axiosPublic.patch(`/products/like/${productId}`, {
        userEmail: user.email,
        userName: user.name,
      });
      if (response.data.success) {
        fetchProducts(currentPage)
      } else {
        console.error("Failed to like product");
      }
    } catch (error) {
      console.error("Error liking product:", error);
    }
  };




  

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <h1 className="text-3xl font-bold text-center mb-6">All Products</h1>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
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
            <p className="text-sm text-gray-600 mb-2">Status: {product.status}</p>
            <p className="text-sm text-gray-600 mb-4">{product.description}</p>
            <span className="text-sm text-gray-600">Total Likes: {product.likes?.length || 0}</span>
            <div className="flex items-center justify-between">
            <Link
              to={`/details/${product._id}`}
              className="mt-2 bg-green-500 flex-1 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              View Details
            </Link>
            
            
        {
          user && <motion.div
          onClick={() => handleLike(product._id)}
            whileHover={{ scale: 1.2, rotate: -7, backgroundColor: "#E5E7EB" }} // Slight enlarge and rotate on hover
            whileTap={{ scale: 0.9 }} // Shrink slightly on click
            className={`${
              product.creatorEmail !== user?.email ? "block" : "hidden"
            } ${
              product.likes?.some((like) => like.email === user?.email) ? "bg-blue-500" : "bg-slate-300"
            } size-10 mt-2 ml-2 p-1 rounded cursor-pointer flex items-center justify-center`}
          >
            <IoThumbsUpOutline className="text-gray-700 size-10" />
          </motion.div>
        }
      
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === index + 1
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AllProducts;
