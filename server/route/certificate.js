const express = require("express");
const router = express.Router();

const controller = require("../controller/certificate");
const { valToken } = require("../middleware/auth");

router.post("/new_download", valToken, controller.newDownload);
router.post("/get_indie_certificate", controller.indieCertificate);
router.post("/is_certificate_exist", controller.isCertificateExist);
router.get("/certificate_count", controller.certificateCount);

module.exports = router;
