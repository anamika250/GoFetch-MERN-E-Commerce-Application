const CategoryModel = require("../Models/CategoryModel");
const fs = require("fs");

// Add Category
const addCategory = async (req, res) => {
  try {
    if (!req.body.catname) {
      return res.send({ code: 0, msg: "Category name required" });
    }

    let fname = "defaultpic.jpg";
    if (req.file) {
      fname = req.file.filename;
    }

    const newrecord = new CategoryModel({
      catname: req.body.catname,
      picname: fname,
    });

    const result = await newrecord.save();
    res.send(result ? { code: 1 } : { code: 0 });

  } catch (e) {
    res.send({ code: 0, msg: e.message });
  }
};

// Update Category
const updateCategory = async (req, res) => {
  try {
    if (!req.body.catname) {
      return res.send({ code: 0, msg: "Category name required" });
    }

    let imagename;

    if (req.file) {
      imagename = req.file.filename;

      if (req.body.oldpicname !== "defaultpic.jpg") {
        const filepath = `${req.file.destination}/${req.body.oldpicname}`;
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath);
        }
      }
    } else {
      imagename = req.body.oldpicname;
    }

    const result = await CategoryModel.updateOne(
      { _id: req.body.cid },
      { catname: req.body.catname, picname: imagename }
    );

    if (result.matchedCount === 1) {
      res.send({ code: 1 });
    } else {
      res.send({ code: 0, msg: "Category not found" });
    }

  } catch (e) {
    res.send({ code: 0 });
  }
};

// Get All Categories
const getAllCategories = async (req, res) => {
  try {
    const result = await CategoryModel.find();
    res.send({ code: 1, cdata: result });
  } catch (e) {
    res.send({ code: 0 });
  }
};

// Delete Category
const deleteCategory = async (req, res) => {
  try {
    const cat = await CategoryModel.findOne({ _id: req.params.cid });

    if (!cat) {
      return res.send({ code: 0, msg: "Category not found" });
    }

    if (cat.picname !== "defaultpic.jpg") {
      const filepath = `public/uploads/${cat.picname}`;
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
    }

    const result = await CategoryModel.deleteOne({ _id: req.params.cid });

    res.send(result.deletedCount === 1 ? { code: 1 } : { code: 0 });

  } catch (e) {
    res.send({ code: 0 });
  }
};

module.exports = {
  addCategory,
  updateCategory,
  getAllCategories,
  deleteCategory,
};