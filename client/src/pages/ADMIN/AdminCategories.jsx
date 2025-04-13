import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { adminApi } from '../../utils/api';
import { toast } from 'react-hot-toast';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [processingCategoryIds, setProcessingCategoryIds] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getCategories();
      setCategories(response?.data?.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to fetch categories');
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await adminApi.updateCategory(editingCategory._id, formData);
        toast.success('Category updated successfully');
      } else {
        await adminApi.createCategory(formData);
        toast.success('Category created successfully');
      }
      
      fetchCategories();
      setShowModal(false);
      setFormData({ name: '', description: '' });
      setEditingCategory(null);
    } catch (error) {
      console.error('Error saving category:', error);
      toast.error(error.response?.data?.message || 'Failed to save category');
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description
    });
    setShowModal(true);
  };

  const handleDelete = async (categoryId) => {
    if (!window.confirm('Are you sure you want to delete this category?')) {
      return;
    }

    try {
      setProcessingCategoryIds(prev => [...prev, categoryId]);
      await adminApi.deleteCategory(categoryId);
      toast.success('Category deleted successfully');
      fetchCategories(); // Refresh the categories list
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete category';
      toast.error(errorMessage);
      console.error('Error deleting category:', error);
    } finally {
      setProcessingCategoryIds(prev => prev.filter(id => id !== categoryId));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories Management</h1>
        <button
          onClick={() => {
            setEditingCategory(null);
            setFormData({ name: '', description: '' });
            setShowModal(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} className="mr-2" />
          Add Category
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="text-blue-600 hover:text-blue-900"
                    title="Edit category"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="text-red-600 hover:text-red-900"
                    disabled={category.podcastCount > 0}
                    title={category.podcastCount > 0 ? "Cannot delete category with podcasts" : "Delete category"}
                  >
                    <Trash2 size={16} className={category.podcastCount > 0 ? "opacity-50 cursor-not-allowed" : ""} />
                  </button>
                </div>
              </div>
              <p className="text-gray-600">{category.description}</p>
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <span className={`${category.podcastCount > 0 ? 'text-blue-600 font-medium' : ''}`}>
                  {category.podcastCount} {category.podcastCount === 1 ? 'podcast' : 'podcasts'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Category Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingCategory(null);
                  setFormData({ name: '', description: '' });
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingCategory(null);
                    setFormData({ name: '', description: '' });
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingCategory ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;