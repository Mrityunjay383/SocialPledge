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
    default: null,
  },
  gender: {
    type: String,
    default: "",
  },
  address: {
    type: Object,
    default: {
      title: "",
      country: "",
      state: "",
      city: "",
      zipCode: null,
    },
  },
  education: {
    type: Object,
    default: {
      currStudying: null,
      title: "",
      startDate: null,
      endDate: null,
      institute: "",
    },
  },
});

module.exports = mongoose.model("User", userSchema);
