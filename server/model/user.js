const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null,
  },
  mobNo: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  token: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
