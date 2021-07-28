require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const paymentRoutes = require("./routes/payment");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(port), console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/kisaan", userRoutes);
app.use("/kisaan", authRoutes);
app.use("/kisaan", categoryRoutes);
app.use("/kisaan", productRoutes);
app.use("/kisaan", orderRoutes);
app.use("/kisaan", paymentRoutes);
