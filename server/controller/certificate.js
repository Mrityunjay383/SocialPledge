const Certificate = require("../model/certificate");
const Supporter = require("../model/supporter");
const ShortUniqueId = require("short-unique-id");
const QRCode = require("qrcode");

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
      await QRCode.toDataURL(
        `https://socialpledge.in/certificate/${exactCertificateExist.uid}`,
        function (err, url) {
          return res.status(200).json({ success: true, qrURL: url });
        }
      );
      return;
    }

    const supporter = await Supporter.findOne({ _id: supporterId });

    const uid = new ShortUniqueId({ length: 10 });
    const newUid = uid();

    let qrURL;
    await QRCode.toDataURL(
      `https://socialpledge.in/certificate/${newUid}`,
      function (err, url) {
        qrURL = url;
      }
    );

    const userSupporterCertificateExist = await Certificate.findOne({
      userId,
      supporterId,
    });

    if (userSupporterCertificateExist) {
      await Certificate.create({
        userId,
        pledgeId,
        supporterId,
        uid: newUid,
        type: "repeat",
        createdAt: new Date().getTime(),
      });

      supporter.repCount++;
      await supporter.save();

      return res.status(200).json({ success: true, qrURL });
    }

    await Certificate.create({
      userId,
      pledgeId,
      supporterId,
      uid: newUid,
      type: "new",
      createdAt: new Date().getTime(),
    });

    supporter.newCount++;
    await supporter.save();

    return res.status(200).json({ success: true, qrURL });
  } catch (err) {
    console.log(`#2023203213951903 err`, err);
    res.status(400).json({ success: false });
  }
};
