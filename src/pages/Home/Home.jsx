import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router";
import Slider from "../../components/Slider";
import { BallTriangle } from "react-loader-spinner";
import { AuthContext } from "../../providers/AuthProvider";
import DarkModeToggle from "react-dark-mode-toggle";
import { TbSunMoon } from "react-icons/tb";
import ReviewSection from "../../components/review/ReviewSection";
import AddReview from "../../components/review/AddReview";

const Home = () => {
  const [latestVisas, setLatestVisas] = useState([]);
  const { dataFetching, setDataFetching } = useContext(AuthContext);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    setDataFetching(true);
    axios
      .get("http://localhost:5000/visas?limit=8")
      .then((response) => {
        setLatestVisas(response.data);
        setDataFetching(false);
      })
      .catch((error) => {
        console.error("Error fetching visas:", error);
        setDataFetching(false);
      });
  }, []);

  // Sync dark mode with localStorage and Tailwind
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  if (dataFetching) {
    return (
      <div className="max-w-4xl mx-auto mt-8 dark:bg-gray-900 dark:text-gray-100">
        <h1 className="text-3xl font-bold text-center mb-6">
          Home Page Loading
        </h1>
        <div className="flex justify-center h-screen">
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            visible={true}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 relative">
      {/* Dark Mode Toggle */}
      <div className="fixed hover:right-0 border rounded-2xl -right-28 py-6 px-6 bg-gray-300 dark:bg-gray-800 bottom-16 transform -translate-y-1/2 shadow-lg flex items-center space-x-4 z-50 transition-all duration-150">
        <TbSunMoon className="text-green-600 dark:text-gray-100 text-3xl" />
        <DarkModeToggle
          onChange={setIsDarkMode}
          checked={isDarkMode}
          size={80}
        />
      </div>

      {/* Slider */}
      <div className="pt-4">
        <Slider />
      </div>

      <div className="container mx-auto mt-8">
        {/* Latest Visas Section */}
        <div className="py-10">
          <h2 className="text-2xl font-bold text-center">Latest Visas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {latestVisas.map((visa) => (
              <div
                className="visa-card border p-4 rounded shadow-lg bg-gray-100 dark:bg-gray-800"
                key={visa._id}
              >
                <img
                  src={visa.countryImage}
                  alt={visa.country}
                  className="w-full h-48 object-cover rounded"
                />
                <h3 className="text-xl font-semibold mt-4">{visa.country}</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Visa Type: {visa.visaType}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Processing Time: {visa.processingTime}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Fee: ${visa.fee}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Validity: {visa.validity}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Application Method: {visa.applicationMethod}
                </p>
                <Link
                  to={`/details/${visa._id}`}
                  className="btn bg-green-500 text-white mt-4"
                >
                  See Details
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link to={`/all-visas`} className="btn bg-green-500 text-white">
              See All Visas
            </Link>
          </div>
        </div>
      </div>

      {/* Visa Services Section */}
      <div className="bg-gray-100 py-20 dark:bg-gray-800 ">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-green-600">
            Our Visa Services
          </h2>
          <p className="mt-4 text-xl text-gray-700 dark:text-gray-300">
            Whether you're applying for a tourist, business, or student visa, we
            offer seamless processing and expert assistance to make your journey
            easier.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-green-600">
                Fast Processing
              </h3>
              <p className="mt-2 text-gray-600">
                Get your visa processed quickly and efficiently, with minimal
                waiting time.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-green-600">
                Expert Guidance
              </h3>
              <p className="mt-2 text-gray-600">
                Our visa experts are here to guide you through every step of the
                application process.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-green-600">
                Online Applications
              </h3>
              <p className="mt-2 text-gray-600">
                Apply for your visa online from the comfort of your home with
                our easy-to-use platform.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Flight Booking Section */}
      <div className="py-20 bg-green-100 dark:bg-gray-800 ">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-green-600">
            Book Flights with Ease
          </h2>
          <p className="mt-4 text-xl text-gray-700 dark:text-gray-300">
            Explore affordable flights to any destination, with the best deals
            and discounts available.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-green-600">
                Best Deals
              </h3>
              <p className="mt-2 text-gray-600">
                Find the most competitive flight prices, whether you're
                traveling for business or leisure.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-green-600">
                Worldwide Destinations
              </h3>
              <p className="mt-2 text-gray-600">
                Book flights to over 100 destinations around the world with ease
                and convenience.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-green-600">
                Exclusive Offers
              </h3>
              <p className="mt-2 text-gray-600">
                Get access to exclusive flight offers and discounts when you
                book through us.
              </p>
            </div>
          </div>
        </div>
      </div>
      <ReviewSection></ReviewSection>
      <AddReview></AddReview>

      {/* Call to Action Section */}
      <div className="bg-green-600 text-white py-20 dark:bg-[#101f10c7]">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold">Ready to Start Your Journey?</h2>
          <p className="mt-4 text-xl dark:text-gray-300">
            Whether you're applying for a visa or booking your flight, we are
            here to make your travel plans easier. Start now!
          </p>
          <div className="mt-8">
            <Link
              to="/all-visas"
              className="btn bg-white text-green-600 px-10 py-3 rounded-lg"
            >
              Apply for Visas
            </Link>
            <Link
              to="/all-visas"
              className="btn bg-white text-green-600 px-10 py-3 rounded-lg ml-4"
            >
              Book a Flight
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
