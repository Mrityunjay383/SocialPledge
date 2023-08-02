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

    const allCertificates = await Certificate.find({
      supporterId: supporter_id,
    });

    allCertificates.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    const newDLArr = Array(labels.length).fill(0);
    const repDLArr = Array(labels.length).fill(0);
    let totalNewCount = 0;
    let totalRepCount = 0;
    const certificateIds = [];

    for (let i = 0; i < tsArr.length - 1; i++) {
      for (let certificate of allCertificates) {
        if (
          certificate.createdAt <= tsArr[i] &&
          certificate.createdAt >= tsArr[i + 1]
        ) {
          certificateIds.push(certificate._id);

          if (certificate.type === "new") {
            newDLArr[i]++;
          } else if (certificate.type === "repeat") {
            repDLArr[i]++;
          }
          totalNewCount++;
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
    const { certiIds, totalCount } = req.body;

    const reportData = [];

    let first = true;
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
        Link: `https://socialpledge.in/certificate/${certificate.uid}`,
        "Total New Downloads": first ? totalCount.new : null,
        "Total Repeat Downloads": first ? totalCount.repeat : null,
      });

      if (first) {
        first = false;
      }
    }

    res.status(200).json({ reportData });
  } catch (err) {
    console.log(`#202320915155226 err`, err);
    res.status(400);
  }
};
