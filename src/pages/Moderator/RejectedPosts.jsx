import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";

function RejectedPosts() {
  const [rejectedProducts, setRejectedProducts] = useState([]);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchRejectedProducts = async () => {
      try {
        const response = await axiosSecure.get("/api/products?status=rejected");
        setRejectedProducts(response.data);
      } catch (error) {
        console.error("Error fetching rejected products:", error);
      }
    };

    fetchRejectedProducts();
  }, [axiosSecure]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-[#135D66] mb-6">Rejected Products</h1>
      {rejectedProducts.length === 0 ? (
        <p className="text-center text-gray-500">No rejected products found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse w-full text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-3">Image</th>
                <th className="border p-3">Name</th>
                <th className="border p-3">Category</th>
                <th className="border p-3">Price</th>
                <th className="border p-3">Description</th>
                <th className="border p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {rejectedProducts.map((product) => (
                <tr key={product._id} className="hover:bg-gray-100">
                  <td className="border p-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-16 w-16 object-cover rounded"
                    />
                  </td>
                  <td className="border p-3">{product.name}</td>
                  <td className="border p-3">{product.category}</td>
                  <td className="border p-3">${product.price}</td>
                  <td className="border p-3">
                    {product.description.split(" ").slice(0, 3).join(" ")}...
                  </td>
                  <td className="border p-3">
                    <button
                      onClick={() =>
                        (window.location.href = `/details/${product._id}`)
                      }
                      className="px-4 py-2 bg-[#135D66] text-white rounded hover:bg-green-600"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default RejectedPosts;
