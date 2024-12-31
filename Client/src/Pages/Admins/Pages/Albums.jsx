import React, { useState } from "react";
import upload from "../../../assets/arrow.png";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const AddAlbum = () => {
  const [activeOption, setActiveOption] = useState("albums");
  const handleOptionClick = (option) => {
    setActiveOption(option);
  };

  const [image, setImage] = useState(null);
  const [albumData, setAlbumData] = useState({
    name: "",
    image: "",
    category: "",
    description: "",
    bgColor: "#ffffff",
  });

  const changeHandler = (e) => {
    setAlbumData({ ...albumData, [e.target.name]: e.target.value });
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const colorChangeHandler = (e) => {
    setAlbumData({ ...albumData, bgColor: e.target.value });
  };

  const addAlbumHandler = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:3000/uploadalbum", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.error("Error uploading image");
        throw new Error("Image upload failed");
      }

      const data = await response.json();
      if (data.success) {
        albumData.image = data.image_url;
        const response2 = await fetch("http://localhost:3000/admin/addalbum", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
          body: JSON.stringify(albumData),
        });

        const data2 = await response2.json();
        const { success, message } = data2;
        alert(message);
      }
    } catch (error) {
      console.error("Error in addAlbumHandler:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gradient-to-br from-gray-200 to-gray-300">
        <Sidebar activeOption={activeOption} handleOptionClick={handleOptionClick} />
        <main className="flex-1 lg:ml-60 mt-14 p-6 min-h-screen flex items-center justify-center">
          <div className="p-8 bg-white rounded-xl shadow-lg w-full max-w-2xl lg:max-w-none">
            <h2 className="text-3xl sm:text-2xl md:text-2xl  font-bold text-center mb-8 text-gray-800">Add New Album</h2>

            <form onSubmit={addAlbumHandler} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Album Name</label>
                <input
                  value={albumData.name}
                  onChange={changeHandler}
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff4141]"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700">Description</label>
                <textarea
                  value={albumData.description}
                  onChange={changeHandler}
                  id="description"
                  name="description"
                  required
                  className="mt-2 w-full px-4 py-3 h-28 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff4141]"
                  style={{ resize: "none" }} 
                />
              </div>
              <div>
                <label htmlFor="bgColor" className="block text-sm font-semibold text-gray-700">Background Color</label>
                <div className="flex items-center gap-3 mt-2">
                  <input
                    type="color"
                    value={albumData.bgColor}
                    onChange={colorChangeHandler}
                    id="bgColor"
                    name="bgColor"
                    className="w-12 h-10 border rounded shadow-sm"
                  />
                  <input
                    type="text"
                    value={albumData.bgColor}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-semibold text-gray-700">Category</label>
                <select
                  value={albumData.category}
                  onChange={changeHandler}
                  id="category"
                  name="category"
                  required
                  className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff4141]"
                >
                  <option value="">Select a category</option>
                  <option value="music">Music</option>
                  <option value="podcast">PodCast</option>
                </select>
              </div>
              <div>
                <label htmlFor="image" className="block text-sm font-semibold text-gray-700">Album Cover</label>
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
              <div className="text-center"> {/* Ensure button is centered */}
                <button
                id="addalbum"
                  type="submit"
                  className="w-full sm:w-[50%] py-3 mt-4 bg-gradient-to-r from-[#ff4141] to-[#626262] text-white font-bold rounded-lg shadow-md hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff4141] mx-auto"
                >
                  Add Album
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default AddAlbum;
