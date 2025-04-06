const User = require('../models/User');
const emailSender = require('../utils/emailSender');

// @desc    Send notification email
// @route   POST /api/email/notify
// @access  Private/Admin
exports.sendNotificationEmail = async (req, res, next) => {
  try {
    const { subject, message, userIds, sendToAll, emailType } = req.body;

    if (!subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide subject and message'
      });
    }

    // Validate user has permission to send emails
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only admins can send notification emails'
      });
    }

    let users = [];

    if (sendToAll) {
      // Get all users who have subscribed to this type of email
      const preferenceField = getPreferenceField(emailType);
      
      if (preferenceField) {
        users = await User.find({
          [`preferences.notifications.email.${preferenceField}`]: true
        });
      } else {
        users = await User.find();
      }
    } else if (userIds && userIds.length > 0) {
      users = await User.find({ _id: { $in: userIds } });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Please provide userIds or set sendToAll to true'
      });
    }

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No users found to send emails to'
      });
    }

    // Send emails
    const emailPromises = users.map(user => {
      return emailSender.sendEmail({
        email: user.email,
        subject,
        message: customizeMessage(message, user),
        type: emailType || 'general'
      });
    });

    await Promise.all(emailPromises);

    res.status(200).json({
      success: true,
      message: `Email sent to ${users.length} users`
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Send welcome email to new user
// @route   POST /api/email/welcome
// @access  Private
exports.sendWelcomeEmail = async (req, res, next) => {
  try {
    const userId = req.body.userId || req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Only allow admins to send welcome emails to other users
    if (userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to send emails to other users'
      });
    }

    const welcomeSubject = 'Welcome to Podcast Platform!';
    const welcomeMessage = `
      <h1>Welcome to our Podcast Platform, ${user.name}!</h1>
      <p>We're excited to have you join our community of podcast creators and listeners.</p>
      <p>Here are some things you can do right away:</p>
      <ul>
        <li>Explore our collection of podcasts</li>
        <li>Create your profile</li>
        <li>Start uploading your own podcasts</li>
      </ul>
      <p>If you have any questions, feel free to contact our support team.</p>
      <p>Happy podcasting!</p>
    `;

    await emailSender.sendEmail({
      email: user.email,
      subject: welcomeSubject,
      message: welcomeMessage,
      type: 'welcome'
    });

    res.status(200).json({
      success: true,
      message: 'Welcome email sent successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update email preferences
// @route   PUT /api/email/preferences
// @access  Private
exports.updateEmailPreferences = async (req, res, next) => {
  try {
    const { newPodcasts, weeklyDigest, marketing } = req.body.preferences || {};

    // Create preferences object with only defined fields
    const emailPreferences = {};
    
    if (newPodcasts !== undefined) {
      emailPreferences['preferences.notifications.email.newPodcasts'] = newPodcasts;
    }
    
    if (weeklyDigest !== undefined) {
      emailPreferences['preferences.notifications.email.weeklyDigest'] = weeklyDigest;
    }
    
    if (marketing !== undefined) {
      emailPreferences['preferences.notifications.email.marketing'] = marketing;
    }

    // Update user preferences
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: emailPreferences },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: user.preferences.notifications.email
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Send password reset email
// @route   POST /api/email/password-reset
// @access  Public
exports.sendPasswordResetEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email address'
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No user found with that email address'
      });
    }

    // Generate reset token (would normally use crypto)
    const resetToken = Math.random().toString(36).substr(2, 10);
    
    // Set token expiration (1 hour)
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 3600000;
    
    await user.save();

    // Create reset URL
    const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;
    
    const message = `
      <h1>Password Reset Request</h1>
      <p>You are receiving this email because you (or someone else) has requested a password reset.</p>
      <p>Please click on the following link to reset your password:</p>
      <a href="${resetUrl}" target="_blank">Reset Password</a>
      <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
    `;

    await emailSender.sendEmail({
      email: user.email,
      subject: 'Password Reset Request',
      message,
      type: 'passwordReset'
    });

    res.status(200).json({
      success: true,
      message: 'Password reset email sent'
    });
  } catch (error) {
    next(error);
  }
};

// Helper function to get the appropriate preference field based on email type
function getPreferenceField(emailType) {
  switch (emailType) {
    case 'newPodcast':
      return 'newPodcasts';
    case 'weeklyDigest':
      return 'weeklyDigest';
    case 'marketing':
      return 'marketing';
    default:
      return null;
  }
}

// Helper function to customize email message with user data
function customizeMessage(message, user) {
  // Replace placeholders with user data
  return message
    .replace(/\{name\}/g, user.name)
    .replace(/\{email\}/g, user.email);
}