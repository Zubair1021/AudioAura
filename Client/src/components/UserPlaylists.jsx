import React, { useState, useEffect, useContext } from "react";
import Sidebar from "./sidebar";
import Player from "./Player";
import Navbar from "./Navbar";
import { TiDelete } from "react-icons/ti";
import { RiDeleteBin3Fill } from "react-icons/ri";
import { PlayerContext } from "../context/Playercontext";
import SongContext from "../context/SongContext";
import ShowWhenNoThing from "./ShowWhenNoThing";

const PlaylistPage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [error, setError] = useState(null);
  const [GetPlaylistId, setGetPlaylistId] = useState(null);
  const [playlistPicture, setPlaylistPicture] = useState(null);
  const [playlistPicture1, setPlaylistPicture1] = useState(null);

  const { setPlaylistCount } = useContext(SongContext);
  const {PlayWithId,audioRef,track} = useContext(PlayerContext);


  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch("http://localhost:3000/user/playlists", {
          headers: { token: localStorage.getItem("token") },
        });
        const data = await response.json();
        if (data.success) {
          setPlaylists(data.playlists);
          setPlaylistCount(data.playlists.length);
          
        } else {
          setError("Failed to fetch playlists");
        }
      } catch (err) {
        setError("Error fetching playlists");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  const fetchSongsByIds = async (songIds) => {
    try {
      const response = await fetch("http://localhost:3000/user/getSongsByIds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ songIds }),
      });
      const data = await response.json();
      if (data.success){
        setSongs(data.songs);
        setPlaylistPicture(data.songs[0]?.image);
        setPlaylistPicture1(data.songs[1]?.image);        
        console.log('songs',data.songs);
      }
      else setError("Error fetching songs");
    } catch (err) {
      setError("Error fetching songs");
    }
  };

  const deletePlaylist = async (playlistId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/user/playlist/${playlistId}`,
        {
          method: "DELETE",
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      const data = await response.json();
      const { success, message } = data;
      if (success) {
        alert(message);
        const updatedPlaylists = playlists.filter(
          (playlist) => playlist._id !== playlistId
        );
        setPlaylists(updatedPlaylists);
      } else if (!success) {
        alert(message);
      }
    } catch (error) {
      throw new Error("Error deleting playlist");
    }
  };

  const deleteSongFromPlaylist = async (playlistId, songId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/user/deleteSong/${playlistId}/${songId}`,
        {
          method: "DELETE",
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }
  
      const data = await response.json();
      const { success, message } = data;
  
      if (success) {
        alert(message);
  
        // Refresh songs and playlist
        const updatedSongs = songs.filter((song) => song._id !== songId);
        setSongs(updatedSongs);
  
        // Fetch updated playlist from backend
        const refreshedPlaylistsResponse = await fetch(
          `http://localhost:3000/user/playlists`,
          {
            headers: { token: localStorage.getItem("token") },
          }
        );
        const refreshedData = await refreshedPlaylistsResponse.json();
  
        if (refreshedData.success) {
          setPlaylists(refreshedData.playlists);
          const updatedPlaylist = refreshedData.playlists.find(
            (pl) => pl._id === playlistId
          );
          setSelectedPlaylist(updatedPlaylist || null);
        }
      } else {
        alert(message);
      }
    } catch (error) {
      console.error("Error deleting song from playlist:", error);
      alert("Error deleting song from playlist");
    }
  };
  

  const handlePlaylistClick = (playlist) => {
    console.log(playlist);
    const songIds = playlist.songs.map((song) => song._id || song); 
    if (songIds.length > 0) {
      fetchSongsByIds(songIds); 
    } else {
      setSongs([]); 
    }
    setSelectedPlaylist(playlist); // State set kar diya
    setGetPlaylistId(playlist._id); // State set kar diya
  };
  
  // Track `selectedPlaylist` or `GetPlaylistId` for confirmation
  useEffect(() => {
    console.log("Selected Playlist Updated:", selectedPlaylist);
    console.log("Playlist ID Updated:", GetPlaylistId);
  }, [selectedPlaylist, GetPlaylistId]);
  

  
  

  const handleBackToPlaylists = () => {
    setSelectedPlaylist(null);
    setSongs([]); // Clear the songs state when navigating back to playlists
  };

  return (
    <div className="h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1b1b1b]">
      <div className="h-[90%] flex">
        <Sidebar />
        <div className="flex-1 p-8 overflow-y-auto">
          <Navbar />
          <div className="flex flex-col md:flex-row items-center md:items-start mb-10 px-4 mt-10">
          {/* Icon Container */}
          <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 flex items-center justify-center rounded-md bg-gradient-to-br from-purple-700 to-pink-500 shadow-2xl mb-6 md:mb-0 md:mr-8">
            <span className="text-5xl sm:text-6xl font-bold text-white">🎵</span>
          </div>

  {/* Text Content */}
  <div className="text-center md:text-left">
    <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white mb-3">
      Your Collection
    </h2>
    <p className="text-base sm:text-lg md:text-xl text-gray-300">
      Manage and explore your playlists.
    </p>
  </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-pulse">
                <div className="h-12 w-12 bg-blue-400 rounded-full"></div>
              </div>
            </div>
          ) : error ? (
            <div className="text-white text-center py-10">{error}</div>
          ) : playlists.length === 0 ? (
            <ShowWhenNoThing title="Playlists" maintitle="Playlist" />
          ) : selectedPlaylist ? (
            <div className="bg-[#1a1a1a] mt-5 rounded-lg p-6 shadow-2xl">
              <button
                onClick={handleBackToPlaylists}
                className="text-teal-400 hover:underline mb-4 text-lg"
              >
                &larr; Back to Playlists
              </button>
              <div className="flex items-center mb-8">
                <img
                  src={
                    playlistPicture || 'https://media.gq.com/photos/5ae3925b3fb87856d8a5cdf6/16:9/w_2560%2Cc_limit/Road-Trip-Playlist-GQ-April-2018-042718-3x2.png'
                  }
                  alt={selectedPlaylist.name}
                  className="w-36 h-36 mr-6 rounded-lg object-cover border-4 border-teal-400"
                />
                <div>
                  <h2 className="text-6xl font-bold text-white">
                    {selectedPlaylist.name}
                  </h2>
                  <p className="text-gray-400 text-lg mt-2">
                    {selectedPlaylist.songs?.length || 0}{" "}
                    {selectedPlaylist.songs?.length === 1 ? "song" : "songs"}
                  </p>
                </div>
              </div>
              {selectedPlaylist.songs && selectedPlaylist.songs.length > 0 ? (
                <div  className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {songs.map((song) => (
                    <div
                    onClick={() => PlayWithId(song.id)}
                      className="bg-[#262626] p-4 rounded-lg cursor-pointer flex items-center justify-between shadow-md hover:bg-[#333333] transition-all duration-300 group relative"
                    >  
                      <div className="flex items-center">
                        <img
                          src={song.image || "https://via.placeholder.com/50"}
                          alt={song.name}
                          className="w-12 h-12 rounded-lg mr-4"
                        />
                        <div>
                          <h3 className="text-white text-lg font-semibold">
                            {song.name}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            2 min ago
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          deleteSongFromPlaylist(selectedPlaylist._id, song._id)
                        }
                        className="text-red-500 hover:text-red-400"
                      >
                        <TiDelete size={24} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <ShowWhenNoThing title="Songs" maintitle="Playlist" />
              )}
            </div>
          ) : (
            <div className="grid gap-8 mt-5 md:grid-cols-2 lg:grid-cols-3">
              {playlists.map((playlist) => (
                <div
                  key={playlist._id}
                  onClick={() => handlePlaylistClick(playlist)}
                  className="relative bg-[rgb(31,31,31)] rounded-lg p-6 cursor-pointer hover:bg-[#333333] transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center rounded-lg opacity-40"
                    style={{
                      backgroundImage: `url(${
                          playlistPicture || 'https://media.gq.com/photos/5ae3925b3fb87856d8a5cdf6/16:9/w_2560%2Cc_limit/Road-Trip-Playlist-GQ-April-2018-042718-3x2.png'
                      })`,
                    }}
                  ></div>
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-teal-400 mb-4">
                      <img
                        src={
                         playlistPicture1 || 'https://images.ctfassets.net/mrsnpomeucef/3flwsEi4H05T90gyKDVrVn/817cb2fb12e91cbcd607a142539fe3ff/How_to_clear_Spotify_queue.png?w=2880&h=1440'
                        }
                        alt={playlist.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-gray-400 text-sm mb-1">
                      {playlist.songs.length} Songs
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deletePlaylist(playlist._id);
                      }}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-400"
                    >
                      <RiDeleteBin3Fill size={24} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Player />
      <audio ref={audioRef} src={track.file} preload="auto"></audio>
    </div>
  );
};

export default PlaylistPage;
