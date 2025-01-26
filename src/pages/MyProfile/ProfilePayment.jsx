import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK); // Replace with your Stripe publishable key
const ProfilePayment = () => {
  const { user } = useAuth();
  const [couponCode, setCouponCode] = useState("");
  // const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(9900); // Default amount

  const handleApplyCoupon = async () => {
    try {
      const response = await axios.post(
        "https://cloudproducts.vercel.app/validate-coupon",
        {
          couponCode,
          amount: 9900,
        }
      );
      const { discountAmount, finalAmount } = response.data;

      setFinalAmount(finalAmount);
      Swal.fire(
        "Coupon Applied",
        `You saved $${discountAmount / 100}`,
        "success"
      );
    } catch (error) {
      console.error("Error applying coupon:", error);
      Swal.fire(
        "Invalid Coupon",
        error.response?.data?.message || "Failed to apply coupon",
        "error"
      );
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Complete Payment for {user?.displayName}
      </h1>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="input input-bordered w-full"
          />
          <button
            onClick={handleApplyCoupon}
            className="btn btn-secondary mt-2 w-full"
          >
            Apply Coupon
          </button>
        </div>
        <Elements stripe={stripePromise}>
          <CheckoutForm amount={finalAmount} />
        </Elements>
      </div>
    </div>
  );
};

export default ProfilePayment;
