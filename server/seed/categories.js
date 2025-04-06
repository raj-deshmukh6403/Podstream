const mongoose = require('mongoose');
const Category = require('../models/Category');
require('dotenv').config();

const categories = [
  {
    name: 'Technology',
    description: 'Tech news, reviews, and discussions',
    slug: 'technology'
  },
  {
    name: 'Entertainment',
    description: 'Movies, TV shows, and pop culture',
    slug: 'entertainment'
  },
  {
    name: 'Education',
    description: 'Learning and educational content',
    slug: 'education'
  },
  {
    name: 'Business',
    description: 'Business news and entrepreneurship',
    slug: 'business'
  },
  {
    name: 'Health & Wellness',
    description: 'Health, fitness, and wellness topics',
    slug: 'health-wellness'
  },
  {
    name: 'Music',
    description: 'Music reviews, interviews, and discussions',
    slug: 'music'
  }
];

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing categories
    await Category.deleteMany({});
    console.log('Cleared existing categories');

    // Insert new categories
    const result = await Category.insertMany(categories);
    console.log('Categories seeded successfully:', result);

    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error seeding categories:', error);
    process.exit(1);
  }
};

// Run the seed function if this file is run directly
if (require.main === module) {
  seedCategories();
} 