const {
  sendConfirmationEmail,
  sendPersonalEmail,
} = require('../config/nodemailer');
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

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

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
    }

    res.json({ success: true, message: 'User deleted successfully.' });
  } catch (err) {
    console.error('Delete user error:', err);
    res.status(500).json({ success: false, error: 'Failed to delete user.' });
  }
};


exports.sendInvite = async (req, res) => {
  const { to, name, meetLink, date, time } = req.body;

  if (!to || !name || !meetLink || !date || !time) {
    return res
      .status(400)
      .json({ success: false, message: 'Missing required fields' });
  }

  try {
    await sendPersonalEmail({ to, name, meetLink, date, time });
    res.json({ success: true, message: 'Invite sent successfully' });
  } catch (err) {
    console.error('Error sending invite:', err);
    res.status(500).json({ success: false, message: 'Failed to send invite' });
  }
};
