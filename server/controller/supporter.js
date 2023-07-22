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

exports.getAvaSup = async (req, res) => {
  try {
    const allSupporters = await Supporter.find({});

    await allSupporters.filter((sup) => {
      return sup.newLimit > sup.newCount && sup.repLimit > sup.repCount;
    });

    const randomSup =
      allSupporters[Math.floor(Math.random() * allSupporters.length)];

    const supporter = {
      id: randomSup._id,
      name: randomSup.name,
      logo: randomSup.logo,
    };

    res.status(200).json({ success: true, supporter });
  } catch (err) {
    console.log(`#2023203205938875 err`, err);
    res.status(400).json({ success: false });
  }
};
