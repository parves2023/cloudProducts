import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const UpdateProfile = () => {
  const { auth, setUpdateImgname, updateimgname } = useAuth();
  const [name, setName] = useState(auth.currentUser?.displayName || "");
  const [photoURL, setPhotoURL] = useState(auth.currentUser?.photoURL || "");
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    if (!name || !photoURL) {
      toast.error("All fields are required", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }

    // Update user profile
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    })
      .then(() => {
        toast.success("Profile updated successfully!", {
          position: "top-right",
          autoClose: 2000,
        });
        setUpdateImgname(!updateimgname);
        setTimeout(() => navigate("/dashboard/my-profile"), 2000);
      })
      .catch((error) => {
        toast.error("Failed to update profile", {
          position: "top-center",
          autoClose: 2000,
        });
      });
  };

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) {
      toast.error("Please select a valid image file", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    setIsUploading(true);
    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imageHostingKey}`,
        formData
      );
      if (response.data.success) {
        setPhotoURL(response.data.data.url); // Update photo URL
        toast.success("Image uploaded successfully!", {
          position: "top-right",
          autoClose: 2000,
        });
      } else {
        toast.error("Failed to upload image", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error("Error uploading image", {
        position: "top-right",
        autoClose: 2000,
      });
    } finally {
      setIsUploading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  return (
    <div className="container mx-auto px-4 py-10">
      <ToastContainer />
      <h2 className="text-3xl font-bold text-center mb-6">Update Profile</h2>
      <form
        onSubmit={handleUpdateProfile}
        className="w-full max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg"
      >
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Photo</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full hidden"
            placeholder="Enter your photo URL"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            disabled={isUploading} // Disable manual editing during upload
          />
        </div>
        <div
          {...getRootProps()}
          className="border-dashed border-2 border-gray-300 p-4 text-center mb-4 cursor-pointer"
        >
          <input {...getInputProps()} />
          {isUploading ? (
            <p className="text-green-500">Uploading image...</p>
          ) : (
            <p>Drag & drop an image here, or click to select one</p>
          )}
        </div>
        {photoURL && (
          <div className="text-center mb-4">
            <img
              src={photoURL}
              alt="Uploaded Preview"
              className="w-32 h-32 object-cover rounded-full mx-auto"
            />
          </div>
        )}
        <div className="form-control mt-6">
          <button
            type="submit"
            className="btn bg-green-50 px-10 hover:bg-teal-800 hover:text-white font-medium border border-green-500"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
