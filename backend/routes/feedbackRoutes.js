const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback')

// Submit feedback
router.post('/add', async (req, res) => {
  try {
    const { name, message } = req.body;

    if (!message) {
      return res
        .status(400)
        .json({ success: false, message: 'Message is required.' });
    }

    const newFeedback = await Feedback.create({
      name: name || 'Anonymous',
      message,
    });

    res.status(201).json({ success: true, feedback: newFeedback });
  } catch (err) {
    console.error('Add feedback error:', err);
    res
      .status(500)
      .json({ success: false, message: 'Failed to add feedback.' });
  }
});


router.get('/all', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json({ success: true, feedbacks });
  } catch (err) {
    console.error('Get feedback error:', err);
    res
      .status(500)
      .json({ success: false, message: 'Failed to get feedbacks.' });
  }
});

module.exports = router;
