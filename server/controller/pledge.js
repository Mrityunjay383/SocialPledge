const Pledge = require("../model/pledge");

exports.createNew = async (req, res) => {
  try {
    const { name, about, url, previewURL, liveDate, endDate } = req.body;

    if (!(name && about && url && previewURL && liveDate)) {
      return res.status(404).send("All fields are required");
    }

    await Pledge.create({
      name,
      about,
      url,
      previewURL,
      liveDate,
      endDate: endDate ? endDate : null,
    });

    res.status(201).json({ success: true });
  } catch (err) {
    console.log(`#2023197124045729 err`, err);
    res.status(400).json({ success: false });
  }
};

exports.getHomePledges = async (req, res) => {
  try {
    const allPledges = await Pledge.find({}).limit(4);

    res.status(200).json({ allPledges });
  } catch (err) {
    console.log(`#202319712556255 err`, err);
  }
};

exports.fetchPledges = async (req, res) => {
  try {
    const { filter } = req.body;

    const currTime = new Date().getTime() / 1000;

    let pledgesData = [];
    if (filter === "All") {
      pledgesData = await Pledge.find({}).sort({
        liveDate: -1,
      });
    } else if (filter === "Live") {
      pledgesData = await Pledge.find({
        liveDate: { $lt: currTime },
        $or: [{ endDate: { $gt: currTime } }, { endDate: null }],
      }).sort({
        liveDate: -1,
      });
    } else if (filter === "Coming Soon") {
      pledgesData = await Pledge.find({
        liveDate: { $gt: currTime },
      }).sort({
        liveDate: -1,
      });
    } else if (filter === "Closed") {
      pledgesData = await Pledge.find({
        $or: [{ endDate: { $lt: currTime } }, { endDate: !null }],
      }).sort({
        endDate: -1,
      });
    }

    res.status(200).json({ pledgesData });
  } catch (err) {
    console.log(`#202321416422335 err`, err);
    res.status(500).json({ success: false });
  }
};

exports.getIndiePledge = async (req, res) => {
  try {
    const { pledgeName } = req.body;

    const pledge = await Pledge.findOne({
      name: pledgeName.replaceAll("_", " "),
    });
    res.status(200).json({ pledge });
  } catch (err) {
    console.log(`#2023197132616177 err`, err);
  }
};

exports.launch = async (req, res) => {
  try {
    const allPledges = await Pledge.find({});

    for (let pledge of allPledges) {
      pledge.liveDate = new Date().getTime() / 1000;
      await pledge.save();
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.log(`#202319712556255 err`, err);
    res.status(400).json({ success: false });
  }
};
