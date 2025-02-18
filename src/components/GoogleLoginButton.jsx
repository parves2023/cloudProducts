
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";

const GoogleLoginButton = ({ signInGoogle }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    

    const handleGoogleLogin = () => {
      signInGoogle()
      .then(async (result) => {
        const user = result.user;
    
        try {
          const response = await axiosPublic.post("/register", {
            email: user.email,
            name: user.displayName,
            photo: user.photoURL,
          });
    
          if (response.status === 201) {
            // console.log("User registered successfully:", response.data.user);
          } else if (response.status === 200) {
            // console.log("User already exists:", response.data.user);
          }
    
          navigate(location?.state ? location.state : "/");
        } catch (error) {
          console.error("Error during registration:", error);
        }
      })
      .catch((error) => {
        console.error("Google login failed:", error);
      });
    
    }
  return (
    <div className="flex justify-center mt-10">
      <button
        onClick={handleGoogleLogin}
        className="flex items-center px-6 py-3 bg-green-400 text-white text-lg font-medium rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-transform transform "
      >
        <img
          src="https://www.google.com/favicon.ico"
          alt="Google Icon"
          className="w-6 h-6 mr-3"
        />
        Sign in with Google
      </button>
    </div>
  );
};

export default GoogleLoginButton;
