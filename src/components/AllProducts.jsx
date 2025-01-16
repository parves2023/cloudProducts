import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";

function AllProducts() {
  const [products, setProducts] = useState([]); // All products from server
  const { dataFetching, setDataFetching } = useContext(AuthContext); // Loading state context
  const [selectedCategory, setSelectedCategory] = useState("All"); // Dropdown selection
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products by category
  const axiosPublic = useAxiosPublic();

  // Handle dropdown filter change
  const handleFilterChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredProducts(products); // Show all products
    } else {
      setFilteredProducts(products.filter((product) => product.category === category));
    }
  };

  // Fetch products from the server
  useEffect(() => {
    const fetchProducts = async () => {
      setDataFetching(true);
      try {
        const response = await axiosPublic.get("/products");
        if (response.status === 200) {
          const data = response.data;
          console.log(data);
          setProducts(data);
          setFilteredProducts(data); // Initialize with all products
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setDataFetching(false);
      }
    };

    fetchProducts();
  }, [axiosPublic, setDataFetching]);

  // Get unique categories from the products array
  const categories = ["All", ...new Set(products.map((product) => product.category))];

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

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <h1 className="text-3xl font-bold text-center mb-6">All Products</h1>

      {/* Dropdown Menu */}
      <div className="flex justify-center mb-6">
        <select
          value={selectedCategory}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-lg px-4 py-2 shadow-md focus:outline-none focus:ring focus:ring-green-300"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
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
            <Link
              to={`/details/${product._id}`}
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllProducts;
