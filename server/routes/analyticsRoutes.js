const express = require('express');
const {
  getPodcastAnalytics,
  recordAnalyticsEvent,
  getUserAnalytics,
  exportAnalytics
} = require('../controllers/analyticsController');

const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Get podcast analytics
router.get('/podcast/:podcastId', protect, getPodcastAnalytics);

// Get user analytics summary
router.get('/user/summary', protect, getUserAnalytics);

// Record analytics event (public endpoint)
router.post('/record', recordAnalyticsEvent);

// Export analytics (admin only)
router.get('/export', protect, authorize('admin'), exportAnalytics);

module.exports = router;