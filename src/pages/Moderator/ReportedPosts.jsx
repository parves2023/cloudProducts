import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";

function ReportedPosts() {
  const [reportedPosts, setReportedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReportedPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/reported-posts");
        if (response.ok) {
          const data = await response.json();
          setReportedPosts(data); // Use server-filtered data directly
        } else {
          toast.error("Failed to fetch reported posts.");
        }
      } catch (error) {
        console.error("Error fetching reported posts:", error);
        toast.error("An error occurred while fetching reported posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchReportedPosts();
  }, []);

  const handleDeleteReport = async (productId, reportIndex) => {
    try {
      const response = await fetch(
        `http://localhost:5000/products/${productId}/delete-report`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reportIndex }),
        }
      );

      if (response.ok) {
        setReportedPosts((prev) =>
          prev.map((product) =>
            product._id === productId
              ? {
                  ...product,
                  reports: product.reports.filter(
                    (_, index) => index !== reportIndex
                  ),
                }
              : product
          )
        );
        toast.success("Report deleted successfully.");
      } else {
        toast.error("Failed to delete report.");
      }
    } catch (error) {
      console.error("Error deleting report:", error);
      toast.error("An error occurred while deleting the report.");
    }
  };

  const handleDeletePost = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/products/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setReportedPosts((prev) =>
          prev.filter((product) => product._id !== productId)
        );
        toast.success("Post deleted successfully.");
      } else {
        toast.error("Failed to delete post.");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("An error occurred while deleting the post.");
    }
  };

  if (loading) {
    return <div>Loading reported posts...</div>;
  }

  if (reportedPosts.length === 0) {
    return <div>No reported posts to show.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto my-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Reported Posts</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Product Image</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Reports</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
  {reportedPosts.map((product) => (
    <tr key={product._id} className="hover:bg-gray-50">
      {/* Image Column */}
      <td className="border border-gray-300 px-4 py-2 text-center">
        <img
          src={`${product.image}`}
          className="size-28 object-cover rounded-sm mx-auto"
          alt={product.name}
        />
      </td>

      {/* Name Column */}
      <td className="border border-gray-300 px-4 py-2 text-center">
        <p>{product.name}</p>
      </td>

      {/* Reports Column */}
      <td className="border border-gray-300 px-4 py-2">
        {product.reports.map((report, index) => (
          <div
            key={index}
            className="p-2 bg-gray-100 rounded mb-2 shadow-sm"
          >
            <p>
              <strong>Reported By:</strong> {report.reportedBy}
            </p>
            <p>
              <strong>Details:</strong>{" "}
              {report.reportDetails.split(" ").slice(0, 10).join(" ")}...
            </p>
            <button
              onClick={() => handleDeleteReport(product._id, index)}
              className="text-red-500 underline mt-2"
            >
              Delete Report
            </button>
          </div>
        ))}
      </td>

      {/* Actions Column */}
      <td className="border border-gray-300 px-4 py-2 text-center">
        <div className="flex flex-col gap-2">
          <button
            onClick={() => navigate(`/details/${product._id}`)}
            className="btn btn-primary"
          >
            View Details
          </button>
          <button
            onClick={() => handleDeletePost(product._id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Delete Post
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>


      </table>
      <ToastContainer />
    </div>
  );
}

export default ReportedPosts;
