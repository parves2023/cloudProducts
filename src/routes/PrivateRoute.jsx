import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { Vortex } from "react-loader-spinner";

const PrivateRoute = ({ children }) => {
  const { user, loading, redirectPath, setRedirectPath } =
    useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      setRedirectPath(location.pathname);
    }
  }, [user, location.pathname, setRedirectPath]);

  if (loading) {
    return (
      <div className="flex justify-center items-start mt-10 h-screen">
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
    );
  }

  if (user) {
    return children; // If user is authenticated, render the protected component
  }

  return <Navigate to="/login" />; // Redirect to login if not authenticated
};

export default PrivateRoute;
