// routes/api.js
const express = require('express');
const router = express.Router();
const subscribeToNewsletter = require('../utils/subscribe');

router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    console.log("📧 Received email:", email);
    const result = await subscribeToNewsletter(email);
    res.status(200).json(result);
  } catch (error) {
    console.error('❌ Subscription error:', error);
    res.status(error.message === 'Valid email is required' ? 400 : 500)
      .json({ error: error.message || 'Failed to process subscription' });
  }
});


module.exports = router;