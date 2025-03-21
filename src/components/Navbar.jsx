import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [profileMenu, setProfileMenu] = useState(false);

  const handleSignOut = () => {
    logOut().then().catch();
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-product">All Products</NavLink>
      </li>
      {user ? (
        <>
          <li>
            <NavLink to="/dashboard/addproduct">Add Product</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/myproducts">My Products</NavLink>
          </li>
        </>
      ) : (
        <></>
      )}
      <li>
        <NavLink to="/contact">Contact Us</NavLink>
      </li>
    </>
  );

  const handleProfileClick = () => {
    setProfileMenu(!profileMenu);
  };

  return (
    <div className="sticky top-0 pt-1 pb-2 z-50  bg-white dark:bg-gray-700">
      <div className="container mx-auto">
        <div className="navbar bg-nav-footer-bg p-4 rounded-2xl border-b-2 border-border">
          <div className="navbar-start">
            <div className="">
              <Link to="/" className="md:flex">
                <h1 className="md:text-3xl text-text-secondary text-2xl ralewayfont font-bold">
                  Product<span className="text-text-primary">Hunt</span>
                </h1>
              </Link>
            </div>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-text-primary">
              {navLinks}
            </ul>
          </div>
          <div className="navbar-end">
            <div className="mr-3">
              <ThemeToggle></ThemeToggle>
            </div>

            {user ? (
              <div className="flex flex-col md:flex-row items-center justify-center gap-3">
                <div className="relative flex items-center gap-2 md:flex-row-reverse flex-row menu-photo">
                  <img
                    src={user?.photoURL || "https://via.placeholder.com/150"}
                    alt="Profile"
                    onClick={handleProfileClick}
                    className="size-10 mx-auto rounded-full ring ring-[#E3FEF7] text-center cursor-pointer hover:brightness-75 transition-transform duration-300 hover:scale-110 active:scale-90 object-cover"
                  />

                  <div
                    className={`menu-hidden ${
                      profileMenu ? "flex flex-col gap-3" : "hidden"
                    }  absolute top-full -left-1/2 transform -translate-x-1/2 bg-cardback p-4 rounded shadow-lg`}
                  >
                    <h2 className="text-xs text-center">Welcome</h2>
                    <p className="text-center text-sm font-bold text-text-primary">
                      {user?.displayName}
                    </p>

                    <li className="list-none text-center font-bold text-text-primary">
                      <NavLink to="/dashboard">Dashboard</NavLink>
                    </li>

                    <button
                      onClick={handleSignOut}
                      className="btn bg-white px-10 hover:bg-teal-800 hover:text-white font-medium border border-[#003C43] mt-2"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-x-2 flex">
                <Link to="/login">
                  <button className="btn bg-white px-10 hover:bg-teal-800 hover:text-white font-medium border border-green-500">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="btn hidden lg:flex bg-white px-10 hover:bg-teal-800 hover:text-white font-medium border border-green-500">
                    Register
                  </button>
                </Link>
              </div>
            )}

            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu right-1/3 menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black"
              >
                {navLinks}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
