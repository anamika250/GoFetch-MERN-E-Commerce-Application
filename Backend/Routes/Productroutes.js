const express = require("express");
const router = express.Router();

const {
  addproduct,
  getproductbysubcat,
  updateproduct,
  deleteproduct,
  getfeaturedproducts,
  getproductdetailsbyid,
  searchproducts
} = require("../Controllers/ProductController");

const upload = require("../Util/multerconfig");
const { verifytoken, verifyAdmin } = require("../Util/auth");


// ADMIN ROUTES

// Add product
router.post("/add", verifytoken, verifyAdmin, upload.single("pic"), addproduct);

// Update product
router.put("/update", verifytoken, verifyAdmin, upload.single("pic"), updateproduct);

// Delete product
router.delete("/delete/:pid", verifytoken, verifyAdmin, deleteproduct);


//PUBLIC ROUTES

// Get products by subcategory
router.get("/bysubcat", getproductbysubcat);

// Get featured products
router.get("/featured", getfeaturedproducts);

// Get product details
router.get("/details/:pid", getproductdetailsbyid);

// Search products
router.get("/search", searchproducts);


module.exports = router;