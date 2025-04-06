import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlay, FiUser, FiCalendar, FiClock, FiHeart, FiHeadphones } from 'react-icons/fi';
import moment from 'moment';
import { FaPlay, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import api from '../utils/api';

const PodcastCard = ({ podcast, onLike }) => {
  const { user } = useAuth();
  const [isLiking, setIsLiking] = useState(false);
  const [likes, setLikes] = useState(podcast.likes || []);
  const isLiked = user && likes.includes(user._id);
  
  // Format duration from seconds to MM:SS
  const formatDuration = (seconds) => {
    if (!seconds) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  // Truncate description
  const truncateDescription = (text, maxLength = 120) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast.error('Please login to like podcasts');
      return;
    }

    if (isLiking) return;

    try {
      setIsLiking(true);
      const response = await api.put(`/podcasts/${podcast._id}/like`);
      
      if (response.data.success) {
        const newLikes = isLiked
          ? likes.filter(id => id !== user._id)
          : [...likes, user._id];
        setLikes(newLikes);
        
        // Call the onLike callback if provided
        if (onLike) {
          onLike(podcast._id, !isLiked);
        }

        toast.success(isLiked ? 'Podcast unliked' : 'Podcast liked');
      }
    } catch (err) {
      console.error('Failed to like podcast:', err);
      toast.error('Failed to like podcast');
    } finally {
      setIsLiking(false);
    }
  };

  const handlePlay = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await api.put(`/podcasts/${podcast._id}/play`);
    } catch (err) {
      console.error('Failed to record play:', err);
    }
  };

  // Get the cover image URL
  const getCoverImageUrl = () => {
    if (!podcast.coverImage) return '/default-podcast-cover.jpg';
    return podcast.coverImage.url || podcast.coverImage || '/default-podcast-cover.jpg';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <Link to={`/podcast/${podcast._id}`} className="block">
        {/* Cover Image */}
        <div className="relative aspect-[4/3] overflow-hidden group">
          <img
            src={getCoverImageUrl()}
            alt={podcast.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/default-podcast-cover.jpg';
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button
              onClick={handlePlay}
              className="bg-white text-blue-600 p-4 rounded-full transform scale-75 group-hover:scale-100 transition-transform duration-300"
            >
              <FiPlay className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title and Creator */}
          <div className="mb-2">
            <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">{podcast.title}</h3>
            <p className="text-sm text-gray-600">
              By {podcast.creator?.username || 'Unknown Creator'}
            </p>
          </div>

          {/* Category */}
          <div className="flex flex-wrap gap-2 mb-2">
            {podcast.category && (
              <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                {typeof podcast.category === 'object' ? podcast.category.name : podcast.category}
              </span>
            )}
            <span className="text-gray-400 text-xs">
              {moment(podcast.createdAt).fromNow()}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {truncateDescription(podcast.description)}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <FiHeadphones className="w-4 h-4" />
                <span>{podcast.plays || 0}</span>
              </div>
              <button
                onClick={handleLike}
                className={`flex items-center space-x-1 transition-colors duration-300 ${
                  isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                }`}
                disabled={isLiking}
              >
                {isLiked ? <FaHeart className="w-4 h-4" /> : <FaRegHeart className="w-4 h-4" />}
                <span>{likes.length}</span>
              </button>
            </div>
            {podcast.audioFile?.duration && (
              <div className="flex items-center space-x-1">
                <FiClock className="w-4 h-4" />
                <span>{formatDuration(podcast.audioFile.duration)}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PodcastCard;