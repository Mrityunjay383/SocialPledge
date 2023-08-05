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
  email: {
    type: String,
    default: "",
  },
  dob: {
    type: Number,
    default: null,
  },
  gender: {
    type: String,
    default: "",
  },
  address: {
    type: Object,
    default: {
      country: "",
      state: "",
      city: "",
      zipCode: null,
    },
  },
  education: {
    type: Object,
    default: {
      title: "",
      startDate: "",
      endDate: "",
      institute: "",
    },
  },
});

module.exports = mongoose.model("User", userSchema);
