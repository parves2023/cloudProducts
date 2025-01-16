import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import { AuthContext } from "../providers/AuthProvider";
import { BallTriangle } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";

// Set the app element
Modal.setAppElement("#root");

const ProductDetails = () => {
  const { _id } = useParams(); // Get product ID from route params
  const { user } = useContext(AuthContext); // User context
  const [product, setProduct] = useState(null); // Product data
  const [loading, setLoading] = useState(true); // Loading state

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
        <strong>Creator Email:</strong> {product.creatorEmail}
      </p>
      <p className="mt-4">
        <strong>Description:</strong>
      </p>
      <p>{product.description}</p>

      <ToastContainer />
    </div>
  );
};

export default ProductDetails;
