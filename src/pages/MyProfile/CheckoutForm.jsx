import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
const CheckoutForm = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();

    const [error, setError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);
    const [transactionId, setTransactionId] = useState("");

    // Fetch clientSecret with the discounted amount
    useEffect(() => {
        if (user?.email) {
            axios
                .post("http://localhost:5000/create-payment-intent", { email: user.email, amount })
                .then((res) => {
                    setClientSecret(res.data.clientSecret);
                })
                .catch((err) => console.error("Error creating PaymentIntent:", err));
        }
    }, [user?.email, amount]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        setLoading(true);
        const card = elements.getElement(CardElement);

        if (!card) {
            setError("Card element not found");
            setLoading(false);
            return;
        }

        try {
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
                setTransactionId(paymentIntent.id);
                Swal.fire("Payment Successful", `Transaction ID: ${paymentIntent.id}`, "success");

                // Send transaction details to the server
                await axios.post("http://localhost:5000/update-membership-status", {
                    email: user.email,
                    transactionId: paymentIntent.id,
                });
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
                        base: { fontSize: "16px", color: "#424770", "::placeholder": { color: "#aab7c4" } },
                        invalid: { color: "#9e2146" },
                    },
                }}
            />
            <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={!stripe || !clientSecret || loading}
            >
                {loading ? "Processing..." : `Pay $${(amount / 100).toFixed(2)}`}
            </button>
            {error && <p className="text-red-600">{error}</p>}
            {transactionId && <p className="text-green-600">Transaction ID: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;
