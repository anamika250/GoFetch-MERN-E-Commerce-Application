const CartModel = require("../Models/CartModel");
const ProductModel = require("../Models/ProductModel");

// ADD TO CART
const addtocart = async (req, res) => {
  try {
    const { prodid, qty } = req.body;

    if (!prodid || !qty) {
      return res.send({
        code: 0,
        msg: "Missing required fields",
      });
    }

    const quantity = Number(qty);

    if (quantity <= 0) {
      return res.send({
        code: 0,
        msg: "Invalid quantity",
      });
    }

    const username = req.user.username;

    // FETCH PRODUCT FROM DB
    const proddata = await ProductModel.findById(prodid);

    if (!proddata) {
      return res.send({
        code: 0,
        msg: "Product not found",
      });
    }

    const remcost = (
      proddata.rate -
      (proddata.rate * proddata.discount) / 100
    ).toFixed(2);

    // CHECK EXISTING ITEM
    const existingItem = await CartModel.findOne({
      prodid,
      username,
    });

    if (existingItem) {
      existingItem.qty += quantity;

      existingItem.tcost = existingItem.qty * remcost;

      await existingItem.save();

      return res.send({
        code: 1,
        msg: "Cart updated",
      });
    }

    // CREATE NEW CART ITEM
    const newrecord = new CartModel({
      prodid,

      picname: proddata.picname,

      prodname: proddata.prodname,

      rate: remcost,

      qty: quantity,

      tcost: remcost * quantity,

      username,
    });

    await newrecord.save();

    res.send({
      code: 1,
      msg: "Added to cart",
    });
  } catch (e) {
    res.send({
      code: 0,
      msg: e.message,
    });
  }
};

// GET CART DATA
const getcartdata = async (req, res) => {
  try {
    const username = req.user.username;

    const result = await CartModel.find({ username }).lean();

    res.send({ code: 1, cartdata: result });
  } catch (e) {
    res.send({ code: 0, msg: e.message });
  }
};

// DELETE CART ITEM
const deletecartitem = async (req, res) => {
  try {
    const username = req.user.username;

    const result = await CartModel.deleteOne({
      _id: req.params.id,
      username,
    });

    if (result.deletedCount === 1) {
      res.send({ code: 1, msg: "Item deleted" });
    } else {
      res.send({ code: 0, msg: "Item not found" });
    }
  } catch (err) {
    res.send({ code: 0, msg: err.message });
  }
};

module.exports = {
  addtocart,
  getcartdata,
  deletecartitem,
};
