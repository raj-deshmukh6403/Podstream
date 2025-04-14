// server/routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactcontroller');

// Contact form submission route
router.post('/contact', contactController.sendContactMessage);

// Newsletter subscription route
router.post('/subscribenews', contactController.subscribeToNewsletter);

module.exports = router;