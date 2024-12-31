import React, { useEffect, useState } from "react";
import Graph from "../components/Graph";
// import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const [counts, setCounts] = useState({
    songsCount: 0,
    albumsCount: 0,
    usersCount: 0,
    playlistsCount: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await fetch("http://localhost:3000/counts"); // Adjust URL based on your backend
        if (!response.ok) {
          throw new Error("Failed to fetch counts");
        }
        const data = await response.json();
        if (data.success) {
          setCounts(data.data);
        } else {
          console.error("Failed to load counts.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="min-h-screen lg:ml-60 mt-14 bg-gray-100 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Card for Albums */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Albums</h2>
          <p className="text-gray-600">Manage your music albums.</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-2xl font-bold">
              {loading ? "Loading..." : counts.albumsCount}
            </span>
            <button className="bg-[#3F4D66] text-white rounded px-3 py-1">
              View
            </button>
          </div>
        </div>

        {/* Card for Users */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Users</h2>
          <p className="text-gray-600">Manage registered users.</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-2xl font-bold">
              {loading ? "Loading..." : counts.usersCount}
            </span>
            <button className="bg-[#3F4D66] text-white rounded px-3 py-1">
              View
            </button>
          </div>
        </div>

        {/* Card for Songs */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Songs</h2>
          <p className="text-gray-600">Manage your music tracks.</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-2xl font-bold">
              {loading ? "Loading..." : counts.songsCount}
            </span>
            <button className="bg-[#3F4D66] text-white rounded px-3 py-1">
              View
            </button>
          </div>
        </div>

        {/* Card for Playlists */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Playlists</h2>
          <p className="text-gray-600">Manage user playlists.</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-2xl font-bold">
              {loading ? "Loading..." : counts.playlistsCount}
            </span>
            <button className="bg-[#3F4D66] text-white rounded px-3 py-1">
              View
            </button>
          </div>
        </div>
      </div>

      {/* Card for the Graph */}
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow mt-6">
        <h2 className="text-xl font-semibold mb-2">Dashboard Summary</h2>
        <div className="">
          <div className="">
            <Graph
              albumCount={counts.albumsCount}
              userCount={counts.usersCount}
              songCount={counts.songsCount}
              playlistCount={counts.playlistsCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
