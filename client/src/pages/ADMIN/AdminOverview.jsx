import React, { useState, useEffect } from 'react';
import { Users, Headphones, Tag, BarChart2, Activity, Server } from 'lucide-react';
import { adminApi } from '../../utils/api';

const AdminOverview = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPodcasts: 0,
    totalCategories: 0,
    totalTags: 0,
    recentActivity: [],
    systemStatus: {
      cpu: 0,
      memory: 0,
      storage: 0,
      uptime: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await adminApi.getStats();
        setStats(response?.data?.data || {
          totalUsers: 0,
          totalPodcasts: 0,
          totalCategories: 0,
          totalTags: 0,
          recentActivity: [],
          systemStatus: {
            cpu: 0,
            memory: 0,
            storage: 0,
            uptime: 0
          }
        });
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch statistics');
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    // Refresh stats every 5 minutes
    const interval = setInterval(fetchStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: <Users className="w-8 h-8 text-blue-500" />,
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Total Podcasts',
      value: stats.totalPodcasts,
      icon: <Headphones className="w-8 h-8 text-purple-500" />,
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Categories',
      value: stats.totalCategories,
      icon: <BarChart2 className="w-8 h-8 text-green-500" />,
      bgColor: 'bg-green-100'
    },
    {
      title: 'Tags',
      value: stats.totalTags,
      icon: <Tag className="w-8 h-8 text-orange-500" />,
      bgColor: 'bg-orange-100'
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      {error && (
        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <div
            key={index}
            className={`${card.bgColor} rounded-lg p-6 flex items-center justify-between`}
          >
            <div>
              <p className="text-gray-600 text-sm">{card.title}</p>
              <h3 className="text-2xl font-bold mt-1">{card.value}</h3>
            </div>
            <div className="rounded-full p-3 bg-white bg-opacity-50">
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center">
              <Activity className="w-5 h-5 mr-2 text-blue-500" />
              Recent Activity
            </h2>
          </div>
          <div className="space-y-4">
            {stats.recentActivity && stats.recentActivity.length > 0 ? (
              stats.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'user' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'podcast' ? 'bg-purple-100 text-purple-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    {activity.type === 'user' ? <Users className="w-4 h-4" /> :
                     activity.type === 'podcast' ? <Headphones className="w-4 h-4" /> :
                     <Tag className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-4">
                No recent activity
              </div>
            )}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center">
              <Server className="w-5 h-5 mr-2 text-green-500" />
              System Status
            </h2>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">CPU Usage</span>
                <span className="text-sm font-medium">{stats.systemStatus?.cpu || 0}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 rounded-full h-2"
                  style={{ width: `${stats.systemStatus?.cpu || 0}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Memory Usage</span>
                <span className="text-sm font-medium">{stats.systemStatus?.memory || 0}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-500 rounded-full h-2"
                  style={{ width: `${stats.systemStatus?.memory || 0}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Storage Usage</span>
                <span className="text-sm font-medium">{stats.systemStatus?.storage || 0}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 rounded-full h-2"
                  style={{ width: `${stats.systemStatus?.storage || 0}%` }}
                ></div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">System Uptime</span>
                <span className="text-sm font-medium">{formatUptime(stats.systemStatus?.uptime || 0)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const formatUptime = (seconds) => {
  const days = Math.floor(seconds / (24 * 60 * 60));
  const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((seconds % (60 * 60)) / 60);

  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (parts.length === 0) parts.push('0m');

  return parts.join(' ');
};

export default AdminOverview; 