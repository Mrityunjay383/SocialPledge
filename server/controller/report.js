const { genLabels } = require("../helpers/genLabels");
const Certificate = require("../model/certificate");
const Pledge = require("../model/pledge");
const User = require("../model/user");

const { getDate, getTime } = require("../helpers/getDateTime");

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
    const certificateIds = [];

    for (let i = 0; i < tsArr.length - 1; i++) {
      for (let certificate of newCertificates) {
        if (
          certificate.createdAt <= tsArr[i] &&
          certificate.createdAt >= tsArr[i + 1]
        ) {
          certificateIds.push(certificate._id);
          newDLArr[i]++;
          totalNewCount++;
        }
      }

      for (let certificate of repCertificates) {
        if (
          certificate.createdAt <= tsArr[i] &&
          certificate.createdAt >= tsArr[i + 1]
        ) {
          certificateIds.push(certificate._id);
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
      certificateIds,
    });
  } catch (err) {
    console.log(`#2023208145118705 err`, err);
    res.status(400);
  }
};

exports.generateReport = async (req, res) => {
  try {
    const { certiIds } = req.body;

    const reportData = [];
    for (let certiId of certiIds) {
      const certificate = await Certificate.findOne({ _id: certiId });

      const pledge = await Pledge.findOne({ _id: certificate.pledgeId });
      const user = await User.findOne({ _id: certificate.userId });

      reportData.push({
        "User Name": user.name,
        "Pledge Name": pledge.name,
        "Download Type": certificate.type,
        Date: getDate(certificate.createdAt),
        Time: getTime(certificate.createdAt),
      });
    }

    res.status(200).json({ reportData });
  } catch (err) {
    console.log(`#202320915155226 err`, err);
    res.status(400);
  }
};
