const jwt = require("jsonwebtoken");

const User = require("../model/user");

//Checking if the token is valid or not
const valToken = async (req, res, next) => {
  try {
    // looking for token in the header
    let authHeaderVal = req.cookies.token || req.headers.authorization;

    if (!authHeaderVal) {
      return res.status(403).send("token not found");
    }

    const token = authHeaderVal.replace("Bearer ", ""); //replacing Bearer from token if getting from header
    //verifying token with the secret key
    req.userData = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findOne({ _id: req.userData.user_id });
    if (!user) {
      return res.status(403).send("user not found");
    } else {
      req.userData.name = user.name;
    }

    next();
  } catch (e) {
    return res.status(401).json({
      msg: "Auth failed not verified user",
      err: e,
    });
  }
};

module.exports = {
  valToken,
};
