const Footer = () => {
  return (
    <footer className="bg-green-100  w-full py-10">
      <div className="container mx-auto grid md:grid-cols-4 gap-8 px-4">
        {/* Contact Section */}
        <div>
          <h2 className="text-2xl font-bold">
            Visa<span className="text-green-800 ">Pilot</span>
          </h2>
          <p className="mt-3 text-gray-700">Caribbean Ct</p>
          <p className="text-gray-700">Haymarket, Virginia (VA)</p>
          <div className="mt-4 space-y-2">
            <p className="text-gray-700">
              <span className="font-bold">Email:</span> support@visapilot.com
            </p>
            <p className="text-gray-700">
              <span className="font-bold">Phone:</span> +1 800-555-1234
            </p>
          </div>
          <div className="flex gap-4 mt-4">
            <a href="#" className="text-gray-700 hover:text-green-800">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-gray-700 hover:text-green-800">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-700 hover:text-green-800">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-700 hover:text-green-800">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>

        {/* Visa Categories Section */}
        <div>
          <h3 className="text-lg font-bold text-green-800">Visa Types</h3>
          <ul className="mt-3 space-y-2">
            <li className="text-gray-700">Tourist Visa</li>
            <li className="text-gray-700">Work Visa</li>
            <li className="text-gray-700">Student Visa</li>
            <li className="text-gray-700">Business Visa</li>
            <li className="text-gray-700">Family Visa</li>
            <li className="text-gray-700">Transit Visa</li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-lg font-bold text-green-800">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            <li className="text-gray-700">Visa Application Process</li>
            <li className="text-gray-700">Required Documents</li>
            <li className="text-gray-700">Visa Fees</li>
            <li className="text-gray-700">Visa Status Check</li>
            <li className="text-gray-700">FAQs</li>
          </ul>
        </div>

        {/* Subscribe Section */}
        <div>
          <h3 className="text-lg font-bold text-green-800 ">Stay Updated</h3>
          <p className="mt-3 text-gray-700">
            Subscribe to get the latest visa updates, news, and offers.
          </p>
          <div className="mt-4">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="btn bg-white px-10 hover:bg-green-800 hover:text-white font-medium border border-green-500 w-full my-4">
              Subscribe Now
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10 bg-gray-800 text-center text-white py-4">
        <p>
          © 2024 <span className="text-green-400">VisaPilot</span> Made with ❤
          by{" "}
          <span className="text-blue-600 cursor-pointer">
            <a href="https://www.facebook.com/profile.php?id=100055235052516">
              Anamul Hauqe
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
