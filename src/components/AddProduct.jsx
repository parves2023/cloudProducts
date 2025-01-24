import { useForm } from "react-hook-form";
import {  FaServicestack } from "react-icons/fa";

import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProduct = () => {
    const {user} = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const [externalLink, setExternalLink] = useState("");
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);

    // Prepare image file for upload
    const imageFile = new FormData();
    imageFile.append("image", data.image[0]);

    try {
      // Upload image to imgbb
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      

      if (res.data.success) {
        // Prepare product data with the uploaded image URL and additional data
        const product = {
          name: data.name,
          creatorName: user?.displayName,
          creatorEmail: user?.email,
          creatorImage: user.photoURL,
          category: data.category,
          price: parseFloat(data.price),
          description: data.description,
          image: res.data.data.display_url,
          status: "pending", // Initial status
          createdAt: new Date(),
          tags: tags, // Add tags array here
          likeCount: 0,
          likes: [],
          externalLink: externalLink, // Add external link here
        };

        // Send product data to the server
        const productRes = await axiosPublic.post("/products", product);
        console.log(productRes);

        if (productRes.data.message === "Product added successfully") {
          // Show success popup and reset form
          reset();
          setExternalLink("");
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${data.name} has been added.`,
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/myproducts");
        }
      }


      
    } catch (error) {
      console.error("Error adding product:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to add product",
        text: error.response?.data?.message || error.message,
      });
    }
  };


  const handleTagsChange = (e) => {
    const value = e.target.value;
    const tagsArray = value.split(",").map(tag => tag.trim()).filter(tag => tag !== "");
    setTags(tagsArray);
  };

  const handleExternalLinkChange = (e) => {
    setExternalLink(e.target.value);
  };

  return (
    <div className="p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Add a Product</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Product Name */}
        <div className="form-control w-full my-4">
          <label className="label">
            <span className="label-text">Product Name*</span>
          </label>
          <input
            type="text"
            placeholder="Product Name"
            {...register("name", { required: true })}
            required
            className="input input-bordered w-full"
          />
        </div>

        <div className="flex gap-6">
          {/* Category */}
          <div className="form-control w-full my-4">
            <label className="label">
              <span className="label-text">Category*</span>
            </label>
            <select
              defaultValue="default"
              {...register("category", { required: true })}
              className="select select-bordered w-full"
            >
              <option disabled value="default">
                Select a category
              </option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
              <option value="furniture">Furniture</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Price */}
          <div className="form-control w-full my-4">
            <label className="label">
              <span className="label-text">Price ($)*</span>
            </label>
            <input
              type="number"
              placeholder="Price"
              {...register("price", { required: true })}
              required
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Description */}
        <div className="form-control w-full my-4">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            {...register("description")}
            className="textarea textarea-bordered h-24"
            placeholder="Enter product description"
          ></textarea>
        </div>

         {/* Tags */}
      <div className="form-control w-full my-4">
        <label className="label">
          <span className="label-text">Tags</span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Enter tags separated by commas"
          onChange={handleTagsChange}
        />
        <p className="text-sm text-gray-500">Enter tags separated by commas.</p>
      </div>

      {/* External Link */}
      <div className="form-control w-full my-4">
        <label className="label">
          <span className="label-text">External Link</span>
        </label>
        <input
          type="url"
          {...register("externalLink")}
          className="input input-bordered w-full"
          placeholder="Enter external link (if any)"
          value={externalLink}
          onChange={handleExternalLinkChange}
        />
      </div>






        {/* Image Upload */}
        <div className="form-control w-full my-4">
          <input
            {...register("image", { required: true })}
            type="file"
            className="file-input w-full max-w-xs"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Product <FaServicestack className="ml-4" />
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
