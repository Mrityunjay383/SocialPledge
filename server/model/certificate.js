const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: null,
  },
  pledgeId: {
    type: String,
    default: null,
  },
  supporterId: {
    type: String,
    default: null,
  },
  type: {
    type: String,
  },
});

module.exports = mongoose.model("Certificate", certificateSchema);
