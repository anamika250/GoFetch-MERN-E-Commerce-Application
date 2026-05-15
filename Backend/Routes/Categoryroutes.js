const express = require("express");
const router = express.Router();

const {
  addCategory,
  updateCategory,
  getAllCategories,
  deleteCategory
} = require("../Controllers/CategoryController");

const upload = require("../Util/multerconfig");
const { verifytoken, verifyAdmin } = require("../Util/auth");

// ADMIN ROUTES
router.post("/add", verifytoken, verifyAdmin, upload.single("pic"), addCategory);
router.put("/update", verifytoken, verifyAdmin, upload.single("pic"), updateCategory);
router.delete("/delete/:cid", verifytoken, verifyAdmin, deleteCategory);

// PUBLIC ROUTE
router.get("/all", getAllCategories);

module.exports = router;