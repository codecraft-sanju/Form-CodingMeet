const {
  sendConfirmationEmail,
  sendPersonalEmail,
} = require('../config/nodemailer');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const mongoose = require('mongoose');

// Register New User
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

// Get All Users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error('Get users error:', err);
    res.status(500).json({ error: 'Failed to fetch users.' });
  }
};

// Delete User
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

// Send Personal Invite
exports.sendInvite = async (req, res) => {
  const { to, name, meetLink, date, time } = req.body;

  if (!to || !name || !meetLink || !date || !time) {
    return res
      .status(400)
      .json({ success: false, message: 'Missing required fields' });
  }

  try {
    await sendPersonalEmail({ to, name, meetLink, date, time });

    // Save invitation details to DB
    await User.findOneAndUpdate(
      { email: to },
      {
        invitation: {
          date,
          time,
          meetLink,
          invited: true,
        },
      },
    );

    res.json({ success: true, message: 'Invite sent and saved successfully' });
  } catch (err) {
    console.error('Error sending invite:', err);
    res.status(500).json({ success: false, message: 'Failed to send invite' });
  }
};

// Send Bulk Announcement Email
exports.sendAnnouncementEmailToAll = async (req, res) => {
  try {
    const users = await User.find();
    const total = users.length;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const htmlContent = `
  <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; background: #f3f4f6; border-radius: 10px;">
    <img src="https://res.cloudinary.com/ddx5zp3tc/image/upload/v1751648578/Gradient_Colorful_Minimalist_Coming_Soon_Banner_wvjmxj.png"
         alt="Group Classes Coming Soon" 
         style="width: 100%; border-radius: 10px; margin-bottom: 20px;" />

    <h2 style="color: #4f46e5;">Group Classes Are Launching Soon!</h2>

    <p style="font-size: 16px;">Hi Learner,</p>

    <p style="font-size: 15px;">
      We’re excited to announce that <strong style="color: #10b981;">CodingMeet</strong> will be starting <strong>group coding classes</strong> very soon once we reach 60+ registrations.
    </p>

    <p style="font-size: 15px;"><strong>${total}</strong> students have already registered!</p>

    <hr style="margin: 20px 0;" />

    <p style="font-size: 15px;">
       <strong>Bonus Alert!</strong> When we hit <strong>100 registrations</strong>, we will organize an exclusive <strong>Hackathon</strong> with <strong>prizes</strong>  and a guaranteed <strong>internship</strong> for the winner!
    </p>

    <p style="font-size: 15px;">
       Help us grow! Share this opportunity with your friends or in your coding groups. More learners = faster launch.
    </p>

    <p style="font-size: 15px;">
       <a href="https://form-coding-meet.vercel.app/" style="color: #2563eb; font-weight: bold;" target="_blank">Click here to fill the form or share it with others</a>
    </p>

    <p style="font-size: 14px; margin-top: 30px; color: #888;">– The CodingMeet Team</p>
  </div>
`;

    for (const user of users) {
      await transporter.sendMail({
        from: `"CodingMeet" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: 'Group Classes & Hackathon Announcement – CodingMeet',
        html: htmlContent,
      });
    }

    res.json({
      success: true,
      message: 'Announcement emails sent to all users.',
    });
  } catch (err) {
    console.error('Announcement email error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to send announcement emails.',
    });
  }
};
