const express = require("express");
const router = express.Router();

const { valToken } = require("../middleware/auth");
const { sendMail } = require("../helpers/sendMail");

router.get("/", valToken, (req, res) => {
  res.status(200).json({ user: req.userData });
});

router.post("/contact_us", async (req, res) => {
  const { name, email, message } = req.body;

  const result = await sendMail({
    userName: name,
    userEmail: email,
    message,
  });

  if (result) {
    res.status(200);
  } else {
    res.status(401);
  }
});

module.exports = router;
