import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Vortex } from "react-loader-spinner";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { IoThumbsUpOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { MdOutlineSearch } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

function AllProducts() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]); // Products for the current page
  const { dataFetching, setDataFetching } = useContext(AuthContext); // Loading state context
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [searchTags, setSearchTags] = useState("");
  const axiosPublic = useAxiosPublic();
  const limit = 6; // Items per page
  const [filter, setFilter] = useState(true);
  const [priceSort, setPriceSort] = useState("");

  // Fetch products from the server

  const fetchProducts = async (page, tags = "") => {
    setDataFetching(true);
    console.log(tags, priceSort);

    try {
      const response = await axiosPublic.get(
        `/products?page=${page}&limit=${limit}&tags=${tags}&sortByPrice=${priceSort}`
      );
      if (response.status === 200) {
        const { products, totalPages } = response.data;
        console.log(products);

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
  }, [currentPage, user]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleTagSearch = (e) => {
    e.preventDefault();
    fetchProducts(currentPage, searchTags); // Pass tags to the fetchProducts function
    // console.log(searchTags);
  };

  useEffect(() => {
    fetchProducts(1, searchTags);
  }, [priceSort]);

  const handleReset = () => {
    setSearchTags(""); // Clear the tag input
    setPriceSort(""); // Reset the price sort option
    setCurrentPage(1); // Reset to the first page
    fetchProducts(1, ""); // Fetch products without any filters
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
      </div>
    );
  }

  const handleLike = async (productId, totalLikes) => {
    try {
      const hasLiked = products
        .find((product) => product._id === productId)
        ?.likes.some((like) => like.email === user.email);

      const newLikeCount = totalLikes;

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
                    : [
                        ...product.likes,
                        { email: user.email, name: user.name },
                      ],
                  likeCount: newLikeCount, // Update likeCount in local state
                }
              : product
          )
        );
      } else {
        console.error("Failed to update like");
      }
    } catch (error) {
      console.error("Error liking product:", error);
    }
  };

  return (
    <div className="container mx-auto my-8">
      {/* Floating Button */}
      <button
        className="btn btn-primary px-4 py-2 border-none bg-[#135D66] text-white rounded-lg hover:bg-[#135c66c7] shadow-md fixed top-24 left-0 z-30 flex items-center gap-2"
        onClick={() => setFilter(!filter)}
      >
        {filter ? <RxCross2 size={20} /> : <MdOutlineSearch size={20} />}
      </button>

      {/* Floating Sidebar */}
      {filter && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-28 left-5 bg-cardback w-72 p-6 shadow-lg rounded-lg z-20"
        >
          <div className="flex flex-col items-center">
            <form
              onSubmit={handleTagSearch}
              className="flex flex-col gap-3 my-4 w-full"
            >
              <label className="font-medium text-text-primary">
                Search by Tags:
              </label>
              <input
                type="text"
                placeholder="Enter tags (comma-separated)"
                value={searchTags}
                onChange={(e) => setSearchTags(e.target.value)}
                className="w-full text-gray-900 p-2 border rounded-md focus:ring focus:ring-[#135D66] outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#135D66] text-white rounded-md hover:bg-[#0e444b] transition duration-300"
              >
                Search
              </button>
            </form>

            {/* Price Sorting Options */}
            <div className="w-full my-4 text-gray-950 ">
              <label className="font-medium text-text-primary">
                Sort by Price:
              </label>
              <select
                onChange={(e) => setPriceSort(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring focus:ring-[#135D66] outline-none"
              >
                <option value="">Select</option>
                <option value="lowToHigh">Low to High</option>
                <option value="highToLow">High to Low</option>
              </select>
            </div>
          </div>
          <div>
            <button
              onClick={handleReset}
              className="btn  w-full bg-[#135D66] border-none text-white hover:bg-[#135c66dc]"
            >
              Reset All
            </button>
          </div>
        </motion.div>
      )}

      <h1 className="text-3xl font-bold text-center mb-6 text-text-primary">
        All Products
      </h1>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-background">
        {products.map((product) => (
          <div
            key={product._id}
            className="border border-border flex flex-col justify-between p-4 rounded shadow hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full md:h-60 h-48 object-cover rounded mb-4"
            />
            <h3 className="text-lg font-semibold text-text-primary">
              {product.name}
            </h3>
            <p className="text-text-primary">{product.category}</p>
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

            <p className="text-sm text-text-primary mb-4">
              {product.description.split(" ").slice(0, 5).join(" ")}...
            </p>
            <span className="text-sm text-text-primary">
              Total Likes: {product.likes?.length || 0}
            </span>
            <div className="flex items-center justify-between">
              <Link
                to={`/details/${product._id}`}
                className="mt-2 bg-[#135D66] flex-1 text-white px-4 py-2 rounded hover:bg-[#003C43]"
              >
                View Details
              </Link>

              {user && (
                <motion.div
                  onClick={() => handleLike(product._id, product.likes?.length)}
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
              )}

              {!user && (
                <motion.div
                  onClick={() => navigate("/login")}
                  whileHover={{
                    scale: 1.2,
                    rotate: -7,
                    backgroundColor: "#E5E7EB",
                  }}
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
