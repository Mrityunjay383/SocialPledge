const Admin = require("../model/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.root = async (req, res) => {
  res.status(200).json({ admin: req.adminData });
};

exports.login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const admin = await Admin.findOne({ userName });

    if (!admin) {
      return res.status(400).send("Supporter Username not found!");
    }

    if (admin && (await bcrypt.compare(password, admin.password))) {
      //token
      const token = jwt.sign({ admin_id: admin._id }, process.env.SECRET_KEY, {
        expiresIn: 24 * 60 * 60,
      });

      // Setting Up cookies
      const options = {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
        sameSite: "none",
      };

      return res.status(200).cookie("adminToken", token, options).json({
        success: true,
      });
    }

    res.status(400).send("Password incorrect");
  } catch (e) {
    console.log(e);
  }
};

exports.createNew = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName) {
      return res.status(404).send("All fields are required");
    }

    const encPassword = await bcrypt.hash(password, 10);

    await Admin.create({
      userName,
      password: encPassword,
    });

    res.status(201).json({ success: true });
  } catch (err) {
    console.log(`#2023197124045729 err`, err);
    res.status(400).json({ success: false });
  }
};

exports.logout = async (req, res) => {
  res
    .clearCookie("adminToken", {
      secure: true,
      sameSite: "none",
    })
    .json({ success: true });
};
