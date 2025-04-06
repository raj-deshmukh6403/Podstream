const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const sendEmail = require('../utils/emailSender');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'temp/');  // Temporary folder before uploading to Cloudinary
  },
  filename: function(req, file, cb) {
    cb(null, `user-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

exports.upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // 5MB limit
});
exports.uploadProfileImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a file'
      });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'profile-images',
      width: 500,
      height: 500,
      crop: 'limit'
    });

    // Remove the temporary file
    fs.unlinkSync(req.file.path);

    // Update user with Cloudinary image data
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { 
        profileImage: {
          public_id: result.public_id,
          url: result.secure_url
        } 
      },
      { new: true, select: '-password' }
    );

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    // If there's an error, make sure to remove the temporary file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    next(error);
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private
exports.getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    
    // Find user by ID
    const user = await User.findById(userId);
    
    // Check if user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message:` No user found with id ${userId}`
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// Add a function to delete the image from Cloudinary
exports.deleteProfileImage = async (userId) => {
  try {
    const user = await User.findById(userId);
    
    // Delete the image from Cloudinary if it's not the default
    if (user.profileImage && user.profileImage.public_id) {
      await cloudinary.uploader.destroy(user.profileImage.public_id);
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting profile image:', error);
    return false;
  }
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res, next) => {
  try {
    console.log('Registration request body:', req.body);

    const { username, email, password, role } = req.body;

    console.log('Extracted values:', { username, email, hasPassword: !!password, role });

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User with that email already exists'
      });
    }

    // Create user with selected role
    const user = await User.create({
      username,
      email,
      password,
      role // use role from frontend
    });

    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    user.password = undefined;

    res.status(201).json({
      success: true,
      token,
      user
    });
  } catch (error) {
    next(error);
  }
};


// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email and password'
      });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    // Remove password from response
    user.password = undefined;

    res.status(200).json({
      success: true,
      token,
      user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user details
// @route   PUT /api/auth/profile
// @access  Private
exports.updateDetails = async (req, res, next) => {
  try {
    const { username, bio, notificationPreferences } = req.body;
    const fieldsToUpdate = {
      username,
      bio,
      notificationPreferences
    };

    const user = await User.findByIdAndUpdate(
      req.user.id,
      fieldsToUpdate,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update password
// @route   PUT /api/auth/password
// @access  Private
exports.updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('+password');

    // Check current password
    const isMatch = await user.matchPassword(req.body.currentPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    user.password = req.body.newPassword;
    await user.save();

    // Generate token and send response
    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users (admin only)
// @route   GET /api/users
// @access  Private/Admin
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user role (admin only)
// @route   PUT /api/users/:id/role
// @access  Private/Admin
exports.updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;

    if (!['user', 'creator', 'admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role. Role must be user, creator, or admin'
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      {
        new: true,
        runValidators: true
      }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: `No user found with id ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Logout user / clear cookie
// @route   GET /api/auth/logout
// @access  Private
exports.logout = async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    message: 'User logged out successfully'
  });
};

// Helper function to generate token and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    success: true,
    token,
    data: user
  });
};






exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit
    const otpExpires = Date.now() + 10 * 60 * 1000; // 10 mins

    
    user.otp = otp;
    user.otpExpires = otpExpires;
    user.otpVerified = false;

    await user.save();

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2 style="color: #2c5282;">OTP for Password Reset</h2>
        <p>Use the following OTP to reset your password. It expires in 10 minutes:</p>
        <h3 style="text-align: center; color: #3182ce;">${otp}</h3>
        <p>The otp will expire in 10 minutes.</p>
        <br><br>
        <p>If you didn’t request this, ignore this email.</p>
      </div>
    `;

    await sendEmail({
      email: user.email,
      subject: 'Your OTP for Password Reset',
      message: `Your OTP is ${otp}`,
      html,
    });

    res.status(200).json({ message: 'OTP sent to email' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Validate OTP & reset password
// POST /api/users/reset-password
// controllers/userController.js
exports.resetPassword = async (req, res) => {
  try {
    const { email,password } = req.body;

    // console.log("RESET PASSWORD REQ:", email, otp, /password);
    

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // console.log(user.otp);
    

    user.password = password;


    await user.save();

    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};




// Token validation route remains unchanged (optional or can be removed if frontend doesn't use it)
exports.validateResetToken = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'OTP is invalid or expired' });
    }

    res.status(200).json({ message: 'OTP is valid' });
  } catch (error) {
    console.error('Validate token error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// controllers/userController.js

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    console.log("OTP VERIFY REQ:", email, otp);

    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found");
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    console.log("Stored OTP:", user.otp);
    console.log("Stored Expiry:", new Date(user.otpExpiry));
    console.log("Now:", new Date());

    if (!user.otp || user.otp !== otp) {
      console.log("OTP mismatch");
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    if (user.otpExpiry < Date.now()) {
      console.log("OTP expired");
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // ✅ Success: OTP matched
    user.otp = undefined;
    user.otpExpiry = undefined;
    user.otpVerified = true;
    await user.save();

    console.log("OTP verified successfully");
    res.status(200).json({ message: 'OTP verified successfully' });

  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};