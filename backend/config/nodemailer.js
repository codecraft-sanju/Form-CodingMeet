const nodemailer = require('nodemailer');
require('dotenv').config();

const IMAGE_URL =
  'https://res.cloudinary.com/ddx5zp3tc/image/upload/v1751632951/WhatsApp_Image_2025-07-04_at_15.55.30_735abf2c_pgimgx.jpg';

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
          <img src="${IMAGE_URL}" alt="CodingMeet Banner" style="width: 100%; max-width: 600px; border-radius: 10px; margin-bottom: 20px;" />

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

          <p style="margin-top: 30px; font-size: 14px; color: #888;">– The CodingMeet Team</p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Email send error:', error);
  }
};

const sendPersonalEmail = async ({ to, name, meetLink, date, time }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"CodingMeet Team" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Your 1st CodingMeet Session – Join Us Live!',
      html: `
        <div style="font-family: Arial, sans-serif; background: #f3f4f6; padding: 20px; border-radius: 10px; max-width: 600px; margin: auto;">
          <img src="${IMAGE_URL}" alt="CodingMeet Banner" style="width: 100%; max-width: 600px; border-radius: 10px; margin-bottom: 20px;" />

          <h2 style="color: #4f46e5;">Hi ${name},</h2>
          <p style="font-size: 16px;">You're invited to your very first live session of <strong style="color:#10b981">CodingMeet</strong>!</p>

          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Time:</strong> ${time}</p>
          <p><strong>Google Meet:</strong> <a href="${meetLink}" style="color: #2563eb;">Join Meeting</a></p>

          <p style="margin-top: 20px;">Make sure you're ready with a notebook, pen, and your questions!</p>

          <p style="margin-top: 30px; font-size: 14px; color: #888;">– The CodingMeet Team</p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Personal email send error:', error);
  }
};

module.exports = { sendConfirmationEmail, sendPersonalEmail };
