import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FiUpload, FiX, FiImage, FiMusic, FiInfo } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
//import { useAuth } from '../context/AuthContext';

const UploadForm = ({ podcastToEdit }) => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [audioPreview, setAudioPreview] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  //const { user } = useAuth();
  const navigate = useNavigate();
  const isEditMode = !!podcastToEdit;

  // Fetch categories and tags
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, tagsRes] = await Promise.all([
          axios.get('/api/podcasts/categories'),
          axios.get('/api/podcasts/tags')
        ]);
        setCategories(categoriesRes.data);
        setTags(tagsRes.data);
      } catch {
        toast.error('Failed to load categories and tags');
      }
    };

    fetchData();
  }, []);

  // Set preview URLs for edit mode
  useEffect(() => {
    if (isEditMode) {
      setAudioPreview(podcastToEdit.audioUrl);
      setImagePreview(podcastToEdit.coverImage);
    }
  }, [isEditMode, podcastToEdit]);

  // Form validation schema
  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    categories: Yup.array().min(1, 'Select at least one category'),
    selectedTags: Yup.array(),
    isExplicit: Yup.boolean(),
    isPublic: Yup.boolean()
  });

  // Initialize formik
  const formik = useFormik({
    initialValues: {
      title: isEditMode ? podcastToEdit.title : '',
      description: isEditMode ? podcastToEdit.description : '',
      categories: isEditMode ? podcastToEdit.categories.map(c => typeof c === 'object' ? c._id : c) : [],
      selectedTags: isEditMode ? podcastToEdit.tags.map(t => typeof t === 'object' ? t._id : t) : [],
      isExplicit: isEditMode ? podcastToEdit.isExplicit : false,
      isPublic: isEditMode ? podcastToEdit.isPublic : true
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!isEditMode && !audioFile) {
        toast.error('Please upload an audio file');
        return;
      }
      
      try {
        setUploading(true);
        
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        values.categories.forEach(cat => formData.append('categories[]', cat));
        values.selectedTags.forEach(tag => formData.append('tags[]', tag));
        formData.append('isExplicit', values.isExplicit);
        formData.append('isPublic', values.isPublic);
        
        if (audioFile) {
          formData.append('audioFile', audioFile);
        }
        
        if (imageFile) {
          formData.append('coverImage', imageFile);
        }
        
        let response;
        if (isEditMode) {
          response = await axios.put(`/api/podcasts/${podcastToEdit._id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          toast.success('Podcast updated successfully!');
        } else {
          response = await axios.post('/api/podcasts', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          toast.success('Podcast uploaded successfully!');
        }
        
        navigate(`/podcast/${response.data._id}`);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error uploading podcast');
      } finally {
        setUploading(false);
      }
    }
  });

  // Handle audio file selection
  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('audio/')) {
        setAudioFile(file);
        setAudioPreview(URL.createObjectURL(file));
      } else {
        toast.error('Please select a valid audio file');
      }
    }
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
      } else {
        toast.error('Please select a valid image file');
      }
    }
  };

  // Clear audio selection
  const clearAudio = () => {
    setAudioFile(null);
    setAudioPreview(isEditMode ? podcastToEdit.audioUrl : null);
  };

  // Clear image selection
  const clearImage = () => {
    setImageFile(null);
    setImagePreview(isEditMode ? podcastToEdit.coverImage : null);
  };

  // Handle tag selection
  const toggleTag = (tagId) => {
    const selectedTags = [...formik.values.selectedTags];
    const index = selectedTags.indexOf(tagId);
    
    if (index === -1) {
      selectedTags.push(tagId);
    } else {
      selectedTags.splice(index, 1);
    }
    
    formik.setFieldValue('selectedTags', selectedTags);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="form-label">
              Podcast Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className="form-input"
              placeholder="Enter podcast title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />
            {formik.touched.title && formik.errors.title ? (
              <div className="form-error">{formik.errors.title}</div>
            ) : null}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="5"
              className="form-input"
              placeholder="Enter podcast description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            ></textarea>
            {formik.touched.description && formik.errors.description ? (
              <div className="form-error">{formik.errors.description}</div>
            ) : null}
          </div>

          {/* Categories */}
          <div>
            <label className="form-label">Categories</label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <div key={category._id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`category-${category._id}`}
                    className="h-4 w-4 text-primary-600 rounded"
                    checked={formik.values.categories.includes(category._id)}
                    onChange={() => {
                      const selectedCategories = [...formik.values.categories];
                      const index = selectedCategories.indexOf(category._id);
                      
                      if (index === -1) {
                        selectedCategories.push(category._id);
                      } else {
                        selectedCategories.splice(index, 1);
                      }
                      
                      formik.setFieldValue('categories', selectedCategories);
                    }}
                  />
                  <label
                    htmlFor={`category-${category._id}`}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
            {formik.touched.categories && formik.errors.categories ? (
              <div className="form-error">{formik.errors.categories}</div>
            ) : null}
          </div>

          {/* Tags */}
          <div>
            <label className="form-label">Tags</label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag._id}
                  type="button"
                  className={`text-sm px-3 py-1 rounded-full transition-colors ${
                    formik.values.selectedTags.includes(tag._id)
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  onClick={() => toggleTag(tag._id)}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Audio Upload */}
          <div>
            <label className="form-label">Audio File</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              {audioPreview ? (
                <div className="w-full">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-700 truncate">
                      {audioFile ? audioFile.name : 'Current audio file'}
                    </p>
                    <button
                      type="button"
                      onClick={clearAudio}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiX />
                    </button>
                  </div>
                  <audio controls className="w-full">
                    <source src={audioPreview} />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              ) : (
                <div className="space-y-1 text-center">
                  <FiMusic className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="audio-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none"
                    >
                      <span>Upload a file</span>
                      <input
                        id="audio-upload"
                        name="audio-upload"
                        type="file"
                        className="sr-only"
                        accept="audio/*"
                        onChange={handleAudioChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    MP3, WAV, or OGG up to 50MB
                  </p>
                </div>
              )}
            </div>
            {!isEditMode && !audioFile && formik.submitCount > 0 ? (
              <div className="form-error">Audio file is required</div>
            ) : null}
          </div>

          {/* Cover Image Upload */}
          <div>
            <label className="form-label">Cover Image</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              {imagePreview ? (
                <div className="w-full text-center">
                  <div className="flex items-center justify-end mb-2">
                    <button
                      type="button"
                      onClick={clearImage}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiX />
                    </button>
                  </div>
                  <img
                    src={imagePreview}
                    alt="Cover preview"
                    className="mx-auto h-40 w-40 object-cover rounded"
                  />
                </div>
              ) : (
                <div className="space-y-1 text-center">
                  <FiImage className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="image-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none"
                    >
                      <span>Upload a file</span>
                      <input
                        id="image-upload"
                        name="image-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    JPG, PNG or GIF up to 5MB
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Additional Options */}
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                id="isExplicit"
                name="isExplicit"
                type="checkbox"
                className="h-4 w-4 text-primary-600 rounded"
                checked={formik.values.isExplicit}
                onChange={formik.handleChange}
              />
              <label htmlFor="isExplicit" className="ml-2 text-sm text-gray-700">
                This podcast contains explicit content
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="isPublic"
                name="isPublic"
                type="checkbox"
                className="h-4 w-4 text-primary-600 rounded"
                checked={formik.values.isPublic}
                onChange={formik.handleChange}
              />
              <label htmlFor="isPublic" className="ml-2 text-sm text-gray-700">
                Make this podcast public
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="btn-primary"
          disabled={uploading}
        >
          {uploading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {isEditMode ? 'Updating...' : 'Uploading...'}
            </>
          ) : (
            <>
              <FiUpload className="mr-2" />
              {isEditMode ? 'Update Podcast' : 'Upload Podcast'}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default UploadForm;