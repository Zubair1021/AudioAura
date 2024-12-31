import { useState, useEffect,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import AlbumsContext from "../context/AlbumsContext";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const [isScrolled, setIsScrolled] = useState(false); // State for scroll effect
  const navigate = useNavigate();
 const {sethistorySongs} = useContext(AlbumsContext);

  // Handle login state
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Scroll effect to change navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    setIsLoading(true); // Set loading to true
    setTimeout(() => {
      localStorage.removeItem("token");
      sethistorySongs([]);
      setIsLoggedIn(false);
      navigate("/"); // Redirect after 3 seconds
    }, 3000); // Simulate a 3-second wait
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-lg transition-all duration-300 ${
        isScrolled ? "bg-gray-800/70 shadow-lg" : "bg-gray-800"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo with Text */}
        <div className="flex items-center space-x-2 md:space-x-3 text-white text-lg font-bold">
          <img
            src='./src/assets/AudioAura-white.png' 
            alt="AudioAura Logo"
            className="h-[50px] w-[50px] md:h-[65px] md:w-[65px] object-contain rounded-md shadow-lg hover:scale-105 transition-transform duration-300 filter brightness-125 contrast-110 saturate-150"
          />
          <h1 className="text-[#00ABE4] text-3xl md:text-5xl">AudioAura</h1>
        </div>



        {/* Desktop Menu */}
        <div className="hidden text-xl font-bold md:flex space-x-10 items-center">
          <Link
            to="/"
            className={`hover:text-gray-400 transition ${
              isScrolled ? "text-white" : "text-gray-300"
            }`}
          >
            Home
          </Link>
          <Link
            to="/features"
            className={`hover:text-gray-400 transition ${
              isScrolled ? "text-white" : "text-gray-300"
            }`}
          >
            Features
          </Link>
          <Link
            to="/about"
            className={`hover:text-gray-400 transition ${
              isScrolled ? "text-white" : "text-gray-300"
            }`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`hover:text-gray-400 transition ${
              isScrolled ? "text-white" : "text-gray-300"
            }`}
          >
            Contact
          </Link>

          {!isLoggedIn ? (
            <Link to="/login">
              <button className="bg-[#00ABE4] text-white py-2 px-6 rounded-full font-semibold text-lg hover:bg-[#00abe4d2] transition duration-300">
                Login
              </button>
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-[#00ABE4] text-white py-2 px-6 rounded-full font-semibold text-lg hover:bg-[#00abe4d2] transition duration-300"
            >
              {isLoading ? "Logging out..." : "Logout"}
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden transition-all duration-300 ${
          isOpen ? "max-h-screen" : "max-h-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col space-y-4 mt-4 text-center">
          <Link
            to="/"
            className={`hover:text-gray-400 transition ${
              isScrolled ? "text-white" : "text-gray-300"
            }`}
          >
            Home
          </Link>
          <Link
            to="/features"
            className={`hover:text-gray-400 transition ${
              isScrolled ? "text-white" : "text-gray-300"
            }`}
          >
            Features
          </Link>
          <Link
            to="/contact"
            className={`hover:text-gray-400 transition ${
              isScrolled ? "text-white" : "text-gray-300"
            }`}
          >
            Contact
          </Link>
          {!isLoggedIn ? (
            <Link to="/login">
              <button className="bg-[#00ABE4] text-white py-2 px-6 rounded-full font-semibold text-lg hover:bg-[#00abe4d2] transition duration-300">
                Login
              </button>
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-[#00ABE4] text-white py-2 px-6 rounded-full font-semibold text-lg hover:bg-[#00abe4d2] transition duration-300"
            >
              {isLoading ? "Logging out..." : "Logout"}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
