import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../providers/AuthProvider";

const ForgotPass = () => {
    const {auth,forgotEmail} = useContext(AuthContext);
  const [email, setEmail] = useState(forgotEmail || "");

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please provide a valid email!", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Password reset email sent!", {
          position: "top-center",
          autoClose: 2000,
        });
        toast("Redirecting to your Gmail!", {
            position: "top-center",
            autoClose: 2000,
          });

        setTimeout(() => {
          window.location.href = "https://mail.google.com/";
        }, 2000);
      })
      .catch((error) => {
        toast.error("Failed to send reset email. Try again!", {
          position: "top-center",
          autoClose: 2000,
        });
      
      });
  };

  return (
    <div className="container mx-auto px-4 py-10">
        <ToastContainer></ToastContainer>
      <h2 className="text-3xl font-bold text-center mb-6">Forgot Password</h2>
      <form
        onSubmit={handleResetPassword}
        className="w-full max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg"
      >
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            className="input input-bordered w-full"
            placeholder="Enter your email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-control mt-6">
          <button type="submit" className="btn bg-white px-10 hover:bg-green-800 hover:text-white font-medium border border-green-500">
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPass;
