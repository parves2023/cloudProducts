import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";
import { Vortex } from "react-loader-spinner";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Statistics from "../Adminpages/Statistics";
import AdminStatistics from "../Adminpages/AdminStatistics";

const MyProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // States
  const [isSubscribed, setIsSubscribed] = useState(false); // Membership status
  const [loading, setLoading] = useState(true); // Loading state
  const subscriptionAmount = 99; // Example subscription amount

  // Mock data for the chart
  const profileProgressData = [
    { name: "Profile Completion", value: 80 },
    { name: "Products Submitted", value: 45 },
    { name: "Upvotes Received", value: 120 },
    { name: "Reviews Written", value: 30 },
  ];

  // Mock data for statistics
  const statsData = [
    { title: "Subscriptions", value: "78,298", change: "+12%" },
    { title: "Users", value: "14,672", change: "+4-5%" },
    { title: "Annual Profit", value: "$548,820", change: "+18.4%" },
    { title: "Added to Cash", value: "$21,200.70", change: "+13.2%" },
    { title: "Reached to Checkout", value: "$16,000.00", change: "+7.6%" },
    { title: "Earnings", value: "$6,400.80", change: "+9.3%" },
  ];

  // Check if user is verified or not
  useEffect(() => {
    const checkMembershipStatus = async () => {
      try {
        setLoading(true); // Set loading to true before the request
        const response = await axios.post(
          "http://localhost:5000/check-membership-status",
          {
            email: user.email, // Pass the user's email from Firebase or your auth system
          }
        );

        if (response.data.status === "verified") {
          setIsSubscribed(true);
        } else {
          setIsSubscribed(false);
        }
      } catch (error) {
        console.error("Error checking membership status:", error);
      } finally {
        setLoading(false); // Set loading to false after the request
      }
    };

    if (user?.email) {
      checkMembershipStatus();
    } else {
      setLoading(false); // If no user, stop loading
    }
  }, [user]);

  const handleSubscription = () => {
    // Redirect to payment page or open modal (mock behavior for now)
    navigate("/dashboard/payment"); // Replace with modal functionality if needed
  };

  return (
    <div className="min-h-screen bg-background p-0">
      <div className="container mx-auto">
        {/* User Details Card */}
        <motion.div
          className="bg-cardback rounded-lg shadow-md p-6 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center">
            <img
              src={user?.photoURL || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-blue-500 mb-4"
            />
            <h1 className="text-2xl font-semibold text-text-primary">
              {user?.displayName || "User"}
            </h1>
            <p className="text-text-light">{user?.email}</p>
          </div>

          {/* Update Profile Button */}
          <div className="mt-6">
            <button
              onClick={() => navigate("/dashboard/update-profile")}
              className="w-full bg-[#135D66] text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition"
            >
              Update Profile
            </button>
          </div>
        </motion.div>

        {/* Membership Status Card */}
        {user && (
          <motion.div
            className="bg-cardback rounded-lg shadow-md p-6 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {loading ? (
              <div className="flex justify-center flex-col items-center">
                <p className="text-text-primary">
                  Checking membership status...
                </p>
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
            ) : !isSubscribed ? (
              <div className="text-center">
                <p className="text-text-light mb-4">
                  Become a member to unlock premium features!
                </p>
                <button
                  onClick={handleSubscription}
                  className="w-full bg-green-500 text-white py-2 px-4 rounded-lg shadow hover:bg-green-600 transition"
                >
                  Subscribe Now for ${subscriptionAmount}
                </button>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-text-primary font-semibold">
                  Membership Status:
                </p>
                <p className="text-green-500 font-bold text-lg">Verified</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-cardback rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <h3 className="text-lg font-semibold text-text-primary">
                {stat.title}
              </h3>
              <p className="text-2xl font-bold text-text-primary">
                {stat.value}
              </p>
              <p className="text-sm text-green-500">{stat.change}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex md:flex-row flex-col w-full">
          {/* Profile Progress Chart */}
          <motion.div
            className="bg-cardback rounded-lg shadow-md p-6 flex-1"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              Profile Progress
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={profileProgressData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#135D66" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Statistics Component */}
          <div className="flex-1">
            <AdminStatistics></AdminStatistics>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
