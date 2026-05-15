const express = require("express");
const router = express.Router();

const { changePassword, forgotPassword, resetPassword } = require("../Controllers/ResetPassController");
const { verifytoken } = require("../Util/auth");

router.post("/change",verifytoken, changePassword);
router.post("/forgot", forgotPassword);
router.post("/reset", resetPassword);

module.exports = router;