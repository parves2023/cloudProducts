import { useNavigate } from "react-router-dom";
import AnimatedBanner from "./AnimatedBanner";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <AnimatedBanner></AnimatedBanner>
      <p className="text-2xl mt-4">Oops! Page Not Found</p>
      <p className="text-lg mt-2 text-gray-600">
        The page you're looking for doesn't exist.
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;
