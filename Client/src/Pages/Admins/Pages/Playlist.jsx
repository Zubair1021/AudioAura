import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar"; // Import Sidebar
import Navbar from "../components/Navbar"; // Import Navbar

const Playlist = () => {
  const [activeOption, setActiveOption] = useState("playlists");
  const [playlists, setPlaylists] = useState([]);

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch("http://localhost:3000/user/getAllPlaylist");
        const data = await response.json();
        setPlaylists(data);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchPlaylists();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex bg-gradient-to-br from-[#ff6f61] to-[#8e44ad] min-h-screen text-white">
        {/* Sidebar */}
        <div className="hidden lg:block">
          <Sidebar
            activeOption={activeOption}
            handleOptionClick={handleOptionClick}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-60 mt-14 px-6">
          <h1 className="text-4xl font-extrabold text-center text-white mt-6">
           Users Playlists
          </h1>

          {/* Playlist Table */}
          <div className="mt-8 overflow-x-auto bg-[#1c1c1c] rounded-lg shadow-xl p-6">
            {playlists.length > 0 ? (
              <table className="w-full table-auto border-separate border-spacing-0">
                <thead className="bg-[#8e44ad] text-white rounded-t-lg">
                  <tr>
                    <th className="p-4 text-left font-semibold text-lg">#</th>
                    <th className="p-4 text-left font-semibold text-lg">Name</th>
                    <th className="p-4 text-left font-semibold text-lg">Description</th>
                    <th className="p-4 text-left font-semibold text-lg">Status</th>
                    <th className="p-4 text-left font-semibold text-lg">Songs Count</th>
                  </tr>
                </thead>
                <tbody>
                  {playlists.map((playlist, index) => (
                    <tr
                      key={playlist._id}
                      className={`hover:bg-[#2c2c2c] transition-all duration-300 ease-in-out ${
                        index % 2 === 0 ? "bg-[#2a2a2a]" : "bg-[#333]"
                      }`}
                    >
                      <td className="p-4 border-b border-[#444]">{index + 1}</td>
                      <td className="p-4 border-b border-[#444]">{playlist.name}</td>
                      <td className="p-4 border-b border-[#444]">{playlist.description}</td>
                      <td className="p-4 border-b border-[#444]">
                        <div
                          className={`inline-block px-4 py-2 rounded-full text-white font-semibold ${
                            playlist.status === "active"
                              ? "bg-[#2ecc71]" // Green for active
                              : "bg-[#e74c3c]" // Red for inactive
                          }`}
                        >
                          {playlist.status}
                        </div>
                      </td>
                      <td className="p-4 border-b border-[#444]">{playlist.songs.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center mt-6 text-gray-400">No playlists found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Playlist;
