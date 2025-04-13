import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import PodcastCard from '../components/PodcastCard';
import axios from 'axios';
import { FiTrendingUp, FiClock, FiHeart } from 'react-icons/fi';

const Home = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sort, setSort] = useState('newest');
  const { user } = useAuth();

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/podcasts');
        console.log('API Response:', response.data); 
        
        if (response.data && response.data.success) {
          setPodcasts(response.data.data || []);
        } else {
          setPodcasts([]);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching podcasts:', err.response || err);
        setError('Failed to load podcasts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  const filteredPodcasts = podcasts
    .filter(
      (podcast) =>
        (!selectedCategory || podcast.category?._id === selectedCategory) &&
        (!searchTerm ||
          podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          podcast.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sort === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sort === 'popular') return (b.plays || 0) - (a.plays || 0);
      if (sort === 'liked') return (b.likes?.length || 0) - (a.likes?.length || 0);
      return 0;
    });

  const sortOptions = [
    { value: 'newest', label: 'Newest', icon: <FiClock /> },
    { value: 'popular', label: 'Most Popular', icon: <FiTrendingUp /> },
    { value: 'liked', label: 'Most Liked', icon: <FiHeart /> },
  ];

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold mb-2">Oops! Something went wrong</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Discover Amazing Podcasts
            </h1>
            <p className="text-lg md:text-xl text-gray-100">
              Listen to the best podcasts from creators around the world. Find your next favorite show.
            </p>
            {user ? (
              <Link
                to="/podcast/create"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Start Your Podcast
              </Link>
            ) : (
              <Link
                to="/register"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Join Now
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-grow">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </div>
          <div className="flex flex-wrap gap-2">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSort(option.value)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  sort === option.value
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {option.icon}
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
        </div>
      </section>

      {/* Podcasts Grid */}
      <section>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm p-4 animate-pulse h-[300px]"
              >
                <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : filteredPodcasts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPodcasts.map((podcast) => (
              <PodcastCard key={podcast._id} podcast={podcast} canPlay={!!user} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl text-gray-600 mb-2">No podcasts found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;