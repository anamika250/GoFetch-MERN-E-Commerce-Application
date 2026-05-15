const express = require("express");
const router = express.Router();

const {
  createUser,
  loginUser,
  activateAccount,
  createAdmin,
  searchUser,
  getAllUsers,
  deleteUser,
  logoutUser
} = require("../Controllers/UserController");

const { verifyAdmin, verifytoken } = require("../Util/auth");

//PUBLIC ROUTES

// Register
router.post("/register", createUser);

// Login
router.post("/login", loginUser);

// Activate account
router.get("/activate", activateAccount);


//PROTECTED ROUTES

// Create admin (ONLY ADMIN)
router.post("/admin/create", verifytoken, verifyAdmin, createAdmin);

// Search user (OPTIONAL: protect or limit fields)
router.get("/search/:uname", verifytoken, verifyAdmin, searchUser);

// Get all users (ADMIN ONLY)
router.get("/all", verifytoken, verifyAdmin, getAllUsers);

// Delete user (ADMIN ONLY)
router.delete("/delete/:id", verifytoken, verifyAdmin, deleteUser);


//LOGOUT
router.post("/logout",logoutUser);

module.exports = router;