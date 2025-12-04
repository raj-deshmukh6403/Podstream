const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({
      success: true,
      data: categories,
      message: 'Categories fetched successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Create a new category
router.post('/', async (req, res) => {
  const category = new Category({
    name: req.body.name,
    description: req.body.description,
    slug: req.body.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
  });

  try {
    const newCategory = await category.save();
    res.status(201).json({
      success: true,
      data: newCategory,
      message: 'Category created successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});


router.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    
    // Map categories and add image URLs
    const categoriesWithImages = categories.map(category => {
      const categoryObj = category.toObject();
      
      // Create image URL based on category name or stored filename
      if (categoryObj.imageFilename) {
        categoryObj.imageUrl = `/images/categories/${categoryObj.imageFilename}`;
      } else {
        // Use name-based default if no specific image is set
        categoryObj.imageUrl = `/images/categories/${categoryObj.name.toLowerCase()}.jpg`;
      }

      
      return categoryObj;
    });
    
    res.json({ success: true, data: categoriesWithImages });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


module.exports = router; 
