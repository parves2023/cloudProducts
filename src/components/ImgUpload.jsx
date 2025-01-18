import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { LuImageUp } from "react-icons/lu";

const ImageUpload = ({ onImageUpload,preview, setPreview }) => {
 
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const imgbbAPIKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;

  
  const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      setIsUploading(true);
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        const imgURL = data.data.url; // URL of the uploaded image
        setPreview(imgURL); // Set preview to ImgBB URL
        onImageUpload(imgURL); // Pass ImgBB URL to parent component
        setError(""); // Clear any existing errors
      } else {
        throw new Error(data.error.message || "Upload failed");
      }
    } catch (uploadError) {
      console.error("ImgBB Upload Error:", uploadError);
      setError("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      uploadToImgBB(file); // Upload the file to ImgBB
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  return (
    <div className="max-w-md mx-auto">
      <div
        {...getRootProps()}
        className="border-dashed border-4 border-gray-300 p-10 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition duration-300"
      >
        <input {...getInputProps()} />
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-full mb-4"
          />
        ) : (
          <LuImageUp className="text-green-500 text-6xl mb-4" />
        )}
        <p className="text-2xl font-medium text-gray-600">
          {isUploading ? "Uploading..." : "Click or drag & drop your image here"}
        </p>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default ImageUpload;
