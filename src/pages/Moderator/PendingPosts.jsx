import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Vortex } from "react-loader-spinner";

function PendingPosts() {
  const [pendingProducts, setPendingProducts] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingProducts = async () => {
      try {
        const response = await axiosSecure.get("/api/products?status=pending");
        setPendingProducts(response.data);
      } catch (error) {
        console.error("Error fetching pending products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingProducts();
  }, [axiosSecure]);

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

  const handleStatusChange = async (id, status) => {
    try {
      const response = await axiosSecure.patch(
        `/api/products/${id}?status=${status}`
      );
      if (response.status === 200) {
        setPendingProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== id)
        );
      }
    } catch (error) {
      console.error(`Error updating product status to ${status}:`, error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-text-primary">
        Pending Products
      </h1>
      {pendingProducts.length === 0 ? (
        <p className="text-center text-gray-500">No pending products found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse w-full text-left">
            <thead>
              <tr className="bg-gray-200 text-text-primary">
                <th className="border p-3">Image</th>
                <th className="border p-3">Name</th>
                <th className="border p-3">Category</th>
                <th className="border p-3">Price</th>
                <th className="border p-3">Description</th>
                <th className="border p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingProducts.map((product) => (
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
                  <td className="border p-3 flex gap-3">
                    <button
                      onClick={() =>
                        handleStatusChange(product._id, "approved")
                      }
                      className="px-4 py-2 bg-[#135D66] text-white rounded hover:bg-blue-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() =>
                        handleStatusChange(product._id, "rejected")
                      }
                      className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() =>
                        (window.location.href = `/details/${product._id}`)
                      }
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
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

export default PendingPosts;
