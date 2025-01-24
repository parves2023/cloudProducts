import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import useAuth from "../../hooks/useAuth";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK); // Replace with your Stripe publishable key

const ProfilePayment = () => {
    const { user } = useAuth();

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">
                Complete Payment for {user?.displayName}
            </h1>
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </div>
        </div>
    );
};

export default ProfilePayment;
