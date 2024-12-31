import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

// Utility function to parse JWT
const parseJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};

const Login = () => {
  const navigate = useNavigate();

  // State to manage form input
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the login API
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      const { success, token, msg } = data;

      if (success && token) {
        // Decode token to extract payload data
        const decodedToken = parseJwt(token);

        if (decodedToken) {
          const { role } = decodedToken;
          
          // Save the token and navigate based on role
          localStorage.setItem("token", token);

          toast.success(msg, {
            style: {
              background: "#00ABE4",
              color: "#121212",
            },
            iconTheme: {
              primary: "#121212",
              secondary: "#00ABE4",
            },
          });

          // Navigate after a short delay
          setTimeout(() => {
            if (role === "admin") {
              navigate("/admin");
            } else if (role === "user") {
              navigate("/spotify");
            }
          }, 1500);
        } else {
          throw new Error("Token decoding failed");
        }
      } else {
        // Show error message if login fails
        toast.error(msg || "Login failed. Please try again.", {
          style: {
            background: "#ff3b3b",
            color: "#ffffff",
          },
          iconTheme: {
            primary: "#ffffff",
            secondary: "#ff3b3b",
          },
        });
      }
    } catch (err) {
      // Handle unexpected errors
      console.error("Login error:", err);
      toast.error("Something went wrong. Please try again.", {
        style: {
          background: "#ff3b3b",
          color: "#ffffff",
        },
        iconTheme: {
          primary: "#ffffff",
          secondary: "#ff3b3b",
        },
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#121212] text-white">
      {/* Toast notification */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Login form container */}
      <div className="bg-[#181818] shadow-xl rounded-lg p-8 w-full max-w-md">
        <h2 className="text-4xl font-bold mb-6 text-center text-white">Login to Audio<span className="text-[#00ABE4]">Aura</span></h2>

        {/* Login form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 bg-[#282828] text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00ABE4]"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 bg-[#282828] text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00ABE4]"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit button */}
          <button
          id="loginButton"
            type="submit"
            className="w-full bg-[#00ABE4] text-black font-bold py-2 px-4 rounded-full hover:bg-[#00ABE4] focus:outline-none focus:ring-2 focus:ring-[#00ABE4]"
          >
            Login
          </button>
        </form>

        {/* Signup link */}
        <p className="text-center mt-6 text-sm text-white">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-[#00ABE4] font-semibold hover:text-white"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
