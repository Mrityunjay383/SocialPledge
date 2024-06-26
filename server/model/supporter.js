const mongoose = require("mongoose");

const supporterSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null,
  },
  userName: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  logo: {
    type: String,
  },
  newLimit: {
    type: Number,
  },
  repLimit: {
    type: Number,
  },
  newCount: {
    type: Number,
    default: 0,
  },
  repCount: {
    type: Number,
    default: 0,
  },
  priority: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Supporter", supporterSchema);
