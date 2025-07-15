const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
  {
    name: { type: String, default: 'Anonymous' },
    message: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Feedback', feedbackSchema);
