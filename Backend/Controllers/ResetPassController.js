const RegisterModel = require("../Models/UserModel").RegisterModel;
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const resetPassModel = require("../Models/ResetPass");
const { sendMail } = require("../Util/mailer");

const saltRounds = 10;

//CHANGE PASSWORD
const changePassword = async (req, res) => {
  try {
    const username = req.user.username; // ✅ from JWT (secure)
    const { currpass, newpass } = req.body;

    if (!currpass || !newpass) {
      return res.send({ code: 0, msg: "All fields required" });
    }

    if (newpass.length < 6) {
      return res.send({ code: 0, msg: "Password too short" });
    }

    const user = await RegisterModel.findOne({ username });

    if (!user) {
      return res.send({ code: 0, msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(currpass, user.pass);

    if (!isMatch) {
      return res.send({ code: -1, msg: "Incorrect current password" });
    }

    const hash = await bcrypt.hash(newpass, saltRounds);

    await RegisterModel.updateOne({ username }, { pass: hash });

    res.send({ code: 1, msg: "Password changed successfully" });
  } catch (e) {
    res.send({ code: 0, msg: e.message });
  }
};

//FORGOT PASSWORD
const forgotPassword = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.send({ code: 0, msg: "Username required" });
    }

    const user = await RegisterModel.findOne({
      username: username.toLowerCase(),
    });

    if (!user) {
      return res.send({ code: 0, msg: "User not found" });
    }

    const resettoken = uuidv4();
    const exptime = new Date(Date.now() + 15 * 60 * 1000);

    await resetPassModel.deleteMany({
      username: username.toLowerCase(),
    });

    await new resetPassModel({
      username: username.toLowerCase(),
      token: resettoken,
      exptime,
    }).save();

    const mailOptions = {
      from: process.env.SMTP_UNAME,
      to: username.toLowerCase(),
      subject: "Reset Password - GoFetch",
      html: `
        Hello ${user.name},<br/><br/>
        Click below to reset your password:<br/><br/>
        <a href="${process.env.FRONTEND_URL}/resetpassword?token=${resettoken}">
          Reset Password
        </a><br/><br/>
        This link expires in 15 minutes.
      `,
    };

    const result = await sendMail(mailOptions);

    if (!result.success) {
      return res.send({
        code: 0,
        msg: "Error sending email",
      });
    }

    res.send({ code: 1, msg: "Reset link sent to email" });
  } catch (e) {
    res.send({ code: 0, msg: e.message });
  }
};

// RESET PASSWORD

const resetPassword = async (req, res) => {
  try {
    const { token, newpass } = req.body;

    if (!token || !newpass) {
      return res.send({
        code: 0,
        msg: "All fields required",
      });
    }

    // FIND TOKEN

    const tokenData = await resetPassModel.findOne({
      token,
    });

    if (!tokenData) {
      return res.send({
        code: 0,
        msg: "Invalid reset link",
      });
    }

    // CHECK EXPIRY

    if (new Date() > tokenData.exptime) {
      await resetPassModel.deleteOne({
        token,
      });

      return res.send({
        code: 0,
        msg: "Reset link expired",
      });
    }

    // FIND USER

    const user = await RegisterModel.findOne({
      username: tokenData.username,
    });

    if (!user) {
      return res.send({
        code: 0,
        msg: "User not found",
      });
    }

    // HASH PASSWORD

    const hash = await bcrypt.hash(newpass, saltRounds);

    // UPDATE PASSWORD

    await RegisterModel.updateOne(
      { username: tokenData.username },
      { pass: hash },
    );

    // DELETE TOKEN

    await resetPassModel.deleteOne({
      token,
    });

    res.send({
      code: 1,
      msg: "Password reset successful",
    });
  } catch (e) {
    res.send({
      code: 0,
      msg: e.message,
    });
  }
};

module.exports = {
  changePassword,
  forgotPassword,
  resetPassword,
};
