const Pledge = require("../model/pledge");

exports.createNewPledge = async (req, res) => {
  try {
    const { name, about, url, previewURL } = req.body;

    if (!(name && about && url && previewURL)) {
      return res.status(404).send("All fields are required");
    }

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
    const allPledges = await Pledge.find({});

    res.status(200).json({ allPledges });
  } catch (err) {
    console.log(`#202319712556255 err`, err);
  }
};

exports.getIndiePledge = async (req, res) => {
  try {
    const { pledgeId } = req.body;

    const pledge = await Pledge.findOne({ _id: pledgeId });
    res.status(200).json({ pledge });
  } catch (err) {
    console.log(`#2023197132616177 err`, err);
  }
};
