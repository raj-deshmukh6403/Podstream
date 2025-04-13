import React, { useEffect, useState } from 'react';
import { LineChart, AreaChart, BarChart, PieChart, Pie, Line, Bar, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTopChart, setActiveTopChart] = useState('trending');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const [showExploreModal, setShowExploreModal] = useState(false);
  const [activePage, setActivePage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Featured podcasts data
  const featuredPodcasts = [
    { id: 1, title: 'Tech Today', host: 'Alex Johnson', category: 'Technology', image: '/images/tech-today.jpg', episodes: 124, listeners: '1.2M' },
    { id: 2, title: 'Mindful Moments', host: 'Sarah Chen', category: 'Wellness', image: '/images/mindful-moments.jpg', episodes: 87, listeners: '890K' },
    { id: 3, title: 'Business Insights', host: 'Michael Roberts', category: 'Business', image: '/images/business-insights.jpg', episodes: 56, listeners: '670K' },
    { id: 4, title: 'History Untold', host: 'Emma Williams', category: 'Education', image: '/images/history-untold.jpg', episodes: 42, listeners: '510K' },
    { id: 5, title: 'Comedy Hour', host: 'Dave Miller', category: 'Entertainment', image: '/images/comedy-hour.jpg', episodes: 210, listeners: '2.5M' },
    { id: 6, title: 'True Crime Stories', host: 'Rachel Thompson', category: 'Crime', image: '/images/true-crime-stories.jpg', episodes: 67, listeners: '950K' }
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
    { name: 'Revenue', value: '$4,250', icon: '💰', color: 'bg-blue-600' },
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto animate-spin"></div>
          <h2 className="mt-4 text-xl font-semibold text-blue-800">Loading Postream...</h2>
        </div>
      </div>
    );
  }

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
                <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition">
                  Create Account
                </button>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-10">
              <img src="/images/podcast-illustration.jpg" alt="Podcast Illustration" className="rounded-lg shadow-2xl" />
            </div>
          </div>
        </div>
      </div>

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
                    <button className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-blue-600 transition">
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
    </div>
  );
};

export default HomePage;