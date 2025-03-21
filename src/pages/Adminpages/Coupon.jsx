import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Vortex } from "react-loader-spinner";



const Coupon = () => {
  const [coupons, setCoupons] = useState([]);
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    expiryDate: "",
    description: "",
    discount: "",
  });
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  // Fetch coupons from the database
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        setLoading(true);
        const response = await axiosSecure.get("/api/coupons");
        setCoupons(response.data);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, [axiosSecure]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCoupon({ ...newCoupon, [name]: value });
  };

  // Add a new coupon
  const handleAddCoupon = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosSecure.post("/api/coupons", newCoupon);
      console.log(response.data);
      
      setCoupons([...coupons, response.data]);
      setNewCoupon({ code: "", expiryDate: "", description: "", discount: "" });
    } catch (error) {
      console.error("Error adding coupon:", error);
    }
  };

  // Delete a coupon
  const handleDeleteCoupon = async (id) => {
    try {
      await axiosSecure.delete(`/api/coupons/${id}`);
      setCoupons(coupons.filter((coupon) => coupon._id !== id));
    } catch (error) {
      console.error("Error deleting coupon:", error);
    }
  };

  return (
    <div className="py-6 bg-background">
      <h1 className="text-2xl font-bold mb-4 text-text-primary">Manage Coupons</h1>

      <form onSubmit={handleAddCoupon} className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="code"
            placeholder="Coupon Code"
            value={newCoupon.code}
            onChange={handleInputChange}
            className="p-2 border rounded text-gray-900"
            required
          />
          <input
            type="date"
            name="expiryDate"
            value={newCoupon.expiryDate}
            onChange={handleInputChange}
            className="p-2 border rounded text-gray-900"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Coupon Description"
            value={newCoupon.description}
            onChange={handleInputChange}
            className="p-2 border rounded text-gray-900"
            required
          />
          <input
            type="number"
            name="discount"
            placeholder="Discount Amount"
            value={newCoupon.discount}
            onChange={handleInputChange}
            className="p-2 border rounded text-gray-900"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-[#135D66] text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Add Coupon
        </button>
      </form>

      {loading ? (
        <div>
          <p>Loading coupons...</p>
          <div className="flex justify-center items-start mt-10 h-screen">
<Vortex
  visible={true}
  height={100}
  width={100}
  ariaLabel="vortex-loading"
  wrapperStyle={{}}
  wrapperClass="vortex-wrapper"
  colors={['#E6F0FF', '#F6EBD2', '#D94848', '#4D8B92', '#A5D0CC', '#FFD7D7', '#F2F8E1']}
/>
      </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {coupons.map((coupon) => (
            <div
              key={coupon._id}
              className="p-4 bg-cardback border rounded shadow flex justify-between items-center"
            >
              <div>
                <h2 className="font-bold text-lg">{coupon.code}</h2>
                <p>Expiry Date: {coupon.expiryDate}</p>
                <p>{coupon.description}</p>
                <p>Discount: {coupon.discount}%</p>
              </div>
              <button
                onClick={() => handleDeleteCoupon(coupon._id)}
                className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Coupon;
