import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosPublic from '../hooks/useAxiosPublic';
import useAuth from '../hooks/useAuth';
import UpdateProduct from './UpdateProduct';

function MyProducts() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // For the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosPublic.get('/my-products', {
          params: { email: user.email },
        });
        // console.log(response.data);
        
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

  
  // Delete product handler
  const handleDelete = async (productId) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      try {
        await axiosPublic.delete(`/products/${productId}`);
        setProducts(products.filter((product) => product._id !== productId));
        Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting product:', error);
        Swal.fire({
          icon: 'error',
          title: 'Failed to delete product',
          text: error.response?.data?.message || error.message,
        });
      }
    }
  };

  // Open the modal and set the selected product
  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  // Update the product in the table
  const handleProductUpdate = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">My Products</h1>
      {products.length === 0 ? (
        <p>No products added yet.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Product Name</th>
              <th className="border border-gray-300 p-2">Votes</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="text-center">
                <td className="border border-gray-300 p-2">{product.name}</td>
                <td className="border border-gray-300 p-2">{Array.isArray(product?.likes) ? product.likes.length : 0}</td>

                {/* <td className="border border-gray-300 p-2">no like</td> */}
                <td className="border border-gray-300 p-2">{product.status}</td>
                <td className="border border-gray-300 p-2 space-x-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => openModal(product)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Update Product Modal */}
      {selectedProduct && (
        <UpdateProduct
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={closeModal}
          onUpdate={handleProductUpdate}
        />
      )}
    </div>
  );
}

export default MyProducts;
