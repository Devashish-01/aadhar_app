const cron = require('node-cron');
const db = require('../db');
const nodemailer = require('nodemailer');
const config = require('../env.json');

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

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: config.EMAIL_USER,
          pass: config.EMAIL_PASS
        }
      });

      for (const user of rows) {
        await transporter.sendMail({
          from: config.EMAIL_USER,
          to: user.email_id,
          subject: "🎂 Happy Birthday!",
          text: `Dear ${user.first_name}, Happy Birthday from Team Aadhaar!`
        });
      }

      console.log('Birthday emails sent.');
    } catch (err) {
      console.error('Cron error:', err);
    }
  });
}

module.exports = { SendBirthdayWishesForAadharUsers };