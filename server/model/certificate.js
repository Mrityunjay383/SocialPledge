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
  uid: {
    type: String,
  },
  type: {
    type: String,
  },
  createdAt: {
    type: Number,
  },
});

module.exports = mongoose.model("Certificate", certificateSchema);
