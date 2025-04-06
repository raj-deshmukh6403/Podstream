import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { FaMicrophone, FaPlay, FaHeart, FaClock } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import PodcastCard from '../components/PodcastCard';
import Layout from '../components/Layout';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalPodcasts: 0,
    totalPlays: 0,
    totalLikes: 0,
    avgDuration: 0
  });
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        setPodcasts([]);
        setStats({
          totalPodcasts: 0,
          totalPlays: 0,
          totalLikes: 0,
          avgDuration: 0
        });

        if (!user?._id) {
          throw new Error('Authentication required');
        }

        // Fetch user's podcasts and stats
        const [podcastsResponse, statsResponse] = await Promise.all([
          api.get('/podcasts/user'),
          api.get('/podcasts/stats')
        ]);

        if (podcastsResponse.data.success && statsResponse.data.success) {
          setPodcasts(podcastsResponse.data.data || []);
          setStats(statsResponse.data.data || {
            totalPodcasts: 0,
            totalPlays: 0,
            totalLikes: 0,
            avgDuration: 0
          });
        } else {
          throw new Error('Failed to fetch dashboard data');
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data');
        toast.error('Failed to load dashboard data. Please try logging in again.');
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchDashboardData();
    }
  }, [user?._id]); // Only re-run when user ID changes

  const handleDelete = async (podcastId) => {
    if (!window.confirm('Are you sure you want to delete this podcast?')) return;

    try {
      await api.delete(`/podcasts/${podcastId}`);
      setPodcasts(prev => prev.filter(podcast => podcast._id !== podcastId));
      toast.success('Podcast deleted successfully');
    } catch (err) {
      console.error('Failed to delete podcast:', err);
      toast.error('Failed to delete podcast');
    }
  };

  const handleLike = async (podcastId, isLiked) => {
    // Update the local state to reflect the like/unlike
    setPodcasts(prevPodcasts => 
      prevPodcasts.map(podcast => {
        if (podcast._id === podcastId) {
          return {
            ...podcast,
            likes: isLiked 
              ? [...podcast.likes, user._id]
              : podcast.likes.filter(id => id !== user._id)
          };
        }
        return podcast;
      })
    );
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Login</h2>
          <p className="text-gray-600 mb-4">You need to be logged in to view your dashboard</p>
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-300"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
  
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8" key={user?._id}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Creator Dashboard</h1>
            <Link
              to="/create"
              className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300 flex items-center space-x-2"
            >
              <FaMicrophone />
              <span>Create New Podcast</span>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-2xl shadow-md p-6 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <FaMicrophone className="text-blue-600 text-xl" />
                </div>
                <span className="text-sm font-medium text-blue-600">Total Podcasts</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{stats.totalPodcasts}</div>
              <div className="mt-2 text-sm text-gray-500">Episodes created</div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <FaPlay className="text-green-600 text-xl" />
                </div>
                <span className="text-sm font-medium text-green-600">Total Plays</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{stats.totalPlays}</div>
              <div className="mt-2 text-sm text-gray-500">Times played</div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <FaHeart className="text-red-600 text-xl" />
                </div>
                <span className="text-sm font-medium text-red-600">Total Likes</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{stats.totalLikes}</div>
              <div className="mt-2 text-sm text-gray-500">Engagement received</div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <FaClock className="text-purple-600 text-xl" />
                </div>
                <span className="text-sm font-medium text-purple-600">Avg. Duration</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {Math.floor(stats.avgDuration / 60)}:{String(Math.floor(stats.avgDuration % 60)).padStart(2, '0')}
              </div>
              <div className="mt-2 text-sm text-gray-500">Minutes per episode</div>
            </div>
          </div>

          {/* My Podcasts Section */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">My Podcasts</h2>
              <div className="text-sm text-gray-500">{podcasts.length} episodes</div>
            </div>

            {podcasts.length === 0 ? (
              <div className="text-center py-12">
                <FaMicrophone className="mx-auto text-4xl text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Podcasts Yet</h3>
                <p className="text-gray-500 mb-6">Start creating your first podcast today!</p>
                <Link
                  to="/create"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
                >
                  Create Your First Podcast
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {podcasts.map((podcast) => (
                  <div key={podcast._id} className="relative">
                    <PodcastCard 
                      podcast={podcast} 
                      onLike={handleLike}
                    />
                    <div className="absolute top-4 right-4 z-10 flex space-x-2">
                      <Link
                        to={`/podcast/edit/${podcast._id}`}
                        className="bg-white text-blue-500 hover:text-blue-600 p-2 rounded-full shadow-md transition-colors duration-300"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </Link>
                      <button
                        onClick={() => handleDelete(podcast._id)}
                        className="bg-white text-red-500 hover:text-red-600 p-2 rounded-full shadow-md transition-colors duration-300"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
   
  );
};

export default Dashboard;