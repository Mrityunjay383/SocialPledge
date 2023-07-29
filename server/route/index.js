const express = require("express");
const router = express.Router();

const { valToken } = require("../middleware/auth");
const { sendMail } = require("../helpers/sendMail");

router.get("/", valToken, (req, res) => {
  res.status(200).json({ user: req.userData });
});

router.post("/contact_us", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    await sendMail({
      userName: name,
      userEmail: email,
      message,
    });

    res.status(200).send("Message Sent");
  } catch (err) {
    console.log(`#2023210211220801 err`, err);
    res.status(401).send("Something went wrong");
  }
});

module.exports = router;
