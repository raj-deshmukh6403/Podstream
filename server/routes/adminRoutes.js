const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  addUser,
  getStats,
  getAnalytics,
  getTags,
  getReports,
  generateReport,
  getPodcasts,
  getUsers,
  updateUserRole,
  deleteUser,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  createTag,
  updateTag,
  deleteTag,
  deletePodcast,
  updatePodcastStatus,
  updatePodcast
} = require('../controllers/adminController');

// Protect all routes
router.use(protect);
router.use(authorize('admin'));

// Stats routes
router.get('/stats', getStats);

// Analytics routes
router.get('/analytics', getAnalytics);

// Users routes
router.post('/users', addUser);
router.get('/users', getUsers);
router.patch('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);

// Podcasts routes
router.get('/podcasts', getPodcasts);
router.delete('/podcasts/:id', deletePodcast);
router.patch('/podcasts/:id/status', updatePodcastStatus);
router.put('/podcasts/:id', updatePodcast);

// Categories routes
router.get('/categories', getCategories);
router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

// Tags routes
router.get('/tags', getTags);
router.post('/tags', createTag);
router.put('/tags/:id', updateTag);
router.delete('/tags/:id', deleteTag);

// Reports routes
router.get('/reports', getReports);
router.post('/reports/generate', generateReport);

module.exports = router; 