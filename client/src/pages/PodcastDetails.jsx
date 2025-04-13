import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { FiHeart, FiShare2, FiDownload, FiPlay, FiPause } from "react-icons/fi";
import { toast } from "react-toastify";
import api from "../utils/api";

const PodcastDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio());
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLiking, setIsLiking] = useState(false);
  const [tagData, setTagData] = useState([]);
  const [isLoadingTags, setIsLoadingTags] = useState(false);

  useEffect(() => {
    const fetchPodcast = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/podcasts/${id}`);
        if (response.data.success) {
          setPodcast(response.data.data);
          setError(null);

          // If there's an audio file, set it up
          if (response.data.data.audioFile?.url) {
            audio.src = response.data.data.audioFile.url;
          }
        } else {
          throw new Error("Failed to fetch podcast");
        }
      } catch (err) {
        console.error("Error fetching podcast:", err);
        setError("Failed to load podcast details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPodcast();
  }, [id, audio]);

  // Fetch tag data if needed
  useEffect(() => {
    const fetchTagData = async () => {
      // Only fetch tag data if podcast has tags and they appear to be IDs
      if (podcast?.tags && podcast.tags.length > 0 && 
          podcast.tags.some(tag => typeof tag === 'string' && tag.match(/^[0-9a-fA-F]{24}$/))) {
        try {
          setIsLoadingTags(true);
          const response = await api.get('/tags');
          if (response.data.success) {
            setTagData(response.data.data);
          }
        } catch (err) {
          console.error("Error fetching tags:", err);
        } finally {
          setIsLoadingTags(false);
        }
      }
    };

    fetchTagData();
  }, [podcast]);

  useEffect(() => {
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleAudioEnded);
    audio.addEventListener("error", (e) => {
      console.error("Audio error:", e);
      toast.error("Error loading audio file");
      setIsPlaying(false);
    });

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleAudioEnded);
      audio.removeEventListener("error", () => {});
      audio.pause();
    };
  }, [audio]);

  const handleTimeUpdate = () => {
    setCurrentTime(audio.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audio.duration);
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const togglePlay = () => {
    if (!podcast) return;

    if (isPlaying) {
      audio.pause();
    } else {
      if (!podcast.audioFile?.url) {
        toast.error("Audio file not available");
        return;
      }
      audio.src = podcast.audioFile.url;
      audio.play().catch((err) => {
        console.error("Error playing audio:", err);
        toast.error("Failed to play audio. Please try again.");
        setIsPlaying(false);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleLike = async () => {
    if (!user) {
      toast.error("Please login to like this podcast");
      return;
    }

    if (isLiking) return;

    try {
      setIsLiking(true);
      const response = await api.put(`/podcasts/${id}/like`);

      if (response.data.success) {
        // Update the podcast state with the new likes array
        setPodcast((prevPodcast) => ({
          ...prevPodcast,
          likes: isLiked
            ? (prevPodcast.likes || []).filter((likeId) => likeId !== user._id)
            : [...(prevPodcast.likes || []), user._id],
        }));

        toast.success(isLiked ? "Podcast unliked" : "Podcast liked");
      }
    } catch (err) {
      console.error("Error liking podcast:", err);
      toast.error("Failed to like podcast. Please try again.");
    } finally {
      setIsLiking(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const handleDownload = (url) => {
    if (!url) return;
  
    // Insert 'fl_attachment' after 'upload' in the Cloudinary URL
    const downloadUrl = url.replace('/upload/', '/upload/fl_attachment/');
  
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', 'PodcastAudio.mp3'); // Optional filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Helper function to find tag name from tag ID
  const findTagName = (tag) => {
    // If tag is already an object with name property, return the name
    if (typeof tag === 'object' && tag.name) {
      return tag.name;
    }
    
    // If tag is an ID, find corresponding tag in tagData
    if (typeof tag === 'string') {
      const foundTag = tagData.find(t => t._id === tag);
      if (foundTag) {
        return foundTag.name;
      }
    }
    
    // If no match is found, return the tag itself as fallback
    return tag;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold mb-2">
            Oops! Something went wrong
          </p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!podcast) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500">Podcast not found</p>
      </div>
    );
  }

  const isLiked = user && podcast.likes?.includes(user._id);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Cover Image */}
        <div className="relative h-64 md:h-96">
          <img
            src={podcast.coverImage?.url || "/default-podcast-cover.jpg"}
            alt={podcast.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "/default-podcast-cover.jpg";
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {podcast.title}
            </h1>
            <p className="text-lg opacity-90">
              By {podcast.creator?.username || "Unknown Creator"} •{" "}
              {podcast.category?.name || "Uncategorized"}
            </p>
          </div>
        </div>

        {/* Audio Player */}
        <div className="p-6 border-b">
          <div className="flex items-center space-x-4">
            <button
              onClick={togglePlay}
              className="p-4 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              {isPlaying ? <FiPause size={24} /> : <FiPlay size={24} />}
            </button>
            <div className="flex-1">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-b flex justify-between items-center">
          <div className="flex space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isLiked
                  ? "bg-pink-50 text-pink-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <FiHeart />
              <span>{podcast.likes?.length || 0}</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <FiShare2 />
              <span>Share</span>
            </button>
          </div>
          <button
            onClick={() => handleDownload(podcast.audioFile?.url)}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <FiDownload />
            <span>Download</span>
          </button>
        </div>

        {/* Description */}
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">About this episode</h2>
          <p className="text-gray-600 whitespace-pre-wrap">
            {podcast.description}
          </p>
        </div>

        {/* Tags - Updated to use findTagName function */}
        {podcast.tags && podcast.tags.length > 0 && (
          <div className="px-6 pb-6">
            <div className="flex flex-wrap gap-2">
              {isLoadingTags ? (
                <span className="text-sm text-gray-500">Loading tags...</span>
              ) : (
                podcast.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                  >
                    {findTagName(tag)}
                  </span>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PodcastDetails;