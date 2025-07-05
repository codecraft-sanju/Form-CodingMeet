const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  mobile: String,
  learningPath: String,
  skillLevel: String,
  dob: String,
  classTime: String,
  profilePicPath: String,
  isAdmin: { type: Boolean, default: false },
  courses: [String],
  invitation: {
    date: String,
    time: String,
    meetLink: String,
    invited: { type: Boolean, default: false },
  },
});

module.exports = mongoose.model('User', userSchema);
