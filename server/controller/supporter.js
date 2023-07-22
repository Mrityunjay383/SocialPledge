const Supporter = require("../model/supporter");

exports.createNew = async (req, res) => {
  try {
    const { name, logo, newLimit, repLimit, priority } = req.body;

    if (!(name && logo && newLimit && repLimit)) {
      return res.status(404).send("All fields are required");
    }

    await Supporter.create({
      name,
      logo,
      newLimit: Number(newLimit),
      repLimit: Number(repLimit),
      priority: priority ? priority : false,
    });

    res.status(201).json({ success: true });
  } catch (err) {
    console.log(`#2023197124045729 err`, err);
    res.status(400).json({ success: false });
  }
};

exports.getAvaSup = async (req, res) => {
  try {
    const allPrioritySupporters = await Supporter.find({ priority: true });

    await allPrioritySupporters.filter((sup) => {
      return sup.newLimit > sup.newCount && sup.repLimit > sup.repCount;
    });

    let supporter;
    if (allPrioritySupporters.length > 0) {
      const randomSup =
        allPrioritySupporters[
          Math.floor(Math.random() * allPrioritySupporters.length)
        ];

      supporter = {
        id: randomSup._id,
        name: randomSup.name,
        logo: randomSup.logo,
      };
    } else {
      const allSupporters = await Supporter.find();
      await allSupporters.filter((sup) => {
        return sup.newLimit > sup.newCount && sup.repLimit > sup.repCount;
      });

      const randomSup =
        allSupporters[Math.floor(Math.random() * allSupporters.length)];

      supporter = {
        id: randomSup._id,
        name: randomSup.name,
        logo: randomSup.logo,
      };
    }

    res.status(200).json({ success: true, supporter });
  } catch (err) {
    console.log(`#2023203205938875 err`, err);
    res.status(400).json({ success: false });
  }
};
