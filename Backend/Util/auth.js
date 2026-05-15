const jwt = require("jsonwebtoken");

// Verify user token
const verifytoken = (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).send({ code: 0, msg: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JSECRETKEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send({ code: 0, msg: "Invalid token" });
  }
};

// Verify admin
const verifyAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).send({ code: 0, msg: "Admin only access" });
  }
  next();
};

module.exports = {
  verifytoken,
  verifyAdmin,
};