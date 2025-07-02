const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  mobile: String,
  ageClass: String,
  skillLevel: String,
  courses: [String],
  classTime: String,
  profilePicPath: String,
  isAdmin: { type: Boolean, default: false },
});
module.exports = mongoose.model('User', userSchema);
