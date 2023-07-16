const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const User = require("../model/user");
const { sendOpt } = require("../helpers/genOtp");

exports.otp = async (req, res) => {
  try {
    const { mobNo } = req.body;

    const existingUser = await User.findOne({ mobNo });
    if (existingUser) {
      return res
        .status(401)
        .send("Account already exist with provided Mobile number");
    }

    const result = await sendOpt({ mobNo });

    if (result.success) {
      res.status(200).json({ otp: result.otp });
    }
  } catch (err) {
    console.log(`#2023197104341576 err`, err);
    res.status(400);
  }
};

exports.register = async (req, res) => {
  try {
    const { name, mobNo, password } = req.body;

    if (!(name && mobNo && password)) {
      return res.status(404).send("All fields are required");
    }

    const existingUser = await User.findOne({ mobNo });
    if (existingUser) {
      return res
        .status(401)
        .send("Account already exist with provided Mobile number");
    }

    const encPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      mobNo,
      password: encPassword,
    });

    //token
    const token = jwt.sign({ user_id: user._id }, process.env.SECRET_KEY, {
      expiresIn: 30 * 24 * 60 * 60,
    });

    user.token = token;

    user.password = undefined;

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

exports.login = async (req, res) => {
  try {
    const { mobNo, password } = req.body;

    const user = await User.findOne({ mobNo });

    if (user && (await bcrypt.compare(password, user.password))) {
      //token
      const token = jwt.sign({ user_id: user._id }, process.env.SECRET_KEY, {
        expiresIn: 30 * 24 * 60 * 60,
      });

      user.password = undefined;

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
    }

    res.status(400).send("Mobile Number or password incorrect");
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
