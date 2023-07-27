const express = require("express");
const router = express.Router();

const controller = require("../controller/report");
const { valSupToken } = require("../middleware/supporterAuth");

router.post("/report_Data", valSupToken, controller.reportData);
router.post("/genReport", valSupToken, controller.generateReport);

module.exports = router;
