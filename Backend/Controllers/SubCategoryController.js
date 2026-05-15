const SubCategoryModel = require("../Models/SubCategoryModel");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

//ADD SUBCATEGORY
const addsubcategory = async (req, res) => {
  try {
    const { cid, scatname } = req.body;
    if (!cid || !scatname || scatname.trim() === "") {
      return res.send({ code: 0, msg: "Category ID and name required" });
    }
    if (!mongoose.Types.ObjectId.isValid(cid)) {
      return res.send({ code: 0, msg: "Invalid Category ID" });
    }
    const trimmedName = scatname.trim();
    const exists = await SubCategoryModel.findOne({
      catid: cid,
      subcatname: trimmedName,
    });
    if (exists) {
      return res.send({ code: 0, msg: "Subcategory already exists" });
    }
    let fname = "defaultpic.jpg";
    if (req.file) {
      fname = req.file.filename;
    }
    const newrecord = new SubCategoryModel({
      catid: cid,
      subcatname: trimmedName,
      picname: fname,
    });
    await newrecord.save();
    res.send({ code: 1, msg: "Subcategory added" });
  } catch (e) {
    res.send({ code: 0, msg: e.message });
  }
};

//UPDATE SUBCATEGORY
const updatesubcategory = async (req, res) => {
  try {
    const { scid, cid, scatname, oldpicname } = req.body;

    if (!scid || !cid) {
      return res.send({ code: 0, msg: "Subcategory ID & Category ID required" });
    }

    if (!mongoose.Types.ObjectId.isValid(scid)) {
      return res.send({ code: 0, msg: "Invalid Subcategory ID" });
    }

    if (!scatname || scatname.trim() === "") {
      return res.send({ code: 0, msg: "Subcategory name required" });
    }

    const trimmedName = scatname.trim();

    // ✅ prevent duplicate
    const exists = await SubCategoryModel.findOne({
      catid: cid,
      subcatname: trimmedName,
      _id: { $ne: scid },
    });

    if (exists) {
      return res.send({ code: 0, msg: "Subcategory already exists" });
    }

    let imagename;

    if (req.file) {
      imagename = req.file.filename;

      if (oldpicname && oldpicname !== "defaultpic.jpg") {
        const filepath = path.join(req.file.destination, oldpicname);
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath);
        }
      }
    } else {
      imagename = oldpicname || "defaultpic.jpg";
    }

    const result = await SubCategoryModel.updateOne(
      { _id: scid },
      {
        catid: cid,
        subcatname: trimmedName,
        picname: imagename,
      }
    );

    if (result.matchedCount === 1) {
      res.send({ code: 1, msg: "Subcategory updated" });
    } else {
      res.send({ code: 0, msg: "Subcategory not found" });
    }

  } catch (e) {
    res.send({ code: 0, msg: e.message });
  }
};

//GET SUBCATEGORY BY CATEGORY
const getsubcatbycat = async (req, res) => {
  try {
    const { cid } = req.query;

    if (!cid) {
      return res.send({ code: 0, msg: "Category ID required" });
    }

    const result = await SubCategoryModel.find({ catid: cid }).lean();

    // ✅ Always success (even if empty)
    res.send({ code: 1, scdata: result });

  } catch (e) {
    res.send({ code: 0, msg: e.message });
  }
};

//DELETE SUBCATEGORY
const deletesubcategory = async (req, res) => {
  try {
    const { scid } = req.params;

    if (!scid) {
      return res.send({ code: 0, msg: "Subcategory ID required" });
    }

    if (!mongoose.Types.ObjectId.isValid(scid)) {
      return res.send({ code: 0, msg: "Invalid Subcategory ID" });
    }

    const subcat = await SubCategoryModel.findById(scid);

    if (!subcat) {
      return res.send({ code: 0, msg: "Subcategory not found" });
    }

    if (subcat.picname !== "defaultpic.jpg") {
      const filepath = path.join("public/uploads", subcat.picname);
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
    }

    const result = await SubCategoryModel.deleteOne({ _id: scid });

    res.send(
      result.deletedCount === 1
        ? { code: 1, msg: "Subcategory deleted" }
        : { code: 0 }
    );

  } catch (e) {
    res.send({ code: 0, msg: e.message });
  }
};

module.exports = {
  addsubcategory,
  updatesubcategory,
  getsubcatbycat,
  deletesubcategory,
};