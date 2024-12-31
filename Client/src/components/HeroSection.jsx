import { useState, useEffect } from "react";
import HeroImg from "../assets/heroimg.jpg";
import { Link, useNavigate } from "react-router-dom";

const Hero = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
    setFadeIn(true);
  }, []);

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate("/spotify");
    } else {
      navigate("/login");
    }
  };

  return (
    <section
      className="relative h-screen flex items-center justify-center text-white bg-cover bg-center overflow-x-hidden"
      style={{ backgroundImage: `url(${HeroImg})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div
        className={`relative z-10 container mx-auto px-4 text-center transition-opacity duration-1000 ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeUp">
        Where Music Meets Magic
        </h1>
        <p className="text-lg md:text-2xl mb-6 animate-fadeUp delay-1s">
          Millions of songs. No credit card needed.
        </p>
        <div className="animate-fadeUp delay-2s">
        <button
  onClick={handleGetStarted}
  className="bg-[#00ABE4] text-white py-3 px-6 rounded-full font-semibold text-lg hover:bg-[#00ABE4] transition duration-300 
    sm:py-2 sm:px-4 sm:text-base md:py-3 md:px-6 md:text-lg lg:py-4 lg:px-8 lg:text-xl"
>
  Get AudioAura Free
</button>

        </div>
      </div>
      <section className="relative w-full h-screen flex items-center justify-center">
        <div className="absolute -top-10 left-20">
          <div className="bg-[#00ABE4] w-6 h-6 rounded-full animate-bounce"></div>
        </div>
        <div className="absolute -bottom-10 right-20">
          <div className="bg-pink-500 w-6 h-6 rounded-full animate-bounce"></div>
        </div>
        <div className="absolute -bottom-20 left-40">
          <div className="bg-blue-500 w-8 h-8 rounded-full animate-bounce"></div>
        </div>
        <div className="absolute -top-10 right-30">
          <div className="bg-[#00ABE4] w-6 h-6 rounded-full animate-bounce"></div>
        </div>
        <div className="absolute -top-40 right-60">
          <div className="bg-yellow-400 w-10 h-10 rounded-full animate-pulse"></div>
        </div>
        <div className="absolute bottom-10 left-10">
          <div className="bg-red-500 w-16 h-16 rounded-full animate-spin"></div>
        </div>
        <div className="absolute top-20 left-60">
          <div className="bg-purple-500 w-4 h-4 rounded-full animate-ping"></div>
        </div>
        <div className="absolute bottom-20 right-40">
          <div className="bg-blue-300 w-12 h-12 rounded-full animate-bounce delay-300"></div>
        </div>
        <div className="absolute -top-20 left-10">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 w-6 h-6 rounded-full animate-ping"></div>
        </div>
        <div className="absolute bottom-40 right-60">
          <div className="bg-[#00ABE4] w-14 h-14 rounded-full animate-pulse"></div>
        </div>
        <div className="absolute top-10 right-20">
          <div className="bg-pink-400 w-8 h-8 rounded-full animate-bounce delay-200"></div>
        </div>
        <div className="absolute bottom-30 left-70">
          <div className="bg-yellow-500 w-12 h-12 rounded-full animate-spin delay-500"></div>
        </div>
        <div className="absolute top-40 left-30">
          <div className="bg-red-400 w-6 h-6 rounded-full animate-bounce delay-700"></div>
        </div>
        <div className="absolute bottom-20 left-40">
          <div className="bg-blue-400 w-10 h-10 rounded-full animate-ping delay-800"></div>
        </div>
      </section>
    </section>
  );
};

export default Hero;




