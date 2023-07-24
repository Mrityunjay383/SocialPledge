const express = require("express");
const router = express.Router();

const controller = require("../controller/supporter");
const { valToken } = require("../middleware/auth");
const { valSupToken } = require("../middleware/supporterAuth"); //Requiring Controllers

router.get("/", valSupToken, controller.root);
router.post("/login", controller.login);
router.post("/create_new", controller.createNew);
router.get("/get_ava", valToken, controller.getAvaSup);

module.exports = router;
