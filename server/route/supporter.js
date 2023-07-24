const express = require("express");
const router = express.Router();

const controller = require("../controller/supporter");
const { valToken } = require("../middleware/auth"); //Requiring Controllers

router.get("/", controller.root);
router.post("/create_new", controller.createNew);
router.get("/get_ava", valToken, controller.getAvaSup);

module.exports = router;
