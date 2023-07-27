const express = require("express");
const router = express.Router();

const controller = require("../controller/certificate");
const { valToken } = require("../middleware/auth");
const { valSupToken } = require("../middleware/supporterAuth"); //Requiring Controllers

router.post("/new_download", valToken, controller.newDownload);
router.post("/report_Data", valSupToken, controller.reportData);
// router.get("/get_ava", valToken, controller.getAvaSup);

module.exports = router;
