import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosPublic from '../hooks/useAxiosPublic';
import useAuth from '../hooks/useAuth';

function MyProducts() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosPublic.get('/my-products', {
          params: { email: user.email }, // Pass user email as query parameter
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        Swal.fire({
          icon: 'error',
          title: 'Failed to load products',
          text: error.response?.data?.message || error.message,
        });
      }
    };

    if (user?.email) {
      fetchProducts();
    }
  }, [axiosPublic, user]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">My Products</h1>
      {products.length === 0 ? (
        <p>No products added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className="card shadow-md p-4 border rounded-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-500 mb-2">Category: {product.category}</p>
              <p className="text-sm text-gray-500 mb-2">Price: ${product.price}</p>
              <p className="text-sm text-gray-500">Status: {product.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyProducts;
