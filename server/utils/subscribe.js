const nodemailer = require('nodemailer');

async function subscribeToNewsletter(email) {
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    throw new Error('Valid email is required');
  }

  // Transporter setup (using Gmail in this example)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,       // your Gmail address
      pass: process.env.EMAIL_PASSWORD       // your Gmail app password (not regular password)
    }
  });

  const mailOptions = {
    from: `"Podstream Newsletter" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: '🎧 Welcome to the Podstream Newsletter!',
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; background-color: #f4f4f4; padding: 30px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); overflow: hidden;">
          <div style="background-color: #1e1e2f; color: white; padding: 20px 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 26px;">🎧 Welcome to Podstream!</h1>
            <p style="margin: 5px 0 0; font-size: 16px;">Your journey into the world of podcasts starts here.</p>
          </div>
          <div style="padding: 30px;">
            <p style="font-size: 16px; color: #333;">Hi there 👋,</p>
            <p style="font-size: 16px; color: #444;">
              Thank you for subscribing to the <strong>Podstream Newsletter</strong>! You're now part of a growing community of podcast lovers, creators, and curious minds.
            </p>
  
            <div style="margin: 20px 0;">
              <h3 style="color: #1e1e2f;">Here's what you can expect:</h3>
              <ul style="padding-left: 20px; color: #555;">
                <li>🎙️ <strong>Top podcast picks</strong> from across genres</li>
                <li>📢 <strong>Creator spotlight</strong> interviews and tips</li>
                <li>🛠️ <strong>Platform updates</strong> & feature launches</li>
                <li>🎉 <strong>Exclusive events</strong> & community perks</li>
              </ul>
            </div>
  
            <p style="font-size: 15px; color: #555;">
              Keep an eye on your inbox — exciting content is heading your way soon!
            </p>
  
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://podstream.com" style="display: inline-block; padding: 12px 24px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Explore Podcasts Now
              </a>
            </div>
  
            <p style="font-size: 14px; color: #777;">Thanks for tuning in,</p>
            <p style="font-weight: bold; color: #444;">— Team Podstream</p>
          </div>
          <div style="background-color: #f1f1f1; padding: 15px 30px; text-align: center; font-size: 13px; color: #888;">
            Follow us: 
            <a href="https://twitter.com/PodStream" style="color: #1DA1F2; text-decoration: none;">Twitter</a> | 
            <a href="https://facebook.com/PodStream" style="color: #4267B2; text-decoration: none;">Facebook</a> | 
            <a href="https://instagram.com/PodStream" style="color: #E1306C; text-decoration: none;">Instagram</a><br/>
            © ${new Date().getFullYear()} Podstream. All rights reserved.
          </div>
        </div>
      </div>
    `
  };
  

  await transporter.sendMail(mailOptions);

  return { success: true, message: 'Successfully subscribed to newsletter' };
}

module.exports = subscribeToNewsletter;
