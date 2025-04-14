// server/controllers/contactController.js
const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE, // e.g., 'gmail'
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,   
  },
});

// Contact form handler
exports.sendContactMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;
  
  try {
    // Email content - now showing as coming from the user's email
    const mailOptions = {
        from: `"${name} via PodStream" <${process.env.EMAIL_USERNAME}>`,
        replyTo: email,
        to: process.env.CONTACT_EMAIL_RECIPIENT,
        subject: `PodStream Contact: ${subject || 'New Contact Form Submission'}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="text-align: center;">
              <h1 style="color: #4CAF50;">📬 New Inquiry from PodStream Contact</h1>
            </div>
            <div style="border: 1px solid #ddd; border-radius: 8px; padding: 20px; background-color: #f9f9f9;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
              <hr style="border: none; border-top: 1px solid #ddd;" />
              <h3>Message:</h3>
              <p style="white-space: pre-wrap; background-color: #fff; padding: 10px; border-radius: 8px; border: 1px solid #ddd;">${message}</p>
            </div>
            <footer style="text-align: center; margin-top: 20px; font-size: 12px; color: #777;">
              <p>Powered by PodStream</p>
            </footer>
          </div>
        `,
      };
    
    // Send email
    await transporter.sendMail(mailOptions);
    
    // Send success response
    res.status(200).json({ success: true, message: 'Your message has been sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send message. Please try again later.' });
  }
};

// Newsletter subscription handler
exports.subscribeToNewsletter = async (req, res) => {
  const { email } = req.body;
  
  try {
    // Email content for notification to admin
    const notificationMail = {
        from: process.env.EMAIL_USERNAME,
        to: process.env.NEWSLETTER_EMAIL_RECIPIENT,
        subject: 'New Newsletter Subscription',
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="text-align: center;">
              <h1 style="color: #007BFF;">📢 New Newsletter Subscription</h1>
            </div>
            <div style="border: 1px solid #ddd; border-radius: 8px; padding: 20px; background-color: #f9f9f9;">
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p>A new user has subscribed to the PodStream newsletter.</p>
            </div>
            <footer style="text-align: center; margin-top: 20px; font-size: 12px; color: #777;">
              <p>Powered by PodStream</p>
            </footer>
          </div>
        `,
      };
    
    // Send email notification to admin
    await transporter.sendMail(notificationMail);
    
    // Send confirmation to subscriber - from your system email
    const confirmationMail = {
        from: `"PodStream" <${process.env.EMAIL_USERNAME}>`,
        to: email,
        subject: 'Welcome to PodStream Newsletter!',
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="text-align: center;">
              <h1 style="color: #4CAF50;">🎉 Welcome to PodStream!</h1>
            </div>
            <div style="border: 1px solid #ddd; border-radius: 8px; padding: 20px; background-color: #f9f9f9;">
              <p>Hi there,</p>
              <p>Thank you for subscribing to PodStream's newsletter!</p>
              <p>Here's what you can look forward to:</p>
              <ul style="list-style: none; padding: 0;">
                <li>🎧 Weekly podcast recommendations</li>
                <li>📢 Platform updates</li>
                <li>💡 Creator tips and tricks</li>
                <li>🎉 Exclusive events and promotions</li>
              </ul>
              <p>Stay tuned for great content in your inbox!</p>
              <p>Best regards,<br>The PodStream Team</p>
            </div>
            <footer style="text-align: center; margin-top: 20px; font-size: 12px; color: #777;">
              <p>Follow us on:</p>
              <p>
                <a href="https://twitter.com/PodStream" style="text-decoration: none; color: #007BFF;">Twitter</a> | 
                <a href="https://facebook.com/PodStream" style="text-decoration: none; color: #007BFF;">Facebook</a> | 
                <a href="https://instagram.com/PodStream" style="text-decoration: none; color: #007BFF;">Instagram</a>
              </p>
            </footer>
          </div>
        `,
      };
    
    await transporter.sendMail(confirmationMail);
    
    // Send success response
    res.status(200).json({ success: true, message: 'You have successfully subscribed to our newsletter!' });
  } catch (error) {
    console.error('Error processing subscription:', error);
    res.status(500).json({ success: false, message: 'Failed to subscribe. Please try again later.' });
  }
};