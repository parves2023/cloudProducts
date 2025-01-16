import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { BallTriangle } from "react-loader-spinner";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const MyVisaApplications = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, dataFetching, setDataFetching } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      setDataFetching(true);

      if (!user?.email) {
        toast.error("User email not found. Please log in again.");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/applications/${user.email}`
        ); // Fetch applications based on user's email
        if (response.ok) {
          const data = await response.json();
          setApplications(data);
          setFilteredApplications(data); // Initialize filtered applications
        } else {
          toast.error("Failed to fetch applications.");
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setDataFetching(false);
      }
    };

    fetchApplications();
  }, [user?.email, setDataFetching]);

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setFilteredApplications(applications); // Show all if search query is empty
    } else {
      const filtered = applications.filter((app) => {
        const countryName = app?.country?.toLowerCase() || ""; // Use empty string if country is undefined
        return countryName.includes(searchQuery.toLowerCase());
      });
      setFilteredApplications(filtered);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleCancel = async (id) => {
    // Show confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "This action will cancel the application and cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `http://localhost:5000/applications/${id}`,
            {
              method: "DELETE",
            }
          );

          if (response.ok) {
            setApplications(applications.filter((app) => app._id !== id));
            setFilteredApplications(
              filteredApplications.filter((app) => app._id !== id)
            );
            Swal.fire(
              "Canceled!",
              "The application has been canceled successfully.",
              "success"
            );
          } else {
            Swal.fire("Error!", "Failed to cancel the application.", "error");
          }
        } catch (error) {
          console.error("Error canceling application:", error);
          Swal.fire("Error!", "An unexpected error occurred.", "error");
        }
      }
    });
  };

  if (dataFetching) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">
          My Visa Applications
        </h1>
        <div className="flex justify-center h-screen">
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            visible={true}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        My Visa Applications
      </h1>

      {/* Search Input */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search by country name"
          className="border border-gray-300 rounded-lg px-4 py-2 shadow-md focus:outline-none focus:ring focus:ring-green-300 w-3/4"
        />
        <button
          onClick={handleSearch}
          className="ml-4 bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
        >
          Search
        </button>
      </div>

      {/* Visa Applications */}
      {filteredApplications.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApplications.map((application) => (
            <div
              key={application._id}
              className="p-4 border rounded-lg shadow hover:bg-gray-100"
            >
              <img
                src={application.countryImage}
                alt={`${application.country} Visa`}
                className="w-full h-60 md:h-40 object-cover rounded mb-4"
              />
              <h3 className="text-lg font-semibold">{application.country}</h3>
              <p className="text-sm text-gray-700">
                Visa Type: {application.visaType}
              </p>
              <p className="text-sm text-gray-700">
                Processing Time: {application.processingTime}
              </p>
              <p className="text-sm text-gray-700">Fee: ${application.fee}</p>
              <button
                onClick={() => handleCancel(application._id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Cancel Application
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          {searchQuery
            ? `No visa applications found for "${searchQuery}".`
            : "No visa applications found."}
        </p>
      )}
    </div>
  );
};

export default MyVisaApplications;
