const express = require("express");
const router = express.Router();

const controller = require("../controller/pledge");
const { valToken } = require("../middleware/auth"); //Requiring Controllers

router.post("/create_new", controller.createNew);
router.get("/get_home_pledges", controller.getHomePledges);
router.post("/get_indie_pledge", valToken, controller.getIndiePledge);

router.get("/launch", controller.launch);

module.exports = router;
