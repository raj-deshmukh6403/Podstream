import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash, Search, X, Check, RefreshCw } from 'lucide-react';
import { adminApi } from '../../utils/api';
import { toast } from 'react-hot-toast';

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

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getTags();
      setTags(response?.data?.data || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tags');
      toast.error('Failed to fetch tags');
      setTags([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTags = Array.isArray(tags) ? tags.filter(tag =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  // Add a new tag
  const handleAddTag = async () => {
    if (!newTagName.trim()) return;
    
    setIsAddingTag(true);
    try {
      const response = await adminApi.createTag({ name: newTagName.trim() });
      const newTag = response.data.data || response.data;
      if (newTag && typeof newTag === 'object') {
        setTags([...tags, newTag]);
      }
      setNewTagName('');
      toast.success('Tag added successfully');
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to add tag';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsAddingTag(false);
    }
  };

  // Update tag
  const handleUpdateTag = async (id) => {
    if (!editTagName.trim()) return;
    
    setProcessingTagIds(prev => [...prev, id]);
    try {
      const response = await adminApi.updateTag(id, { name: editTagName.trim() });
      setTags(tags.map(tag => tag._id === id ? response.data : tag));
      setEditingTagId(null);
      setEditTagName('');
      toast.success('Tag updated successfully');
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to update tag';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setProcessingTagIds(prev => prev.filter(tagId => tagId !== id));
    }
  };

  // Delete tag
  const handleDeleteTag = async (id) => {
    if (!window.confirm('Are you sure you want to delete this tag?')) return;
    
    setProcessingTagIds(prev => [...prev, id]);
    try {
      await adminApi.deleteTag(id);
      setTags(tags.filter(tag => tag._id !== id));
      toast.success('Tag deleted successfully');
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to delete tag';
      setError(errorMsg);
      toast.error(errorMsg);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tags Management</h1>
        <button
          onClick={() => setIsAddingTag(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          disabled={isAddingTag}
        >
          <Plus size={20} />
          Add New Tag
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search tags..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full md:w-96 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
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

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tag Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Podcast Count
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTags.map((tag) => (
                <tr key={tag._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingTagId === tag._id ? (
                      <input
                        type="text"
                        className="border border-gray-300 rounded-md p-1 w-full"
                        value={editTagName}
                        onChange={(e) => setEditTagName(e.target.value)}
                      />
                    ) : (
                      <div className="text-sm font-medium text-gray-900">{tag.name}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{tag.podcastCount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {tag.createdAt ? new Date(tag.createdAt).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      }) : 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {tag.updatedAt ? new Date(tag.updatedAt).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      }) : 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {editingTagId === tag._id ? (
                      <div className="flex gap-3">
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
                      </div>
                    ) : (
                      <div className="flex gap-3">
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
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Tag Usage</h2>
        <div className="flex flex-wrap gap-3">
          {tags.map(tag => (
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