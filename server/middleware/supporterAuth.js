const jwt = require("jsonwebtoken");
const Supporter = require("../model/supporter");

const valSupToken = async (req, res, next) => {
  try {
  } catch (err) {
    return res.status(401).json({
      msg: "Auth failed not verified user",
      err: err,
    });
  }
};
