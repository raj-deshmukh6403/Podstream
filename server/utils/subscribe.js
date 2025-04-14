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
    subject: 'Welcome to Podstream Newsletter!',
    html: `
      <h2>🎧 Welcome to Podstream!</h2>
      <p>Thanks for subscribing to our newsletter. You’ll now be the first to know about new podcasts, creator updates, and more!</p>
      <br>
      <p>Enjoy listening,</p>
      <strong>Team Podstream</strong>
    `
  };

  await transporter.sendMail(mailOptions);

  return { success: true, message: 'Successfully subscribed to newsletter' };
}

module.exports = subscribeToNewsletter;
