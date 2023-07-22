const mongoose = require("mongoose");

const supporterSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null,
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
});

module.exports = mongoose.model("Supporter", supporterSchema);
