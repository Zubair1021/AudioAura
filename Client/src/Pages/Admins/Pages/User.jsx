import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { toast, Toaster } from "react-hot-toast";

const User = () => {
  const [activeOption, setActiveOption] = useState("users");
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/getalluser");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUsers(Array.isArray(data.users) ? data.users : []);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteuser = async (id) => {
    try {
      const response = await fetch("http://localhost:3000/deleteuser", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        fetchUsers();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user. Please try again.");
    }
  };

  const updateUser = async (status, id) => {
    try {
      const response = await fetch(`http://localhost:3000/updateUserStatus`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, id }),
      });
  
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
  
        // Update the local users state with the updated status
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === id ? { ...user, status } : user
          )
        );
      } else {
        toast.error(data.message || "Failed to update user status");
      }
    } catch (error) {
      console.error("Error updating user status:", error);
      toast.error("An error occurred while updating the user status.");
    }
  };
  

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <div className="flex flex-col lg:flex-row">
        <Sidebar
          activeOption={activeOption}
          handleOptionClick={handleOptionClick}
          className="lg:block hidden"
        />
        <div className="flex-1 lg:ml-60 mt-14 p-6">
          <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
            User Management
          </h1>
          <div className="mb-8 flex justify-center">
            <input
              type="text"
              placeholder="Search users..."
              className="w-full lg:w-1/3 px-4 py-2 border border-gray-300 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-300 transform hover:scale-105"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {loading ? (
            <div className="text-center text-gray-500">Loading users...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                    <th className="p-4 text-left">First Name</th>
                    <th className="p-4 text-left">Last Name</th>
                    <th className="p-4 text-left">Email</th>
                    <th className="p-4 text-left">Premium</th>
                    <th className="p-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center p-6 text-gray-500">
                        No users found
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user, index) => (
                      <tr
                        key={index}
                        className="border-b transition duration-300 hover:bg-gray-100"
                      >
                        <td className="p-4">{user.firstname || "N/A"}</td>
                        <td className="p-4">{user.lastname || "N/A"}</td>
                        <td className="p-4">{user.email || "N/A"}</td>
                        <td className="p-4">{user.premium}</td>
                        <td className="p-4">
                          <select
                            className="block font-bold w-full px-4 py-2 text-sm text-gray-700 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 hover:shadow-lg transition-all duration-200"
                            value={user.status} // Dynamically set the current value
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value === "1") {
                                updateUser("1", user._id); // Activate user
                              } else if (value === "0") {
                                updateUser("0", user._id); // Deactivate user
                              }
                            }}
                          >
                            <option value="1">Activated</option>
                            <option value="0">Deactivated</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default User;
