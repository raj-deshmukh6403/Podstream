import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";

const EditPodcastForm = () => {
  const token = localStorage.getItem("token");
  const { podcastId } = useParams();
  const navigate = useNavigate();
  const params = useParams();
  console.log("useParams:", params);
  
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
  });

  useEffect(() => {
    const fetchPodcastAndCategories = async () => {
      try {
        console.log(params.id);
        const [categoriesRes, podcastRes] = await Promise.all([
          api.get("/categories"),
          api.get(`/podcasts/${params.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const podcast = podcastRes.data.data;

        setFormData({
          title: podcast.title || "",
          description: podcast.description || "",
          category: podcast.category?._id || "",
          tags: podcast.tags?.join(", ") || "",
        });

        setCategories(categoriesRes.data.data || []);
      } catch (err) {
        console.error("Failed to fetch podcast or categories:", err);
        alert("Failed to load podcast data or categories");
      }
    };

    fetchPodcastAndCategories();
  }, [podcastId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        tags: formData.tags.split(",").map((tag) => tag.trim()),
      };

      await axios.put(`/api/podcasts/${params.id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Podcast updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error updating podcast:", err);
      alert("Failed to update podcast");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Podcast</h2>

      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full p-2 border rounded"
        required
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-2 border rounded"
        required
      />

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        name="tags"
        value={formData.tags}
        onChange={handleChange}
        placeholder="Tags (comma-separated)"
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Update Podcast
      </button>
    </form>
  );
};

export default EditPodcastForm;
