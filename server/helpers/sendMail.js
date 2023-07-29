const nodemailer = require("nodemailer");

exports.sendMail = async ({ userName, userEmail, message }) => {
  //html mail template
  const output = `
          <div>
            <h3>New Mail Revieved</h3>
            <p>From: ${userName} ${userEmail}</p>
            <p>Message: ${message}</p>
          </div>
        `;

  const transporter = await nodemailer.createTransport({
    service: "gmail",
    secureConnection: true,
    auth: {
      user: "socialpledge.in@gmail.com",
      pass: process.env.MAIL_PASS,
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
      secureProtocol: "TLSv1_method",
    },
  });

  let mailOptions = {
    from: `Social Pledge<no-reply@socialpledge.in>`,
    to: "socialpledge.in@gmail.com", //Change receiving email here
    subject: `New Message Received`,
    text: "",
    html: output,
  };

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return false;
    } else {
      console.log("Email sent: " + info.response);
      return true;
    }
  });
};
