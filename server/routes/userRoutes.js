const express = require('express');
const {
  registerUser,
  loginUser,
  getMe,
  updateDetails,
  updatePassword,
  getUsers,
  updateUserRole,
  logout,
  getUserById,
  uploadProfileImage,
  upload,
  forgotPassword,
  verifyOtp,
  resetPassword
} = require('../controllers/userController');

const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();


// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);

// Protected routes 


// In userRoutes.js or authRoutes.js
router.put('/profile/image', protect, upload.single('profileImage'), uploadProfileImage);
router.get('/me', protect, getMe);
router.get('/:id', protect, getUserById);
router.put('/profile', protect, updateDetails);
router.put('/password', protect, updatePassword);

// Special route to upgrade to creator
router.put('/upgrade-to-creator', protect, async (req, res) => {
  try {
    const user = await require('../models/User').findByIdAndUpdate(
      req.user.id,
      { role: 'creator' },
      { new: true }
    );
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to upgrade role'
    });
  }
});

// Admin only routes
router.get('/', protect, authorize('admin'), getUsers);
router.put('/:id/role', protect, authorize('admin'), updateUserRole);

module.exports = router;