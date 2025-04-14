// server/controllers/contactController.js
const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE, // e.g., 'gmail'
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,   
  },
});

// Contact form handler
exports.sendContactMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;
  
  try {
    // Email content - now showing as coming from the user's email
    const mailOptions = {
      from: `"${name}" <${email}>`, // This makes it appear from the user's email
      replyTo: email, // So you can reply directly to the user
      to: process.env.CONTACT_EMAIL_RECIPIENT, // Your email where you receive contacts
      subject: `PodStream Contact: ${subject || 'New Contact Form Submission'}`,
      html: `
        <h2>New Contact Message from PodStream</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
        <h3>Message:</h3>
        <p>${message}</p>   
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
      from: process.env.EMAIL_USER,
      to: process.env.NEWSLETTER_EMAIL_RECIPIENT, // Your admin email 
      subject: 'New Newsletter Subscription',
      html: `
        <h2>New Newsletter Subscription</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p>A new user has subscribed to the PodStream newsletter.</p>
      `,
    };
    
    // Send email notification to admin
    await transporter.sendMail(notificationMail);
    
    // Send confirmation to subscriber - from your system email
    const confirmationMail = {
      from: `"PodStream" <${process.env.EMAIL_USER}>`, // This ensures it comes from your system email
      to: email, // The subscriber's email
      subject: 'Welcome to PodStream Newsletter!',
      html: `
        <h2>Thank you for subscribing!</h2>
        <p>You've successfully subscribed to PodStream's newsletter.</p>
        <p>Stay tuned for weekly podcast recommendations, platform updates, creator tips, and exclusive events.</p>
        <p>The PodStream Team</p>
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