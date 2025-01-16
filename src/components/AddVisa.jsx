import React, { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import ImageUpload from "./ImgUpload";

const AddVisa = () => {
  const { user } = useContext(AuthContext);
  const [preview, setPreview] = useState(null);

  const documents = [
    "Valid Passport",
    "Visa Application Form",
    "Recent Passport-Sized Photograph",
    "Proof of Financial Means",
    "Travel Insurance",
    "Letter of Invitation",
  ];

  const handleCheckboxChange = (document) => {
    setFormData((prev) => {
      const isAlreadySelected = prev.requiredDocuments.includes(document);
      const updatedDocuments = isAlreadySelected
        ? prev.requiredDocuments.filter((doc) => doc !== document) // Remove if selected
        : [...prev.requiredDocuments, document]; // Add if not selected

      return { ...prev, requiredDocuments: updatedDocuments };
    });
  };

  const [formData, setFormData] = useState({
    country: "",
    countryImage: "", // ImgBB URL will be stored here
    visaType: "",
    processingTime: "",
    requiredDocuments: "",
    description: "",
    ageRestriction: "",
    fee: "",
    validity: "",
    applicationMethod: "",
  });

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image upload and update form data
  const handleImageUpload = (imgURL) => {
    console.log("Uploaded ImgBB URL:", imgURL);
    setFormData((prev) => ({ ...prev, countryImage: imgURL }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const visaData = {
      ...formData,
      ageRestriction: parseInt(formData.ageRestriction),
      fee: parseInt(formData.fee),
      authorEmail: user?.email,
      createdAt: new Date().toISOString(),
    };

    console.log("Submitting visa data:", visaData);

    try {
      const response = await fetch("http://localhost:5000/add-visa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(visaData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Visa added:", result);
        toast.success("Visa added successfully!");
        // Reset form after successful submission
        setFormData({
          country: "",
          countryImage: "",
          visaType: "",
          processingTime: "",
          requiredDocuments: [],
          description: "",
          ageRestriction: "",
          fee: "",
          validity: "",
          applicationMethod: "",
        });
        setPreview(null);
      } else {
        console.error("Failed to add visa");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 border rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl text-green-600 font-bold text-center mb-6">
        Add Visa
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="country" className="block font-medium mb-2">
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter country name"
            required
          />
        </div>

        {/* Image Upload Component */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Country Image</label>
          <ImageUpload
            preview={preview}
            setPreview={setPreview}
            onImageUpload={handleImageUpload}
          />
          {formData.countryImage && (
            <p className="text-green-500 mt-2">
              Image uploaded successfully: {formData.countryImage}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="visaType" className="block font-medium mb-2">
            Visa Type
          </label>
          <select
            id="visaType"
            name="visaType"
            value={formData.visaType}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded bg-white"
            required
          >
            <option value="" disabled>
              Select visa type
            </option>
            <option value="Tourist">Tourist</option>
            <option value="Business">Business</option>
            <option value="Student">Student</option>
            <option value="Work">Work</option>
            <option value="Transit">Transit</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="processingTime" className="block font-medium mb-2">
            Processing Time (in days)
          </label>
          <input
            type="number"
            id="processingTime"
            name="processingTime"
            value={formData.processingTime}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter processing time"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2">Required Documents</label>
          <div className="grid grid-cols-2 gap-2">
            {documents.map((doc, index) => (
              <label
                key={index}
                className="flex items-center space-x-2 bg-gray-50 border border-gray-200 rounded px-3 py-2 shadow-sm hover:bg-gray-100 transition duration-300"
              >
                <input
                  type="checkbox"
                  checked={formData.requiredDocuments.includes(doc)}
                  onChange={() => handleCheckboxChange(doc)}
                  className="accent-blue-500"
                />
                <span className="text-gray-700">{doc}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter visa description"
            rows="4"
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="ageRestriction" className="block font-medium mb-2">
            Age Restriction
          </label>
          <input
            type="number"
            id="ageRestriction"
            name="ageRestriction"
            value={formData.ageRestriction}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter minimum age"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="fee" className="block font-medium mb-2">
            Fee (USD)
          </label>
          <input
            type="number"
            id="fee"
            name="fee"
            value={formData.fee}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter visa fee"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="validity" className="block font-medium mb-2">
            Validity (in months)
          </label>
          <input
            type="number"
            id="validity"
            name="validity"
            value={formData.validity}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter validity"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="visaType" className="block font-medium mb-2">
            Application Method
          </label>
          <select
            id="applicationMethod"
            name="applicationMethod"
            value={formData.applicationMethod}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded bg-white"
            required
          >
            <option value="" disabled>
              Select Method
            </option>
            <option value="Tourist">Online</option>
            <option value="Business">Offline</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
        >
          Submit Visa
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddVisa;
