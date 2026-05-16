const { ContactModel } = require("../Models/ContactModel");

const { sendMail } = require("../Util/mailer");

const contactus = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.send({
        code: 0,
        msg: "All fields required",
      });
    }

    // SAVE TO DB
    await ContactModel.create({
      name,
      email,
      phone,
      message,
    });

    // MAIL OPTIONS
    const mailOptions = {
      from: "GoFetch <gofetch783@gmail.com>",

      to: "gofetch783@gmail.com",

      replyTo: email,

      subject: "Message from Website - Contact Us",

      html: `
    <b>Name:</b> ${name}<br/>
    <b>Phone:</b> ${phone}<br/>
    <b>Email:</b> ${email}<br/>
    <b>Message:</b> ${message}
  `,
    };

    // SEND MAIL
    const result = await sendMail(mailOptions);

    if (!result.success) {
      return res.send({
        code: 0,
        msg: "Error sending email",
      });
    }

    res.send({
      code: 1,
      msg: "Message sent successfully",
    });
  } catch (e) {
    res.send({
      code: -1,
      msg: e.message,
    });
  }
};

module.exports = { contactus };
