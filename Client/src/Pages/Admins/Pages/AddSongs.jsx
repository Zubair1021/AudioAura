import React, { useState, useEffect } from "react";
import upload from "../../../assets/arrow.png"; // Placeholder image
import Sidebar from "../components/Sidebar"; // Import Sidebar
import Navbar from "../components/Navbar"; // Import Navbar

const AddSong = () => {
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [songData, setSongData] = useState({
    name: "",
    singer: "",
    duration: "",
    albumId: "",
    image: "",
    file: "",
    description: "", // Added description field
  });
  const [albums, setAlbums] = useState([]);
  const [activeOption, setActiveOption] = useState("songs"); // State for active sidebar option

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch("http://localhost:3000/admin/getalbums");
        const data = await response.json();
        if (data.success) {
          setAlbums(data.albums); // Assuming the response contains albums array
        }
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };
    fetchAlbums();
  }, []);

  const changeHandler = (e) => {
    setSongData({ ...songData, [e.target.name]: e.target.value });
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const audioHandler = (e) => {
    setAudio(e.target.files[0]);
  };

  const addSongHandler = async (e) => {
    e.preventDefault();

    // Upload image
    let imageFormData = new FormData();
    imageFormData.append("image", image);

    try {
      const imageResponse = await fetch("http://localhost:3000/uploadalbum", {
        method: "POST",
        body: imageFormData,
      });

      const imageData = await imageResponse.json();
      songData.image = imageData.image_url; // Set the image URL

      // Upload audio
      let audioFormData = new FormData();
      audioFormData.append("file", audio);

      const audioResponse = await fetch("http://localhost:3000/uploadaudio", {
        method: "POST",
        body: audioFormData,
      });

      const audioData = await audioResponse.json();
      songData.file = audioData.file_url; // Set the audio file URL

      // Submit song data
      const response = await fetch("http://localhost:3000/admin/addsong", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(songData),
      });

      console.log(response);

      const data = await response.json();
      const { success, message } = data;
      if (success) {
        alert(message);
      } else {
        alert(message);
      }
    } catch (error) {
      console.error("Error in addSongHandler:", error);
    }
  };

  // Handle sidebar option click
  const handleOptionClick = (option) => {
    setActiveOption(option);
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gradient-to-br from-[#3b3b3b] to-[#2a2a2a]">
        <Sidebar
          activeOption={activeOption}
          handleOptionClick={handleOptionClick}
        />
        <main className="flex-1 lg:ml-60 mt-14 p-6 min-h-screen flex items-center justify-center">
          <div className="p-8 bg-white rounded-xl shadow-lg w-full max-w-2xl lg:max-w-none border border-gray-300">
            <h2 className="text-3xl sm:text-2xl md:text-2xl font-extrabold text-center mb-8 text-[#ff4141]">
              Add New Song
            </h2>

            <form onSubmit={addSongHandler} className="space-y-6">
              {/* Song Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Song Name
                </label>
                <input
                  value={songData.name}
                  onChange={changeHandler}
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff4141]"
                />
              </div>

              {/* Singer */}
              <div>
                <label
                  htmlFor="singer"
                  className="block text-sm font-medium text-gray-700"
                >
                  Singer
                </label>
                <input
                  value={songData.singer}
                  onChange={changeHandler}
                  type="text"
                  id="singer"
                  name="singer"
                  required
                  className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff4141]"
                />
              </div>

              {/* Duration */}
              <div>
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-gray-700"
                >
                  Duration
                </label>
                <input
                  value={songData.duration}
                  onChange={changeHandler}
                  type="text"
                  id="duration"
                  name="duration"
                  required
                  placeholder="e.g., 3:45"
                  className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff4141]"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  value={songData.description}
                  onChange={changeHandler}
                  id="description"
                  name="description"
                  required
                  className="mt-2 w-full px-4 py-3 h-28 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff4141]"
                  style={{ resize: "none" }}
                />
              </div>

              {/* Album Selection */}
              <div>
                <label
                  htmlFor="albumId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Album
                </label>
                <select
                  value={songData.albumId}
                  onChange={changeHandler}
                  id="albumId"
                  name="albumId"
                  required
                  className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff4141]"
                >
                  <option value="">Select an album</option>
                  {albums.map((album) => (
                    <option key={album._id} value={album._id}>
                      {album.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image Upload */}
              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  Song Image
                </label>
                <div className="mt-3 flex items-center">
                  <img
                    className="w-20 h-20 object-cover rounded-lg mr-4"
                    src={image ? URL.createObjectURL(image) : upload}
                    alt="Upload preview"
                  />
                  <div className="relative w-full">
                    <input
                      onChange={imageHandler}
                      type="file"
                      id="image"
                      name="image"
                      required
                      className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-[#ff4141] file:text-white file:w-auto hover:file:bg-[#626262] cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Audio Upload */}
              <div>
                <label
                  htmlFor="file"
                  className="block text-sm font-medium text-gray-700"
                >
                  Song File
                </label>
                <div className="mt-3 flex items-center">
                  <input
                    onChange={audioHandler}
                    type="file"
                    id="file"
                    name="file"
                    required
                    accept="audio/*"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-[#ff4141] file:text-white file:w-auto hover:file:bg-[#626262] cursor-pointer"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="w-full sm:w-[50%] py-3 mt-4 bg-gradient-to-r from-[#ff4141] to-[#626262] text-white font-bold rounded-lg shadow-md hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff4141] mx-auto"
                >
                  Add Song
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default AddSong;
