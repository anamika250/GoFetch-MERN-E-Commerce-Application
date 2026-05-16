const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,

  auth: {
    user: process.env.SMTP_UNAME,
    pass: process.env.SMTP_PASS,
  },
});

const sendMail = async (mailOptions) => {
  try {
    let info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.response);

    return { success: true, info };
  } catch (error) {
    console.error("Email error:", error);

    return { success: false, error };
  }
};

module.exports = { transporter, sendMail };