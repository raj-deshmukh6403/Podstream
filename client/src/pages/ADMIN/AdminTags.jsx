import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash, Search, X, Check, RefreshCw } from 'lucide-react';

const AdminTags = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newTagName, setNewTagName] = useState('');
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [editingTagId, setEditingTagId] = useState(null);
  const [editTagName, setEditTagName] = useState('');
  const [processingTagIds, setProcessingTagIds] = useState([]);

  // Fetch tags from API
  const fetchTags = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/tags', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setTags(data);
        setError(null);
      } else {
        setError('Failed to fetch tags');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  // Add a new tag
  const handleAddTag = async () => {
    if (!newTagName.trim()) return;
    
    setIsAddingTag(true);
    try {
      const response = await fetch('/api/admin/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ name: newTagName.trim() })
      });
      
      if (response.ok) {
        const newTag = await response.json();
        setTags([...tags, newTag]);
        setNewTagName('');
        setIsAddingTag(false);
      } else {
        setError('Failed to add tag');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsAddingTag(false);
    }
  };

  // Update tag
  const handleUpdateTag = async (id) => {
    if (!editTagName.trim()) return;
    
    setProcessingTagIds(prev => [...prev, id]);
    try {
      const response = await fetch(`/api/admin/tags/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ name: editTagName.trim() })
      });
      
      if (response.ok) {
        const updatedTag = await response.json();
        setTags(tags.map(tag => tag._id === id ? updatedTag : tag));
        setEditingTagId(null);
        setEditTagName('');
      } else {
        setError('Failed to update tag');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setProcessingTagIds(prev => prev.filter(tagId => tagId !== id));
    }
  };

  // Delete tag
  const handleDeleteTag = async (id) => {
    if (!window.confirm('Are you sure you want to delete this tag?')) return;
    
    setProcessingTagIds(prev => [...prev, id]);
    try {
      const response = await fetch(`/api/admin/tags/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        setTags(tags.filter(tag => tag._id !== id));
      } else {
        setError('Failed to delete tag');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setProcessingTagIds(prev => prev.filter(tagId => tagId !== id));
    }
  };

  // Start editing a tag
  const startEditTag = (tag) => {
    setEditingTagId(tag._id);
    setEditTagName(tag.name);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingTagId(null);
    setEditTagName('');
  };

  // Mock tags data for display
  const mockTags = [
    { _id: '1', name: 'Technology', podcastCount: 157, createdAt: '2024-12-15T10:30:00', updatedAt: '2025-03-10T14:45:00' },
    { _id: '2', name: 'Business', podcastCount: 125, createdAt: '2024-12-18T09:15:00', updatedAt: '2025-03-05T11:30:00' },
    { _id: '3', name: 'Education', podcastCount: 98, createdAt: '2024-12-20T14:20:00', updatedAt: '2025-02-28T16:45:00' },
    { _id: '4', name: 'Entertainment', podcastCount: 214, createdAt: '2024-12-22T11:10:00', updatedAt: '2025-03-12T10:15:00' },
    { _id: '5', name: 'Health', podcastCount: 87, createdAt: '2024-12-25T15:45:00', updatedAt: '2025-03-08T09:30:00' },
    { _id: '6', name: 'Science', podcastCount: 76, createdAt: '2025-01-05T13:20:00', updatedAt: '2025-03-15T13:45:00' },
    { _id: '7', name: 'History', podcastCount: 64, createdAt: '2025-01-08T10:50:00', updatedAt: '2025-03-02T14:20:00' },
    { _id: '8', name: 'Politics', podcastCount: 92, createdAt: '2025-01-10T16:15:00', updatedAt: '2025-03-18T11:10:00' },
    { _id: '9', name: 'Sports', podcastCount: 118, createdAt: '2025-01-12T12:30:00', updatedAt: '2025-03-20T15:30:00' },
    { _id: '10', name: 'True Crime', podcastCount: 145, createdAt: '2025-01-15T09:45:00', updatedAt: '2025-03-22T10:00:00' }
  ];

  // Filter tags by search query
  const filteredTags = mockTags.filter(tag => 
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tags Management</h1>
        <button
          onClick={() => setIsAddingTag(true)}
          className="flex items-center gap-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          disabled={isAddingTag}
        >
          <Plus size={18} />
          Add New Tag
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error: {error}
        </div>
      )}

      {isAddingTag && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-lg font-semibold mb-4">Add New Tag</h2>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Tag name"
              className="flex-1 border border-gray-300 rounded-md p-2"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
            />
            <button
              onClick={handleAddTag}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              disabled={!newTagName.trim()}
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsAddingTag(false);
                setNewTagName('');
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Manage Tags</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search tags..."
              className="border border-gray-300 rounded-md pl-8 py-1 px-3"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search size={16} className="absolute left-2 top-2 text-gray-400" />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tag Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Podcast Count</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTags.map((tag) => (
                <tr key={tag._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingTagId === tag._id ? (
                      <input
                        type="text"
                        className="border border-gray-300 rounded-md p-1 w-full"
                        value={editTagName}
                        onChange={(e) => setEditTagName(e.target.value)}
                      />
                    ) : (
                      tag.name
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{tag.podcastCount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(tag.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(tag.updatedAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                    {editingTagId === tag._id ? (
                      <>
                        <button
                          onClick={() => handleUpdateTag(tag._id)}
                          className="text-green-600 hover:text-green-900"
                          disabled={processingTagIds.includes(tag._id)}
                        >
                          {processingTagIds.includes(tag._id) ? (
                            <RefreshCw size={18} className="animate-spin" />
                          ) : (
                            <Check size={18} />
                          )}
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <X size={18} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditTag(tag)}
                          className="text-blue-600 hover:text-blue-900"
                          disabled={processingTagIds.includes(tag._id)}
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteTag(tag._id)}
                          className="text-red-600 hover:text-red-900"
                          disabled={processingTagIds.includes(tag._id)}
                        >
                          {processingTagIds.includes(tag._id) ? (
                            <RefreshCw size={18} className="animate-spin" />
                          ) : (
                            <Trash size={18} />
                          )}
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              
              {filteredTags.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No tags found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 flex items-center justify-between border-t">
          <div className="text-sm text-gray-500">
            Showing {filteredTags.length} of {mockTags.length} tags
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded text-sm disabled:opacity-50">
              Previous
            </button>
            <button className="px-3 py-1 border rounded bg-indigo-50 text-indigo-600 font-medium text-sm">
              1
            </button>
            <button className="px-3 py-1 border rounded text-sm disabled:opacity-50">
              Next
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Tag Usage</h2>
        <div className="flex flex-wrap gap-3">
          {mockTags.map(tag => (
            <div 
              key={tag._id}
              className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 flex items-center gap-1"
              style={{ fontSize: `${Math.max(0.8, Math.min(1.6, 0.8 + tag.podcastCount / 200))}rem` }}
            >
              {tag.name}
              <span className="text-xs bg-indigo-200 px-2 py-0.5 rounded-full">
                {tag.podcastCount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminTags;