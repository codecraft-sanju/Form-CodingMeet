const { sendConfirmationEmail } = require('../config/nodemailer');
const User = require('../models/User');
const mongoose = require('mongoose'); 

exports.registerUser = async (req, res) => {
  try {
    const {
      fullName,
      email,
      mobile,
      learningPath,
      skillLevel,
      courses,
      classTime,
      dob,
      isAdmin,
    } = req.body;

    const profilePicUrl = req.file ? req.file.path : null;

    const newUser = await User.create({
      fullName,
      learningPath,
      email,
      mobile,
      
      skillLevel,
      classTime,
      dob,
      courses: JSON.parse(courses),
      profilePicPath: profilePicUrl,
      isAdmin,
    });

    await sendConfirmationEmail(newUser);
    res.status(201).json({ success: true, user: newUser });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'User registration failed.' });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error('Get users error:', err);
    res.status(500).json({ error: 'Failed to fetch users.' });
  }
};

<<<<<<< HEAD
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found.' });
=======

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Received delete request for ID:', id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid user ID.' });
    }

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found.' });
>>>>>>> 45c6a4c (intruction add)
    }

    res.json({ success: true, message: 'User deleted successfully.' });
  } catch (err) {
    console.error('Delete user error:', err);
<<<<<<< HEAD
    res.status(500).json({ error: 'Failed to delete user.' });
=======
    res.status(500).json({ success: false, error: 'Failed to delete user.' });
>>>>>>> 45c6a4c (intruction add)
  }
};
