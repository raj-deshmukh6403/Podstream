const express = require('express');
const {
  sendNotificationEmail,
  sendWelcomeEmail,
  updateEmailPreferences,
  sendPasswordResetEmail
} = require('../controllers/emailController');

const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Admin routes
router.post('/notify', protect, authorize('admin'), sendNotificationEmail);

// User routes
router.post('/welcome', protect, sendWelcomeEmail);
router.put('/preferences', protect, updateEmailPreferences);

// Public routes
router.post('/password-reset', sendPasswordResetEmail);

module.exports = router;