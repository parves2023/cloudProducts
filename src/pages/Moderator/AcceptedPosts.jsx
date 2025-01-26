import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Vortex } from "react-loader-spinner";

function AcceptedPosts() {
  const [acceptedProducts, setAcceptedProducts] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAcceptedProducts = async () => {
      try {
        const response = await axiosSecure.get("/api/products?status=approved");
        setAcceptedProducts(response.data);
      } catch (error) {
        console.error("Error fetching accepted products:", error);
      }finally{
        setLoading(false);
      }
    };

    fetchAcceptedProducts();
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


  

  const toggleFeaturedStatus = async (id, isFeatured) => {
    try {
      const response = await axiosSecure.patch(
        `/products/mark-as-featured/${id}`,
        {
          markAsFeatured: !isFeatured, // Toggle the featured status
        }
      );
      if (response.data.success) {
        setAcceptedProducts((prev) =>
          prev.map((product) =>
            product._id === id
              ? { ...product, markAsFeatured: !isFeatured }
              : product
          )
        );
        // console.log(
        //   `Product ${
        //     !isFeatured ? "marked as featured" : "unmarked as featured"
        //   } successfully`
        // );
      } else {
        console.error(
          `Failed to ${!isFeatured ? "mark as featured" : "unmark as featured"}`
        );
      }
    } catch (error) {
      console.error(
        `Error ${
          !isFeatured ? "marking as featured" : "unmarking as featured"
        }:`,
        error.message
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl text-[#135D66] font-bold mb-6">Accepted Products</h1>
      {acceptedProducts.length === 0 ? (
        <p className="text-center text-gray-500">No accepted products found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto text-[#135D66] border-collapse w-full text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-3">Image</th>
                <th className="border p-3">Name</th>
                <th className="border p-3">Category</th>
                <th className="border p-3">Price</th>
                <th className="border p-3">Description</th>
                <th className="border p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {acceptedProducts.map((product) => (
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
                  <td className="border p-3 flex gap-2">
                    <button
                      onClick={() =>
                        (window.location.href = `/details/${product._id}`)
                      }
                      className="px-4 py-2 bg-[#135D66] text-white rounded hover:bg-green-600"
                    >
                      Details
                    </button>
                    <button
                      onClick={() =>
                        toggleFeaturedStatus(
                          product._id,
                          product.markAsFeatured
                        )
                      }
                      className={`px-4 w-40 py-2 rounded ${
                        product.markAsFeatured
                          ? "bg-yellow-500 text-white"
                          : "bg-blue-500 text-white"
                      }`}
                    >
                      {product.markAsFeatured
                        ? "Unmark as Featured"
                        : "Mark as Featured"}
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

export default AcceptedPosts;
