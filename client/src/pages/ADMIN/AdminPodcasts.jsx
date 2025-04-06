import React, { useState, useEffect } from 'react';
import { Search, Edit, Trash2, Eye, Play, Pause, CheckCircle, XCircle } from 'lucide-react';

const AdminPodcasts = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categories, setCategories] = useState([]);
  const [playingId, setPlayingId] = useState(null);
  const audioRef = React.useRef(null);

  useEffect(() => {
    fetchPodcasts();
    fetchCategories();
  }, [currentPage, searchTerm, categoryFilter, statusFilter]);

  const fetchPodcasts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/admin/podcasts?page=${currentPage}&search=${searchTerm}&category=${categoryFilter}&status=${statusFilter}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        setPodcasts(data.podcasts);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error('Error fetching podcasts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchPodcasts();
  };

  const handleDeletePodcast = async (podcastId) => {
    if (window.confirm('Are you sure you want to delete this podcast? This action cannot be undone.')) {
      try {
        const response = await fetch(`/api/admin/podcasts/${podcastId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          // Remove podcast from state
          setPodcasts(podcasts.filter(podcast => podcast._id !== podcastId));
        }
      } catch (error) {
        console.error('Error deleting podcast:', error);
      }
    }
  };

  const handleToggleApproval = async (podcastId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'approved' ? 'pending' : 'approved';
      
      const response = await fetch(`/api/admin/podcasts/${podcastId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        // Update podcast status in state
        const updatedPodcasts = podcasts.map(podcast => 
          podcast._id === podcastId ? { ...podcast, status: newStatus } : podcast
        );
        setPodcasts(updatedPodcasts);
      }
    } catch (error) {
      console.error('Error updating podcast status:', error);
    }
  };

  const togglePlayPause = (podcast) => {
    if (playingId === podcast._id) {
      // Already playing this podcast - pause it
      audioRef.current.pause();
      setPlayingId(null);
    } else {
      // Play a new podcast
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(podcast.audioUrl);
      audioRef.current.play();
      setPlayingId(podcast._id);
      
      // Add event listener for when audio ends
      audioRef.current.onended = () => {
        setPlayingId(null);
      };
    }
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Podcast Management</h1>
        
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search podcasts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="py-2 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="py-2 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
          
          <button 
            type="submit" 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
        </form>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">Podcast</th>
                  <th className="py-3 px-4 text-left">Creator</th>
                  <th className="py-3 px-4 text-left">Category</th>
                  <th className="py-3 px-4 text-left">Duration</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Uploaded</th>
                  <th className="py-3 px-4 text-left">Listens</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {podcasts.map(podcast => (
                  <tr key={podcast._id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded bg-gray-200 flex items-center justify-center mr-3 overflow-hidden">
                          {podcast.coverImage ? (
                            <img 
                              src={podcast.coverImage} 
                              alt={podcast.title} 
                              className="w-12 h-12 object-cover"
                            />
                          ) : (
                            <Headphones size={24} className="text-gray-500" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{podcast.title}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {podcast.description.substring(0, 60)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">{podcast.user?.name || 'Unknown'}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                        {podcast.category?.name || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="py-3 px-4">{formatDuration(podcast.duration)}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        podcast.status === 'approved' ? 'bg-green-100 text-green-800' : 
                        podcast.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {podcast.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {new Date(podcast.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">{podcast.listens || 0}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => togglePlayPause(podcast)}
                          className="p-1 text-blue-500 hover:bg-blue-100 rounded-full"
                          title={playingId === podcast._id ? "Pause" : "Play"}
                        >
                          {playingId === podcast._id ? <Pause size={18} /> : <Play size={18} />}
                        </button>
                        <button
                          onClick={() => handleToggleApproval(podcast._id, podcast.status)}
                          className={`p-1 rounded-full ${
                            podcast.status === 'approved' ? 'text-red-500 hover:bg-red-100' : 'text-green-500 hover:bg-green-100'
                          }`}
                          title={podcast.status === 'approved' ? 'Unapprove' : 'Approve'}
                        >
                          {podcast.status === 'approved' ? <XCircle size={18} /> : <CheckCircle size={18} />}
                        </button>
                        <a
                          href={`/podcasts/${podcast._id}`}
                          className="p-1 text-green-500 hover:bg-green-100 rounded-full"
                          title="View Podcast"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Eye size={18} />
                        </a>
                        <button
                          onClick={() => handleDeletePodcast(podcast._id)}
                          className="p-1 text-red-500 hover:bg-red-100 rounded-full"
                          title="Delete Podcast"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-gray-500">
              Showing {podcasts.length} podcasts of page {currentPage} of {totalPages}
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded border enabled:hover:bg-gray-100 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded border enabled:hover:bg-gray-100 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminPodcasts;