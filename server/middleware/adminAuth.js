const jwt = require("jsonwebtoken");
const Admin = require("../model/admin");

const valAdminToken = async (req, res, next) => {
  try {
    // looking for token in the header
    let authHeaderVal = req.cookies.adminToken || req.headers.authorization;

    if (!authHeaderVal) {
      return res.status(403).send("token not found");
    }

    const token = authHeaderVal.replace("Bearer ", ""); //replacing Bearer from token if getting from header
    //verifying token with the secret key
    req.adminData = jwt.verify(token, process.env.SECRET_KEY);

    const admin = await Admin.findOne({
      _id: req.adminData.admin_id,
    });

    if (!admin) {
      return res.status(403).send("Supporter not found");
    } else {
      req.adminData.userName = admin.userName;
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
  valAdminToken,
};
