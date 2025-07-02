const nodemailer = require('nodemailer');
require('dotenv').config();

const sendConfirmationEmail = async (user) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"CodingMeet" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: 'Welcome to CodingMeet – You’re officially in!',
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; border-radius: 10px; max-width: 600px; margin: auto;">
          <h2 style="color: #4f46e5;">Hi ${user.fullName},</h2>
          <p style="font-size: 16px; color: #333;">Thank you for registering for <strong style="color: #10b981;">CodingMeet</strong> – your gateway to mastering Web Development!</p>
          
          <p style="font-size: 15px; color: #333;">We’ve received your registration details, and our team will get in touch soon to help you get started with your first live session.</p>

          <hr style="margin: 20px 0;" />

          <p style="font-size: 14px; color: #555;">
             Skills Selected: <strong>${user.skillLevel}</strong><br />
             Courses: <strong>${user.courses.join(', ')}</strong><br />
             DOB: <strong>${user.dob}</strong>
          </p>

          <p style="font-size: 15px; color: #333;">Feel free to reply to this email if you have any questions. We're excited to see you grow!</p>

          <p style="margin-top: 30px; font-size: 14px; color: #888;">– The CodingMeet Team </p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Email send error:', error);
  }
};

module.exports = { sendConfirmationEmail };
