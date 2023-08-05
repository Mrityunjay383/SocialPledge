const nodemailer = require("nodemailer");

exports.sendMail = async ({ toEmail, subject, bodyMessage }) => {
  return new Promise((resolve, reject) => {
    //html mail template
    const output = bodyMessage;

    const transporter = nodemailer.createTransport({
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
      from: "Social Pledge<no-reply@socialpledge.in>",
      to: toEmail, //Change receiving email here
      subject,
      text: "",
      html: output,
    };

    transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        console.log(error);
        reject(false);
      } else {
        console.log("Email sent: " + info.response);
        resolve(true);
      }
    });
  });
};
