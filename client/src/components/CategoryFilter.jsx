import { useState, useEffect } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        console.log('Categories response:', response.data); // Debug log
        
        if (response.data.success && Array.isArray(response.data.data)) {
          setCategories(response.data.data);
        } else {
          console.error('Invalid categories response:', response.data);
          setCategories([]);
          toast.error('Failed to load categories');
        }
      } catch (err) {
        console.error('Failed to fetch categories:', err.response?.data || err);
        setCategories([]);
        toast.error('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 rounded-lg w-48"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onCategoryChange('')}
        className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
          !selectedCategory
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        All Categories
      </button>
      {categories.length > 0 ? (
        categories.map(category => (
          <button
            key={category._id}
            onClick={() => onCategoryChange(category._id)}
            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
              selectedCategory === category._id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category.name}
          </button>
        ))
      ) : (
        <p className="text-gray-500">No categories available</p>
      )}
    </div>
  );
};

export default CategoryFilter; 