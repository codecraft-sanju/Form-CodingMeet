const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  mobile: String,
  ageClass: String,
  skillLevel: String,
  dob: String,
  classTime: String,
  profilePicPath: String,
  isAdmin: { type: Boolean, default: false },
  courses: [String],
});

module.exports = mongoose.model('User', userSchema);
