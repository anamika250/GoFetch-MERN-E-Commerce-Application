const express = require("express");
const router = express.Router();

const {
  addsubcategory,
  updatesubcategory,
  getsubcatbycat,
  deletesubcategory
} = require("../Controllers/SubCategoryController");

const upload = require("../Util/multerconfig");

const { verifytoken, verifyAdmin } = require("../Util/auth");

//ADMIN ROUTES
router.post("/add", verifytoken, verifyAdmin, upload.single("pic"), addsubcategory);
router.put("/update", verifytoken, verifyAdmin, upload.single("pic"), updatesubcategory);
router.delete("/delete/:scid", verifytoken, verifyAdmin, deletesubcategory);

//PUBLIC ROUTE
router.get("/by-category", getsubcatbycat);

module.exports = router;