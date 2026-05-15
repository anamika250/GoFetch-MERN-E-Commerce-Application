const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const RegisterModel = require("../Models/UserModel").RegisterModel;
const jwt = require("jsonwebtoken");
const { transporter } = require("../Util/mailer");
const axios = require("axios");

const saltRounds = 10;

//REGISTER
const createUser = async (req, res) => {
  try {
    const { pname, phone, uname, pass } = req.body;

    if (!pname || !phone || !uname || !pass) {
      return res.send({ code: 0, msg: "All fields required" });
    }

    if (pass.length < 6) {
      return res.send({ code: 0, msg: "Password too short" });
    }

    const existing = await RegisterModel.findOne({ username: uname });

    if (existing) {
      return res.send({ code: -2, msg: "Username already exists" });
    }

    const hash = await bcrypt.hash(pass, saltRounds);
    const code = uuidv4();

    const newUser = new RegisterModel({
      name: pname.trim(),
      phone,
      username: uname.toLowerCase(),
      pass: hash,
      actcode: code,
    });

    await newUser.save();

    const mailOptions = {
      from: process.env.SMTP_UNAME,
      to: uname,
      subject: "Activate your GoFetch account",
      html: `
        Hello ${pname},<br/><br/>
        Click below to activate your account:<br/><br/>
        <a href="http://localhost:3000/activateaccount?id=${code}">
          Activate Account
        </a>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.send({ code: 1, msg: "Registration successful. Check email." });
  } catch (e) {
    res.send({ code: 0, msg: e.message });
  }
};

//LOGIN
const loginUser = async (req, res) => {
  try {
    const { uname, pass, captchaToken } = req.body;

    if (!uname || !pass || !captchaToken) {
      return res.send({
        code: 0,
        msg: "All fields required",
      });
    }

    const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`;

    const captchaRes = await axios.post(verifyURL);

    if (!captchaRes.data.success) {
      return res.send({
        code: 0,
        msg: "Captcha verification failed",
      });
    }
    const user = await RegisterModel.findOne({
      username: uname,
    });

    if (!user) {
      return res.send({
        code: 0,
        msg: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(pass, user.pass);

    if (!isMatch) {
      return res.send({
        code: 0,
        msg: "Invalid credentials",
      });
    }

    if (!user.isActivated) {
      return res.send({
        code: 0,
        msg: "Account not activated",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.usertype,
        username: user.username,
      },
      process.env.JSECRETKEY,
      {
        expiresIn: "1h",
      },
    );

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",

      sameSite: "strict",

      maxAge: 3600000,
    });

    res.send({
      code: 1,

      udata: {
        _id: user._id,
        name: user.name,
        phone: user.phone,
        username: user.username,
        usertype: user.usertype,
      },
    });
  } catch (e) {
    res.send({
      code: 0,
      msg: e.message,
    });
  }
};

//LOGOUT
const logoutUser = (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.send({ code: 1, msg: "Logged out" });
};

//ACTIVATE
const activateAccount = async (req, res) => {
  try {
    const user = await RegisterModel.findOne({ actcode: req.query.id });

    if (!user) {
      return res.send({ code: 0, msg: "Invalid activation link" });
    }

    await RegisterModel.updateOne(
      { _id: user._id },
      { isActivated: true, actcode: "" },
    );

    res.send({ code: 1, msg: "Account activated" });
  } catch (e) {
    res.send({ code: 0 });
  }
};

//CREATE ADMIN
const createAdmin = async (req, res) => {
  try {
    const { pname, phone, uname, pass } = req.body;

    if (!pname || !phone || !uname || !pass) {
      return res.send({ code: 0, msg: "All fields required" });
    }

    const hash = await bcrypt.hash(pass, saltRounds);

    const newAdmin = new RegisterModel({
      name: pname,
      phone,
      username: uname,
      pass: hash,
      usertype: "admin",
      isActivated: true,
    });

    await newAdmin.save();

    res.send({ code: 1, msg: "Admin created" });
  } catch (e) {
    res.send({ code: 0, msg: e.message });
  }
};

//SEARCH USER
const searchUser = async (req, res) => {
  try {
    const user = await RegisterModel.findOne({
      username: req.params.uname,
    }).lean();

    if (!user) {
      return res.send({ code: 0 });
    }

    res.send({ code: 1, udata: user });
  } catch (e) {
    res.send({ code: 0 });
  }
};

//GET ALL USERS
const getAllUsers = async (req, res) => {
  try {
    const users = await RegisterModel.find().lean();

    res.send({ code: 1, udata: users });
  } catch (e) {
    res.send({ code: 0 });
  }
};

//DELETE USER
const deleteUser = async (req, res) => {
  try {
    const result = await RegisterModel.deleteOne({ _id: req.params.id });

    res.send(
      result.deletedCount === 1
        ? { code: 1, msg: "User deleted" }
        : { code: 0, msg: "User not found" },
    );
  } catch (e) {
    res.send({ code: 0 });
  }
};

module.exports = {
  createUser,
  loginUser,
  activateAccount,
  createAdmin,
  searchUser,
  getAllUsers,
  deleteUser,
  logoutUser,
};
