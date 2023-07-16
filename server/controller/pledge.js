const Pledge = require("../model/pledge");

exports.createNewPledge = async (req, res) => {
  try {
    const { name, about, url, previewURL } = req.body;

    await Pledge.create({
      name,
      about,
      url,
      previewURL,
    });

    res.status(201).json({ success: true });
  } catch (err) {
    console.log(`#2023197124045729 err`, err);
    res.status(400).json({ success: false });
  }
};

exports.getPledges = async (req, res) => {
  try {
    const allPledges = await Pledge.find();
  } catch (err) {
    console.log(`#202319712556255 err`, err);
  }
};
