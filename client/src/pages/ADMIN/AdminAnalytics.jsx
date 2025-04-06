import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Calendar, Users, Play, Clock, Download, Filter } from 'lucide-react';

const AdminAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    userGrowth: [],
    podcastListens: [],
    listensPerCategory: [],
    topPodcasts: [],
    deviceUsage: [],
    timeOfDay: [],
    loading: true,
    period: 'week',
    error: null
  });

  const [activeTab, setActiveTab] = useState('overview');

  const fetchAnalyticsData = async (period) => {
    setAnalyticsData(prev => ({ ...prev, loading: true }));
    try {
      const response = await fetch(`/api/admin/analytics?period=${period}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setAnalyticsData({
          ...data,
          loading: false,
          period,
          error: null
        });
      } else {
        setAnalyticsData(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to fetch analytics data'
        }));
      }
    } catch (error) {
      setAnalyticsData(prev => ({
        ...prev,
        loading: false,
        error: error.message
      }));
    }
  };

  useEffect(() => {
    fetchAnalyticsData(analyticsData.period);
  }, []);

  const handlePeriodChange = (period) => {
    fetchAnalyticsData(period);
  };

  // Mock data for display purposes
  const mockUserGrowth = [
    { name: 'Jan', users: 400 },
    { name: 'Feb', users: 600 },
    { name: 'Mar', users: 800 },
    { name: 'Apr', users: 1000 },
    { name: 'May', users: 1200 },
    { name: 'Jun', users: 1500 },
  ];

  const mockPodcastListens = [
    { name: 'Jan', listens: 2500 },
    { name: 'Feb', listens: 3000 },
    { name: 'Mar', listens: 4200 },
    { name: 'Apr', listens: 5000 },
    { name: 'May', listens: 6000 },
    { name: 'Jun', listens: 7500 },
  ];

  const mockCategoryData = [
    { name: 'Technology', value: 35 },
    { name: 'Business', value: 25 },
    { name: 'Education', value: 15 },
    { name: 'Entertainment', value: 15 },
    { name: 'Health', value: 10 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  if (analyticsData.loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <div className="flex gap-2">
          <button 
            onClick={() => handlePeriodChange('week')}
            className={`px-3 py-1 rounded ${analyticsData.period === 'week' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
          >
            Week
          </button>
          <button 
            onClick={() => handlePeriodChange('month')}
            className={`px-3 py-1 rounded ${analyticsData.period === 'month' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
          >
            Month
          </button>
          <button 
            onClick={() => handlePeriodChange('year')}
            className={`px-3 py-1 rounded ${analyticsData.period === 'year' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
          >
            Year
          </button>
          <button className="flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 ${activeTab === 'overview' ? 'border-b-2 border-indigo-600 font-semibold' : 'text-gray-500'}`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 ${activeTab === 'users' ? 'border-b-2 border-indigo-600 font-semibold' : 'text-gray-500'}`}
        >
          User Analytics
        </button>
        <button
          onClick={() => setActiveTab('content')}
          className={`px-4 py-2 ${activeTab === 'content' ? 'border-b-2 border-indigo-600 font-semibold' : 'text-gray-500'}`}
        >
          Content Analytics
        </button>
        <button
          onClick={() => setActiveTab('engagement')}
          className={`px-4 py-2 ${activeTab === 'engagement' ? 'border-b-2 border-indigo-600 font-semibold' : 'text-gray-500'}`}
        >
          Engagement
        </button>
      </div>

      {analyticsData.error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error: {analyticsData.error}
        </div>
      )}

      {activeTab === 'overview' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-500 text-sm">Total Users</h3>
                <Users size={20} className="text-indigo-600" />
              </div>
              <p className="text-3xl font-bold mt-2">15,342</p>
              <p className="text-green-600 text-sm">+12.5% from last month</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-500 text-sm">Total Podcasts</h3>
                <Mic size={20} className="text-indigo-600" />
              </div>
              <p className="text-3xl font-bold mt-2">2,853</p>
              <p className="text-green-600 text-sm">+8.3% from last month</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-500 text-sm">Total Listens</h3>
                <Play size={20} className="text-indigo-600" />
              </div>
              <p className="text-3xl font-bold mt-2">438.2K</p>
              <p className="text-green-600 text-sm">+23.7% from last month</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-500 text-sm">Avg. Listen Time</h3>
                <Clock size={20} className="text-indigo-600" />
              </div>
              <p className="text-3xl font-bold mt-2">32m 14s</p>
              <p className="text-green-600 text-sm">+5.2% from last month</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">User Growth</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockUserGrowth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="users" stroke="#6366F1" strokeWidth={2} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Podcast Listens</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockPodcastListens}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="listens" fill="#6366F1" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Top Podcasts</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Podcast</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Creator</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Listens</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Listen Time</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Tech Talks 101</td>
                      <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
                      <td className="px-6 py-4 whitespace-nowrap">24,532</td>
                      <td className="px-6 py-4 whitespace-nowrap">45m 12s</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Business Insights</td>
                      <td className="px-6 py-4 whitespace-nowrap">Jane Smith</td>
                      <td className="px-6 py-4 whitespace-nowrap">18,745</td>
                      <td className="px-6 py-4 whitespace-nowrap">38m 05s</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Daily News Roundup</td>
                      <td className="px-6 py-4 whitespace-nowrap">News Network</td>
                      <td className="px-6 py-4 whitespace-nowrap">15,621</td>
                      <td className="px-6 py-4 whitespace-nowrap">22m 47s</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Health & Wellness</td>
                      <td className="px-6 py-4 whitespace-nowrap">Dr. Sarah Johnson</td>
                      <td className="px-6 py-4 whitespace-nowrap">12,458</td>
                      <td className="px-6 py-4 whitespace-nowrap">41m 33s</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Listens by Category</h3>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={mockCategoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {mockCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      {activeTab === 'users' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">User Demographics & Behavior</h2>
          <p className="text-gray-500 mb-6">Detailed user analytics coming soon...</p>
          {/* Additional user analytics content would go here */}
        </div>
      )}

      {activeTab === 'content' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Content Performance</h2>
          <p className="text-gray-500 mb-6">Detailed content analytics coming soon...</p>
          {/* Additional content analytics would go here */}
        </div>
      )}

      {activeTab === 'engagement' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">User Engagement Metrics</h2>
          <p className="text-gray-500 mb-6">Detailed engagement analytics coming soon...</p>
          {/* Additional engagement analytics would go here */}
        </div>
      )}
    </div>
  );
};

export default AdminAnalytics;