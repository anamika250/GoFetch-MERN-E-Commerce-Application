const express = require("express");
const router = express.Router();

const {
  fetchordersummary,
  getuserorders,
  getorderitems,
  updatestatus,
  saveorder,
  getallorders,
} = require("../Controllers/OrderController");

const { verifytoken, verifyAdmin } = require("../Util/auth");

// ================= ROUTES =================

router.post("/place", verifytoken, saveorder);
router.get("/summary", verifytoken, fetchordersummary);
router.get("/user", verifytoken, getuserorders);
router.get("/all", verifytoken, verifyAdmin, getallorders);
router.get("/items/:oid", verifytoken, getorderitems);
router.put("/status", verifytoken, verifyAdmin, updatestatus);

module.exports = router;
