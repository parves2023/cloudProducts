import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "./useAuth";

const useUserPermission = () => {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUser] = useState();
  const { user } = useAuth();
  const [canAddProduct, setCanAddProduct] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);

        // Fetch user data from the backend using the email
        const response = await axios.get(
          `https://cloudproducts.vercel.app/checkuserstatus?email=${user?.email}`
        );
        const fetchedUser = response.data;

        // Set the user data in the state
        setUser(fetchedUser);

        // Check if the user has membership status verified
        if (fetchedUser?.membershipStatus === "verified") {
          setCanAddProduct(true); // No restrictions on adding products
        } else {
          // Normal users can add only one product
          const productResponse = await axios.get(
            `https://cloudproducts.vercel.app/checkproductslength?email=${user?.email}`
          );
          const userProducts = productResponse.data;

          // Allow adding product if the user has no products
          setCanAddProduct(userProducts.length === 0);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchUserData();
    }
  }, [user?.email]);

  return { loading, canAddProduct };
};

export default useUserPermission;
