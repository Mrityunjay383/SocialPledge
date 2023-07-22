const express = require("express");
const router = express.Router();

const controller = require("../controller/supporter");
const { valToken } = require("../middleware/auth"); //Requiring Controllers

router.post("/create_new", controller.createNew);
// router.get("/get_home_pledges", controller.getHomePledges);
// router.post("/get_indie_pledge", valToken, controller.getIndiePledge);

module.exports = router;
