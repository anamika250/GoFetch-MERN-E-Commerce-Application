const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,

  auth: {
    user: process.env.SMTP_UNAME,
    pass: process.env.SMTP_PASS,
  },
});

const sendMail = async (mailOptions) => {
  try {
    const info = await transporter.sendMail(mailOptions);

    console.log("MAIL SUCCESS:", info);

    return {
      success: true,
    };
  } catch (error) {
    console.log("MAIL FULL ERROR:", error);

    return {
      success: false,
      error,
    };
  }
};

module.exports = { sendMail };