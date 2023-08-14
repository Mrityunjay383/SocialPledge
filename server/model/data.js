const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null,
  },
  numsArr: {
    type: [Number],
    default: [],
  },
});

module.exports = mongoose.model("Data", dataSchema);
