const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Podcast = require('../models/Podcast');
const Category = require('../models/Category');
const Tag = require('../models/Tag');
const cloudinary = require('../utils/cloudinary');



exports.addUser = async (req, res, next) => {
  try {
    console.log('Add user request body:', req.body);

    const { username, email, password, role } = req.body;

    console.log('Extracted values:', { username, email, hasPassword: !!password, role });

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User with that email already exists'
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user with selected role
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role // use role from frontend
    });

    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    user.password = undefined; // Hide the password field from response

    res.status(201).json({
      success: true,
      token,
      user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
exports.getStats = async (req, res) => {
  try {
    const [totalUsers, totalPodcasts, totalCategories, totalTags] = await Promise.all([
      User.countDocuments(),
      Podcast.countDocuments(),
      Category.countDocuments(),
      Tag.countDocuments()
    ]);

    // Get recent activity (last 10 items)
    const recentActivity = await Promise.all([
      // Get recent user registrations
      User.find({}, 'username createdAt')
        .sort({ createdAt: -1 })
        .limit(5)
        .then(users => users.map(user => ({
          type: 'user',
          message: `New user ${user.username} registered`,
          timestamp: user.createdAt
        }))),
      // Get recent podcasts
      Podcast.find({}, 'title creator createdAt')
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('creator', 'username')
        .then(podcasts => podcasts.map(podcast => ({
          type: 'podcast',
          message: `New podcast "${podcast.title}" uploaded by ${podcast.creator.username}`,
          timestamp: podcast.createdAt
        })))
    ]).then(results => {
      const [userActivity, podcastActivity] = results;
      return [...userActivity, ...podcastActivity]
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 10);
    });

    // Get system status
    const systemStatus = {
      cpu: Math.round(Math.random() * 30), // Simulated CPU usage (0-30%)
      memory: Math.round(Math.random() * 40 + 20), // Simulated memory usage (20-60%)
      storage: Math.round(Math.random() * 30 + 10), // Simulated storage usage (10-40%)
      uptime: Math.floor(process.uptime()) // Server uptime in seconds
    };

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalPodcasts,
        totalCategories,
        totalTags,
        recentActivity,
        systemStatus
      }
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching admin statistics'
    });
  }
};

// Get all podcasts with pagination, search, and filtering
exports.getPodcasts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const category = req.query.category !== 'all' ? req.query.category : null;
    
    const skip = (page - 1) * limit;

    // Build query
    const query = {};
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    if (category) {
      query.category = category;
    }

    // Get total count for pagination
    const total = await Podcast.countDocuments(query);

    // Fetch podcasts with populated fields
    const podcasts = await Podcast.find(query)
      .populate('creator', 'username email')
      .populate('category', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: podcasts,
      total,
      page,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error fetching podcasts:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching podcasts'
    });
  }
};

// Get analytics data
exports.getAnalytics = async (req, res) => {
  try {
    const { period = 'week' } = req.query;
    
    // Get date range based on period
    const getDateRange = () => {
      const now = new Date();
      switch (period) {
        case 'week':
          return new Date(now.setDate(now.getDate() - 7));
        case 'month':
          return new Date(now.setMonth(now.getMonth() - 1));
        case 'year':
          return new Date(now.setFullYear(now.getFullYear() - 1));
        default:
          return new Date(now.setDate(now.getDate() - 7));
      }
    };

    const startDate = getDateRange();

    // Get new users and podcasts count
    const [newUsers, newPodcasts, totalUsers] = await Promise.all([
      User.countDocuments({ createdAt: { $gte: startDate } }),
      Podcast.countDocuments({ createdAt: { $gte: startDate } }),
      User.countDocuments()
    ]);

    // Get user growth data by day
    const userGrowth = await User.aggregate([
      {
        $match: { createdAt: { $gte: startDate } }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    // Calculate active users (simulated - in a real app, this would be based on actual user activity)
    const activeUsers = Math.round(totalUsers * 0.7); // Assuming 70% of users are active

    // Calculate growth rate
    const previousPeriod = new Date(startDate);
    previousPeriod.setDate(previousPeriod.getDate() - (period === 'week' ? 7 : period === 'month' ? 30 : 365));
    
    const previousUsersCount = await User.countDocuments({
      createdAt: { $gte: previousPeriod, $lt: startDate }
    });

    const growthRate = previousUsersCount === 0 ? 0 : 
      ((newUsers - previousUsersCount) / previousUsersCount) * 100;

    res.status(200).json({
      success: true,
      data: {
        newUsers,
        newPodcasts,
        activeUsers,
        growthRate,
        userGrowth,
        period,
        totalUsers
      }
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching analytics data'
    });
  }
};

// Get all tags with usage count
exports.getTags = async (req, res) => {
  try {
    const tags = await Tag.aggregate([
      {
        $lookup: {
          from: 'podcasts',
          localField: '_id',
          foreignField: 'tags',
          as: 'podcasts'
        }
      },
      {
        $project: {
          name: 1,
          podcastCount: { $size: '$podcasts' },
          createdAt: 1,
          updatedAt: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: tags
    });
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching tags'
    });
  }
};

// Generate and get reports
exports.getReports = async (req, res) => {
  try {
    const reports = await generateReports();
    res.status(200).json({
      success: true,
      data: reports
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching reports'
    });
  }
};

// Generate a new report
exports.generateReport = async (req, res) => {
  try {
    const { type, format } = req.body;
    
    if (!type || !format) {
      return res.status(400).json({
        success: false,
        message: 'Report type and format are required'
      });
    }

    // Here you would implement the actual report generation logic
    const report = {
      id: Date.now(),
      name: `${type}-report-${new Date().toISOString().split('T')[0]}`,
      type,
      format,
      createdAt: new Date(),
      createdBy: req.user.id,
      status: 'completed',
      downloadUrl: `/api/admin/reports/download/${Date.now()}`
    };

    res.status(200).json({
      success: true,
      data: report
    });
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating report'
    });
  }
};

// Helper function to generate reports (mock data for now)
const generateReports = async () => {
  return [
    {
      id: 1,
      name: 'User Activity Report',
      type: 'user',
      format: 'PDF',
      createdAt: new Date(),
      createdBy: 'System',
      status: 'completed',
      downloadUrl: '/reports/user-activity.pdf'
    },
    {
      id: 2,
      name: 'Content Analytics Report',
      type: 'analytics',
      format: 'CSV',
      createdAt: new Date(),
      createdBy: 'System',
      status: 'completed',
      downloadUrl: '/reports/content-analytics.csv'
    }
  ];
};

// @desc    Get all users with pagination and filtering
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const role = req.query.role || '';
    
    const skip = (page - 1) * limit;

    // Build query
    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { username: { $regex: search, $options: 'i' } }
      ];
    }
    if (role) {
      query.role = role;
    }

    const total = await User.countDocuments(query);
    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: {
        users,
        total,
        page,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users'
    });
  }
};

// @desc    Update user role
// @route   PATCH /api/admin/users/:id/role
// @access  Private/Admin
exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    const validRoles = ['user', 'creator', 'admin'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role'
      });
    }

    user.role = role;
    await user.save();

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating user role'
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Replace user.remove() with deleteOne() method
    await User.deleteOne({ _id: req.params.id });
    // Alternatively, you can use: await user.deleteOne();

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting user'
    });
  }
};

// Get all categories with usage count
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.aggregate([
      {
        $lookup: {
          from: 'podcasts',
          localField: '_id',
          foreignField: 'category',
          as: 'podcasts'
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          podcastCount: { $size: '$podcasts' },
          createdAt: 1,
          updatedAt: 1
        }
      },
      {
        $sort: { name: 1 }
      }
    ]);

    // Convert ObjectId to string for proper comparison
    const processedCategories = categories.map(category => ({
      ...category,
      _id: category._id.toString()
    }));

    res.status(200).json({
      success: true,
      data: processedCategories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching categories'
    });
  }
};

// Create new category
// Create new category
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Category name is required'
      });
    }

    // Generate a slug from the name
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');

    const category = await Category.create({
      name,
      description,
      slug
    });

    res.status(201).json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating category'
    });
  }
};

// Update category
// Update category
exports.updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    
    // Generate a slug if name is provided
    const updateData = { name, description };
    
    if (name) {
      updateData.slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
    }
    
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating category'
    });
  }
};
// Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting category'
    });
  }
};

// @desc    Create tag
// @route   POST /api/admin/tags
// @access  Private/Admin
exports.createTag = async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Tag name is required'
      });
    }
    
    // Generate slug here if the pre-save hook doesn't work
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    
    const tag = await Tag.create({ 
      name,
      slug
    });
    
    res.status(201).json({
      success: true,
      data: tag
    });
  } catch (error) {
    console.error('Error creating tag:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Tag with this name already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error creating tag'
    });
  }
};

// @desc    Update tag
// @route   PUT /api/admin/tags/:id
// @access  Private/Admin
exports.updateTag = async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Tag name is required'
      });
    }
    
    // Generate the slug
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    
    const tag = await Tag.findByIdAndUpdate(
      req.params.id,
      { name, slug },
      { new: true, runValidators: true }
    );

    if (!tag) {
      return res.status(404).json({
        success: false,
        message: 'Tag not found'
      });
    }

    res.status(200).json({
      success: true,
      data: tag
    });
  } catch (error) {
    console.error('Error updating tag:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Tag with this name already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error updating tag'
    });
  }
};

// @desc    Delete tag
// @route   DELETE /api/admin/tags/:id
// @access  Private/Admin
exports.deleteTag = async (req, res) => {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id);

    if (!tag) {
      return res.status(404).json({
        success: false,
        message: 'Tag not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Tag deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting tag:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting tag'
    });
  }
};

// @desc    Delete podcast
// @route   DELETE /api/admin/podcasts/:id
// @access  Private/Admin
exports.deletePodcast = async (req, res) => {
  try {
    const podcast = await Podcast.findById(req.params.id);
    if (!podcast) {
      return res.status(404).json({ success: false, message: "Podcast not found" });
    }

    // OPTIONAL: check if the user is allowed to delete (admin or creator)
    if (req.user.role !== 'admin' && podcast.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    // ✅ Delete thumbnail from Cloudinary
    if (podcast.thumbnailPublicId) {
      await cloudinary.uploader.destroy(podcast.thumbnailPublicId);
    }

    // ✅ Delete audio file from Cloudinary
    if (podcast.audioPublicId) {
      await cloudinary.uploader.destroy(podcast.audioPublicId, {
        resource_type: 'video'
      });
    }

    // ✅ Delete the podcast from DB
    await Podcast.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Podcast deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting podcast:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// @desc    Update podcast 
// @route   PUT /api/admin/podcasts/:id/
// @access  Private/Admin
exports.updatePodcast = async (req, res) => {
  try {
    const podcastData = req.body;
    const podcast = await Podcast.findByIdAndUpdate(
      req.params.id,
      podcastData,
      { new: true }
    ).populate('category creator');

    if (!podcast) {
      return res.status(404).json({
        success: false,
        message: 'Podcast not found'
      });
    }

    res.status(200).json({
      success: true,
      data: podcast
    });
  } catch (error) {
    console.error('Error updating podcast:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating podcast'
    });
  }
};


// @desc    Update podcast status
// @route   PATCH /api/admin/podcasts/:id/status
// @access  Private/Admin
exports.updatePodcastStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    // Map status string to isPublished boolean
    const isPublished = status === 'published';
    
    const podcast = await Podcast.findByIdAndUpdate(
      req.params.id,
      { isPublished },
      { new: true }
    );

    if (!podcast) {
      return res.status(404).json({
        success: false,
        message: 'Podcast not found'
      });
    }

    res.status(200).json({
      success: true,
      data: podcast
    });
  } catch (error) {
    console.error('Error updating podcast status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating podcast status'
    });
  }
};