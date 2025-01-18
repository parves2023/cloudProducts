import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import { AuthContext } from "../providers/AuthProvider";
import { BallTriangle } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";
import useAuth from "../hooks/useAuth";

// Set the app element for accessibility
Modal.setAppElement("#root");

const ProductDetails = () => {
  const { _id } = useParams(); // Get product ID from route params
  const { user } = useContext(AuthContext); // User context
  const [product, setProduct] = useState(null); // Product data
  const [loading, setLoading] = useState(true); // Loading state
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [reportDetails, setReportDetails] = useState(""); // Report details state

  // Fetch product details on component mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/products/${_id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data); // Set product data
        } else {
          toast.error("Failed to fetch product details");
        }
      } catch (error) {
        toast.error("Error fetching product details");
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchProduct();
  }, [_id]);

  // Handle the report post functionality
  const handleRepostPost = async (id) => {
    if (!reportDetails.trim()) {
      toast.error("Report details cannot be empty");
      return;
    }

    const reportData = {
      reportedBy: user.email,
      reportDetails,
    };

    try {
      const response = await fetch(`http://localhost:5000/products/report/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reportData),
      });

      if (response.ok) {
        toast.success("Report submitted successfully!");
        setIsModalOpen(false); // Close modal
      } else {
        toast.error("Failed to submit report");
      }
    } catch (error) {
      toast.error("Error submitting report");
    }
  };

  // Loading spinner
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto mt-10">
        <h1 className="text-3xl font-bold text-center mb-6">Product Details</h1>
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

  // Handle product not found
  if (!product) {
    return <div className="text-center mt-10">Product not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto my-10 p-4 border rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-4 text-center">{product.name}</h1>
      <img
        src={product.image}
        alt={`${product.name}`}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <p>
        <strong>Category:</strong> {product.category}
      </p>
      <p>
        <strong>Price:</strong> ${product.price}
      </p>
      <p>
        <strong>Status:</strong> {product.status}
      </p>
      <p>
        <strong>Creator Email:</strong> {product?.creatorEmail}
      </p>
      <p className="mt-4">
        <strong>Description:</strong>
      </p>
      <p>{product.description}</p>

      {/* Button to open the report modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="btn btn-warning text-gray-700 my-3"
      >
        Report this post
      </button>

      {/* Report Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-lg font-bold mb-4">Report Product</h2>
        <textarea
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter the report details..."
          value={reportDetails}
          onChange={(e) => setReportDetails(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-gray-300 rounded mr-2"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => handleRepostPost(product._id)}
          >
            Submit
          </button>
        </div>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default ProductDetails;
