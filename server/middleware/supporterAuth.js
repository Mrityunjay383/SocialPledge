const jwt = require("jsonwebtoken");
const Supporter = require("../model/supporter");

const valSupToken = async (req, res, next) => {
  try {
    // looking for token in the header
    let authHeaderVal = req.cookies.supToken || req.headers.authorization;

    if (!authHeaderVal) {
      return res.status(403).send("token not found");
    }

    const token = authHeaderVal.replace("Bearer ", ""); //replacing Bearer from token if getting from header
    //verifying token with the secret key
    req.supporterData = jwt.verify(token, process.env.SECRET_KEY);

    const supporter = await Supporter.findOne({
      _id: req.supporterData.supporter_id,
    });

    if (!supporter) {
      return res.status(403).send("Supporter not found");
    } else {
      req.supporterData.name = supporter.name;
      req.supporterData.logo = supporter.logo;
    }

    next();
  } catch (err) {
    return res.status(401).json({
      msg: "Auth failed not verified supporter",
      err: err,
    });
  }
};

module.exports = {
  valSupToken,
};
