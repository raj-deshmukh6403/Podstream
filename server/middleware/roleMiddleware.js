const User = require('../models/User');

// Middleware to check if user can perform creator-specific actions
exports.isCreator = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if user is a creator or admin (admins have all creator permissions)
    if (user.role !== 'creator' && user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You need to be a creator to perform this action'
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

// Check if user is the owner of the resource or an admin
exports.isOwnerOrAdmin = (model) => async (req, res, next) => {
  try {
    const resourceId = req.params.id;
    const resource = await model.findById(resourceId);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    // Check if resource has a creator field and if it matches the user
    const isOwner = resource.creator && 
      resource.creator.toString() === req.user.id;
    
    // If not owner and not admin, deny access
    if (!isOwner && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to modify this resource'
      });
    }

    // Add resource to request for future use
    req.resource = resource;
    next();
  } catch (error) {
    next(error);
  }
};