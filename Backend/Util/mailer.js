require("dns").setDefaultResultOrder("ipv4first");

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_UNAME,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
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