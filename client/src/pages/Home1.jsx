import React, { useEffect, useState, useRef } from 'react';
import { LineChart, AreaChart, BarChart, PieChart, Pie, Line, Bar, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { FaPlay, FaPause } from "react-icons/fa";
import NewsletterSection from '../pages/NewsletterSection';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTopChart, setActiveTopChart] = useState('trending');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const [showExploreModal, setShowExploreModal] = useState(false);
  const [activePage, setActivePage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying1, setIsPlaying1] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchPodcast = async () => {
      try {
        const response = await axios.get(
          "https://podstreamb.vercel.app/api/podcasts/randompodcast"
        );
        setPodcast(response.data.data);
        console.log(response);
      } catch (err) {
        console.log("error");
      } finally {
        setLoading(false);
      }
    };

    fetchPodcast();
  }, []);

  const togglePlay1 = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying1) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying1(!isPlaying1);
  };
  

  const navigate = useNavigate();

  const requireAuth = () => {
    window.scrollTo(0, 0); // scroll to top
    navigate('/login');
  };
  
  const registeraccount = () => {
    window.scrollTo(0, 0); // scroll to top
    navigate('/register');
  };
  

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0); // instant scroll to top, no animation
  }, []);  
  


  // Featured podcasts data
  const featuredPodcasts = [
    { id: 1, title: 'Tech Today', host: 'Alex Johnson', category: 'Technology', image: '/images/image/techtoday.jpeg', episodes: 124, listeners: '1.2M' },
    { id: 2, title: 'Mindful Moments', host: 'Sarah Chen', category: 'Wellness', image: '/images/image/mindmoments.jpeg', episodes: 87, listeners: '890K' },
    { id: 3, title: 'Business Insights', host: 'Michael Roberts', category: 'Business', image: '/images/image/business.jpeg', episodes: 56, listeners: '670K' },
    { id: 4, title: 'History Untold', host: 'Emma Williams', category: 'Education', image: '/images/image/history.jpeg', episodes: 42, listeners: '510K' },
    { id: 5, title: 'Comedy Hour', host: 'Dave Miller', category: 'Entertainment', image: '/images/image/comedy.jpeg', episodes: 210, listeners: '2.5M' },
    { id: 6, title: 'True Crime Stories', host: 'Rachel Thompson', category: 'Crime', image: '/images/image/crime.jpeg', episodes: 67, listeners: '950K' }
  ];

  // Top categories
  const categories = [
    { name: 'Technology', icon: '💻', color: 'bg-blue-600' },
    { name: 'Wellness', icon: '🧘', color: 'bg-blue-500' },
    { name: 'Business', icon: '📊', color: 'bg-blue-700' },
    { name: 'Education', icon: '📚', color: 'bg-blue-400' },
    { name: 'Entertainment', icon: '🎭', color: 'bg-blue-800' },
    { name: 'Crime', icon: '🔍', color: 'bg-blue-900' },
    { name: 'Science', icon: '🔬', color: 'bg-blue-300' },
    { name: 'Politics', icon: '🏛️', color: 'bg-blue-600' }
  ];

  // Recent episodes
  const recentEpisodes = [
    { id: 101, title: 'The Future of AI', podcast: 'Tech Today', duration: '45:21', date: 'Today' },
    { id: 102, title: 'Morning Meditation Techniques', podcast: 'Mindful Moments', duration: '22:15', date: 'Yesterday' },
    { id: 103, title: 'Investment Strategies for 2025', podcast: 'Business Insights', duration: '56:40', date: '2 days ago' },
    { id: 104, title: 'Lost Civilizations of Mesoamerica', podcast: 'History Untold', duration: '37:18', date: '3 days ago' },
    { id: 105, title: 'Stand-up Special with Dave', podcast: 'Comedy Hour', duration: '62:30', date: '4 days ago' }
  ];

  // Top charts data
  const chartData = {
    trending: [
      { rank: 1, title: 'Tech Today', change: 'up', plays: '234K' },
      { rank: 2, title: 'True Crime Stories', change: 'same', plays: '189K' },
      { rank: 3, title: 'Comedy Hour', change: 'up', plays: '175K' },
      { rank: 4, title: 'Business Insights', change: 'down', plays: '132K' },
      { rank: 5, title: 'Mindful Moments', change: 'up', plays: '112K' }
    ],
    popular: [
      { rank: 1, title: 'Comedy Hour', change: 'up', plays: '287K' },
      { rank: 2, title: 'True Crime Stories', change: 'up', plays: '254K' },
      { rank: 3, title: 'Tech Today', change: 'down', plays: '203K' },
      { rank: 4, title: 'Science Weekly', change: 'same', plays: '176K' },
      { rank: 5, title: 'History Untold', change: 'up', plays: '142K' }
    ],
    rising: [
      { rank: 1, title: 'AI Revolution', change: 'up', plays: '89K' },
      { rank: 2, title: 'Financial Freedom', change: 'up', plays: '76K' },
      { rank: 3, title: 'Crypto Talk', change: 'up', plays: '58K' },
      { rank: 4, title: 'Wellness Journey', change: 'up', plays: '42K' },
      { rank: 5, title: 'Future Tech', change: 'up', plays: '39K' }
    ]
  };

  // Listener statistics
  const listenerStats = [
    { month: 'Jan', listeners: 250 },
    { month: 'Feb', listeners: 320 },
    { month: 'Mar', listeners: 380 },
    { month: 'Apr', listeners: 420 },
    { month: 'May', listeners: 520 },
    { month: 'Jun', listeners: 590 },
    { month: 'Jul', listeners: 640 },
    { month: 'Aug', listeners: 710 },
    { month: 'Sep', listeners: 790 },
    { month: 'Oct', listeners: 880 },
    { month: 'Nov', listeners: 940 },
    { month: 'Dec', listeners: 1020 }
  ];

  // User demographics
  const demographics = [
    { age: '18-24', percentage: 22 },
    { age: '25-34', percentage: 38 },
    { age: '35-44', percentage: 20 },
    { age: '45-54', percentage: 12 },
    { age: '55+', percentage: 8 }
  ];

  // For creators section
  const creatorStats = [
    { name: 'Subscribers', value: 32500, icon: '👥', color: 'bg-blue-500' },
    { name: 'Revenue', value: '₹4,250', icon: '💰', color: 'bg-blue-600' },
    { name: 'Rating', value: '4.8/5', icon: '⭐', color: 'bg-blue-700' },
    { name: 'Downloads', value: '185K', icon: '📥', color: 'bg-blue-800' }
  ];

  // Popular tags
  const popularTags = [
    { name: 'AI', count: 458 },
    { name: 'Personal Growth', count: 342 },
    { name: 'Finance', count: 289 },
    { name: 'Health', count: 276 },
    { name: 'Comedy', count: 254 },
    { name: 'True Crime', count: 231 },
    { name: 'News', count: 218 },
    { name: 'Education', count: 205 },
    { name: 'Technology', count: 197 },
    { name: 'Business', count: 186 },
    { name: 'Science', count: 173 },
    { name: 'History', count: 165 }
  ];

  // Testimonials
  const testimonials = [
    {
      id: 1,
      name: 'Jessica K.',
      role: 'Daily Commuter',
      text: 'PodStream has completely transformed my daily commute. The recommendations are spot on, and I discover new shows I love every week!',
      avatar: '/images/image/jessica.jpeg'
    },
    {
      id: 2,
      name: 'Marcus T.',
      role: 'Podcast Creator',
      text: 'As a creator, the analytics and audience insights have been invaluable. My subscriber count has doubled since joining PodStream.',
      avatar: '/images/image/Marcus.jpeg'
    },
    {
      id: 3,
      name: 'Elena R.',
      role: 'Fitness Enthusiast',
      text: 'I love having all my wellness and fitness podcasts in one place. The offline download feature is perfect for my gym sessions.',
      avatar: '/images/image/Elena.jpeg'
    }
  ];

  // Device usage data
  const deviceUsage = [
    { name: 'Mobile', value: 65 },
    { name: 'Desktop', value: 20 },
    { name: 'Tablet', value: 10 },
    { name: 'Smart Speaker', value: 5 }
  ];


  return (
    <div className="min-h-screen bg-blue-50 text-blue-900 pb-20">
      
      {/* Hero Section */}
      <div className="pt-8 pb-12 bg-gradient-to-br from-blue-500 to-blue-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="md:flex items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">Discover Your Next Favorite Podcast</h1>
              <p className="text-lg md:text-xl mb-8 text-blue-100">Stream thousands of podcasts on any device, anytime, anywhere.</p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button 
                  className="bg-white text-blue-700 px-8 py-3 rounded-full font-bold hover:bg-blue-100 transition"
                  onClick={() => setShowExploreModal(true)}
                >
                  Start Listening
                </button>
                <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition"
                onClick={registeraccount}>
                  Create Account
                </button>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-10">
              <img src="/images/image/podcast.jpeg" alt="Podcast Illustration" className="rounded-lg shadow-2xl" />
            </div>
          </div>
        </div>
      </div>

     {/* sample podcast */}
     {loading ? (
        <div className="flex items-center justify-center h-64 bg-gray-100">
          <div className="text-center">
            {/* Music Bar Loader */}
            <div className="flex items-end justify-center gap-1 h-20">
              <div className="w-2 bg-blue-500 animate-bar1 rounded-sm" />
              <div className="w-2 bg-blue-500 animate-bar2 rounded-sm" />
              <div className="w-2 bg-blue-500 animate-bar3 rounded-sm" />
            </div>
            <h2 className="mt-4 text-lg font-medium text-blue-800">Loading Podcast Details...</h2>
          </div>
        </div>
      ) : (

        <section className="w-full bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-6 md:px-16">
        {/* Sample Indicator Banner */}
        <div className="max-w-7xl mx-auto mb-4">
          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-3 rounded flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Sample Podcast: This is a demo to test the podcast experience.</span>
          </div>
        </div>
      
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 items-center">
          {/* Left Side - Info */}
          <div className="md:w-1/2 space-y-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                🎧 Discover New Voices
              </h1>
              <p className="text-lg text-gray-600">
                Dive into amazing podcasts from creators around the world.
              </p>
              <p className="text-sm bg-yellow-100 text-yellow-800 inline-block px-3 py-1 rounded-full mt-2">
                Sample Content
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
              <div className="flex items-center space-x-2">
                <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                  </svg>
                </span>
                <p className="font-medium text-gray-800">
                  <span className="text-gray-500">Category:</span> {podcast.category?.name}
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </span>
                <p className="font-medium text-gray-800">
                  <span className="text-gray-500">Creator:</span> {podcast.creator?.username}
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                  </svg>
                </span>
                <p className="font-medium text-gray-800">
                  <span className="text-gray-500">Seasons:</span> {podcast.seasons} &nbsp; | &nbsp; 
                  <span className="text-gray-500">Episode:</span> {podcast.episode}
                </p>
              </div>
              
              {/* Likes */}
              <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
                <span className="bg-red-50 text-red-500 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </span>
                <p className="ml-2 font-medium text-gray-700">
                  {podcast.likes?.length || 0} Likes
                </p>
              </div>
            </div>
          </div>
      
          {/* Right Side - Image + Audio */}
          <div className="md:w-1/2 relative group">
            {/* Sample badge */}
            <div className="absolute top-4 right-4 z-10 bg-yellow-500 text-white px-3 py-1 rounded-full font-bold text-sm shadow-md">
              SAMPLE
            </div>
            
            <div className="relative w-full rounded-xl overflow-hidden shadow-2xl transform transition-all duration-300 group-hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <img
                src={podcast.coverImage?.url}
                alt="Sample Podcast Cover"
                className="w-full max-h-[420px] object-cover rounded-xl"
              />
      
              {/* Audio Play Button */}
              <div className="absolute inset-0 flex justify-center items-center">
                {podcast.audioFile?.url && (
                  <>
                    <audio ref={audioRef} src={podcast.audioFile.url} />
                    <button
                      className="bg-white bg-opacity-90 p-6 rounded-full shadow-xl transform transition-all duration-300 group-hover:scale-110 hover:bg-opacity-100 focus:outline-none focus:ring-4 focus:ring-blue-300"
                      onClick={togglePlay1}
                    >
                      {isPlaying1 ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  </>
                )}
              </div>
              
              {/* Info overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="text-white">
                  <p className="text-sm font-medium opacity-80">Sample audio for testing</p>
                  <p className="text-lg font-bold">{podcast.category?.name}</p>
                </div>
              </div>
            </div>
            
            {/* Test audio message */}
            <div className="mt-3 bg-blue-50 p-3 rounded-lg text-center text-blue-800 text-sm">
              Click the play button to test audio playback functionality
            </div>
          </div>
        </div>
      </section>
    )}

      {/* Featured Podcasts */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Podcasts</h2>
            <a href="#" className="text-blue-600 hover:underline">View All</a>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {featuredPodcasts.map(podcast => (
              <div key={podcast.id} className="bg-white rounded-lg overflow-hidden hover:bg-blue-50 transition cursor-pointer shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-200">
                <div className="relative">
                  <img src={podcast.image} alt={podcast.title} className="w-full aspect-square object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <button className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-blue-600 transition"
                    onClick={requireAuth}>
                      ▶
                    </button>
                  </div>
                  <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    {podcast.category}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg truncate">{podcast.title}</h3>
                  <p className="text-blue-600 text-sm">{podcast.host}</p>
                  <div className="mt-2 flex justify-between text-xs text-blue-500">
                    <span>{podcast.episodes} episodes</span>
                    <span>{podcast.listeners} listeners</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Browse Categories</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <div 
                key={index} 
                className={`${category.color} rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:opacity-90 transition text-white transform hover:-translate-y-1 hover:shadow-lg duration-200`}
              >
                <span className="text-4xl mb-3">{category.icon}</span>
                <h3 className="font-bold">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Tags */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Popular Tags</h2>
          
          <div className="flex flex-wrap gap-3">
            {popularTags.map((tag, index) => (
              <div 
                key={index}
                className="bg-white px-4 py-2 rounded-full text-blue-600 shadow-sm hover:shadow hover:bg-blue-50 transition cursor-pointer text-sm"
              >
                #{tag.name}
                <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                  {tag.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Episodes */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Recent Episodes</h2>
            <a href="#" className="text-blue-600 hover:underline">View All</a>
          </div>
          
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            {recentEpisodes.map((episode, index) => (
              <div 
                key={episode.id} 
                className={`p-4 flex items-center justify-between hover:bg-blue-50 cursor-pointer ${index !== recentEpisodes.length - 1 ? 'border-b border-blue-100' : ''}`}
              >
                <div className="flex items-center">
                  <div className="mr-4 bg-blue-100 rounded-lg w-12 h-12 flex items-center justify-center hover:bg-blue-200 transition">
                    <span className="text-blue-600 text-xl">▶</span>
                  </div>
                  <div>
                    <h3 className="font-medium">{episode.title}</h3>
                    <p className="text-sm text-blue-600">{episode.podcast}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm text-blue-500">{episode.duration}</span>
                  <p className="text-xs text-blue-400">{episode.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Charts Section */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Top Charts</h2>
          
          <div className="flex mb-6 border-b border-blue-100">
            <button 
              className={`px-6 py-3 font-medium ${activeTopChart === 'trending' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-blue-400'}`}
              onClick={() => setActiveTopChart('trending')}
            >
              Trending
            </button>
            <button 
              className={`px-6 py-3 font-medium ${activeTopChart === 'popular' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-blue-400'}`}
              onClick={() => setActiveTopChart('popular')}
            >
              Most Popular
            </button>
            <button 
              className={`px-6 py-3 font-medium ${activeTopChart === 'rising' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-blue-400'}`}
              onClick={() => setActiveTopChart('rising')}
            >
              Rising Stars
            </button>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-6">
            {chartData[activeTopChart].map((item) => (
              <div key={item.rank} className="flex items-center mb-4 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition cursor-pointer">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                  {item.rank}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.title}</h3>
                </div>
                <div className="mr-4">
                  <span className={`text-sm ${
                    item.change === 'up' ? 'text-green-500' : 
                    item.change === 'down' ? 'text-red-500' : 'text-blue-400'
                  }`}>
                    {item.change === 'up' ? '↑' : item.change === 'down' ? '↓' : '–'}
                  </span>
                </div>
                <div className="text-blue-500 font-medium">
                  {item.plays}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1 duration-200">
              <h3 className="text-blue-600 text-4xl font-bold mb-2">10K+</h3>
              <p className="text-blue-400">Podcasts</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1 duration-200">
              <h3 className="text-blue-600 text-4xl font-bold mb-2">500K+</h3>
              <p className="text-blue-400">Episodes</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1 duration-200">
              <h3 className="text-blue-600 text-4xl font-bold mb-2">5M+</h3>
              <p className="text-blue-400">Listeners</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1 duration-200">
              <h3 className="text-blue-600 text-4xl font-bold mb-2">150+</h3>
              <p className="text-blue-400">Countries</p>
            </div>
          </div>
        </div>
      </section>

      {/* Listener Growth Chart */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Platform Growth</h2>
          
          <div className="bg-blue-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Monthly Active Listeners (in thousands)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={listenerStats} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorListeners" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area type="monotone" dataKey="listeners" stroke="#3B82F6" fillOpacity={1} fill="url(#colorListeners)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* User Demographics */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Audience Demographics</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-6">Age Distribution</h3>
              <div className="space-y-4">
                {demographics.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.age}</span>
                      <span className="text-blue-600 font-medium">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-blue-100 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000 ease-out" 
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-6">Device Usage</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deviceUsage}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {deviceUsage.map((entry, index) => (
                        <Pie key={`cell-${index}`} fill={index === 0 ? "#3B82F6" : index === 1 ? "#1D4ED8" : index === 2 ? "#60A5FA" : "#93C5FD"} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">What Our Users Say</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="bg-blue-50 p-6 rounded-lg shadow-md relative">
                <div className="absolute -top-4 left-6 text-4xl text-blue-300">"</div>
                <p className="mb-4 text-blue-800 relative z-10">{testimonial.text}</p>
                <div className="flex items-center mt-6">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full" />
                  <div className="ml-3">
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-blue-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Categories Distribution */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Content Distribution</h2>
          
          <div className="bg-blue-50 p-6 rounded-lg shadow-md">
            <div className="md:flex">
              <div className="md:w-1/2 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Technology', value: 25 },
                        { name: 'Entertainment', value: 20 },
                        { name: 'Business', value: 15 },
                        { name: 'Education', value: 12 },
                        { name: 'Wellness', value: 10 },
                        { name: 'Other', value: 18 }
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      <Pie fill="#3B82F6" />
                      <Pie fill="#2563EB" />
                      <Pie fill="#1D4ED8" />
                      <Pie fill="#BFDBFE" />
                      <Pie fill="#60A5FA" />
                      <Pie fill="#93C5FD" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
                <h3 className="font-semibold mb-4">Podcast Categories</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 mr-2"></div>
                    <span className="text-sm">Technology (25%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-600 mr-2"></div>
                    <span className="text-sm">Entertainment (20%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-700 mr-2"></div>
                    <span className="text-sm">Business (15%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-100 mr-2"></div>
                    <span className="text-sm">Education (12%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-400 mr-2"></div>
                    <span className="text-sm">Wellness (10%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-300 mr-2"></div>
                    <span className="text-sm">Other (18%)</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Key Insights:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Technology and entertainment content lead in popularity</li>
                    <li>• Business and education content growing steadily</li>
                    <li>• Wellness podcasts increasing at 15% monthly</li>
                    <li>• Specialized niche content represents expanding interests</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Podcast Creators */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="md:flex items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">For Podcast Creators</h2>
              <p className="text-lg mb-6">Grow your audience and monetize your content with our creator tools.</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                {creatorStats.map((stat, index) => (
                  <div key={index} className={`${stat.color} text-white p-4 rounded-lg`}>
                    <span className="text-2xl">{stat.icon}</span>
                    <h3 className="text-xl font-bold mt-2">{stat.value}</h3>
                    <p className="text-sm opacity-80">{stat.name}</p>
                  </div>
                ))}
              </div>
              
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
              onClick={requireAuth}>
                Join Creator Program
              </button>
            </div>
            
            <div className="md:w-1/2 md:pl-10">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="font-bold text-xl mb-4">Creator Tools</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-md text-blue-600 mr-3">📊</div>
                    <div>
                      <h4 className="font-medium">Analytics Dashboard</h4>
                      <p className="text-sm text-blue-700">Detailed insights on listener demographics and engagement</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-md text-blue-600 mr-3">💰</div>
                    <div>
                      <h4 className="font-medium">Monetization Options</h4>
                      <p className="text-sm text-blue-700">Subscriptions, sponsorships, and direct listener support</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-md text-blue-600 mr-3">🎙️</div>
                    <div>
                      <h4 className="font-medium">Recording Studio</h4>
                      <p className="text-sm text-blue-700">Professional-grade tools for high-quality production</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-md text-blue-600 mr-3">🔊</div>
                    <div>
                      <h4 className="font-medium">Distribution Network</h4>
                      <p className="text-sm text-blue-700">Reach millions of listeners across all major platforms</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     {/* Place the newsletter section where you want it to appear */}
     <NewsletterSection />

      {/* How It Works */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">How PodStream Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg text-center shadow-md hover:shadow-lg transition transform hover:-translate-y-1 duration-200">
              <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Discover</h3>
              <p className="text-blue-700">Browse our extensive catalog of podcasts across various categories. Find shows based on topics, creators, or recommendations tailored just for you.</p>
            </div>
            <div className="bg-white p-6 rounded-lg text-center shadow-md hover:shadow-lg transition transform hover:-translate-y-1 duration-200">
              <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Subscribe</h3>
              <p className="text-blue-700">Follow your favorite shows to never miss a new episode. Get notifications when new content is available and build your personalized library.</p>
            </div>
            <div className="bg-white p-6 rounded-lg text-center shadow-md hover:shadow-lg transition transform hover:-translate-y-1 duration-200">
              <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Listen</h3>
              <p className="text-blue-700">Stream episodes anytime, anywhere, on any device. Download for offline listening, create playlists, and enjoy seamless playback across all your devices.</p>
            </div>
          </div>
        </div>
      </section>


      {/* Explore Modal */}
      {showExploreModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[80vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-blue-800">Explore PodStream</h3>
                <button 
                  onClick={() => setShowExploreModal(false)}
                  className="text-blue-400 hover:text-blue-600 text-xl"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-4">Popular Categories</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.slice(0, 6).map((category, index) => (
                      <div 
                        key={index} 
                        className={`${category.color} text-white p-3 rounded-lg flex items-center cursor-pointer hover:opacity-90 transition`}
                      >
                        <span className="text-2xl mr-2">{category.icon}</span>
                        <span>{category.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-4">Today's Picks</h4>
                  <div className="space-y-3">
                    {recentEpisodes.slice(0, 3).map((episode) => (
                      <div key={episode.id} className="flex items-center p-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition cursor-pointer">
                        <div className="mr-3 bg-blue-100 rounded-md w-10 h-10 flex items-center justify-center">
                          <span className="text-blue-600">▶</span>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm">{episode.title}</h5>
                          <p className="text-xs text-blue-600">{episode.podcast}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-4">Start Your Journey</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button className="bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center"
                  onClick={requireAuth}>
                    <span className="mr-2">🎧</span> Browse All Podcasts
                  </button>
                  <button className="bg-blue-500 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-600 transition flex items-center justify-center"
                  onClick={requireAuth}>
                    <span className="mr-2">🔍</span> Search By Topic
                  </button>
                </div>
              </div>
              
              <div className="mt-8 bg-blue-50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold mb-2">New User?</h4>
                <p className="text-blue-700 mb-4">Create an account to save favorites, sync across devices, and get personalized recommendations.</p>
                <div className="flex space-x-3">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition flex-1"
                  onClick={registeraccount}>
                    Create Account
                  </button>
                  <button className="bg-white text-blue-600 border border-blue-500 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;