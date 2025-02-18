import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosPublic from '../hooks/useAxiosPublic';


function UpdateProduct({ product, isOpen, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    name: product.name,
    category: product.category,
    price: product.price,
    externalLink: product.externalLink || '', // Initialize with existing values or empty
    tags: product.tags?.join(', ') || '', // Convert array to comma-separated string
    image: product.image || '',
    description: product.description || '',
  });

  const axiosPublic = useAxiosPublic();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedData = {
        ...formData,
        tags: formData.tags.split(',').map((tag) => tag.trim()), // Convert back to array
      };
      console.log(updatedData);
      

      const response = await axiosPublic.put(`/products/${product._id}`, updatedData);
      Swal.fire('Updated!', 'Product updated successfully.', 'success');
      onUpdate(response.data); // Update product in the parent component
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error updating product:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to update product',
        text: error.response?.data?.message || error.message,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
        <h2 className="text-xl font-bold mb-4">Update Product</h2>
        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* External Link */}
          <div className="mb-4">
            <label htmlFor="externalLink" className="block text-sm font-medium">
              External Link
            </label>
            <input
              type="url"
              id="externalLink"
              name="externalLink"
              value={formData.externalLink}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="https://example.com"
            />
          </div>

          {/* Tags */}
          <div className="mb-4">
            <label htmlFor="tags" className="block text-sm font-medium">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="e.g., tech, gadget, innovation"
            />
          </div>

          {/* Image */}
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium">
              Image URL
            </label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows="4"
              placeholder="Enter a brief description of the product"
            ></textarea>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#135D66] text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProduct;
