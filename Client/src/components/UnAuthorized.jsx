import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <section
      className="relative h-screen flex flex-col items-center justify-center text-white overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0a0a0a 0%, #1e2a47 50%, #2d3b65 100%)", // Dark blue-black gradient
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Main Content */}
      <div
        className={`relative z-10 text-center transition-opacity duration-1000 ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          403 - Access Denied
        </h1>
        <p className="text-lg md:text-2xl mb-6">
          You don't have permission to view this page.
        </p>
        <p className="text-md md:text-lg mb-8">
          Please contact support or head back to the homepage.
        </p>
        <Link to="/">
          <button className="bg-[#1e2a47] text-white py-3 px-8 rounded-full font-semibold text-lg hover:shadow-lg hover:scale-105 transform transition duration-300 hover:bg-[#354a80]">
            Go Back
          </button>
        </Link>
      </div>

      {/* Musical Icons */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {/* Left Side */}
        <div className="absolute top-10 left-12 animate-bounce">
          <div className="bg-[#1e2a47] w-14 h-14 rounded-full flex items-center justify-center">
            <span className="text-3xl text-white">🎵</span>
          </div>
        </div>
        <div className="absolute bottom-20 left-8 animate-pulse delay-200">
          <div className="bg-[#354a80] w-16 h-16 rounded-full flex items-center justify-center">
            <span className="text-4xl text-white">🎷</span>
          </div>
        </div>

        {/* Right Side */}
        <div className="absolute bottom-16 right-20 animate-pulse delay-500">
          <div className="bg-[#2d3b65] w-18 h-18 rounded-full flex items-center justify-center">
            <span className="text-5xl text-white">🎹</span>
          </div>
        </div>
        <div className="absolute top-24 right-28 animate-bounce delay-700">
          <div className="bg-[#354a80] w-12 h-12 rounded-full flex items-center justify-center">
            <span className="text-2xl text-white">🎺</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnauthorizedPage;
