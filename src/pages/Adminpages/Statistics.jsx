import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Vortex } from "react-loader-spinner";
import AdminStatistics from "./AdminStatistics";


const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff6f61", "#ff73fa"];


const Statistics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axiosSecure.get("/api/statistics"); // Backend endpoint
        const { totalProducts, acceptedProducts, pendingProducts, totalReviews, totalUsers } =
          response.data;

        const chartData = [
          { name: "Accepted Products", value: acceptedProducts },
          { name: "Pending Products", value: pendingProducts },
          { name: "All Products", value: totalProducts },
          { name: "Total Reviews", value: totalReviews },
          { name: "Total Users", value: totalUsers },
        ];

        setData(chartData);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [axiosSecure]);

  return (
<div>
<AdminStatistics></AdminStatistics>
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-5 text-[#003C43]">Admin Statistics</h2>
      {loading ? (
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
      ) : (
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      )}
    </div>
</div>
  );
};

export default Statistics;
