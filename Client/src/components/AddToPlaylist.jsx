import { useState, useEffect } from "react";
import { useContext } from "react";
import SongContext from '../context/SongContext'; // Correct import

const AddToPlaylist = ({ setIsModalOpen }) => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null); // Store the selected playlist ID
  const [isSubmitting, setIsSubmitting] = useState(false); // For showing loading state
  const [errorMessage, setErrorMessage] = useState(null); // To show error if any
  const { Song } = useContext(SongContext);

  // Fetch playlists from API on component mount with token
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch("http://localhost:3000/user/playlists", {
          headers: {
            token: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setPlaylists(data.playlists); // Adjust based on the response format
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };
    // console.log("Song", Song.id); // Check song ID
    fetchPlaylists();
  }, [Song]); // Fetch playlists when Song changes

  const handleCardClick = (playlistId) => {
    // Toggle the playlist selection when the card is clicked
    setSelectedPlaylist(playlistId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null); // Reset error message

    try {
      // API request to add the song to the selected playlist
      const response = await fetch("http://localhost:3000/user/addSongToPlaylist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          playlistId: selectedPlaylist,
          songId: Song.id, // Assuming Song has an id property
        }),
      });
      console.log(response); // Log the response
      const data = await response.json();
      console.log(data); // Log the response
      const { success,message } = data;

      if (success) {
        // If the request is successful, close the modal and reset selection
        setIsModalOpen(false);
        resetSelection();
        alert(message);
      } else if(!success) {
        // Handle errors from the API
        setErrorMessage(data.message || "An error occurred while adding the song.");
      }
    } catch (error) {
      console.error("Error adding song to playlist:", error);
      setErrorMessage("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false); // Stop loading state
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetSelection();
  };

  const resetSelection = () => {
    setSelectedPlaylist(null); // Reset selection
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-[#121212] text-white rounded-lg shadow-xl p-6 relative">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-400 hover:text-cyan-400"
        >
          &#x2715;
        </button>
        <h2 className="text-3xl font-extrabold text-center text-cyan-400 mb-6">
          Add to Playlist
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <p className="text-sm font-medium mb-2 text-gray-300">
              Select Playlist to Add to:
            </p>
            <div className="flex overflow-x-auto space-x-4 p-2 scrollbar-thin scrollbar-thumb-cyan-400">
              {playlists.map((playlist) => (
                <div
                  key={playlist._id}
                  onClick={() => handleCardClick(playlist._id)}
                  className={`min-w-[150px] p-4 rounded-lg shadow-md flex-shrink-0 cursor-pointer transition-all duration-300 ${
                    selectedPlaylist === playlist._id
                      ? "bg-cyan-500 text-white" // If selected, change the background color
                      : "bg-gray-800 text-gray-300"
                  }`}
                >
                  <label className="block text-sm font-semibold mb-1">
                    {playlist.name}
                  </label>
                  <p className="text-xs text-gray-400">
                    {playlist.songs?.length || 0} songs
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Error message */}
          {errorMessage && (
            <p className="text-red-500 text-center">{errorMessage}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !selectedPlaylist} // Disable submit when submitting or no playlist is selected
            className={`w-full py-2 ${isSubmitting ? "bg-gray-500" : "bg-cyan-400"} text-gray-900 rounded-lg font-bold hover:bg-cyan-300 transition duration-200`}
          >
            {isSubmitting ? "Adding..." : "Add to Selected Playlist"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddToPlaylist;
