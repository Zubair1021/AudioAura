import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import Navbar from "./Navbar";
import { FaUser, FaEnvelope, FaLock, FaCalendarAlt } from "react-icons/fa";
import SongContext from "../context/SongContext";
import { MdWorkspacePremium } from "react-icons/md";

const ProfilePage = () => {
  const { FavouriteCount, PlaylistCount } = useContext(SongContext);

  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  // const navigate = useNavigate();

  const handleEditClick = () => {
    setIsEditing(true);
    setFormData({
      firstname: userData.firstname || "", // Ensure correct casing
      lastname: userData.lastname || "",
      email: userData.email || "",
      password: userData.password || "",
    });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/updateUser`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        alert(data.message);
        setUserData({
          ...userData,
          ...formData,
        });
        setIsEditing(false);
      } else {
        alert(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile.");
    }
  };

  useEffect(() => {
    const GetUserId = async () => {
      const response = await fetch(`http://localhost:3000/getuserwithid`, {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      const { message, success } = data;
      if (success) {
        setUserData(data.user);
      } else if (!success) {
        alert(message);
      }
    };
    GetUserId();
  }, []);

  return (
    <div className="h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1b1b1b]">
      <div className="h-[90%] flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1 p-8 overflow-y-auto">
          <Navbar />

          {/* Profile container */}
          <div className="bg-[#1a1a1a] p-8 rounded-lg shadow-2xl mt-8">
            {userData.premium === "monthly" || userData.premium === "yearly" ? (
              <div className="text-yellow-500 text-4xl">
                <MdWorkspacePremium />
              </div>
            ) : (
              <p></p>
            )}
            <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
              {/* Profile Section */}
              <div className="w-full md:w-1/3 text-center text-white flex flex-col items-center justify-center">
                <div className="rounded-full w-32 h-32 bg-teal-400 mx-auto mb-6 flex  items-center justify-center transform transition duration-500 ease-in-out hover:scale-105">
                  <span className="text-2xl font-bold text-gray-800">
                    {userData.firstname}
                  </span>
                </div>
                <h2 className="text-2xl font-semibold mb-2 text-white transform transition duration-500 ease-in-out hover:text-teal-500">
                  {userData.firstName} {userData.lastName}
                </h2>
                <p className="text-sm">{userData.email}</p>
              </div>
              <div className="w-full md:w-2/3 space-y-6">
                <h2 className="text-2xl font-bold mb-6 text-white">
                  Profile Information
                </h2>

                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-[#2c2c2c] p-5 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
                      <label className=" text-sm font-semibold text-gray-600 mb-1 flex items-center space-x-2">
                        <FaUser className="text-teal-500" />
                        <span>First Name</span>
                      </label>
                      <input
                        type="text"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-teal-500 rounded-lg focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                        required
                      />
                    </div>
                    <div className="bg-[#2c2c2c] p-5 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
                      <label className=" text-sm font-semibold text-gray-600 mb-1 flex items-center space-x-2">
                        <FaUser className="text-teal-500" />
                        <span>Last Name</span>
                      </label>
                      <input
                        type="text"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-teal-500 rounded-lg focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                        required
                      />
                    </div>
                    <div className="bg-[#2c2c2c] p-5 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
                      <label className=" text-sm font-semibold text-gray-600 mb-1 flex items-center space-x-2">
                        <FaEnvelope className="text-teal-500" />
                        <span>Email</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-teal-500 rounded-lg focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                        required
                      />
                    </div>
                    <div className="bg-[#2c2c2c] p-5 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
                      <label className="text-sm font-semibold text-gray-600 mb-1 flex items-center space-x-2">
                        <FaLock className="text-teal-500" />
                        <span>Password</span>
                      </label>
                      <input
                        type="password"
                        value={formData.password}
                        readOnly
                        onClick={() => alert("Password cannot be changed.")}
                        className="w-full p-3 border border-teal-500 rounded-lg focus:ring-2 focus:ring-teal-500 cursor-not-allowed bg-gray-200 text-gray-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2 bg-teal-600 text-white rounded-lg font-bold hover:bg-teal-500 transition duration-300 transform hover:scale-105"
                    >
                      Save Changes
                    </button>
                  </form>
                ) : (
                  <div className="space-y-5 text-white">
                    <div className="bg-[#2c2c2c] p-5 rounded-lg shadow-lg">
                      <div className="flex items-center space-x-2">
                        <FaUser className="text-teal-500" />
                        <p className="text-lg">
                          First Name: {userData.firstname}
                        </p>
                      </div>
                    </div>
                    <div className="bg-[#2c2c2c] p-5 rounded-lg shadow-lg">
                      <div className="flex items-center space-x-2">
                        <FaUser className="text-teal-500" />
                        <p className="text-lg">
                          Last Name: {userData.lastname}
                        </p>
                      </div>
                    </div>
                    <div className="bg-[#2c2c2c] p-5 rounded-lg shadow-lg">
                      <div className="flex items-center space-x-2">
                        <FaEnvelope className="text-teal-500" />
                        <p className="text-lg">Email: {userData.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleEditClick}
                      className="w-full py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-500 transition duration-200 transform hover:scale-105"
                    >
                      Edit Profile
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Playlists and Favorites Section */}
            <div className="mt-6 space-y-6">
              {/* Playlists and Favorites Cards */}
              <div className="flex flex-wrap md:flex-nowrap justify-between lg:space-x-4 ">
                {/* Playlists Card */}
                <div className="w-full  sm:mr p-6 bg-[#2c2c2c] rounded-lg shadow-lg hover:bg-teal-600 hover:scale-105 transform transition duration-300 ease-in-out mb-4 md:mb-0">
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl text-teal-500">📂</span>
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        Playlists
                      </h3>
                      <p className="text-sm text-gray-400">
                        {PlaylistCount} Playlists
                      </p>
                    </div>
                  </div>
                </div>
                {/* Favorites Card */}
                <div className="w-full  p-6 bg-[#2c2c2c] rounded-lg shadow-lg hover:bg-teal-600 hover:scale-105 transform transition duration-300 ease-in-out">
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl text-teal-500">❤️</span>
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        Favorites
                      </h3>
                      <p className="text-sm text-gray-400">
                        {FavouriteCount} Favorites
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
