const express = require("express");
const router = express.Router();

const controller = require("../controller/pledge");
const { valToken } = require("../middleware/auth");
const { valAdminToken } = require("../middleware/adminAuth"); //Requiring Controllers

router.post("/create_new", valAdminToken, controller.createNew);
router.get("/get_home_pledges", controller.getHomePledges);
router.post("/get_indie_pledge", valToken, controller.getIndiePledge);
router.post("/pledges", controller.fetchPledges);

router.get("/launch", controller.launch);

module.exports = router;
