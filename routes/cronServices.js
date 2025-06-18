const cron = require('node-cron');
const db = require('../db');
const nodemailer = require('nodemailer');
const config = require('../env.json');

// Create a reusable transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS
  }
});

// Function to send emails
async function sendEmail(to, subject, text, html = null) {
  try {
    const mailOptions = {
      from: config.EMAIL_USER,
      to,
      subject,
      text,
      html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

function SendBirthdayWishesForAadharUsers() {
  // At 9:00 AM every day
  cron.schedule('0 9 * * *', async () => {
    try {
      const [rows] = await db.query(
        "SELECT first_name, email_id FROM aadhar_users WHERE DAY(dob)=DAY(CURDATE()) AND MONTH(dob)=MONTH(CURDATE())"
      );

      if (!rows.length) {
        console.log('No birthdays today');
        return;
      }

      for (const user of rows) {
        await sendEmail(user.email_id, "🎂 Happy Birthday!", `Dear ${user.first_name}, Happy Birthday from Team Aadhaar!`);
      }

      console.log('Birthday emails sent.');
    } catch (err) {
      console.error('Cron error:', err);
    }
  });
}

module.exports = { 
  SendBirthdayWishesForAadharUsers,
  sendEmail 
};