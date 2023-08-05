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
