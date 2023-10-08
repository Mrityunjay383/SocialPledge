const express = require("express");
const router = express.Router();

const controller = require("../controller/admin");
const { valAdminToken } = require("../middleware/adminAuth");

router.get("/", valAdminToken, controller.root);
router.post("/login", controller.login);
router.post("/create_new", controller.createNew);
router.get("/logout", valAdminToken, controller.logout);

module.exports = router;
