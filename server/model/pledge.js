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
  liveDate: {
    type: Number,
  },
  endDate: {
    type: Number,
    default: null,
  },
});

module.exports = mongoose.model("Pledge", pledgeSchema);
