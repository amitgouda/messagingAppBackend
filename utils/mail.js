/* eslint-disable no-console */
const nodemailer = require("nodemailer");
const {Email_User,Email_Password} = require('../config/index')
const transporter = nodemailer.createTransport({
  /* host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports */
  service:'gmail'/*  process.env.Email_Service */,
  auth: {
    user: Email_User,
    pass: Email_Password, // naturally, replace both with your real credentials or an application-specific password
  },
});

const sendMail = (to, subject, body) => {
  const mailOptions = {
    from: Email_User,
    to,
    subject,
    text: body,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};

module.exports = {
  sendMail,
};
