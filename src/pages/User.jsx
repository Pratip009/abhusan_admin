import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const User = ({ token }) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/user/all-users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Corrected structure: response.data.data.users
      if (
        response.data.success &&
        Array.isArray(response.data.data.users) &&
        response.data.data.users.length > 0
      ) {
        setUsers(response.data.data.users.reverse()); // Use the nested data structure
      } else {
        toast.error(response.data.message || "Failed to fetch users.");
        setUsers([]); // Ensure users is an empty array if fetching fails
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("An error occurred while fetching users.");
      setUsers([]); // Reset users to an empty array on error
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  return (
    <>
      <p className="mb-2">All Users List</p>
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Name</b>
          <b>Email</b>
        </div>

        {/* Display users if present; otherwise, show no users found */}
        {users.length > 0 ? (
          users.map((user, index) => (
            <div
              className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
              key={index}
            >
              <p>{user.name}</p>
              <p>{user.email}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No users found.</p>
        )}
      </div>
    </>
  );
};

export default User;
