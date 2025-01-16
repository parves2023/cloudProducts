import { Outlet, Link } from "react-router-dom";
import { FaUserCircle, FaPlusCircle, FaHome, FaProductHunt } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {

    const {user} = useAuth(); 
    console.log(user);
    

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
        </div>

        {/* Navigation Links */}
        <nav className="space-y-4">
          <Link
            to="/dashboard/myprofile"
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
