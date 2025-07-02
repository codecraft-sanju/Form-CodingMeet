const User = require('../models/User');
const nodemailer = require('nodemailer');


const sendConfirmationEmail = async (user) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"CodingMeet" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: 'Welcome to CodingMeet!',
    html: `
      <div style="font-family:sans-serif; line-height:1.5; color:#333;">
        <h2 style="color:#6C63FF;">Hey ${user.fullName},</h2>
        <p> Thank you for registering on <strong>CodingMeet</strong>!</p>
        <p>You’re officially on your way to mastering <strong>Web Development</strong> — from HTML to MERN Stack.</p>
        <p> <strong>Your mentor will call you soon</strong> to schedule your first live session.</p>
        <p style="font-style:italic; color:#555;">“Code your future, one class at a time.”</p>
        <hr />
        <p>If you have questions, reply to this email or contact us anytime.</p>
        <p> Let's build something amazing,<br/><strong>Team CodingMeet</strong></p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};


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
    } = req.body;
    const profilePicPath = req.file ? req.file.path : null;

    const user = new User({
      fullName,
      email,
      mobile,
      ageClass,
      skillLevel,
      courses: JSON.parse(courses),
      classTime,
      profilePicPath,
    });

    await user.save();
    await sendConfirmationEmail(user); 

    res.json({ success: true });
  } catch (err) {
    console.error('Error in registerUser:', err.message);
    res.status(500).json({ error: err.message });
  }
};


exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error('Error in getUsers:', err.message);
    res.status(500).json({ error: err.message });
  }
};


exports.makeAdmin = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOneAndUpdate({ email }, { isAdmin: true });
    if (user) res.json({ success: true });
    else res.status(404).json({ error: 'User not found' });
  } catch (err) {
    console.error('Error in makeAdmin:', err.message);
    res.status(500).json({ error: err.message });
  }
};
