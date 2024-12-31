import React from 'react';
import HomePageNav from './HomePageNav';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-[#0C0F14] to-[#1A1D23] text-white py-16 px-8 md:px-20">
      <HomePageNav />

      {/* Hero Section */}
      <section className="text-center mb-20 mt-14">
        <h1 className="text-5xl md:text-7xl font-extrabold text-[#00E6E3] tracking-wide">About AudioAura</h1>
        <p className="text-gray-400 text-lg md:text-2xl mt-6 max-w-3xl mx-auto leading-relaxed">
          Transforming the way you experience music with immersive, innovative, and unforgettable digital solutions.
        </p>
      </section>

      {/* Vision Section */}
      <section className="mb-20 relative">
  <div className="bg-[#23272E] p-12 rounded-lg shadow-2xl relative overflow-hidden group">
    <div className="absolute inset-0 bg-gradient-to-r from-[#00E6E3] via-transparent to-[#23272E] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
    <div className="absolute -top-16 -left-16 w-40 h-40 bg-[#00E6E3] rounded-full opacity-10 group-hover:animate-spin-slow"></div>
    <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-[#00E6E3] rounded-full opacity-10 group-hover:animate-spin-slow"></div>
    <h2 className="text-4xl font-bold text-[#00E6E3] text-center mb-8 relative z-10">Our Vision</h2>
    <p className="text-gray-300 text-lg leading-relaxed text-center relative z-10">
      At AudioAura, we envision a world where music transcends boundaries, creating connections and unforgettable memories. 
      Our mission is to empower artists and listeners by delivering seamless and personalized experiences.
    </p>
  </div>
</section>


      {/* Team Section */}
      <section className="mb-20">
        <h2 className="text-4xl font-bold text-[#00E6E3] text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[{
            name: 'Muhammad Zubair',
            img: assets.my_pic,
            role: 'Full Stack Developer',
            description: 'Crafting seamless user interfaces and powerful backend solutions for an unmatched digital experience.',
          }, {
            name: 'Ameer Hamza',
            img: assets.Hamza_pic,
            role: 'Backend Developer',
            description: 'Architecting robust backend systems to ensure scalability and security across platforms.',
          }].map((developer, index) => (
            <div key={index} className="bg-[#1C2027] p-10 rounded-lg shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl">
              <img
                src={developer.img}
                alt={developer.name}
                className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-[#00E6E3]"
              />
              <h3 className="text-2xl font-semibold text-[#00E6E3] mb-2">{developer.name}</h3>
              <p className="text-sm text-gray-400 italic mb-4">{developer.role}</p>
              <p className="text-gray-300 leading-relaxed">{developer.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Expertise Section */}
      <section className="mb-20">
        <h2 className="text-4xl font-bold text-[#00E6E3] text-center mb-12">Our Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {['Frontend Development', 'Backend Development', 'Audio Engineering'].map((skill, index) => (
            <div key={index} className="bg-[#1C2027] p-10 rounded-lg shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl">
              <h4 className="text-2xl font-bold text-[#00E6E3] mb-4">{skill}</h4>
              <p className="text-gray-300">
                {index === 0
                  ? 'Designing intuitive, responsive user interfaces using React, Tailwind CSS, and modern frameworks.'
                  : index === 1
                  ? 'Building secure and scalable backend architectures using Node.js, Express, and APIs.'
                  : 'Enhancing audio quality and integrating advanced sound processing for immersive experiences.'}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center mb-20">
        <div className="bg-[#2C3139] p-12 rounded-lg shadow-2xl">
          <h2 className="text-4xl font-bold text-[#00E6E3] mb-6">Collaborate with Us</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            Are you ready to redefine the way the world hears music? Join hands with AudioAura and let’s create something extraordinary together.
          </p>
          <button
            className="bg-[#00E6E3] text-[#0C0F14] px-8 py-4 rounded-lg font-semibold shadow-md hover:bg-[#00CFCB] transition"
            onClick={() => navigate('/contact')}
          >
            Contact Us
          </button>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="text-center text-gray-400 mt-20">
        <p>© {new Date().getFullYear()} AudioAura. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default About;
