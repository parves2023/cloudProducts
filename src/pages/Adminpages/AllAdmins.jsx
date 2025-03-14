import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Vortex } from "react-loader-spinner";

function AllAdmins() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [editingAdminId, setEditingAdminId] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axiosSecure.get("/users", {
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
          await axiosSecure.patch(`/users/${adminId}`, {
            role: newRole,
          });
          setAdmins((prevAdmins) =>
            prevAdmins.map((admin) =>
              admin._id === adminId ? { ...admin, role: newRole } : admin
            )
          );
          setEditingAdminId(null);
          Swal.fire(
            "Updated!",
            `${selectedAdmin.name}'s role has been updated to "${newRole}".`,
            "success"
          );
        } catch (error) {
          console.error("Error updating admin role:", error);
          Swal.fire("Error!", "There was an error updating the role.", "error");
        }
      } else {
        setEditingAdminId(null); // Reset editing state if cancelled
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
    <div className="p-4 bg-cardback">
      <h1 className="text-2xl font-bold mb-4 text-text-primary">All Admins</h1>
      {admins && admins.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse w-full text-left">
            <thead>
              <tr className="bg-background">
                <th className="border p-3">Image</th>
                <th className="border p-3">Name</th>
                <th className="border p-3">Email</th>
                <th className="border p-3">Role</th>
                <th className="border p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin._id} className="hover:bg-background">
                  {/* Image Column */}
                  <td className="border p-3 text-center">
                    <img
                      src={admin.photo}
                      alt={admin.name}
                      className="w-10 h-10 object-cover rounded-full mx-auto"
                    />
                  </td>

                  {/* Name Column */}
                  <td className="border p-3">{admin.name}</td>

                  {/* Email Column */}
                  <td className="border p-3">{admin.email}</td>

                  {/* Role Column */}
                  <td className="border p-3">
                    {admin.email === user.email ? (
                      <span className="text-green-500 font-semibold">
                        Your Account
                      </span>
                    ) : editingAdminId === admin._id ? (
                      <select
                        className="select select-bordered text-gray-950"
                        onChange={(e) =>
                          updateAdminRole(admin._id, e.target.value)
                        }
                        defaultValue={admin.role}
                      >
                        <option value="user">User</option>
                        <option value="moderator">Moderator</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      admin.role
                    )}
                  </td>

                  {/* Actions Column */}
                  <td className="border p-3">
                    {admin.email !== user.email && (
                      <button
                        className="btn bg-[#135D66] text-white"
                        onClick={() => setEditingAdminId(admin._id)}
                      >
                        {editingAdminId === admin._id
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
        <p>No admins found.</p>
      )}
    </div>
  );
}

export default AllAdmins;
