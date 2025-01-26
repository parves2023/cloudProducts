import { Outlet, Link } from "react-router-dom";
import {
  FaUserCircle,
  FaPlusCircle,
  FaHome,
  FaProductHunt,
  FaWind,
  FaCrosshairs,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { FaPooStorm, FaUsersGear } from "react-icons/fa6";
import { BsGraphUpArrow } from "react-icons/bs";
import { IoIosAddCircleOutline } from "react-icons/io";
import { GrUserAdmin, GrUserExpert } from "react-icons/gr";
import { motion } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const DashboardLayout = () => {
  const [moderator, setModerator] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  useEffect(() => {
    const checkModeratorRole = async () => {
      try {
        if (user && user.email) {
          const response = await axiosPublic.post("/api/check-role", {
            email: user.email,
          });

          if (response.data.role === "moderator") {
            setModerator(true);
          } else if (response.data.role === "admin") {
            setAdmin(true);
          } else {
            setModerator(false);
            setAdmin(false);
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
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden p-4 bg-[#0a2427] text-white text-2xl fixed top-0 left-0 z-50"
      >
        {isSidebarOpen ? <HiX /> : <HiMenuAlt3 />}
      </button>

      {/* Sidebar */}
      <motion.div
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed  top-0 left-0 h-screen w-64 bg-[#0a2427] text-white p-5 overflow-y-auto md:sticky md:top-0 z-40`}
        initial={{ x: -300 }}
        animate={{ x: isSidebarOpen ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 60 }}
      >
        <div className="text-center mb-8">
          <img
            src={user?.photoURL}
            alt="User"
            className="size-16 rounded-full mx-auto border-4 border-green-500 object-cover"
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

          <div className="border-b"></div>

          {moderator && (
            <>
              <Link
                to="/dashboard/pending-posts"
                className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded"
              >
                <FaPooStorm className="text-xl" /> Pending posts
              </Link>
              <Link
                to="/dashboard/accepted-posts"
                className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded"
              >
                <FaWind className="text-xl" /> Accepted posts
              </Link>
              <Link
                to="/dashboard/rejected-posts"
                className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded"
              >
                <FaCrosshairs className="text-xl" /> Rejected posts
              </Link>
              <Link
                to="/dashboard/reported-posts"
                className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded"
              >
                <FaCrosshairs className="text-xl" /> Reported posts
              </Link>
            </>
          )}

          {admin && (
            <>
              <Link
                to="/dashboard/statistics"
                className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded"
              >
                <BsGraphUpArrow className="text-xl" /> Statistics
              </Link>
              <Link
                to="/dashboard/cupon"
                className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded"
              >
                <IoIosAddCircleOutline className="text-xl" /> Add Coupon
              </Link>
              <Link
                to="/dashboard/all-users"
                className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded"
              >
                <FaUsersGear className="text-xl" /> All Users
              </Link>
              <Link
                to="/dashboard/all-modetators"
                className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded"
              >
                <GrUserExpert className="text-xl" /> Moderator
              </Link>
              <Link
                to="/dashboard/all-admins"
                className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded"
              >
                <GrUserAdmin className="text-xl" /> Admins
              </Link>
            </>
          )}
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 mx-auto container p-5 bg-gray-100 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
