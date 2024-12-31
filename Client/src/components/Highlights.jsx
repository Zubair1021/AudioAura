import React, { useState } from "react";
import feel from '../assets/feel.mp4'
import logo from '../assets/AudioAura-logo.png'

const highlightsData = [
  {
    id: 1,
    title: "Feel the Beat",
    image: "https://kpopping.com/documents/4c/0/Highlight-Switch-On-Concept-Photos-documents-3(1).jpeg?v=456a5",
    description: "Discover electrifying beats.",
    video: feel,
  },
  {
    id: 2,
    title: "Mood Boosters",
    image: "/src/assets/Mood.jpg",
    description: "Playlists to uplift your mood.",
    video: feel,
  },
  {
    id: 3,
    title: "Acoustic Vibes",
    image: "/src/assets/Bass.jpg",
    description: "Soothing acoustic melodies.",
    video: feel,
  },
  {
    id: 4,
    title: "Top Charts",
    image: "/src/assets/Top.jpg",
    description: "Stay updated with trending tracks.",
    video: feel,
  },
  
];

const MusicalHighlights = () => {
  const [selectedHighlight, setSelectedHighlight] = useState(null);

  const handleHighlightClick = (highlight) => {
    setSelectedHighlight(highlight);
  };

  const closeModal = () => {
    setSelectedHighlight(null);
  };

  return (
<div className="w-full px-2 sm:px-4 my-3 pb-12">

{/* Scrollable Container for Cards */}
<div className="flex overflow-x-auto space-x-6 pb-6 scrollbar-thin scrollbar-thumb-[#ff4141]">
  {highlightsData.map((highlight) => (
    <div
      key={highlight.id}
      className="min-w-[240px] sm:min-w-[300px] cursor-pointer rounded-xl shadow-lg transform transition-all hover:scale-105"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={highlight.image}
          alt={highlight.title}
          className="w-full h-40 sm:h-48 md:h-56 object-cover transition-transform"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 group-hover:opacity-75 transition-opacity"></div>
      </div>
      {/* Title & Icon */}
      <div className="absolute bottom-4 left-4 text-white space-y-2">
        <h3 className="text-sm sm:text-base font-bold">{highlight.title}</h3>
        <div className="flex items-center gap-2">
          <button className="bg-[#ff4141] p-2 rounded-full hover:bg-[#ff6262]">
            <i className="fas fa-play"></i>
          </button>
          <button
            onClick={() => handleHighlightClick(highlight)}
            className="bg-[#626262] p-2 rounded-full hover:bg-gray-500"
          >
            <i className="fas fa-info"></i>
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

{/* Modal for Selected Highlight */}
{selectedHighlight && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-90 backdrop-blur-lg flex items-center justify-center px-4">
    <div className="relative bg-gradient-to-br from-[#141e30] via-[#1f3c50] to-[#141e30] rounded-2xl p-6 sm:p-8 shadow-2xl w-full max-w-lg md:max-w-3xl">
      {/* Logo */}
      <div className="absolute top-4 left-4 flex items-center">
        <img
          src={logo}
          alt="Logo"
          className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 border-[#00ABE4] shadow-md"
        />
        <h1 className="ml-3 text-sm sm:text-xl font-semibold text-white">
          Audio<span className="text-[#00ABE4]">Aura</span>
        </h1>
      </div>
      {/* Title */}
      <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00ABE4] to-[#00CFFD] text-center mb-6 sm:mb-8">
        {selectedHighlight.title}
      </h2>
      {/* Video Section */}
      <div className="relative mb-4 sm:mb-6">
        <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <video
            src={selectedHighlight.video}
            controls
            autoPlay
            className="w-full h-40 sm:h-60 md:h-72 rounded-xl border-none"
          />
          <div className="absolute inset-0 rounded-xl border-[3px] bg-gradient-to-tr from-[#00ABE4] to-[#00CFFD] opacity-50"></div>
        </div>
      </div>
      {/* Description */}
      <p className="text-sm sm:text-lg text-gray-300 text-center leading-relaxed mb-6 sm:mb-8 px-4">
        {selectedHighlight.description}
      </p>
      {/* Close Button (Bottom) */}
      <div className="flex justify-center">
        <button
          onClick={closeModal}
          className="py-2 px-6 sm:px-8 rounded-full bg-[#00ABE4] text-white font-semibold shadow-md hover:bg-[#00CFFD] hover:shadow-lg transition-all duration-200"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
</div>


  );
};

export default MusicalHighlights;
