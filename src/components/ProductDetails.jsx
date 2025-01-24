import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import { AuthContext } from "../providers/AuthProvider";
import { BallTriangle } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import { IoThumbsUpOutline } from "react-icons/io5";
import useAxiosPublic from "../hooks/useAxiosPublic";
import ReviewModal from "./review/ReviewModal";
import ShowReview from "./review/ShowReview";


// Set the app element for accessibility
Modal.setAppElement("#root");

const ProductDetails = () => {
  const { _id } = useParams(); // Get product ID from route params
  const { user } = useContext(AuthContext); // User context
  const [product, setProduct] = useState(null); // Product data
  const [loading, setLoading] = useState(true); // Loading state
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [reportDetails, setReportDetails] = useState(""); // Report details state
  const axiosPublic = useAxiosPublic(); 
  const [isreviewModalOpen, setIsreviewModalOpen] = useState(false);

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
        setLoading(false);
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



  const handleLike = async (productId, totalLikes) => {
    try {
      // API call to update the like count in the backend
      const response = await axiosPublic.patch(`/products/like/${productId}`, {
        userEmail: user.email,
        userName: user.name,
        likeCount: totalLikes,
      });
  
      if (response.data.success) {
        // Update the local state directly since `product` is an object
        setProduct((prevProduct) => {

          // Check if the user has already liked the product
          const isLiked = prevProduct.likes.some(
            (like) => like.email === user.email
          );
  
          // Update the `likeCount` and `likes` array
          return {
            ...prevProduct,
            likeCount: isLiked
              ? prevProduct.likeCount - 1
              : prevProduct.likeCount + 1,
            likes: isLiked
              ? prevProduct.likes.filter((like) => like.email !== user.email)
              : [...prevProduct.likes, { email: user.email, name: user.name }],
          };
        });
      } else {
        console.error("Failed to like product");
      }
    } catch (error) {
      console.error("Error liking product:", error);
    }
  };
  
  
  



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

      <p>total Likes : {product?.likeCount}</p>

      <div className="flex flex-wrap mt-2 mb-3 ">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded-full mr-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>

             


      <p className="mt-4">
        <strong>Description:</strong>
      </p>
      <p>{product.description}</p>

      {/* Button to open the report modal */}
      <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="btn btn-warning text-gray-700 my-3"
      >
        Report this post
      </button>

      {
  product.externalLink ? (
    <a
      href={product.externalLink} // Use the provided external link
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-link"
    >
      Visit External Link
    </a>
  ) : (
    <a
      href={`https://${product.name
        .split(' ') // Convert the string into an array of words
        .map((word) => word.trim().toLowerCase()) // Trim and lowercase each word
        .join('') // Join the words back into a single string without spaces
      }.com`} // Generate the URL based on product name
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-link"
    >
      Visit Product
    </a>
  )
}




<div className="flex gap-5 mb-10 flex-row-reverse justify-end">
  {/* //like button  */}
{
  user && (
    <motion.div
      onClick={() => handleLike(product._id,product.likes?.length)}
      whileHover={{ scale: 1.2, rotate: -7 }}
      whileTap={{ scale: 0.9 }}
      style={{
        backgroundColor: product.likes?.some((like) => like.email === user?.email)
          ? "#3B82F6" // blue-500
          : "#CBD5E1", // slate-300
      }}
      className={`${
        product.creatorEmail !== user?.email ? "block" : "hidden"
      } size-10 btn w-16   p-2 rounded cursor-pointer flex items-center justify-center gap-2`}
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

<button
  className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md shadow-lg transition duration-300"
  onClick={() => setIsreviewModalOpen(true)}
>
  Post a Review
</button>
</div>





















































<hr />


{
  user && <ShowReview isreviewModalOpen={isreviewModalOpen} productId={product._id} ></ShowReview>
}


   {/* Review Modal */}
   <ReviewModal
        productId={product._id}
        user={user}
        isOpen={isreviewModalOpen}
        onClose={() => setIsreviewModalOpen(false)}
      />






      </div>



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
