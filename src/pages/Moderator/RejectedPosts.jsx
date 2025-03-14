import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Vortex } from "react-loader-spinner";
import { Link } from "react-router";

function RejectedPosts() {
  const [rejectedProducts, setRejectedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchRejectedProducts = async () => {
      try {
        const response = await axiosSecure.get("/api/products?status=rejected");
        setRejectedProducts(response.data);
      } catch (error) {
        console.error("Error fetching rejected products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRejectedProducts();
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

  return (
    <div className="container mx-auto px-4 py-8 bg-cardback">
      <h1 className="text-2xl font-bold text-text-primary mb-6">
        Rejected Products
      </h1>
      {rejectedProducts.length === 0 ? (
        <p className="text-center text-text-primary">No rejected products found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse w-full text-left">
            <thead>
              <tr className="bg-background">
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
                <tr key={product._id} className="hover:bg-background">
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
                  <Link
  to={`/details/${product._id}`}
  className="px-4 py-2 bg-[#135D66] text-white rounded hover:bg-green-600"
>
  Details
</Link>
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
