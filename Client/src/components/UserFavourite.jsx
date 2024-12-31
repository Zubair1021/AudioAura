import React, { useEffect, useState, useContext } from "react";
import Sidebar from "./sidebar";
import Navbar from "./Navbar";
import Player from "./Player";
import { FaTrash, FaPlus, FaMusic } from "react-icons/fa";
import SongContext from "../context/SongContext";
import CreatePlaylist from "./CreatePlaylist";
import AddToPlaylist from "./AddToPlaylist";
import { PlayerContext } from "../context/Playercontext";
import ProtectedPremium from "./ProtectedPremium";

const UserFavourite = () => {
  const [LikedSongs, setLikedSongs] = useState([]);
  const [Songs, setSongs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [IsCreateModelOpen, setIsCreateModelOpen] = useState(false);
  const [IsAddToPlaylistModelOpen, setIsAddToPlaylistModelOpen] =
    useState(false);
  const { PlayWithId, audioRef, track } = useContext(PlayerContext);

  const toggleMenu = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle the clicked index
  };

  const handleCreatePlaylistModel = () => {
    setIsCreateModelOpen(!IsCreateModelOpen);
  };
  const handleAddToPlaylistModel = (favorite) => {
    console.log(favorite);
    setIsAddToPlaylistModelOpen(!IsAddToPlaylistModelOpen);
    setSong(favorite);
  };

  const { setSong, Song, setFavouriteCount } = useContext(SongContext);

  // Fetch favorite song IDs
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user/favorites`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        const data = await response.json();
        if (data.success) {
          setLikedSongs(data.favoriteSongIds || []);
          setFavouriteCount(data.favoriteSongIds.length);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, []);

  // Fetch full song details using liked song IDs
  useEffect(() => {
    const fetchSongsByIds = async () => {
      if (LikedSongs.length > 0) {
        try {
          const response = await fetch(
            "http://localhost:3000/user/getSongsByIds",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ songIds: LikedSongs }),
            }
          );
          const data = await response.json();
          if (data.success) {
            setSongs(data.songs);
          }
        } catch (error) {
          console.error("Error fetching songs:", error);
        }
      }
    };

    fetchSongsByIds();
  }, [LikedSongs]); // Depend on LikedSongs

  const deleteFavorite = async (songId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/user/favorites/${songId}`,
        {
          method: "DELETE",
          headers: {
            token: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      const { message, success } = data;

      if (success) {
        alert(message);
        setLikedSongs((prev) => prev.filter((id) => id !== songId));
        setSongs((prev) => prev.filter((song) => song._id !== songId));
        setFavouriteCount((prev) => prev - 1);
      } else {
        alert(message);
      }
    } catch (error) {
      console.error("Error deleting favorite:", error);
    }
  };

  return (
        <div className="h-screen bg-gradient-to-b from-[#121212] to-[#2C2C2C]">
          <div className="h-[90%] flex flex-col md:flex-row">
            <Sidebar />
            <div className="flex-1 p-8 overflow-y-auto">
              <Navbar />

              {/* Liked Songs Header */}
              <div className="flex flex-col md:flex-row items-center md:items-start mb-10 px-4 mt-10">
      {/* Heart Icon Container */}
      <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 flex items-center justify-center rounded-md bg-gradient-to-br from-purple-700 to-pink-500 shadow-2xl mb-6 md:mb-0 md:mr-8">
        <span className="text-5xl sm:text-6xl text-white">❤️</span>
      </div>

      {/* Text Content */}
      <div className="text-center md:text-left">
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-semibold text-white mb-3">
          Liked Songs
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-300">
          Enjoy Your Favorites • {(LikedSongs.length)-1} songs
        </p>
      </div>
    </div>


          {/* Song Cards Section */}
          <div className="mt-10">
            <h3 className="text-3xl font-extrabold text-white mb-6">
              Your Favourites
            </h3>
            <div className="space-y-6">
              {Songs.map((favorite, index) => (
                <div
                  key={index}
                  className="flex cursor-pointer items-center p-4 bg-[#2C2C2C] rounded-lg shadow-lg transition-transform duration-300 hover:scale-100"
                  onClick={() => openIndex !== index && PlayWithId(favorite.id)} // Only play if submenu is not open
                >
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden mr-4">
                    <img
                      src={favorite.image}
                      alt={favorite.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-2 right-2 px-2 py-1 text-xs font-semibold bg-black bg-opacity-75 text-white rounded-md">
                      {favorite.duration || "0:00"}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white truncate">
                      {favorite.name}
                    </h3>
                    <p className="text-sm text-gray-400 truncate">
                      {favorite.singer}
                    </p>
                    <div className="flex items-center mt-2">
                      <button className="text-xs text-gray-400 bg-transparent border border-gray-400 rounded-full px-2 py-1 hover:bg-gray-600 transition-colors">
                        Comment
                      </button>
                    </div>
                  </div>
                  <div className="relative">
                    <button
                      className="relative text-gray-400 hover:text-white ml-4"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent PlayWithId from triggering
                        toggleMenu(index);
                      }}
                    >
                      <span className="text-2xl">&#x22EE;</span>
                      {openIndex === index && (
                        <div className="absolute top-[-30px] right-3 mt-2 bg-gray-800 text-white rounded-lg shadow-lg p-3 w-48 z-10 transform scale-95 transition-all duration-200 ease-in-out hover:scale-100">
                          <div className="flex flex-col space-y-3">
                            {/* Delete from Favorites */}
                            <button
                              onClick={() => deleteFavorite(favorite._id)}
                              className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-700 transition-all duration-200"
                            >
                              <span className="text-xs">Delete from Fav</span>
                              <FaTrash className="text-red-500" />
                            </button>

                            {/* Create Playlist */}
                            <button
                              onClick={handleCreatePlaylistModel}
                              className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-700 transition-all duration-200"
                            >
                              <span className="text-xs">Create Playlist</span>
                              <FaMusic className="text-green-500" />
                            </button>

                            {/* Add to Playlist */}
                            <button
                              onClick={() => {
                                handleAddToPlaylistModel(favorite);
                              }}
                              className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-700 transition-all duration-200"
                            >
                              <span className="text-xs">Add to Playlist</span>
                              <FaPlus className="text-blue-500" />
                            </button>
                          </div>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {IsCreateModelOpen && (
         <ProtectedPremium>
         <CreatePlaylist setIsModalOpen={setIsCreateModelOpen} />
       </ProtectedPremium>
      )}
      {IsAddToPlaylistModelOpen && (
        <AddToPlaylist setIsModalOpen={setIsAddToPlaylistModelOpen} />
      )}
      <Player />
      {/* <Player  LikedSongs = {LikedSongs} setLikedSongs={setLikedSongs} setFavouriteCount={setFavouriteCount}/> */}
      <audio ref={audioRef} src={track.file} preload="auto"></audio>
    </div>
  );
};

export default UserFavourite;
