import React, { useState, useEffect } from 'react';
import { Play, Pause, Edit, Trash2, Search, Filter, Music, X } from 'lucide-react';
import { adminApi } from '../../utils/api';
import { toast } from 'react-toastify';

// Edit Modal Component
// Edit Modal Component
const EditPodcastModal = ({ podcast, onClose, onSave, categories }) => {
  const [formData, setFormData] = useState({
    title: podcast.title || '',
    description: podcast.description || '',
    category: podcast.category?._id || '',
    status: podcast.status || 'draft'
  });
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState(podcast.tags?.map(tag => typeof tag === 'object' ? tag._id : tag) || []);
  const [tagsLoading, setTagsLoading] = useState(true);

  useEffect(() => {
    // Fetch tags from API
    const fetchTags = async () => {
      try {
        setTagsLoading(true);
        // Use the same API method as in other parts of your application
        const response = await adminApi.getTags(); // You'll need to add this method to your adminApi
        
        // Make sure we're properly extracting the tags data
        const tagsData = Array.isArray(response.data) 
          ? response.data 
          : (response.data?.data || []);
        
        setTags(tagsData);
      } catch (error) {
        console.error('Error fetching tags:', error);
        toast.error('Failed to fetch tags');
      } finally {
        setTagsLoading(false);
      }
    };

    fetchTags();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagToggle = (tagId) => {
    setSelectedTags(prev => 
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formattedData = {
      ...formData,
      tags: selectedTags
    };
    
    try {
      await onSave(podcast._id, formattedData);
      onClose();
    } catch (error) {
      console.error('Error saving podcast:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Podcast</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                {/* <option value="archived">Archived</option> */}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
              <div className="flex flex-wrap gap-2 border border-gray-300 rounded-md p-3">
                {tagsLoading ? (
                  <p className="text-gray-500 italic">Loading tags...</p>
                ) : tags.length > 0 ? (
                  tags.map((tag) => (
                    <div
                      key={tag._id}
                      onClick={() => handleTagToggle(tag._id)}
                      className={`px-3 py-1 rounded-full cursor-pointer transition-colors duration-200 
                        ${
                          selectedTags.includes(tag._id)
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                      {tag.name}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic">No tags available</p>
                )}
              </div>
              {selectedTags.length > 0 && (
                <p className="mt-2 text-sm text-gray-600">
                  {selectedTags.length} tag{selectedTags.length !== 1 ? 's' : ''} selected
                </p>
              )}
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main Component
const AdminPodcasts = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [tags, setTags] = useState([]); // Add this line
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [editingPodcast, setEditingPodcast] = useState(null);


  const fetchTags = async () => {
    try {
      const response = await adminApi.getTags();
      const tagsData = Array.isArray(response.data) 
        ? response.data 
        : (response.data?.data || []);
      setTags(tagsData);
    } catch (err) {
      console.error('Error fetching tags:', err);
      toast.error('Failed to fetch tags');
      setTags([]);
    }
  };

  useEffect(() => {
    // Load categories and tags first, then fetch podcasts
    Promise.all([fetchCategories(), fetchTags()])
      .then(() => {
        fetchPodcasts();
      });
  }, []);

  const findTagName = (tagId) => {
    const tag = tags.find(t => t._id === tagId);
    return tag ? tag.name : tagId;
  };

  useEffect(() => {
    // Load categories first, then fetch podcasts
    fetchCategories().then(() => {
      fetchPodcasts();
    });
  }, []);

  useEffect(() => {
    fetchPodcasts();
  }, [currentPage, filterCategory]);

  const fetchPodcasts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminApi.getPodcasts(currentPage, searchTerm, filterCategory);
      setPodcasts(response.data?.data || []);
      setTotalPages(Math.ceil((response.data?.total || 0) / 10));
    } catch (err) {
      console.error('Error fetching podcasts:', err);
      setError(err.message || 'Failed to fetch podcasts');
      toast.error(err.message || 'Failed to fetch podcasts');
      setPodcasts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true);
      const response = await adminApi.getCategories();
      
      // Make sure we're properly extracting the categories data
      const categoriesData = Array.isArray(response.data) 
        ? response.data 
        : (response.data?.data || []);
      
      setCategories(categoriesData);
    } catch (err) {
      console.error('Error fetching categories:', err);
      toast.error('Failed to fetch categories');
      setCategories([]);
    } finally {
      setCategoriesLoading(false);
    }
  };

  const handleDelete = async (podcastId) => {
    if (!window.confirm('Are you sure you want to delete this podcast?')) return;
    
    try {
      await adminApi.deletePodcast(podcastId);
      toast.success('Podcast deleted successfully');
      fetchPodcasts();
    } catch (err) {
      console.error('Error deleting podcast:', err);
      toast.error(err.message || 'Failed to delete podcast');
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryFilter = (e) => {
    setFilterCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleEdit = (podcast) => {
    setEditingPodcast(podcast);
  };

  const handleSavePodcast = async (podcastId, formData) => {
    try {
      // Update status
      await adminApi.updatePodcastStatus(podcastId, formData.status);
      
      // You'll need to add the updatePodcast API method to handle tags
      // Example implementation:
      await adminApi.updatePodcast(podcastId, {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        tags: formData.tags // Now an array of tag IDs
      });
      
      toast.success('Podcast updated successfully');
      fetchPodcasts();
    } catch (err) {
      console.error('Error updating podcast:', err);
      toast.error(err.message || 'Failed to update podcast');
      throw err;
    }
  };
  const formatDuration = (seconds) => {
    if (!seconds) return 'N/A';
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchPodcasts();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  if (loading && categories.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Podcasts Management</h1>
      </div>

      <div className="mb-6 flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[300px]">
          <input
            type="text"
            placeholder="Search podcasts..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>

        <div className="flex gap-4">
          <select
            value={filterCategory}
            onChange={handleCategoryFilter}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={categoriesLoading}
          >
            <option value="all">All Categories</option>
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))
            ) : (
              <option disabled>Loading categories...</option>
            )}
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Creator
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tags
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plays
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                      <span className="ml-2">Loading podcasts...</span>
                    </div>
                  </td>
                </tr>
              ) : Array.isArray(podcasts) && podcasts.length > 0 ? (
                podcasts.map((podcast) => (
                  <tr key={podcast._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-12 w-12 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                          {podcast.coverImage?.url ? (
                            <img
                              src={podcast.coverImage.url}
                              alt={podcast.title}
                              className="h-12 w-12 object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2U1ZTdlYiI+PHBhdGggZD0iTTEyIDJjNS41MiAwIDEwIDQuNDggMTAgMTBzLTQuNDggMTAtMTAgMTAtMTAtNC40OC0xMC0xMCA0LjQ4LTEwIDEwLTEwek0xMCA3djEwbDYtNXoiLz48L3N2Zz4=';
                              }}
                            />
                          ) : (
                            <div className="h-12 w-12 flex items-center justify-center">
                              <Music className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4 max-w-xs">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {podcast.title}
                          </div>
                          <div className="text-xs text-gray-500 truncate">
                            {new Date(podcast.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{podcast.creator?.username || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{podcast.category?.name || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDuration(podcast.audioFile?.duration)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {podcast.tags && podcast.tags.length > 0 ? (
                          podcast.tags.map((tag, index) => (
                            <span 
                              key={index} 
                              className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                            >
                              {typeof tag === 'object' ? tag.name : findTagName(tag)}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-gray-500">No tags</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{podcast.plays || 0}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        podcast.isPublished  // Use isPublished instead of status
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {podcast.isPublished ? 'published' : 'draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleEdit(podcast)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit podcast"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(podcast._id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete podcast"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                    No podcasts found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing page <span className="font-medium">{currentPage}</span> of{' '}
                  <span className="font-medium">{totalPages}</span>
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
                        ${currentPage === i + 1
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }
                        ${i === 0 ? 'rounded-l-md' : ''}
                        ${i === totalPages - 1 ? 'rounded-r-md' : ''}
                      `}
                    >
                      {i + 1}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit Podcast Modal */}
      {editingPodcast && (
        <EditPodcastModal
          podcast={editingPodcast}
          onClose={() => setEditingPodcast(null)}
          onSave={handleSavePodcast}
          categories={categories}
        />
      )}
    </div>
  );
};

export default AdminPodcasts;