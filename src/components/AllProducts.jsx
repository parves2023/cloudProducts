import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {  Vortex } from "react-loader-spinner";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { IoThumbsUpOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function AllProducts() {
  const {user} = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]); // Products for the current page
  const { dataFetching, setDataFetching } = useContext(AuthContext); // Loading state context
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [searchTags, setSearchTags] = useState("");
  const axiosPublic = useAxiosPublic();
  const limit = 6; // Items per page

  // Fetch products from the server
  const fetchProducts = async (page, tags = "") => {
    setDataFetching(true);
    try {
      const response = await axiosPublic.get(
        `/products?page=${page}&limit=${limit}&tags=${tags}`
      );
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

  const handleTagSearch = (e) => {
    e.preventDefault();
    fetchProducts(currentPage, searchTags); // Pass tags to the fetchProducts function
    // console.log(searchTags);
    
  };


  // Show loading spinner while fetching data
  if (dataFetching) {
    return (
      <div className="max-w-4xl mx-auto mt-8">
        <h1 className="text-3xl font-bold text-center mb-6">All Products</h1>
        <div className="flex justify-center h-screen">
<Vortex
  visible={true}
  height={100}
  width={100}
  ariaLabel="vortex-loading"
  wrapperStyle={{}}
  wrapperClass="vortex-wrapper"
  colors={['#E6F0FF', '#F6EBD2', '#D94848', '#4D8B92', '#A5D0CC', '#FFD7D7', '#F2F8E1']}
/>
        </div>
      </div>
    );
  }

  const handleLike = async (productId, totalLikes) => {
    
    try {
      const hasLiked = products.find((product) => product._id === productId)?.likes.some(
        (like) => like.email === user.email
      );
  
      const newLikeCount = totalLikes  ;
  
      const response = await axiosPublic.patch(`/products/like/${productId}`, {
        userEmail: user.email,
        userName: user.name,
        likeCount: newLikeCount,
      });
  
      if (response.data.success) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === productId
              ? {
                  ...product,
                  likes: hasLiked
                    ? product.likes.filter((like) => like.email !== user.email)
                    : [...product.likes, { email: user.email, name: user.name }],
                  likeCount: newLikeCount, // Update likeCount in local state
                }
              : product
          )
        );
      } else {
        console.error('Failed to update like');
      }
    } catch (error) {
      console.error('Error liking product:', error);
    }
  };
  
  




  

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-[#135D66]">All Products</h1>

       <div className="flex  justify-center ">
       <form onSubmit={handleTagSearch} className="flex flex-col md:flex-row items-center gap-1 mb-2 md:mb-4">
    <label className="font-medium">Search by Tags:</label> 
    <input
      type="text"
      placeholder="Enter tags (comma-separated)"
      value={searchTags}
      onChange={(e) => setSearchTags(e.target.value)}
      className="p-2  border rounded-md focus:ring focus:ring-blue-500"
    />
    <button
      type="submit"
      className="px-4 py-2 bg-[#135D66] text-white rounded-md hover:bg-[#0e444b]"
    >
      Search
    </button>
  </form>
       </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-white">
        {products.map((product) => (
          <div
            key={product._id}
            className="border flex flex-col justify-between p-4 rounded shadow hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded mb-4"
            />
             <h3 className="text-lg font-semibold text-[#003C43]">
                {product.name}
              </h3>
              <p className="text-[#135D66]">{product.category}</p>
              <p className="text-[#946220] mt-2">${product.price}</p>
              

            <div className="flex flex-wrap mt-2 mb-3">
  {Array.isArray(product.tags) && product.tags.length > 0 ? (
    product.tags.map((tag, index) => (
      <span
        key={index}
         className="bg-[#E3FEF7] text-[#003C43] text-xs font-semibold px-2 py-1 rounded-full mr-2"
      >
        {tag}
      </span>
    ))
  ) : (
    <span>No tags available</span>
  )}
</div>

            
              <p className="text-sm text-[#003C43] mb-4">
  {product.description.split(" ").slice(0, 5).join(" ")}...
</p>
            <span className="text-sm text-[#003C43]">Total Likes: {product.likes?.length || 0}</span>
            <div className="flex items-center justify-between">
            <Link
              to={`/details/${product._id}`}
              className="mt-2 bg-[#135D66] flex-1 text-white px-4 py-2 rounded hover:bg-[#003C43]"
            
            >
              View Details
            </Link>
            
            
            {
  user && (
    <motion.div
      onClick={() => handleLike(product._id,product.likes?.length)}
      whileHover={{ scale: 1.2, rotate: -7 }}
      whileTap={{ scale: 0.9 }}
      style={{
        backgroundColor: product.likes?.some((like) => like.email === user?.email)
          ? "#135D66" // blue-500
          : "#CBD5E1", // slate-300
      }}
      className={`${
        product.creatorEmail !== user?.email ? "block" : "hidden"
      } size-10 w-16 mt-2 ml-2 p-2 rounded cursor-pointer flex items-center justify-center gap-2`}
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
  )
}


{
  !user && 
    <motion.div
    onClick={() => navigate("/login")}
      whileHover={{ scale: 1.2, rotate: -7, backgroundColor: "#E5E7EB" }}
      whileTap={{ scale: 0.9 }}
      className="bg-slate-300 size-10 mt-2 ml-2 p-1 rounded cursor-pointer flex items-center justify-center"
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
                ? "bg-[#135D66] text-white"
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
