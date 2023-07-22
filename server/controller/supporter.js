const Supporter = require("../model/supporter");

exports.createNew = async (req, res) => {
  try {
    const { name, logo, newLimit, repLimit } = req.body;

    if (!(name && logo && newLimit && repLimit)) {
      return res.status(404).send("All fields are required");
    }

    await Supporter.create({
      name,
      logo,
      newLimit: Number(newLimit),
      repLimit: Number(repLimit),
    });

    res.status(201).json({ success: true });
  } catch (err) {
    console.log(`#2023197124045729 err`, err);
    res.status(400).json({ success: false });
  }
};
