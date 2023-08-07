const express = require("express");
const router = express.Router();
const User = require("../model/user");

const { valToken } = require("../middleware/auth");
const { sendMail } = require("../helpers/sendMail");

router.get("/", valToken, (req, res) => {
  res.status(200).json({ user: req.userData });
});

router.post("/profile", valToken, async (req, res) => {
  const { type } = req.body;
  const { user_id } = req.userData;

  const user = await User.findOne({ _id: user_id });

  let buildUser = {};

  if (type === "Personal Details") {
    buildUser = {
      name: user.name,
      mobNo: user.mobNo,
      email: user.email,
      dob: user.dob,
      gender: user.gender,
    };
  } else if (type === "Education") {
    buildUser = user.education;
  }

  res.status(200).json({ buildUser });
});

router.post("/saveDel", valToken, async (req, res) => {
  try {
    const { newUserDel, type } = req.body;
    const { user_id } = req.userData;

    const user = await User.findOne({ _id: user_id });

    console.log(`#2023219221857998 type`, type);

    if (type === "Personal Details") {
      user.name = newUserDel.name;
      user.email = newUserDel.email;
      user.dob = newUserDel.dob;
      user.gender = newUserDel.gender;
      user.mobNo = newUserDel.mobNo;
    } else if (type === "Education") {
      user.education = newUserDel;
    }

    console.log(`#2023219222013199 user`, user);

    await user.save();

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).send("Something went wrong!!");
  }
});

router.post("/contact_us", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    let bodyMessage = `
          <div>
            <h3>New Mail Revieved</h3>
            <p>From: ${name} ${email}</p>
            <p>Message: ${message}</p>
          </div>
        `;
    sendMail({
      toEmail: "socialpledge.in@gmail.com",
      subject: "New Message Received",
      bodyMessage,
    });

    const bodyMessage2 = `
          <div>
            <h3>Message Received</h3>
            <p>Hii ${name},</p>
            <p>Thanks for contacting SocialPledge, we recieved your message, and we will respond as soon as possible.</p>
            <p>Your Message: "<i>${message}</i>"</p>
          </div>
        `;

    await sendMail({
      toEmail: email,
      subject: "Message Received",
      bodyMessage: bodyMessage2,
    });

    res.status(200).send("Message Sent");
  } catch (err) {
    console.log(`#2023210211220801 err`, err);
    res.status(401).send("Something went wrong");
  }
});

module.exports = router;
