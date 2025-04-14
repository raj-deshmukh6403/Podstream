const express = require('express');
const {
  getPodcasts,
  getPodcast,
  createPodcast,
  updatePodcast,
  deletePodcast,
  likePodcast,
  recordPlay,
  getPodcastsByUser,
  getPodcastStats,
  getUserPodcasts,
  getRandomPodcast
} = require('../controllers/podcastController');

const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Get podcast statistics (protected route)
router.get('/stats', protect, getPodcastStats);

// Get all podcasts / Create new podcast
router.route('/')
  .get(getPodcasts)
  .post(protect, authorize('creator', 'admin'), createPodcast);

router.get('/randompodcast',getRandomPodcast);  

// Get user's podcasts
router.get('/user', protect, getUserPodcasts);

// Get podcasts by specific user ID
router.get('/user/:userId', getPodcastsByUser);

// Get, update, delete specific podcast
router.route('/:id')
  .get(getPodcast)
  .put(protect, updatePodcast)
  .delete(protect, deletePodcast);

// Like/unlike podcast
router.route('/:id/like')
  .put(protect, likePodcast);

// Record play
router.route('/:id/play')
  .put(recordPlay);

module.exports = router;