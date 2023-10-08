const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model("Admin", adminSchema);
