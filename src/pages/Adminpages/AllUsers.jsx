import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users", {
          params: { role: "user" }, // Server filters users by role
        });
        setUsers(response.data || []); // Ensure users is an array
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const updateUserRole = async (userId, newRole) => {
    const selectedUser = users.find((user) => user._id === userId);

    Swal.fire({
      title: `Change role of ${selectedUser.name}?`,
      text: `Are you sure you want to change their role to "${newRole}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, change it!",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.patch(`http://localhost:5000/users/${userId}`, { role: newRole });
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user._id === userId ? { ...user, role: newRole } : user
            )
          );
          setEditingUserId(null);
          Swal.fire("Updated!", `${selectedUser.name}'s role has been updated to "${newRole}".`, "success");
        } catch (error) {
          console.error("Error updating user role:", error);
          Swal.fire("Error!", "There was an error updating the role.", "error");
        }
      } else {
        setEditingUserId(null); // Reset editing state if cancelled
      }
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      {users && users.length > 0 ? (
        <ul>
          {users.map((userItem) => (
            <li
              key={userItem._id}
              className="p-2 border rounded mb-2 flex items-center gap-4"
            >
              <img
                src={userItem.photo}
                alt={userItem.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex justify-between w-full items-center">
                <div className="flex-1">
                  <p>
                    <strong>Name:</strong> {userItem.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {userItem.email}
                  </p>
                  <p>
                    <strong>Role:</strong> {userItem.role}
                  </p>
                </div>
                {userItem.email === user.email ? (
                  <p className="btn btn-outline">Your Account</p>
                ) : editingUserId === userItem._id ? (
                  <select
                    className="select select-bordered"
                    onChange={(e) => updateUserRole(userItem._id, e.target.value)}
                    defaultValue={userItem.role}
                  >
                    <option value="user">User</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                  </select>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => setEditingUserId(userItem._id)}
                  >
                    Change Role
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}

export default AllUsers;
