import { useState } from "react";

const CreatePlaylist = ({ setIsModalOpen }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send the form data to your backend
    try {
      const response = await fetch("http://localhost:3000/user/createplaylist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": localStorage.getItem("token"), 
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      console.log(data);
      const { success, message } = data;
      if (success) {
        alert(message);
        setIsModalOpen(false); // Close the modal
      } else {
        alert(message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-[#121212d2] text-white rounded-lg shadow-xl p-6 relative">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-400 hover:text-cyan-400"
        >
          &#x2715;
        </button>
        <h2 className="text-3xl font-extrabold text-center text-cyan-400 mb-6">
          Create Playlist
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Playlist Name */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Playlist Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Enter playlist name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Enter description (optional)"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-cyan-400 text-gray-900 rounded-lg font-bold hover:bg-cyan-300 transition duration-200"
          >
            Create Playlist
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePlaylist;
