import React, { useState, useContext, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { Navigate, useNavigate } from "react-router-dom";
import CreatePlaylist from "./CreatePlaylist";
import { searchSongs } from "../Utils/api"; // Importing the search function from utils
import { PlayerContext } from "../context/Playercontext";
import ProtectedPremium from "./ProtectedPremium";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // For storing the query
  const [searchResults, setSearchResults] = useState([]); // For storing the search results

  const { PlayWithId } = useContext(PlayerContext);

  const searchInputRef = useRef(null); // Ref to track search input area

  const openModal = () => {
    setIsModalOpen(true);
  };


  const handleSearchClick = () => {
    setShowSearchInput(true); // Always show input on clicking Search
  };
  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  
    if (query.trim() !== "") {
      try {
        const results = await searchSongs(query); // Fetch results dynamically
        setSearchResults(results);
  
        // Now update the history with the fetched results
        const token = localStorage.getItem("token");
  
        if (token) {
          for (const song of results) {
            let songn = song.name;
            console.log("song",song)
            await fetch("http://localhost:3000/historyUpdate", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "token": token, // Pass the token in the Authorization header
              },
            
              body: JSON.stringify({ songn }),
            });
          }
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults([]); // Clear results on error
      }
    } else {
      setSearchResults([]); // Clear results if query is empty
    }
  };
  
  const handleClickSearchSong = (song) => {
    PlayWithId(song.id);
    setShowSearchInput(false);
  };
  // Close search input when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target)
      ) {
        setShowSearchInput(false);
      }
    };
    if (showSearchInput) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showSearchInput]);

  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
      <div className="bg-[#121212] h-[20%] rounded flex flex-col justify-around">
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 pl-8 cursor-pointer mt-2"
        >
          <img className="w-6" src={assets.home_icon} alt="" />
          <p className="font-bold">Home</p>
        </div>

        {showSearchInput ? (
          <div className="relative w-full" ref={searchInputRef}>
            <input
              id="searchInput"
              type="text"
              placeholder="Search..."
              className="p-2 bg-gray-800 text-white rounded mt-3 w-full mr-2 h-9"
              autoFocus
              value={searchQuery}
              onChange={handleSearchChange} // Update results on typing
            />
            <div className="absolute bg-gray-900 text-white w-full max-h-48 overflow-auto rounded shadow-lg mt-1 z-10">
              {searchResults.length > 0 ? (
                searchResults.map((song) => (
                  <div
                    id="searchResult"
                    key={song.id}
                    className="p-2 hover:bg-gray-700 cursor-pointer"
                    onClick={() => handleClickSearchSong(song)} // Pass song to details
                  >
                    <p className="font-bold">{song.name}</p>
                    <p className="text-sm text-gray-400">{song.singer}</p>
                  </div>
                ))
              ) : (
                <p className="p-2 text-gray-400">No results found</p>
              )}
            </div>
          </div>
        ) : (
          <div
            className="flex items-center gap-3 pl-8 cursor-pointer"
            onClick={handleSearchClick}
          >
            <img className="w-6" src={assets.search_icon} alt="" />
            <p id="searching" className="font-bold">
              Search
            </p>
          </div>
        )}
      </div>

      <div className="bg-[#121212] h-[85%] rounded">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img className="w-8" src={assets.stack_icon} alt="" />
            <p className="font-semibold">Your Library</p>
          </div>
          <div className="flex items-center gap-3">
            <img className="w-5" src={assets.arrow_icon} alt="" />
            <img className="w-5" src={assets.plus_icon} alt="" />
          </div>
        </div>
        <div className="p-4 bg-[#242424]  m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
          <h1>Create your first playlist</h1>
          <p className="font-light  ">It's easy, we will help you</p>
          <button
            className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4"
            onClick={openModal}
          >
            Create Playlist
          </button>
        </div>
        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4">
          <h1>Find your favorites</h1>
          <p className="font-light ">Discover your favorites, all in one place</p>
          <Link to="/user-favourite">
          <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4 " >
            Your Favotites
          </button>
          </Link>
        </div>
      </div>
      {/* {isModalOpen && <CreatePlaylist setIsModalOpen={setIsModalOpen} />} */}
      {/* {isModalOpen && <ProtectedPremium><CreatePlaylist setIsModalOpen={setIsModalOpen} /></ProtectedPremium>}
       */}
      {isModalOpen && (
        <ProtectedPremium>
          <CreatePlaylist setIsModalOpen={setIsModalOpen} />
        </ProtectedPremium>
      )}
    </div>
  );
};
export default Sidebar;
