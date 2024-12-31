import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement, // Import ArcElement for Doughnut chart
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement, // Register ArcElement for Doughnut chart
  Title,
  Tooltip,
  Legend
);

const Graph = ({ albumCount, userCount, songCount, playlistCount }) => {
  // Example data for total albums, users, playlists, and songs in the system
  const systemData = [
    { name: "Albums", amount: albumCount },
    { name: "Users", amount: userCount },
    { name: "Songs", amount: songCount },
    { name: "Playlists", amount: playlistCount },
  ];

  // Aggregate user activity data
  const totalPlaylistsAdded = 5 + 3 + 2 + 4; // Sum of playlists added by all users
  const totalSongsListened = 20 + 25 + 15 + 30; // Sum of songs listened by all users

  // Calculate the average number of songs per playlist
  const averageSongsPerPlaylist = songCount / playlistCount;

  // Chart data for system items
  const systemChartData = {
    labels: systemData.map(item => item.name),
    datasets: [
      {
        label: 'Total Items in System',
        data: systemData.map(item => item.amount),
        backgroundColor: ['#3F4D66', '#FF6384', '#36A2EB', '#FFCE56'],
        borderColor: ['#3F4D66', '#FF6384', '#36A2EB', '#FFCE56'],
        borderWidth: 1,
      },
    ],
  };

  // Options for system items chart
  const systemOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Total Albums, Users, Songs, and Playlists',
      },
    },
  };

  // Doughnut chart data for user activity
  const userActivityChartData = {
    labels: ['Playlists Added', 'Songs Listened', 'Avg Songs per Playlist'], // Added average songs label
    datasets: [
      {
        label: 'User Activity',
        data: [totalPlaylistsAdded, totalSongsListened, averageSongsPerPlaylist], // Added the average
        backgroundColor: [
          'rgba(75, 192, 192, 0.5)',   // Light greenish-blue for Playlists Added
          'rgba(255, 159, 64, 0.5)',    // Light orange for Songs Listened
          'rgba(153, 102, 255, 0.5)',   // Light purple for Avg Songs per Playlist
          'rgba(255, 99, 132, 0.5)',    // Light pink for extra data (if needed)
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',     // Darker greenish-blue for Playlists Added
          'rgba(255, 159, 64, 1)',      // Darker orange for Songs Listened
          'rgba(153, 102, 255, 1)',     // Darker purple for Avg Songs per Playlist
          'rgba(255, 99, 132, 1)',      // Darker pink for extra data (if needed)
        ],
        borderWidth: 1,
      },
    ],
  };

  // Options for user activity doughnut chart
  const userActivityOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'User Activity Distribution: Playlists Added vs Songs Listened vs Avg Songs per Playlist',
      },
    },
  };

  return (
    <div className='flex flex-col md:flex-row justify-between w-full p-4'>
      <div className='flex-1 max-w-[600px] mx-auto p-2'>
        <Bar data={systemChartData} options={systemOptions} />
      </div>
      <div className='flex-1 max-w-[350px] mx-auto p-2'>
        <Doughnut data={userActivityChartData} options={userActivityOptions} />
      </div>
    </div>
  );
};

export default Graph;
