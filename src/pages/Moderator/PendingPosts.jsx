import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

function PendingPosts() {
    const [pendingProducts, setPendingProducts] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchPendingProducts = async () => {
            try {
                const response = await axiosPublic.get("/api/products?status=pending");
                setPendingProducts(response.data);
            } catch (error) {
                console.error("Error fetching pending products:", error);
            }
        };

        fetchPendingProducts();
    }, [axiosPublic]);


    const handleStatusChange = async (id, status) => {
        try {
            const response = await axiosPublic.patch(`/api/products/${id}?status=${status}`);
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
            <h1 className="text-2xl font-bold mb-6">Pending Products</h1>
            {pendingProducts.length === 0 ? (
                <p className="text-center text-gray-500">No pending products found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                    {pendingProducts.map((product) => (
                        <div key={product._id} className="card bg-base-100 shadow-xl">
                            <figure>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-48 w-full object-cover"
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{product.name}</h2>
                                <p className="text-sm text-gray-600">
                                    Category: {product.category}
                                </p>
                                <p className="text-sm text-gray-600">Price: ${product.price}</p>
                                <p className="text-sm text-gray-600">
                                    {product.description}
                                </p>
                                <div className="card-actions justify-between">
                                   

                                    <div className="flex gap-3">
                                    <button
                                     onClick={() => handleStatusChange(product._id, "approved")}
                                    className="btn btn-primary">Approve</button>
                                    <button
                                     onClick={() => handleStatusChange(product._id, "rejected")}
                                    className="btn btn-secondary">Reject</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default PendingPosts;
