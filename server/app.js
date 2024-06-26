require("dotenv").config();
require("./config/database").connect();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Routers
const indexRouter = require("./route/index");
const authRouter = require("./route/auth");
const pledgeRouter = require("./route/pledge");
const supporterRouter = require("./route/supporter");
const certificateRouter = require("./route/certificate");
const reportRouter = require("./route/report");
const adminRouter = require("./route/admin");

const app = express();
app.use(express.json());

app.use(cookieParser());

// middleware using cors with options
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://supporter.localhost:3000",
      "http://admin.localhost:3000",
      "http://launch.localhost:3000",
      "https://supporter.socialpledge.in",
      "https://admin.socialpledge.in",
      "https://launch.socialpledge.in",
      "https://socialpledge.in",
    ], //change origin based on domain main of the application
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

//Defining headers for cors
app.use(function (req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Using Routes
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/pledge", pledgeRouter);
app.use("/supporter", supporterRouter);
app.use("/certificate", certificateRouter);
app.use("/report", reportRouter);
app.use("/admin", adminRouter);

module.exports = app;
