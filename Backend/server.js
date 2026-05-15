const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const connectDB = require("./Config/db");

// Routes
const userRoutes = require("./Routes/Userroutes");
const categoryRoutes = require("./Routes/Categoryroutes");
const subCategoryRoutes = require("./Routes/SubCategoryroutes");
const productRoutes = require("./Routes/Productroutes");
const cartRoutes = require("./Routes/Cartroutes");
const orderRoutes = require("./Routes/Orderroutes");
const resetpassRoutes = require("./Routes/ResetPassroutes");
const contactRoutes = require("./Routes/ContactRoutes");

const port = process.env.PORT || 9000;

// ================= MIDDLEWARE =================
const allowedOrigins = [
  "http://localhost:3000",
  "https://go-fetch-mern-e-commerce-application.vercel.app",
  "https://go-fetch-mern-e-commerce-applicatio.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.set("trust proxy", 1);

app.use("/uploads", express.static("public/uploads"));

// ================= ROUTES =================
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/subcategory", subCategoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/resetpass", resetpassRoutes);
app.use("/api/contactus", contactRoutes);

app.use((req, res) => {
  res.status(404).send({ msg: "Route not found" });
});

// ================= ERROR HANDLER =================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ code: 0, msg: "Something went wrong" });
});

// ================= SERVER =================
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
