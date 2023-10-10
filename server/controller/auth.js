const jwt = require("jsonwebtoken");

const User = require("../model/user");
const { sendOpt } = require("../helpers/genOtp");

const OTPs = {};
exports.otp = async (req, res) => {
  try {
    const { mobNo } = req.body;

    const existingUser = await User.findOne({ mobNo }).select("_id").lean();
    let user_id;
    if (!existingUser) {
      const user = await User.create({
        mobNo,
      });
      user_id = user._id;
    } else {
      user_id = existingUser._id;
    }

    const result = await sendOpt({ mobNo });
    if (result.success) {
      OTPs[mobNo] = result.otp;
      res
        .status(200)
        .json({ success: true, userExist: !!existingUser, user_id });
    }
  } catch (err) {
    console.log(`#2023197104341576 err`, err);
    res.status(400);
  }
};

exports.register = async (req, res) => {
  try {
    const { name, mobNo, otp, user_id } = req.body;

    if (!mobNo) {
      return res.status(404).send("Mobile Number is Required");
    }

    if (otp !== OTPs[mobNo]) {
      return res.status(400).send("Invalid OTP");
    } else {
      delete OTPs[mobNo];
    }

    if (name !== "") {
      const user = await User.findOne({ _id: user_id });
      user.name = name;
      user.save();
    }

    //token
    const token = jwt.sign({ user_id }, process.env.SECRET_KEY, {
      expiresIn: 30 * 24 * 60 * 60,
    });

    // Setting Up cookies
    const options = {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };

    return res.status(200).cookie("token", token, options).json({
      success: true,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.logout = async (req, res) => {
  res
    .clearCookie("token", {
      secure: true,
      sameSite: "none",
    })
    .json({ success: true });
};
