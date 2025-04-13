import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { Calendar, Users, Play, Clock, Download, Filter, Mic, Loader2, TrendingUp, Radio, Activity } from 'lucide-react';
import { adminApi } from '../../utils/api';

const AdminAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [period, setPeriod] = useState('week');

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminApi.getAnalytics(period);
      if (response?.data?.success) {
        setAnalytics(response.data.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch analytics data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, [period]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-background/50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-base font-medium">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-background/50">
        <div className="text-center text-red-600 p-8 bg-red-50 rounded-xl max-w-md border border-red-200">
          <div className="mb-3 text-2xl">⚠️</div>
          <h3 className="text-lg font-semibold mb-2">Error Loading Data</h3>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 bg-background/50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-primary mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-base text-muted-foreground">Track your platform's performance and growth</p>
        </div>
        <div className="flex items-center gap-2 bg-background p-1.5 rounded-xl shadow-sm border border-border">
          {['week', 'month', 'year'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                period === p
                  ? 'bg-primary text-white shadow-md'
                  : 'hover:bg-primary/10 text-muted-foreground'
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="New Users"
          value={analytics?.newUsers || 0}
          icon={<Users className="w-6 h-6" />}
          trend={analytics?.growthRate}
          description="New registrations"
          gradientFrom="from-blue-600"
          gradientTo="to-blue-700"
        />
        <StatCard
          title="New Podcasts"
          value={analytics?.newPodcasts || 0}
          icon={<Radio className="w-6 h-6" />}
          description="Recently uploaded"
          gradientFrom="from-purple-600"
          gradientTo="to-purple-700"
        />
        <StatCard
          title="Active Users"
          value={analytics?.activeUsers || 0}
          icon={<Activity className="w-6 h-6" />}
          percentage={(analytics?.activeUsers / analytics?.totalUsers * 100).toFixed(1)}
          description="Currently active"
          gradientFrom="from-green-600"
          gradientTo="to-green-700"
        />
        <StatCard
          title="Total Users"
          value={analytics?.totalUsers || 0}
          icon={<Users className="w-6 h-6" />}
          description="Platform users"
          gradientFrom="from-orange-600"
          gradientTo="to-orange-700"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-background p-8 rounded-xl shadow-lg border border-border">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">User Growth Trend</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics?.userGrowth || []}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="rgb(99, 102, 241)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="rgb(99, 102, 241)" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgb(226, 232, 240)" />
                <XAxis 
                  dataKey="_id"
                  tick={{ fill: 'rgb(71, 85, 105)' }}
                  tickLine={{ stroke: 'rgb(71, 85, 105)' }}
                  stroke="rgb(71, 85, 105)"
                />
                <YAxis
                  tick={{ fill: 'rgb(71, 85, 105)' }}
                  tickLine={{ stroke: 'rgb(71, 85, 105)' }}
                  stroke="rgb(71, 85, 105)"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgb(255, 255, 255)',
                    border: '1px solid rgb(226, 232, 240)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    padding: '12px'
                  }}
                  labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="rgb(99, 102, 241)"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorCount)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-background p-8 rounded-xl shadow-lg border border-border">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Content Distribution</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'New Users', value: analytics?.newUsers || 0 },
                { name: 'New Podcasts', value: analytics?.newPodcasts || 0 },
                { name: 'Active Users', value: analytics?.activeUsers || 0 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgb(226, 232, 240)" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: 'rgb(71, 85, 105)' }}
                  tickLine={{ stroke: 'rgb(71, 85, 105)' }}
                  stroke="rgb(71, 85, 105)"
                />
                <YAxis 
                  tick={{ fill: 'rgb(71, 85, 105)' }}
                  tickLine={{ stroke: 'rgb(71, 85, 105)' }}
                  stroke="rgb(71, 85, 105)"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgb(255, 255, 255)',
                    border: '1px solid rgb(226, 232, 240)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    padding: '12px'
                  }}
                  labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
                />
                <Bar 
                  dataKey="value" 
                  fill="rgb(99, 102, 241)"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, trend, percentage, description, gradientFrom, gradientTo }) => (
  <div className="bg-background p-6 rounded-xl shadow-lg border border-border hover:shadow-xl transition-shadow duration-300">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-base font-semibold text-foreground mb-1">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className={`p-3 rounded-xl bg-gradient-to-br ${gradientFrom} ${gradientTo} text-white shadow-md`}>
        {icon}
      </div>
    </div>
    <div className="flex items-baseline gap-3">
      <span className="text-3xl font-bold text-foreground">{value.toLocaleString()}</span>
      {trend !== undefined && (
        <span className={`text-sm flex items-center gap-1 font-medium ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          <TrendingUp className="w-4 h-4" />
          {Math.abs(trend).toFixed(1)}%
        </span>
      )}
      {percentage !== undefined && (
        <span className="text-sm font-medium text-muted-foreground">
          ({percentage}%)
        </span>
      )}
    </div>
  </div>
);

export default AdminAnalytics;