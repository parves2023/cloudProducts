import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

function AllAdmins() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [editingAdminId, setEditingAdminId] = useState(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users", {
          params: { role: "admin" }, // Server filters admins by role
        });
        setAdmins(response.data || []); // Ensure admins is an array
      } catch (error) {
        console.error("Error fetching admins:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const updateAdminRole = async (adminId, newRole) => {
    const selectedAdmin = admins.find((admin) => admin._id === adminId);

    Swal.fire({
      title: `Change role of ${selectedAdmin.name}?`,
      text: `Are you sure you want to change their role to "${newRole}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, change it!",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.patch(`http://localhost:5000/users/${adminId}`, {
            role: newRole,
          });
          setAdmins((prevAdmins) =>
            prevAdmins.map((admin) =>
              admin._id === adminId ? { ...admin, role: newRole } : admin
            )
          );
          setEditingAdminId(null);
          Swal.fire("Updated!", `${selectedAdmin.name}'s role has been updated to "${newRole}".`, "success");
        } catch (error) {
          console.error("Error updating admin role:", error);
          Swal.fire("Error!", "There was an error updating the role.", "error");
        }
      } else {
        setEditingAdminId(null); // Reset editing state if cancelled
      }
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Admins</h1>
      {admins && admins.length > 0 ? (
        <ul>
          {admins.map((admin) => (
            <li
              key={admin._id}
              className="p-2 border rounded mb-2 flex items-center gap-4"
            >
              <img
                src={admin.photo}
                alt={admin.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex justify-between w-full items-center">
                <div className="flex-1">
                  <p>
                    <strong>Name:</strong> {admin.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {admin.email}
                  </p>
                  <p>
                    <strong>Role:</strong> {admin.role}
                  </p>
                </div>
                {admin.email === user.email ? (
                  <p className="btn btn-outline">Your Account</p>
                ) : editingAdminId === admin._id ? (
                  <select
                    className="select select-bordered"
                    onChange={(e) => updateAdminRole(admin._id, e.target.value)}
                    defaultValue={admin.role}
                  >
                    <option value="user">User</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                  </select>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => setEditingAdminId(admin._id)}
                  >
                    Change Role
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No admins found.</p>
      )}
    </div>
  );
}

export default AllAdmins;
