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
    type: String,
    default: "",
  },
  gender: {
    type: String,
    default: "",
  },
  address: {
    type: Object,
    default: {
      line1: "",
      line2: "",
      country: "",
      state: "",
      city: "",
      zipCode: "",
    },
  },
  education: {
    type: Object,
    default: {
      currStudying: false,
      title: "",
      startDate: "",
      endDate: "",
      institute: "",
    },
  },
});

module.exports = mongoose.model("User", userSchema);
