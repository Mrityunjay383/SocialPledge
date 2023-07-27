const express = require("express");
const router = express.Router();

const controller = require("../controller/supporter");
const { valToken } = require("../middleware/auth");
const { valSupToken } = require("../middleware/supporterAuth"); //Requiring Controllers

router.get("/", valSupToken, controller.root);
router.post("/login", controller.login);
router.post("/create_new", controller.createNew);
router.get("/indieSup", valSupToken, controller.indieSup);
router.post("/updateSup", valSupToken, controller.updateSup);
router.get("/get_ava", valToken, controller.getAvaSup);
router.get("/logout", valSupToken, controller.logout);

module.exports = router;
