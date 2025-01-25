import React, { useState, useEffect } from "react";

import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [editingUserId, setEditingUserId] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosSecure.get("/users", {
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
          await axiosSecure.patch(`/users/${userId}`, { role: newRole });
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
      {users.map((userItem) => (
        <tr key={userItem._id} className="hover:bg-gray-100">
          {/* Image Column */}
          <td className="border p-3 text-center">
            <img
              src={userItem.photo}
              alt={userItem.name}
              className="w-10 h-10 rounded-full mx-auto"
            />
          </td>

          {/* Name Column */}
          <td className="border p-3">{userItem.name}</td>

          {/* Email Column */}
          <td className="border p-3">{userItem.email}</td>

          {/* Role Column */}
          <td className="border p-3">
            {userItem.email === user.email ? (
              <span className="text-green-500 font-semibold">Your Account</span>
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
              userItem.role
            )}
          </td>

          {/* Actions Column */}
          <td className="border p-3">
            {userItem.email !== user.email && (
              <button
                className="btn btn-primary"
                onClick={() => setEditingUserId(userItem._id)}
              >
                {editingUserId === userItem._id ? "Save Role" : "Change Role"}
              </button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}

export default AllUsers;
