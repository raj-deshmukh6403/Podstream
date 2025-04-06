const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('../models/Category');

dotenv.config();

const categories = [
  {
    name: 'Technology',
    description: 'Tech news, reviews, and discussions',
    slug: 'technology'
  },
  {
    name: 'Business',
    description: 'Business news and entrepreneurship',
    slug: 'business'
  },
  {
    name: 'Education',
    description: 'Educational content and learning resources',
    slug: 'education'
  },
  {
    name: 'Entertainment',
    description: 'Movies, TV shows, and pop culture',
    slug: 'entertainment'
  },
  {
    name: 'Science',
    description: 'Scientific discoveries and research',
    slug: 'science'
  }
];

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    try {
      await Category.deleteMany({}); // Clear existing categories
      await Category.insertMany(categories);
      console.log('Categories seeded successfully');
    } catch (error) {
      console.error('Error seeding categories:', error);
    }
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }); 