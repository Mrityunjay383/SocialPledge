const mongoose = require("mongoose");

const pledgeSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null,
  },
  about: {
    type: String,
  },
  url: {
    type: String,
  },
  previewURL: {
    type: String,
  },
});

module.exports = mongoose.model("Pledge", pledgeSchema);
