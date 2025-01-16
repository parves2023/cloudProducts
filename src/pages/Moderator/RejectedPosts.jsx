import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

function RejectedPosts() {
    const [rejectedProducts, setRejectedProducts] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchRejectedProducts = async () => {
            try {
                const response = await axiosPublic.get("/api/products?status=rejected");
                setRejectedProducts(response.data);
            } catch (error) {
                console.error("Error fetching rejected products:", error);
            }
        };

        fetchRejectedProducts();
    }, [axiosPublic]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Rejected Products</h1>
            {rejectedProducts.length === 0 ? (
                <p className="text-center text-gray-500">No rejected products found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rejectedProducts.map((product) => (
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
                                <p className="text-sm text-gray-600">Category: {product.category}</p>
                                <p className="text-sm text-gray-600">Price: ${product.price}</p>
                                <p className="text-sm text-gray-600">{product.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default RejectedPosts;
