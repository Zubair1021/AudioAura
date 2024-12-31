import React from "react";

const ShowWhenNoThing = (props) => {
  return (
    <div className="flex flex-col items-center text-center mt-10">
      {/* Decorative Icon Container */}
      <div className="relative bg-gradient-to-tr from-purple-600 via-pink-500 to-red-500 p-6 rounded-full shadow-xl mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-20 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M9 19V6l12-2v13m-12 0a4 4 0 100-8 4 4 0 000 8zm12 0a4 4 0 100-8 4 4 0 000 8z" />
        </svg>
        {/* Subtle Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-tr from-purple-600 via-pink-500 to-red-500 rounded-full blur-lg opacity-50"></div>
      </div>

      {/* Main Heading */}
      <p className="text-3xl font-extrabold text-gray-800 mb-2">No {props.title} Yet</p>

      {/* Subtitle */}
      <p className="text-sm text-gray-500 mb-6">
        Your {props.maintitle} is feeling lonely. Add some {props.title} and let the music play!
        🎧
      </p>

      {/* Floating Line Decoration */}
      <div className="relative flex items-center justify-center w-64">
        <div className="w-full h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 rounded-full"></div>
        <div className="absolute -top-2 animate-bounce w-6 h-6 bg-gradient-to-r from-purple-600 to-red-500 rounded-full shadow-md"></div>
      </div>
    </div>
  );
};

export default ShowWhenNoThing;
