import { useForm } from "react-hook-form";

import { MdOutlinePlaylistAdd } from "react-icons/md";

import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router";
import useUserPermission from "../hooks/useUserPermission";
import { Vortex } from "react-loader-spinner";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProduct = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const [externalLink, setExternalLink] = useState("");
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  const { loading, canAddProduct } = useUserPermission();

  if (loading) {
    return (
      <>
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
      </>
    );
  }

  const onSubmit = async (data) => {
    // console.log(data);

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
        // console.log(productRes);

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
    const tagsArray = value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");
    setTags(tagsArray);
  };

  const handleExternalLinkChange = (e) => {
    setExternalLink(e.target.value);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-[#135D66]">
        Welcome, {user?.name || "User"}!
      </h1>
      {canAddProduct ? (
        <div className="p-8 bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-bold mb-6 text-[#135D66]">
            Add a Product
          </h1>
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
                  {...register("category", {
                    required: "Category is required",
                  })} // Add validation error message
                  className="select select-bordered w-full"
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  <option value="web-apps">Web Apps</option>
                  <option value="ai-tools">AI Tools</option>
                  <option value="software">Software</option>
                  <option value="games">Games</option>
                  <option value="mobile-apps">Mobile Apps</option>
                  <option value="mobile-apps">Others</option>
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
              <p className="text-sm text-gray-500">
                Enter tags separated by commas.
              </p>
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
            <div className="form-control w-full my-4 ">
              <input
                {...register("image", { required: true })}
                type="file"
                className="file-input w-full max-w-xs text-white bg-[#135D66]"
              />
            </div>

            <button
              type="submit"
              className="btn hover:bg-[#0a3a41] bg-[#135D66] border-none text-white"
            >
              Add Product <MdOutlinePlaylistAdd className="ml-4" />
            </button>
          </form>
        </div>
      ) : (
        <p className="text-red-600">
          You have reached your product limit. Upgrade your membership to add
          more products.
        </p>
      )}
    </div>
  );
};

export default AddProduct;
