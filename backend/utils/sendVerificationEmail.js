const nodemailer = require('nodemailer');

const BASE_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

async function sendVerificationEmail(email, token) {
  // Configure your SMTP transport here
  const transporter = nodemailer.createTransport({
    // Example for Gmail, replace with your SMTP config
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const verifyUrl = `${BASE_URL}/verify-email?token=${token}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify your Stanford FarmSale account',
    html: `
      <p>Welcome to FarmSale!</p>
      <p>Please verify your Stanford email by clicking the link below:</p>
      <a href="${verifyUrl}">${verifyUrl}</a>
      <p>If you did not sign up, you can ignore this email.</p>
    `
  };

  await transporter.sendMail(mailOptions);
}

module.exports = sendVerificationEmail;
