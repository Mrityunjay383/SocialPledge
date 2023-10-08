const express = require("express");
const router = express.Router();

const controller = require("../controller/report");
const { valSupToken } = require("../middleware/supporterAuth");
const { valAdminToken } = require("../middleware/adminAuth");

router.post("/report_Data", valSupToken, controller.reportData);
router.post("/genReport", valSupToken, controller.generateReport);

router.post("/admin_report_Data", valAdminToken, controller.adminReportData);
router.get("/admin_dashboard_Data", valAdminToken, controller.adminDashData);

module.exports = router;
