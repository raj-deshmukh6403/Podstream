const express = require('express');
const router = express.Router();
const Tag = require('../models/Tag');
const { protect, authorize } = require('../middleware/authMiddleware');

// Get all tags
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.find();
    res.json({
      success: true,
      data: tags,
      message: 'Tags fetched successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});


// Create a new tag (protected, admin only)
router.post('/', protect, authorize('admin'), async (req, res) => {
  const tag = new Tag({
    name: req.body.name
  });

  try {
    const newTag = await tag.save();
    res.status(201).json({
      success: true,
      data: newTag,
      message: 'Tag created successfully'
    });
    
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});


module.exports = router; 
