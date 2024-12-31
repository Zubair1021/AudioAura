import React from "react";

const AudioAuroLoader = () => {
  return (
    <div className="flex items-center justify-center relative min-h-screen">
      {/* Spinning Disc */}
      <div className="relative w-12 h-12 rounded-full border-4 border-t-white border-[#00ABE4] animate-spin flex items-center justify-center bg-black">
        {/* Inner White Circle */}
        <div className="w-3 h-3 mb-1 bg-white rounded-full"></div>
      </div>

      {/* Floating "A" */}
      <div className="absolute text-white font-bold text-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        A
      </div>

      {/* Glowing Ring */}
      <div className="absolute w-20  h-20 rounded-full border-2 border-[#00ABE4] opacity-50 animate-pulse"></div>
    </div>
  );
};

export default AudioAuroLoader;
