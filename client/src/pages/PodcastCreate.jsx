import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import axios from 'axios'

const PodcastCreate = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem('token');
  // const [tags, setTags] = useState([]);
  const [tagsText, setTagsText] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: [],
    audioFile: null,
    coverImage: null,
    seasons: 1,
    episode: 1,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // First check if user is authenticated and is a creator
        if (!user?._id) {
          toast.error("Please login to create podcasts");
          navigate("/login");
          return;
        }

        if (user.role !== "creator") {
          toast.error("You need to be a creator to create podcasts");
          navigate("/dashboard");
          return;
        }

        // Fetch categories and tags
        const categoriesRes = await api.get("/categories");
        console.log("Categories response:", categoriesRes);

        // const tagsRes = await api.get('/tags');
        // console.log('Tags response:', tagsRes);

        // Check if the responses have data property
        if (categoriesRes?.data?.data) {
          setCategories(categoriesRes.data.data);
          // setTags(tagsRes.data.data);
        } else {
          console.error("Invalid response format:", { categoriesRes, tagsRes });
          throw new Error("Invalid response format from server");
        }
      } catch (err) {
        console.error("Error in fetchData:", err);
        if (err.response) {
          console.error("Error response:", err.response.data);
          toast.error(
            err.response.data.message || "Failed to load categories and tags"
          );
        } else {
          toast.error("Network error: Failed to load categories and tags");
        }
      }
    };

    fetchData();
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleTagToggle = (tagId) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tagId)
        ? prev.tags.filter((id) => id !== tagId)
        : [...prev.tags, tagId],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      if (!user?._id) {
        toast.error("Please login to create a podcast");
        navigate("/login");
        return;
      }
  
      if (!formData.title || !formData.description || !formData.category || !formData.audioFile) {
        toast.error("Please fill in all required fields");
        return;
      }
  
      const audioBase64 = await fileToBase64(formData.audioFile);
      let imageBase64 = null;
      if (formData.coverImage) {
        imageBase64 = await fileToBase64(formData.coverImage);
      }
  
      const tagsArray = tagsText
        .split(/[\s,]+/)
        .filter(Boolean);
  
      const podcastData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        tags: tagsArray,
        audioBase64,
        imageBase64,
        seasons: formData.seasons,
        episode: formData.episode,
      };
  
      const response = await axios.post(
        'http://localhost:5000/api/podcasts',
        podcastData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
  
      if (response?.data?.success || (response.status >= 200 && response.status < 300)) {
        toast.success("Podcast created successfully");
  
        setFormData({
          title: "",
          description: "",
          category: "",
          audioFile: null,
          coverImage: null,
          seasons: 1,
          episode: 1,
          tags: [],
        });
  
        setTagsText("");
        navigate("/dashboard"); // or wherever you want to redirect
      } else {
        toast.error("Unexpected response from the server");
        console.error("Unexpected response:", response);
      }
  
    } catch (err) {
      console.error("Failed to create podcast:", err);
      toast.error(err.response?.data?.message || "Failed to create podcast");
    } finally {
      setLoading(false);
    }
  };
  
  
  
  
  // Helper function to convert file to base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Create New Podcast
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Tags (comma or space separated)
            </label>
            <input
              type="text"
              value={tagsText}
              onChange={(e) => setTagsText(e.target.value)}
              placeholder="e.g., tech education music"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Audio File</label>
            <input
              type="file"
              name="audioFile"
              accept="audio/*"
              onChange={handleFileChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Cover Image</label>
            <input
              type="file"
              name="coverImage"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Season</label>
              <input
                type="number"
                name="seasons"
                value={formData.seasons}
                onChange={handleChange}
                min="1"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Episode</label>
              <input
                type="number"
                name="episode"
                value={formData.episode}
                onChange={handleChange}
                min="1"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg text-white font-semibold ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } transition-colors duration-300`}
          >
            {loading ? "Creating..." : "Create Podcast"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PodcastCreate;
