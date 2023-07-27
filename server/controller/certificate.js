const Certificate = require("../model/certificate");
const Supporter = require("../model/supporter");
const { genLabels } = require("../helpers/genLabels");

exports.newDownload = async (req, res) => {
  try {
    const { userId, pledgeId, supporterId } = req.body;

    if (!(userId && pledgeId && supporterId)) {
      return res.status(404).send("Some Data Mission");
    }

    const exactCertificateExist = await Certificate.findOne({
      userId,
      pledgeId,
      supporterId,
    });

    if (exactCertificateExist) {
      return res.status(200).json({ success: true });
    }

    const supporter = await Supporter.findOne({ _id: supporterId });

    const userSupporterCertificateExist = await Certificate.findOne({
      userId,
      supporterId,
    });

    if (userSupporterCertificateExist) {
      await Certificate.create({
        userId,
        pledgeId,
        supporterId,
        type: "repeat",
        createdAt: new Date().getTime(),
      });

      supporter.repCount++;
      await supporter.save();

      return res.status(200).json({ success: true });
    }

    await Certificate.create({
      userId,
      pledgeId,
      supporterId,
      type: "new",
      createdAt: new Date().getTime(),
    });

    supporter.newCount++;
    await supporter.save();

    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(`#2023203213951903 err`, err);
    res.status(400).json({ success: false });
  }
};

exports.reportData = async (req, res) => {
  try {
    const { supporter_id } = req.supporterData;

    const { period } = req.body;

    const labels = genLabels(period);

    // const newCertificates = await Certificate.find({
    //   supporterId: supporter_id,
    //   type: "new",
    // });
    //
    // const repCertificates = await Certificate.find({
    //   supporterId: supporter_id,
    //   type: "repeat",
    // });

    res.status(200).json({ labels });
  } catch (err) {
    console.log(`#2023208145118705 err`, err);
    res.status(400);
  }
};
