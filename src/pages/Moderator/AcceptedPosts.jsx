import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

function AcceptedPosts() {
    const [acceptedProducts, setAcceptedProducts] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchAcceptedProducts = async () => {
            try {
                const response = await axiosPublic.get("/api/products?status=approved");
                setAcceptedProducts(response.data);
            } catch (error) {
                console.error("Error fetching accepted products:", error);
            }
        };

        fetchAcceptedProducts();
    }, [axiosPublic]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Accepted Products</h1>
            {acceptedProducts.length === 0 ? (
                <p className="text-center text-gray-500">No accepted products found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {acceptedProducts.map((product) => (
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

export default AcceptedPosts;
