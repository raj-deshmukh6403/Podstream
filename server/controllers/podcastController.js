const Podcast = require('../models/Podcast');
const User = require('../models/User');
const cloudinary = require('../utils/cloudinary');
const { default: mongoose } = require('mongoose');
const Tag = require("../models/Tag"); // Import Tag in controllers or models


// @desc    Get all podcasts
// @route   GET /api/podcasts
// @access  Public
exports.getPodcasts = async (req, res, next) => {
  try {
    let query;

    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude from filtering
    const removeFields = ['select', 'sort', 'page', 'limit', 'search'];
    removeFields.forEach(param => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // Finding resource
    query = Podcast.find(JSON.parse(queryStr))
      .populate('creator', 'username profileImage')
      .populate('category', 'name')
      .populate('tags', 'name');

    // Search functionality
    if (req.query.search) {
      query = query.find({ $text: { $search: req.query.search } });
    }

    // Select fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-publishedAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Podcast.countDocuments(JSON.parse(queryStr));

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const podcasts = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    res.status(200).json({
      success: true,
      count: podcasts.length,
      pagination,
      data: podcasts
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single podcast
// @route   GET /api/podcasts/:id
// @access  Public
exports.getPodcast = async (req, res, next) => {
  try {
    const podcast = await Podcast.findById(req.params.id)
      .populate('creator', 'username profileImage bio')
      .populate('category', 'name description')
      .populate('tags', 'name');

    if (!podcast) {
      return res.status(404).json({
        success: false,
        message: `No podcast found with id ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      data: podcast
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new podcast
// @route   POST /api/podcasts
// @access  Private
exports.createPodcast = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.creator = req.user.id;

    // Upload audio file to Cloudinary if present
    if (req.body.audioBase64) {
      try {
        console.log('Uploading audio file to Cloudinary...');
        // Remove the data:audio/mp3;base64, prefix if it exists
        const base64Audio = req.body.audioBase64.split(';base64,').pop();
        
        const audioResult = await cloudinary.uploader.upload(`data:audio/mp3;base64,${base64Audio}`, {
          resource_type: 'auto',
          folder: 'podcast_audio',
          format: 'mp3'
        });
        
        console.log('Audio file uploaded successfully:', audioResult.secure_url);

        req.body.audioFile = {
          url: audioResult.secure_url,
          publicId: audioResult.public_id,
          duration: audioResult.duration || 0
        };
      } catch (uploadError) {
        console.error('Error uploading audio to Cloudinary:', uploadError);
        return res.status(500).json({
          success: false,
          message: 'Error uploading audio file',
          error: uploadError.message
        });
      }
      // Remove base64 from request body
      delete req.body.audioBase64;
    }

    // Upload cover image if present
    if (req.body.imageBase64) {
      try {
        console.log('Uploading cover image to Cloudinary...');
        // Remove the data:image/jpeg;base64, prefix if it exists
        const base64Image = req.body.imageBase64.split(';base64,').pop();
        
        const imageResult = await cloudinary.uploader.upload(`data:image/jpeg;base64,${base64Image}`, {
          folder: 'podcast_covers'
        });
        
        console.log('Cover image uploaded successfully:', imageResult.secure_url);

        req.body.coverImage = {
          url: imageResult.secure_url,
          publicId: imageResult.public_id
        };
      } catch (uploadError) {
        console.error('Error uploading image to Cloudinary:', uploadError);
        return res.status(500).json({
          success: false,
          message: 'Error uploading cover image',
          error: uploadError.message
        });
      }
      // Remove base64 from request body
      delete req.body.imageBase64;
    }

   // Convert tags string to array if necessary
if (req.body.tags && typeof req.body.tags === 'string') {
  req.body.tags = req.body.tags.split(/[\s,]+/).filter(Boolean);
}
try {
  const podcast = await Podcast.create(req.body);
  console.log(podcast);
  res.status(201).json({
    success: true,
    message: "Podcast created successfully",
    data: podcast,
  });
} catch (error) {
  console.error("Error creating podcast:", error);
  res.status(500).json({
    success: false,
    message: "Failed to create podcast",
    error: error.message,
  });
}
  } catch (error) {
    console.error('Podcast creation error:', error);
    next(error);
  }
};

// @desc    Update podcast
// @route   PUT /api/podcasts/:id
// @access  Private
exports.updatePodcast = async (req, res, next) => {
  try {
    let podcast = await Podcast.findById(req.params.id);

    if (!podcast) {
      return res.status(404).json({
        success: false,
        message: `No podcast found with id ${req.params.id}`
      });
    }

    // Make sure user is podcast creator or an admin
    if (podcast.creator.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this podcast'
      });
    }

    // Upload new audio file if present
    if (req.body.audioBase64) {
      // Delete old audio file if exists
      if (podcast.audioFile?.publicId) {
        await cloudinary.uploader.destroy(podcast.audioFile.publicId, { resource_type: 'video' });
      }

      const audioResult = await cloudinary.uploader.upload(req.body.audioBase64, {
        resource_type: 'video',
        folder: 'podcast_audio'
      });

      req.body.audioFile = {
        url: audioResult.secure_url,
        publicId: audioResult.public_id,
        duration: audioResult.duration,
        audioPublicId: audioUpload.public_id,

      };

      // Remove base64 from request body
      delete req.body.audioBase64;
    }

    // Upload new cover image if present
    if (req.body.imageBase64) {
      // Delete old image if exists
      if (podcast.coverImage?.publicId) {
        await cloudinary.uploader.destroy(podcast.coverImage.publicId);
      }

      const imageResult = await cloudinary.uploader.upload(req.body.imageBase64, {
        folder: 'podcast_covers'
      });

      req.body.coverImage = {
        url: imageResult.secure_url,
        publicId: imageResult.public_id,
        thumbnailPublicId: thumbnailUpload.public_id
      };

      // Remove base64 from request body
      delete req.body.imageBase64;
    }

    podcast = await Podcast.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: podcast
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete podcast
// @route   DELETE /api/podcasts/:id
// @access  Private
exports.deletePodcast = async (req, res, next) => {
  try {
    const podcast = await Podcast.findById(req.params.id);

    if (!podcast) {
      return res.status(404).json({
        success: false,
        message: `No podcast found with id ${req.params.id}`
      });
    }

    // Make sure user is podcast creator or an admin
    if (podcast.creator.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this podcast'
      });
    }

    // Delete files from Cloudinary
    if (podcast.audioFile?.publicId) {
      await cloudinary.uploader.destroy(podcast.audioFile.publicId, { resource_type: 'video' });
    }

    if (podcast.coverImage?.publicId) {
      await cloudinary.uploader.destroy(podcast.coverImage.publicId);
    }

    await podcast.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Like/unlike podcast
// @route   PUT /api/podcasts/:id/like
// @access  Private
exports.likePodcast = async (req, res, next) => {
  try {
    const podcast = await Podcast.findById(req.params.id);

    if (!podcast) {
      return res.status(404).json({
        success: false,
        message: `No podcast found with id ${req.params.id}`
      });
    }

    // Check if user already liked the podcast
    const liked = podcast.likes.includes(req.user.id);

    if (liked) {
      // Unlike: Remove user from likes array
      podcast.likes = podcast.likes.filter(
        id => id.toString() !== req.user.id
      );
    } else {
      // Like: Add user to likes array
      podcast.likes.push(req.user.id);
    }

    await podcast.save();

    res.status(200).json({
      success: true,
      liked: !liked,
      likesCount: podcast.likes.length,
      data: podcast
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Increment podcast play count
// @route   PUT /api/podcasts/:id/play
// @access  Public
exports.recordPlay = async (req, res, next) => {
  try {
    const podcast = await Podcast.findById(req.params.id);

    if (!podcast) {
      return res.status(404).json({
        success: false,
        message: `No podcast found with id ${req.params.id}`
      });
    }

    podcast.plays += 1;
    await podcast.save();

    res.status(200).json({
      success: true,
      plays: podcast.plays
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get podcasts by user
// @route   GET /api/podcasts/user/:userId
// @access  Public
exports.getPodcastsByUser = async (req, res, next) => {
  try {
    const podcasts = await Podcast.find({ creator: req.params.userId })
      .populate('category', 'name')
      .populate('tags', 'name')
      .sort('-publishedAt');

    res.status(200).json({
      success: true,
      count: podcasts.length,
      data: podcasts
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get podcast statistics
// @route   GET /api/podcasts/stats
// @access  Private
exports.getPodcastStats = async (req, res, next) => {
  try {
    // Add match stage to filter by current user
    const stats = await Podcast.aggregate([
      {
        $match: { creator: new mongoose.Types.ObjectId(req.user.id) }
      },
      {
        $group: {
          _id: null,
          totalPodcasts: { $sum: 1 },
          totalPlays: { $sum: { $ifNull: ['$plays', 0] } },
          totalLikes: { $sum: { $size: { $ifNull: ['$likes', []] } } },
          avgDuration: { $avg: { $ifNull: ['$audioFile.duration', 0] } }
        }
      }
    ]);

    const result = stats.length > 0 ? stats[0] : {
      totalPodcasts: 0,
      totalPlays: 0,
      totalLikes: 0,
      avgDuration: 0
    };

    // Remove _id from result
    delete result._id;

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Stats error:', error);
    next(error);
  }
};

// @desc    Get current user's podcasts
// @route   GET /api/podcasts/user
// @access  Private
exports.getUserPodcasts = async (req, res, next) => {
  try {
    const podcasts = await Podcast.find({ creator: req.user.id })
      .populate('category', 'name')
      .populate('tags', 'name')
      .sort('-publishedAt');

    res.status(200).json({
      success: true,
      count: podcasts.length,
      data: podcasts
    });
  } catch (error) {
    next(error);
  }
};

exports.getRandomPodcast = async (req, res, next) => {
  try {
    const podcasts = await Podcast.aggregate([{ $sample: { size: 1 } }]);

    if (podcasts.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No podcasts found'
      });
    }

    const podcast = await Podcast.findById(podcasts[0]._id)
      .populate('creator', 'username profileImage bio')
      .populate('category', 'name description')
      .populate('Tag', 'name slug');



    res.status(200).json({
      success: true,
      data: podcast
    });
  } catch (error) {
    next(error);
  }
};