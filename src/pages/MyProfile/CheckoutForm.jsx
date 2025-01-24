import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();

    const [error, setError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);
    const [transactionId, setTransactionId] = useState("");

    // Fetch clientSecret from the server when component mounts
    useEffect(() => {
        if (user?.email) {
            axios
                .post("http://localhost:5000/create-payment-intent", { email: user.email, amount: 9900 }) // Example: $99.00
                .then((res) => {
                    setClientSecret(res.data.clientSecret);
                })
                .catch((err) => console.error("Error creating PaymentIntent:", err));
        }
    }, [user?.email]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true);
        const card = elements.getElement(CardElement);
        if (!card) {
            setError("Card element not found");
            setLoading(false);
            return;
        }

        try {
            // Confirm the card payment
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card,
                    billing_details: {
                        name: user?.displayName || "Unknown User",
                        email: user?.email || "unknown@example.com",
                    },
                },
            });

            if (error) {
                setError(error.message);
            } else {
                setError("");
                setTransactionId(paymentIntent.id);
                Swal.fire("Payment Successful", `Transaction ID: ${paymentIntent.id}`, "success");


                const response = await axios.post("http://localhost:5000/update-membership-status", {
                    email: user.email, // Pass the user's email from Firebase
                    transactionId: paymentIntent.id, // Pass the transaction ID
                });
        
                // Handle the response from the backend
                console.log(response.data);

                if (response.data.success) {
                    // Success action (optional)
                    Swal.fire("Success", "Membership status updated!", "success");
                } else {
                    // Error handling
                    Swal.fire("Error", "Failed to update membership status.", "error");
                }
                


            }
        } catch (err) {
            console.error("Payment Error:", err);
            setError("Payment failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: "16px",
                            color: "#424770",
                            "::placeholder": { color: "#aab7c4" },
                        },
                        invalid: { color: "#9e2146" },
                    },
                }}
            />
            <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={!stripe || !clientSecret || loading}
            >
                {loading ? "Processing..." : "Pay $99.00"}
            </button>
            {error && <p className="text-red-600">{error}</p>}
            {transactionId && (
                <p className="text-green-600">Transaction ID: {transactionId}</p>
            )}
        </form>
    );
};

export default CheckoutForm;
