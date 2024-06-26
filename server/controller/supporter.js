const Supporter = require("../model/supporter");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.root = async (req, res) => {
  res.status(200).json({ supporter: req.supporterData });
};

exports.login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const supporter = await Supporter.findOne({ userName });

    if (!supporter) {
      return res.status(400).send("Supporter Username not found!");
    }

    if (supporter && (await bcrypt.compare(password, supporter.password))) {
      //token
      const token = jwt.sign(
        { supporter_id: supporter._id },
        process.env.SECRET_KEY,
        {
          expiresIn: 24 * 60 * 60,
        }
      );

      // Setting Up cookies
      const options = {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
        sameSite: "none",
      };

      return res.status(200).cookie("supToken", token, options).json({
        success: true,
      });
    }

    res.status(400).send("Password incorrect");
  } catch (e) {
    console.log(e);
  }
};

exports.createNew = async (req, res) => {
  try {
    const { name, userName, password, logo, newLimit, repLimit, priority } =
      req.body;

    if (!(name && userName && logo && newLimit && repLimit)) {
      return res.status(404).send("All fields are required");
    }

    const encPassword = await bcrypt.hash(password, 10);

    await Supporter.create({
      name,
      userName,
      password: encPassword,
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

exports.indieSup = async (req, res) => {
  try {
    const { userName } = req.supporterData;

    const supporter = await Supporter.findOne({ userName });

    res.status(200).json({ supporter });
  } catch (err) {
    console.log(`#20232063273211 err`, err);
    res.status(400);
  }
};

exports.updateSup = async (req, res) => {
  try {
    const { supporter_id } = req.supporterData;
    const { type, updatedVal } = req.body;

    const supporter = await Supporter.findOne({ _id: supporter_id });

    if (!supporter) {
      return res.status(404).send("Supporter Not Found!");
    }

    if (type === "UserName") {
      supporter.name = updatedVal;
    } else if (type === "Password") {
      supporter.password = await bcrypt.hash(updatedVal, 10);
    }
    await supporter.save();

    res.status(200).json({ type, updatedVal });
  } catch (err) {
    console.log(`#2023206171443163 err`, err);
    res.status(400).send("Some Error occurred!");
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

exports.logout = async (req, res) => {
  res
    .clearCookie("supToken", {
      secure: true,
      sameSite: "none",
    })
    .json({ success: true });
};

exports.list = async (req, res) => {
  try {
    let supporters = await Supporter.find();
    supporters = supporters.reverse();
    res.status(200).json({ supporters });
  } catch (err) {
    console.log(`#2023203205938875 err`, err);
    res.status(400).json({ success: false });
  }
};

exports.updateSupByAdmin = async (req, res) => {
  try {
    const { supporterData } = req.body;

    const supporter = await Supporter.findOne({ _id: supporterData._id });

    if (!supporter) {
      return res.status(404).send("Supporter Not Found!");
    }

    supporter.name = supporterData.name;
    supporter.userName = supporterData.userName;
    supporter.newLimit = supporterData.newLimit;
    supporter.repLimit = supporterData.repLimit;
    supporter.priority = supporterData.priority;
    await supporter.save();

    res.status(200).json({ success: true });
  } catch (err) {
    console.log(`#2023206171443163 err`, err);
    res.status(400).send("Some Error occurred!");
  }
};

exports.indieSupForAdmin = async (req, res) => {
  try {
    const { userName } = req.body;

    const supporter = await Supporter.findOne({ userName });

    res.status(200).json({ supporter });
  } catch (err) {
    console.log(`#20232063273211 err`, err);
    res.status(400);
  }
};

exports.delete = async (req, res) => {
  try {
    const { supporterId } = req.body;

    await Supporter.deleteOne({
      _id: supporterId,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.log(`#202319712556255 err`, err);
    res.status(400).json({ success: false });
  }
};
