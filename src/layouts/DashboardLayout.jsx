import { Outlet, Link } from "react-router-dom";
import {
  FaUserCircle,
  FaPlusCircle,
  FaHome,
  FaProductHunt,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { FaPooStorm } from "react-icons/fa6";

const DashboardLayout = () => {
  const [moderator, setModerator] = useState(false);
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  useEffect(() => {
    const checkModeratorRole = async () => {
      try {
        // Ensure user is logged in and has an email
        if (user && user.email) {
          // Make a request to your API to verify the user's role
          const response = await axiosPublic.post("/api/check-role", {
            email: user.email,
          });

          // Assuming the response contains a `role` field
          if (response.data.role === "moderator") {
            setModerator(true);
          } else {
            setModerator(false);
          }
        }
      } catch (error) {
        console.error("Error checking user role:", error);
        setModerator(false);
      }
    };

    checkModeratorRole();
  }, [user, axiosPublic]);

  

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-5">
        <div className="text-center mb-8">
          <img
            src={user?.photoURL}
            alt="User"
            className="w-20 h-20 rounded-full mx-auto border-4 border-green-500"
          />
          <h2 className="text-lg font-semibold mt-2">{user?.displayName}</h2>
          {moderator && <h1>Welcome, Moderator!</h1>}
        </div>

        {/* Navigation Links */}
        <nav className="space-y-4">
          <Link
            to="/dashboard/my-profile"
            className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded"
          >
            <FaUserCircle className="text-xl" /> My Profile
          </Link>
          <Link
            to="/dashboard/addproduct"
            className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded"
          >
            <FaPlusCircle className="text-xl" /> Add Product
          </Link>
          <Link
            to="myproducts"
            className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded"
          >
            <FaProductHunt className="text-xl" /> My Products
          </Link>
          <Link
            to="/"
            className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded"
          >
            <FaHome className="text-xl" /> Home
          </Link>

          <div className=" border-b"></div>

          <Link
            to="/dashboard/pending-posts"
            className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded"
          >
            <FaPooStorm className="text-xl" /> Pending posts
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
