import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

function AllModerators() {
  const [moderators, setModerators] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [editingModeratorId, setEditingModeratorId] = useState(null);

  useEffect(() => {
    const fetchModerators = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users", {
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
          await axios.patch(`http://localhost:5000/users/${moderatorId}`, {
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
          Swal.fire("Updated!", `${selectedModerator.name}'s role has been updated to "${newRole}".`, "success");
        } catch (error) {
          console.error("Error updating moderator role:", error);
          Swal.fire("Error!", "There was an error updating the role.", "error");
        }
      } else {
        setEditingModeratorId(null); // Reset editing state if cancelled
      }
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Moderators</h1>
      {moderators && moderators.length > 0 ? (
        <ul>
          {moderators.map((moderator) => (
            <li
              key={moderator._id}
              className="p-2 border rounded mb-2 flex items-center gap-4"
            >
              <img
                src={moderator.photo}
                alt={moderator.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex justify-between w-full items-center">
                <div className="flex-1">
                  <p>
                    <strong>Name:</strong> {moderator.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {moderator.email}
                  </p>
                  <p>
                    <strong>Role:</strong> {moderator.role}
                  </p>
                </div>
                {moderator.email === user.email ? (
                  <p className="btn btn-outline">Your Account</p>
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
                  <button
                    className="btn btn-primary"
                    onClick={() => setEditingModeratorId(moderator._id)}
                  >
                    Change Role
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No moderators found.</p>
      )}
    </div>
  );
}

export default AllModerators;
