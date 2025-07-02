const { sendConfirmationEmail } = require('../config/nodemailer');
const User = require('../models/User');

exports.registerUser = async (req, res) => {
  try {
    const {
      fullName,
      email,
      mobile,
      ageClass,
      skillLevel,
      courses,
      classTime,
      dob,
      isAdmin,
    } = req.body;

    const profilePicUrl = req.file ? req.file.path : null;

    const newUser = await User.create({
      fullName,
      email,
      mobile,
      ageClass,
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
