import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Vortex } from "react-loader-spinner";

function AllModerators() {
  const [moderators, setModerators] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [editingModeratorId, setEditingModeratorId] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchModerators = async () => {
      try {
        const response = await axiosSecure.get("/users", {
          params: { role: "moderator" }, // Server filters moderators by role
        });
        setModerators(response.data || []); // Ensure moderators is an array
      } catch (error) {
        console.error("Error fetching moderators:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchModerators();
  }, []);

  const updateModeratorRole = async (moderatorId, newRole) => {
    const selectedModerator = moderators.find(
      (moderator) => moderator._id === moderatorId
    );

    Swal.fire({
      title: `Change role of ${selectedModerator.name}?`,
      text: `Are you sure you want to change their role to "${newRole}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, change it!",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.patch(`/users/${moderatorId}`, {
            role: newRole,
          });
          setModerators((prevModerators) =>
            prevModerators.map((moderator) =>
              moderator._id === moderatorId
                ? { ...moderator, role: newRole }
                : moderator
            )
          );
          setEditingModeratorId(null);
          Swal.fire(
            "Updated!",
            `${selectedModerator.name}'s role has been updated to "${newRole}".`,
            "success"
          );
        } catch (error) {
          console.error("Error updating moderator role:", error);
          Swal.fire("Error!", "There was an error updating the role.", "error");
        }
      } else {
        setEditingModeratorId(null); // Reset editing state if cancelled
      }
    });
  };

  if (loading)
    return (
      <div className="flex justify-center items-start mt-10 h-screen">
        <Vortex
          visible={true}
          height={100}
          width={100}
          ariaLabel="vortex-loading"
          wrapperStyle={{}}
          wrapperClass="vortex-wrapper"
          colors={[
            "#E6F0FF",
            "#F6EBD2",
            "#D94848",
            "#4D8B92",
            "#A5D0CC",
            "#FFD7D7",
            "#F2F8E1",
          ]}
        />
      </div>
    );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-[#003C43]">All Moderators</h1>
      {moderators && moderators.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse w-full text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-3">Image</th>
                <th className="border p-3">Name</th>
                <th className="border p-3">Email</th>
                <th className="border p-3">Role</th>
                <th className="border p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {moderators.map((moderator) => (
                <tr key={moderator._id} className="hover:bg-gray-100">
                  {/* Image Column */}
                  <td className="border p-3 text-center">
                    <img
                      src={moderator.photo}
                      alt={moderator.name}
                      className="w-10 h-10 rounded-full mx-auto"
                    />
                  </td>

                  {/* Name Column */}
                  <td className="border p-3">{moderator.name}</td>

                  {/* Email Column */}
                  <td className="border p-3">{moderator.email}</td>

                  {/* Role Column */}
                  <td className="border p-3">
                    {moderator.email === user.email ? (
                      <span className="text-green-500 font-semibold">
                        Your Account
                      </span>
                    ) : editingModeratorId === moderator._id ? (
                      <select
                        className="select select-bordered"
                        onChange={(e) =>
                          updateModeratorRole(moderator._id, e.target.value)
                        }
                        defaultValue={moderator.role}
                      >
                        <option value="user">User</option>
                        <option value="moderator">Moderator</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      moderator.role
                    )}
                  </td>

                  {/* Actions Column */}
                  <td className="border p-3">
                    {moderator.email !== user.email && (
                      <button
                        className="btn bg-[#135D66] text-white"
                        onClick={() => setEditingModeratorId(moderator._id)}
                      >
                        {editingModeratorId === moderator._id
                          ? "Save Role"
                          : "Change Role"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No moderators found.</p>
      )}
    </div>
  );
}

export default AllModerators;
