import React from 'react';

const MusicPage = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between p-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      {/* Left Section */}
      <div className="flex-1 mb-6 md:mr-8 bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          DISCOVER JAM HOT, <br />
          <span className="text-red-600">THE UK's Hottest Music Band</span>
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          Get ready to experience the ultimate party vibe! Jam Hot is here to bring your favorite songs to life, making every moment unforgettable.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          With a repertoire that spans multiple genres, our band ensures a lively atmosphere that keeps the dance floor packed all night long!
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Our dynamic performances and engaging stage presence guarantee an electric atmosphere for every event.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mt-6">"UNMATCHED ENERGY, UNFORGETTABLE MOMENTS"</h2>
        <a href="#" className="mt-4 inline-block bg-red-600 text-white font-semibold rounded-lg px-4 py-2 hover:bg-red-700 transition duration-200">
          LISTEN NOW
        </a>
      </div>

      {/* Center Section (Video) */}
      <div className="flex-1 mb-6">
        <div className="relative">
          <iframe
            className="w-full h-64 md:h-96 rounded-lg shadow-lg"
            src="https://youtu.be/diK0K9UfsLU?si=pQYp4F7Hvpp4UEk6" // Replace with your video link
            title="Band Performance"
            allowFullScreen
          ></iframe>
          <div className="absolute inset-0 flex justify-center items-center">
            <button className="bg-white rounded-full p-4 shadow-lg hover:shadow-xl transition duration-200">
              <svg className="w-10 h-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.752-2.16v4.416l3.752-2.16zm0 0l-3.752 2.16L8 11.168m6.752 0L8 8.008m6.752 3.16l3.752-2.16 3.752 2.16v4.416l-3.752-2.16z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Right Section (Songs/Artists) */}
      <div className="flex-1 mb-6 md:ml-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Featured Songs</h2>
        <ul className="list-disc pl-5 mb-4">
          {['Hit Song 1', 'Hit Song 2', 'Hit Song 3', 'Hit Song 4'].map((song) => (
            <li key={song} className="text-lg text-gray-700 mb-2">
              {song}
            </li>
          ))}
        </ul>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Performed At:</h2>
        <div className="flex flex-wrap">
          {['Marriott', 'Rosewood', 'The ICC', 'Savoy', 'NEC', 'Sheraton'].map((venue) => (
            <span key={venue} className="mr-6 mb-2 bg-gray-200 rounded-full px-3 py-1 text-gray-800">
              {venue}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
