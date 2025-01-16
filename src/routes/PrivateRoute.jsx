import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";

const PrivateRoute = ({ children }) => {
  const { user, loading,redirectPath, setRedirectPath } = useContext(AuthContext);
  const location = useLocation();

 
  useEffect(() => {
    if (!user) {
      setRedirectPath(location.pathname);
    }
  }, [user, location.pathname, setRedirectPath]);
  

  if (loading) {
    return (
      <div className="flex justify-center items-start mt-10 h-screen">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  if (user) {
    return children; // If user is authenticated, render the protected component
  }

  return <Navigate to="/login" />; // Redirect to login if not authenticated
};

export default PrivateRoute;
