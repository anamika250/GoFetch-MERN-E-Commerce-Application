const OrderModel = require("../Models/OrderModel");
const CartModel = require("../Models/CartModel");
const ProductModel = require("../Models/ProductModel");

const mongoose = require("mongoose");

//ORDER SUMMARY
const fetchordersummary = async (req, res) => {
  try {
    const username = req.user.username;

    const result = await OrderModel.findOne({ uname: username })
      .sort({ orderdate: -1 })
      .lean();

    res.send({ code: 1, odata: result || null });
  } catch (e) {
    res.send({ code: 0, msg: e.message });
  }
};

//USER ORDERS
const getuserorders = async (req, res) => {
  try {
    const username = req.user.username;

    const result = await OrderModel.find({ uname: username })
      .sort({ orderdate: -1 })
      .lean();

    res.send({ code: 1, ordersdata: result });
  } catch (e) {
    res.send({ code: 0, msg: e.message });
  }
};

//ORDER ITEMS
const getorderitems = async (req, res) => {
  try {
    const { oid } = req.params;

    if (!oid || !mongoose.Types.ObjectId.isValid(oid)) {
      return res.send({ code: 0, msg: "Invalid Order ID" });
    }

    const order = await OrderModel.findById(oid);

    if (!order) {
      return res.send({ code: 0, msg: "Order not found" });
    }

    if (order.uname !== req.user.username && req.user.usertype !== "admin") {
      return res.send({ code: 0, msg: "Unauthorized access" });
    }

    res.send({ code: 1, oitems: order.orderitems });
  } catch (e) {
    res.send({ code: 0, msg: e.message });
  }
};

//UPDATE STATUS (ADMIN)
const updatestatus = async (req, res) => {
  try {
    const { oid, newstatus } = req.body;

    if (!oid || !newstatus) {
      return res.send({ code: 0, msg: "Missing fields" });
    }

    if (!mongoose.Types.ObjectId.isValid(oid)) {
      return res.send({ code: 0, msg: "Invalid Order ID" });
    }

    const result = await OrderModel.updateOne(
      { _id: oid },
      { $set: { status: newstatus } },
    );

    res.send(
      result.matchedCount === 1
        ? { code: 1, msg: "Status updated" }
        : { code: 0, msg: "Order not found" },
    );
  } catch (e) {
    res.send({ code: 0, msg: e.message });
  }
};

//PLACE ORDER
const saveorder = async (req, res) => {
  try {
    const username = req.user.username;

    const { billamt, pmode, addr, cardinfo } = req.body;

    if (!billamt || !pmode || !addr) {
      return res.send({ code: 0, msg: "Missing required fields" });
    }

    const amount = Number(billamt);

    if (isNaN(amount) || amount <= 0) {
      return res.send({ code: 0, msg: "Invalid bill amount" });
    }

    const cartitems = await CartModel.find({ username });

    if (cartitems.length === 0) {
      return res.send({ code: 0, msg: "Cart is empty" });
    }
    for (const item of cartitems) {
      const product = await ProductModel.findById(item.prodid);

      if (!product) {
        return res.send({
          code: 0,
          msg: "Product not found",
        });
      }

      // CHECK STOCK
      if (product.stock < item.qty) {
        return res.send({
          code: 0,
          msg: product.prodname + " is out of stock",
        });
      }
    }

    const newrecord = new OrderModel({
      uname: username,
      billamt: amount,
      pmode,
      cardinfo,
      address: addr,
      orderdate: new Date(),
      status: "Order Confirmed, Processing",
      orderitems: cartitems,
    });

    await newrecord.save();

    // REDUCE STOCK
    for (const item of cartitems) {
      await ProductModel.findByIdAndUpdate(item.prodid, {
        $inc: {
          stock: -item.qty,
        },
      });
    }

    // CLEAR CART
    await CartModel.deleteMany({
      username,
    });

    res.send({ code: 1, msg: "Order placed successfully" });
  } catch (e) {
    res.send({ code: 0, msg: e.message });
  }
};

const getallorders = async (req, res) => {
  try {
    const { stdate, enddate } = req.query;

    if (!stdate || !enddate) {
      return res.send({
        code: 0,
        msg: "Both dates required",
      });
    }

    const start = new Date(stdate);

    const end = new Date(enddate);

    end.setHours(23, 59, 59, 999);

    const result = await OrderModel.find({
      orderdate: {
        $gte: start,
        $lte: end,
      },
    })
      .sort({ orderdate: -1 })
      .lean();

    res.send({
      code: 1,
      ordersdata: result,
    });
  } catch (e) {
    res.send({
      code: 0,
      msg: e.message,
    });
  }
};

module.exports = {
  fetchordersummary,
  getuserorders,
  getorderitems,
  getallorders,
  updatestatus,
  saveorder,
};
