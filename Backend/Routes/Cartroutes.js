const express = require("express");
const router = express.Router();

const {
  addtocart,
  getcartdata,
  deletecartitem
} = require("../Controllers/CartController");

const { verifytoken } = require("../Util/auth");

router.post("/add", verifytoken, addtocart);
router.get("/all", verifytoken, getcartdata);
router.delete("/delete/:id", verifytoken, deletecartitem);

module.exports = router;