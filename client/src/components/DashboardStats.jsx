import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DashboardStats = () => {
  const [stats, setStats] = useState({
    totalPodcasts: 0,
    totalPlays: 0,
    totalLikes: 0,
    avgDuration: '0:00'
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://podstreamb.vercel.app/api/podcasts/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data && response.data.success) {
          const { totalPodcasts, totalPlays, totalLikes, avgDuration } = response.data.data;
          
          // Format average duration
          const minutes = Math.floor(avgDuration / 60);
          const seconds = Math.floor(avgDuration % 60);
          const formattedDuration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
          
          setStats({
            totalPodcasts,
            totalPlays,
            totalLikes,
            avgDuration: formattedDuration
          });
        }
      } catch (err) {
        console.error('Failed to fetch dashboard stats:', err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-gray-500 text-sm font-medium">Total Podcasts</h3>
        <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalPodcasts}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-gray-500 text-sm font-medium">Total Plays</h3>
        <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalPlays}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-gray-500 text-sm font-medium">Total Likes</h3>
        <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalLikes}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-gray-500 text-sm font-medium">Avg. Duration</h3>
        <p className="text-3xl font-bold text-gray-900 mt-2">{stats.avgDuration}</p>
      </div>
    </div>
  );
};

export default DashboardStats; 