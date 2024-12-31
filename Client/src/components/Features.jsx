import React, { useEffect, useState } from "react";
import HomePageNav from "./HomePageNav";
import { FaHeadphonesAlt, FaMusic, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Features = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate("/spotify");
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen">
      {/* Navbar */}
      <HomePageNav />
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between py-12 md:py-20 mt-12 md:mt-22 px-6 md:px-8">
        <div className="w-full md:w-1/2 space-y-6 animate__animated animate__fadeIn animate__delay-0.5s">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white">
            Music Is The <span className="text-[#00ABE4]">Shorthand</span> Of
            Emotion
          </h1>
          <p className="text-gray-300 text-lg md:text-xl">
            Experience the ultimate musical journey with AudioAura, where every
            track connects to your soul. Let's take your emotions on a magical
            ride.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-[#00ABE4] text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transform transition duration-300 hover:bg-[#009fc3]"
          >
            Get Started
          </button>
        </div>
        <div className="w-full md:w-1/2 mt-8 md:mt-0 flex justify-center animate__animated animate__fadeIn animate__delay-1s">
          <img
            src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D"
            alt="Music vibes"
            className="rounded-full shadow-xl hover:scale-105 transform transition duration-300 w-full max-w-md"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="flex flex-col md:flex-row justify-around items-center py-12 bg-[#1A1A1A] rounded-lg px-6 md:px-8 shadow-xl mx-6 md:mx-8 animate__animated animate__fadeIn animate__delay-1.5s">
        <div className="text-center mb-8 md:mb-0">
          <div className="flex justify-center items-center mb-2">
            <FaUsers className="text-[#00ABE4] text-4xl md:text-5xl opacity-70" />
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-[#00ABE4]">
            320K
          </h3>
          <p className="text-gray-400">Customers</p>
        </div>

        <div className="text-center mb-8 md:mb-0">
          <div className="flex justify-center items-center mb-2">
            <FaMusic className="text-[#00ABE4] text-4xl md:text-5xl opacity-70" />
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-[#00ABE4]">47K</h3>
          <p className="text-gray-400">Tracks</p>
        </div>

        <div className="text-center mb-8 md:mb-0">
          <div className="flex justify-center items-center mb-2">
            <FaHeadphonesAlt className="text-[#00ABE4] text-4xl md:text-5xl opacity-70" />
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-[#00ABE4]">97%</h3>
          <p className="text-gray-400">Positive Feedback</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 space-y-12 px-6 md:px-8 animate__animated animate__fadeIn animate__delay-1.5s">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center text-white">
          Why Choose <span className="text-[#00ABE4]">AudioAura?</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          <div className="p-6 md:p-8 bg-[#262626] rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl duration-500 ease-in-out">
            <h3 className="text-xl md:text-2xl font-bold text-[#00ABE4]">
              Discover New Tracks
            </h3>
            <p className="text-gray-400 mt-4">
              Unearth trending and hidden gems from various genres across the
              globe.
            </p>
            <img
              src="https://img.freepik.com/free-vector/colorful-sound-wave-equalizer-vector-design_53876-61684.jpg?t=st=1731771868~exp=1731775468~hmac=4e67476699fb00d723485ec6dde6634eca6c7dcf609e98456f4acdb4db140786&w=740"
              alt="New Tracks"
              className="w-full h-48 object-cover mt-4 rounded-lg transition-transform transform hover:scale-105 duration-500 ease-in-out"
            />
          </div>
          <div className="p-6 md:p-8 bg-[#262626] rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl duration-500 ease-in-out">
            <h3 className="text-xl md:text-2xl font-bold text-[#00ABE4]">
              Personalized Playlists
            </h3>
            <p className="text-gray-400 mt-4">
              Enjoy curated playlists tailored specifically for your unique
              preferences.
            </p>
            <img
              src="https://images.unsplash.com/photo-1669173034813-fff51b1ee64d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Personalized Playlists"
              className="w-full h-48 object-cover mt-4 rounded-lg transition-transform transform hover:scale-105 duration-500 ease-in-out"
            />
          </div>
          <div className="p-6 md:p-8 bg-[#262626] rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl duration-500 ease-in-out">
            <h3 className="text-xl md:text-2xl font-bold text-[#00ABE4]">
              Seamless Experience
            </h3>
            <p className="text-gray-400 mt-4">
              Dive into a sleek and responsive platform designed for all
              devices.
            </p>
            <img
              src="https://img.freepik.com/free-vector/personal-settings-concept-illustration_114360-2251.jpg?t=st=1731772265~exp=1731775865~hmac=b665282b547368e7bf184e43335928b79b798e25ae70b2dd0f7f6776768bc108&w=740"
              alt="Seamless Experience"
              className="w-full h-48 object-cover mt-4 rounded-lg transition-transform transform hover:scale-105 duration-500 ease-in-out"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-[#1A1A1A] py-12 md:py-20 space-y-8">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center text-white animate__animated animate__fadeIn animate__delay-2.5s">
          What Our Users Say
        </h2>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          <div className="p-6 md:p-8 bg-[#262626] rounded-xl shadow-lg w-full sm:w-80 md:w-72 mx-4 transform transition duration-300 hover:scale-105 hover:shadow-2xl animate__animated animate__fadeIn animate__delay-3s">
            <p className="text-gray-400 text-sm sm:text-base md:text-lg">
              "AudioAura completely transformed my music experience."
            </p>
            <h3 className="text-[#00ABE4] mt-4 text-lg sm:text-xl md:text-2xl font-bold">
              John Doe
            </h3>
            <p className="text-gray-500 text-sm sm:text-base md:text-lg">
              Music Enthusiast
            </p>
          </div>
          <div className="p-6 md:p-8 bg-[#262626] rounded-xl shadow-lg w-full sm:w-80 md:w-72 mx-4 transform transition duration-300 hover:scale-105 hover:shadow-2xl animate__animated animate__fadeIn animate__delay-3.5s">
            <p className="text-gray-400 text-sm sm:text-base md:text-lg">
              "The curated playlists are perfect for any mood. I love it!"
            </p>
            <h3 className="text-[#00ABE4] mt-4 text-lg sm:text-xl md:text-2xl font-bold">
              Jane Smith
            </h3>
            <p className="text-gray-500 text-sm sm:text-base md:text-lg">
              Podcaster
            </p>
          </div>
          <div className="p-6 md:p-8 bg-[#262626] rounded-xl shadow-lg w-full sm:w-80 md:w-72 mx-4 transform transition duration-300 hover:scale-105 hover:shadow-2xl animate__animated animate__fadeIn animate__delay-4s">
            <p className="text-gray-400 text-sm sm:text-base md:text-lg">
              "A must-have for every music lover. Great interface and features!"
            </p>
            <h3 className="text-[#00ABE4] mt-4 text-lg sm:text-xl md:text-2xl font-bold">
              Michael Brown
            </h3>
            <p className="text-gray-500 text-sm sm:text-base md:text-lg">
              Tech Blogger
            </p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-[#262626] py-6 mt-12">
        <div className="text-center text-gray-400">
          <p>&copy; 2024 AudioAura. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Features;
