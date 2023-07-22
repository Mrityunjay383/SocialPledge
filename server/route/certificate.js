const express = require("express");
const router = express.Router();

const controller = require("../controller/certificate");
const { valToken } = require("../middleware/auth"); //Requiring Controllers

router.post("/new_download", valToken, controller.newDownload);
// router.get("/get_ava", valToken, controller.getAvaSup);

module.exports = router;
