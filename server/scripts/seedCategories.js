const mongoose = require('mongoose');
const Category = require('../models/Category');
require('dotenv').config();

const categories = [
  {
    name: 'Technology',
    description: 'Tech news, reviews, and discussions about the latest innovations'
  },
  {
    name: 'Science',
    description: 'Scientific discoveries, research, and explanations of complex topics'
  },
  {
    name: 'Business',
    description: 'Business news, entrepreneurship, and market analysis'
  },
  {
    name: 'Entertainment',
    description: 'Movies, TV shows, music, and celebrity news'
  },
  {
    name: 'Education',
    description: 'Educational content, learning resources, and academic discussions'
  }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    try {
      // Clear existing categories
      await Category.deleteMany({});
      console.log('Cleared existing categories');

      // Insert new categories
      const result = await Category.insertMany(categories);
      console.log(`Added ${result.length} categories`);
    } catch (error) {
      console.error('Error seeding categories:', error);
    }

    mongoose.connection.close();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  }); 