import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: 'user',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      const { msg } = data;
      if (response.ok) {
        toast.success(msg, {
          style: {
            background: '#181818',
            color: '#00ABE4',
            fontWeight: 'bold',
          },
        });
        navigate('/login');
      } else {
        toast.error(msg, {
          style: {
            background: '#181818',
            color: '#FF0000',
            fontWeight: 'bold',
          },
        });
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong, please try again", {
        style: {
          background: '#181818',
          color: '#FF0000',
          fontWeight: 'bold',
        },
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#121212] text-white">
      <Toaster />
      <div className="bg-[#181818] shadow-xl rounded-lg p-8 w-full max-w-md">
        <h2 className="text-4xl font-bold mb-6 text-center text-white">Sign Up for Free</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="firstName" className="block text-sm font-medium text-white">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 bg-[#282828] text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00ABE4]"
                placeholder="First name"
                required
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="lastName" className="block text-sm font-medium text-white">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 bg-[#282828] text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00ABE4]"
                placeholder="Last name"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 bg-[#282828] text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00ABE4]"
              placeholder="Email address"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 bg-[#282828] text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00ABE4]"
              placeholder="Password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#00ABE4] hover:bg-[#00abe4e2] text-black font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00ABE4]"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-white">
          Already have an account?{' '}
          <Link to="/login" className="text-[#00ABE4] font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
