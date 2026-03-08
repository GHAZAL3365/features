const nodemailer = require("nodemailer");

const sendVerificationEmail = async (email, verificationLink) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    port: 2525,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Verify your email",
    html: `<a href="${verificationLink}">Verify Email</a>`,
  });
};

module.exports = sendVerificationEmail;
