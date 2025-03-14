import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import GoogleLoginButton from "../../components/GoogleLoginButton";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons from react-icons
import Swal from "sweetalert2";



const Login = () => {
  const {
    user,
    signIn,
    signInGoogle,
    ForgotPassword,
    redirectPath,
    setRedirectPath,
  } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const emailRef = useRef();
  const [Error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [easylogin, setEasyLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showEasyLogin, setShowEasyLogin] = useState(true); // State to control visibility

  // Pre-fill credentials based on user role
  const handleEasyLogin = (email) => {
    setEmail(email);
    setPassword("Asdfasdf"); // Set a default password for easy login
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      setError("Email and Password are required.");
      setLoading(false);
      return;
    }

    signIn(email, password)
      .then((result) => {
        setError("");
        setLoading(false);
      })
      .catch((error) => {
        if (error.message.includes("auth/user-not-found")) {
          setError("No user found with this email.");
        } else if (error.message.includes("auth/wrong-password")) {
          setError("Invalid password. Please try again.");
        } else {
          setError(error.message);
        }
        setLoading(false);
      });
  };

  const handleForgotPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      setError("Please enter your email to reset the password.");
      return;
    }

    ForgotPassword(email)
      .then(() => {
        navigate("/forgotpass");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  useEffect(() => {
    Swal.fire({
      title: "Warning...",
      text: "Please don't misuse the easy login system.",
      icon: "warning",
      timer: 2000, // Closes automatically after 2 seconds
      showConfirmButton: false,
    });

    if (user) {
      const destination = redirectPath || "/";
      navigate(destination, { replace: true });
    }
  }, [user, redirectPath, navigate, setRedirectPath]);

  return (
    <div className="my-5 relative">
      {/* Toggle Button for Easy Login */}
      
      <button
        onClick={() => setShowEasyLogin(!showEasyLogin)}
        className="ml-auto bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-2"
      >
        {showEasyLogin ? <FaEyeSlash /> : <FaEye />} {/* Toggle icon */}

        <span>{showEasyLogin ? "Hide Easy Login" : "Show Easy Login"}</span>
      </button>

      {/* Easy Login Buttons */}
      {showEasyLogin && (
        <div className="absolute top-15 right-0 mt-2 space-y-2 flex flex-col bg-cardback rounded-xl p-4 border-border">
          <button
            onClick={() => handleEasyLogin("producthuntadmin420@gmail.com")}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Admin Easy Login
          </button>
          <button
            onClick={() => handleEasyLogin("hunt@user.com")}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Moderator Easy Login
          </button>
          <button
            onClick={() => handleEasyLogin("new@hunt.com")}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            User Easy Login
          </button>
        </div>
      )}

      <h1 className="text-3xl text-text-primary mt-7 ralewayfont font-bold text-center mb-6">
        Please <span className="text-text-secondary">Login</span>
      </h1>
      <form onSubmit={handleLogin} className="md:w-3/4 lg:w-1/2 mx-auto">
        <div className="form-control">
          <label className="label">
            <span className="label-text text-text-primary">Email</span>
          </label>
          <input
            type="email"
            required
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            ref={emailRef}
            placeholder="Email"
            className="input input-bordered text-gray-950"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-text-primary">Password</span>
          </label>
          <input
            type="password"
            required
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input input-bordered text-gray-950"
          />
          <label className="label">
            <a
              onClick={handleForgotPassword}
              className="label-text-alt link link-hover cursor-pointer text-text-light"
            >
              Forgot password?
            </a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button
            className="btn bg-green-50 px-10 hover:bg-teal-800 hover:text-white font-medium border border-green-500"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
      {Error && (
        <p className="text-red-600 text-center text-sm my-3">{Error}</p>
      )}
      <p className="text-center mt-4">
        Do not have an account{" "}
        <Link className="text-blue-600 font-bold" to="/register">
          Register
        </Link>
      </p>
      <GoogleLoginButton signInGoogle={signInGoogle}></GoogleLoginButton>
    </div>
  );
};

export default Login;