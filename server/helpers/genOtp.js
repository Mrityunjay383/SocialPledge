const axios = require("axios");

const genOpt = () => {
  return Math.floor(Math.random() * 10000).toString();
};

exports.sendOpt = async ({ mobNo }) => {
  try {
    let config = {
      headers: {
        authorization:
          "bupzvT42hY0L8J5esqcU6gHNIGRo3iKaZlDEPjSBwFfQrV9Odnt2qJLvaCYznd43wuxcREgSZXAPplNV",
      },
    };

    const otp = genOpt({ length: 6 });

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
