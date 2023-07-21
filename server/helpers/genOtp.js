const axios = require("axios");

const genOpt = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

exports.sendOpt = async ({ mobNo }) => {
  try {
    let config = {
      headers: {
        authorization: process.env.FASTSMS_KEY,
      },
    };

    const otp = genOpt();

    let data = {
      variables_values: otp,
      route: "otp",
      numbers: mobNo,
    };

    const response = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      data,
      config
    );

    if (response.data.return) {
      return { success: true, otp };
    }
  } catch (err) {
    console.log(`#2023197111954536 err`, err);
    return { success: false };
  }
};
