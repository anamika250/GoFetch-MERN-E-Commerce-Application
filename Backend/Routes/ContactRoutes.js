const express = require("express");

const router = express.Router();

const {
  contactus,
} = require(
  "../Controllers/ContactController"
);

router.post("/", contactus);

module.exports = router;