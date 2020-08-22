const nodemailer = require('nodemailer')

const {Email_User,Email_Password} = process.env

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    service: 'gmail',
    auth: {
        user: Email_User,
        pass: Email_Password
    }
});

module.exports = transporter;