import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";

const MyProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // States
  const [isSubscribed, setIsSubscribed] = useState(false); // Membership status
  const [loading, setLoading] = useState(true); // Loading state
  const subscriptionAmount = 99; // Example subscription amount

  // Check if user is verified or not
  useEffect(() => {
    const checkMembershipStatus = async () => {
      try {
        setLoading(true); // Set loading to true before the request
        const response = await axios.post("http://localhost:5000/check-membership-status", {
          email: user.email, // Pass the user's email from Firebase or your auth system
        });
        console.log(response);

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md">
        {/* User Details */}
        <div className="flex flex-col items-center p-6">
          <img
            src={user?.photoURL || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-blue-500 mb-4"
          />
          <h1 className="text-2xl font-semibold text-gray-800">
            {user?.displayName || "User"}
          </h1>
          <p className="text-gray-600">{user?.email}</p>
        </div>

        {/* Update Profile Button */}
        <div className="p-6">
          <button
            onClick={() => navigate("/dashboard/update-profile")}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition"
          >
            Update Profile
          </button>
        </div>
      </div>

      {/* Membership Section */}
      {user && (
        <div className="p-6">
          {loading ? (
            <div className="text-center">
              <p className="text-gray-600">Checking membership status...</p>
            </div>
          ) : !isSubscribed ? (
            <div className="text-center">
              <p className="text-gray-600 mb-4">
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
              <p className="text-gray-800 font-semibold">Membership Status:</p>
              <p className="text-green-500 font-bold text-lg">Verified</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyProfile;
