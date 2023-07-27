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

    const { labels, tsArr } = genLabels(period);

    const newCertificates = await Certificate.find({
      supporterId: supporter_id,
      type: "new",
    });

    const repCertificates = await Certificate.find({
      supporterId: supporter_id,
      type: "repeat",
    });

    const newDLArr = Array(labels.length).fill(0);
    const repDLArr = Array(labels.length).fill(0);
    let totalNewCount = 0;
    let totalRepCount = 0;

    for (let i = 0; i < tsArr.length - 1; i++) {
      for (let certificate of newCertificates) {
        if (
          certificate.createdAt <= tsArr[i] &&
          certificate.createdAt >= tsArr[i + 1]
        ) {
          newDLArr[i]++;
          totalNewCount++;
        }
      }

      for (let certificate of repCertificates) {
        if (
          certificate.createdAt <= tsArr[i] &&
          certificate.createdAt >= tsArr[i + 1]
        ) {
          repDLArr[i]++;
          totalRepCount++;
        }
      }
    }

    res.status(200).json({
      labels: labels.reverse(),
      newDLArr: newDLArr.reverse(),
      totalNewCount,
      repDLArr: repDLArr.reverse(),
      totalRepCount,
    });
  } catch (err) {
    console.log(`#2023208145118705 err`, err);
    res.status(400);
  }
};
