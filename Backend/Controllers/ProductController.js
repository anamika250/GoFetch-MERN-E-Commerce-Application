const ProductModel = require("../Models/ProductModel");
const fs = require("fs");

//ADD PRODUCT
const addproduct = async (req, res) => {
  try {
    // Validation
    if (!req.body.pname || !req.body.rate || !req.body.cid || !req.body.scid) {
      return res.send({ code: 0, msg: "Missing required fields" });
    }

    if (isNaN(req.body.rate) || req.body.rate <= 0) {
      return res.send({ code: 0, msg: "Invalid price" });
    }

    let fname = "defaultpic.jpg";
    if (req.file) {
      fname = req.file.filename;
    }

    const newrecord = new ProductModel({
      catid: req.body.cid,
      subcatid: req.body.scid,
      prodname: req.body.pname,
      rate: Number(req.body.rate),
      discount: Number(req.body.discount) || 0,
      description: req.body.description || "",
      stock: Number(req.body.stock) || 0,
      featured: req.body.featured === "true" || req.body.featured === true,
      picname: fname,
    });

    const result = await newrecord.save();

    res.send(result ? { code: 1, msg: "Product added" } : { code: 0 });
  } catch (e) {
    res.send({ code: 0, msg: e.message });
  }
};

//GET PRODUCTS BY SUBCATEGORY
const getproductbysubcat = async (req, res) => {
  try {
    if (!req.query.scid) {
      return res.send({ code: 0, msg: "Subcategory ID required" });
    }

    const result = await ProductModel.find({ subcatid: req.query.scid });

    // ✅ Always return success (even if empty)
    res.send({ code: 1, pdata: result });
  } catch (e) {
    res.send({ code: 0, msg: e.message });
  }
};

//UPDATE PRODUCT
const updateproduct = async (req, res) => {
  try {
    if (!req.body.pid) {
      return res.send({ code: 0, msg: "Product ID required" });
    }
    if (req.body.rate && (isNaN(req.body.rate) || req.body.rate <= 0)) {
      return res.send({ code: 0, msg: "Invalid price" });
    }
    let imagename;

    if (req.file) {
      imagename = req.file.filename;

      if (req.body.oldpicname && req.body.oldpicname !== "defaultpic.jpg") {
        const oldPath = `${req.file.destination}/${req.body.oldpicname}`;
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
    } else {
      imagename = req.body.oldpicname || "defaultpic.jpg";
    }

    const result = await ProductModel.updateOne(
      { _id: req.body.pid },
      {
        catid: req.body.cid,
        subcatid: req.body.scid,
        prodname: req.body.pname,
        rate: Number(req.body.rate),
        discount: Number(req.body.discount) || 0,
        description: req.body.description || "",
        stock: Number(req.body.stock) || 0,
        featured: req.body.featured === "true" || req.body.featured === true,
        picname: imagename,
      },
    );

    if (result.matchedCount === 1) {
      res.send({ code: 1, msg: "Product updated" });
    } else {
      res.send({ code: 0, msg: "Product not found" });
    }
  } catch (e) {
    res.send({ code: 0, msg: e.message });
  }
};

//DELETE PRODUCT
const deleteproduct = async (req, res) => {
  try {
    if (!req.params.pid) {
      return res.send({ code: 0, msg: "Product ID required" });
    }

    const product = await ProductModel.findById(req.params.pid);

    if (!product) {
      return res.send({ code: 0, msg: "Product not found" });
    }

    if (product.picname !== "defaultpic.jpg") {
      const filepath = `public/uploads/${product.picname}`;
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
    }

    const result = await ProductModel.deleteOne({ _id: req.params.pid });

    res.send(
      result.deletedCount === 1
        ? { code: 1, msg: "Product deleted" }
        : { code: 0 },
    );
  } catch (e) {
    res.send({ code: 0, msg: e.message });
  }
};

//FEATURED PRODUCTS
const getfeaturedproducts = async (req, res) => {
  try {
    const result = await ProductModel.find({ featured: true }).limit(6);
    res.send({ code: 1, pdata: result });
  } catch (e) {
    res.send({ code: 0, msg: e.message });
  }
};

//PRODUCT DETAILS
const getproductdetailsbyid = async (req, res) => {
  try {
    if (!req.params.pid) {
      return res.send({ code: 0, msg: "Product ID required" });
    }
    const result = await ProductModel.findById(req.params.pid);

    if (!result) {
      return res.send({ code: 0, msg: "Product not found" });
    }

    res.send({ code: 1, pdata: result });
  } catch (e) {
    res.send({ code: 0, msg: e.message });
  }
};

//SEARCH PRODUCTS
const searchproducts = async (req, res) => {
  try {
    const searchtext = req.query.s;

    if (!searchtext || searchtext.trim() === "") {
      return res.send({
        code: 0,
        msg: "Search text required",
      });
    }

    const text = searchtext.trim();

    const result = await ProductModel.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "catid",
          foreignField: "_id",
          as: "catdata",
        },
      },

      {
        $lookup: {
          from: "subcategories",
          localField: "subcatid",
          foreignField: "_id",
          as: "subcatdata",
        },
      },

      {
        $match: {
          $or: [
            {
              prodname: {
                $regex: text,
                $options: "i",
              },
            },

            {
              "catdata.catname": {
                $regex: text,
                $options: "i",
              },
            },

            {
              "subcatdata.subcatname": {
                $regex: text,
                $options: "i",
              },
            },
          ],
        },
      },
    ]);

    res.send({
      code: 1,
      pdata: result,
    });

  } catch (e) {
    res.send({
      code: 0,
      msg: e.message,
    });
  }
};

module.exports = {
  addproduct,
  getproductbysubcat,
  updateproduct,
  deleteproduct,
  getfeaturedproducts,
  getproductdetailsbyid,
  searchproducts,
};
