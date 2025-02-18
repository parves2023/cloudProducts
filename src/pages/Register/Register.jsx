import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateProfile } from "firebase/auth";
import ImageUpload from "../../components/ImgUpload";

const Register = () => {
  const navigate = useNavigate();
  const { createUser, auth, redirectPath } = useContext(AuthContext);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    countryImage: "", // ImgBB URL will be stored here
  });

  const [passwordError, setPasswordError] = useState("");

  const handleImageUpload = (imgURL) => {
    // console.log("Uploaded ImgBB URL:", imgURL);
    setFormData((prev) => ({ ...prev, countryImage: imgURL }));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");
    const photo = formData.countryImage || preview;

    // Password validation
    if (
      password.length < 6 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password)
    ) {
      setPasswordError(
        "Password must be at least 6 characters long, including at least one uppercase and one lowercase letter."
      );
      return;
    } else {
      setPasswordError("");
    }

    // Create user
    createUser(email, password, name, photo)
      .then((result) => {
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            toast.success("Registration successful!", {
              position: "top-center",
              autoClose: 2000,
            });

            // Send user data to the backend
            fetch("http://localhost:5000/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: email,
                name: name,
                photo: photo,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.message === "User registered successfully") {
                  const destination = redirectPath || "/";
                  setTimeout(() => {
                    navigate(destination, { replace: true });
                  }, 2000);
                } else {
                  toast.error("Failed to register user in the database", {
                    position: "top-center",
                    autoClose: 2000,
                  });
                }
              })
              .catch((error) => {
                toast.error(`API Error: ${error.message}`, {
                  position: "top-center",
                  autoClose: 2000,
                });
              });
          })
          .catch((error) => {
            toast.error(`Error: ${error.message}`, {
              position: "top-center",
              autoClose: 2000,
            });
          });
      })
      .catch((error) => {
        toast.error(`Error: ${error.message}`, {
          position: "top-center",
          autoClose: 2000,
        });
      });
  };

  return (
    <div className="my-7">
      <h1 className="text-3xl mt-7 ralewayfont font-bold text-center mb-6">
        Please <span className="text-[#003C43]">Register</span>
      </h1>
      <form onSubmit={handleRegister} className="md:w-3/4 lg:w-1/2 mx-auto">
        <ToastContainer
          position="top-center"
          hideProgressBar
          newestOnTop
          closeOnClick
        />

        {/* Name Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            required
            name="name"
            placeholder="Name"
            className="input input-bordered"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Your Image</label>
          <ImageUpload
            preview={preview}
            setPreview={setPreview}
            onImageUpload={handleImageUpload}
          />
          {formData.countryImage && (
            <p className="text-green-500 mt-2">Image uploaded successfully!</p>
          )}
        </div>

        {/* Email Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            required
            name="email"
            placeholder="Email"
            className="input input-bordered"
          />
        </div>

        {/* Password Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            required
            name="password"
            placeholder="Password"
            className="input input-bordered"
          />
          {passwordError && (
            <p className="text-red-600 text-sm mt-2">{passwordError}</p>
          )}
        </div>

        {/* Register Button */}
        <div className="form-control mt-6">
          <button className="btn bg-green-50 px-10 hover:bg-teal-800 hover:text-white font-medium border border-green-500">
            Register
          </button>
        </div>
      </form>

      {/* Login Link */}
      <p className="text-center mt-4">
        Already have an account?{" "}
        <Link className="text-blue-600 font-bold" to="/login">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
