const express = require("express");
const router = express.Router();

const controller = require("../controller/pledge");
const { valAdminToken } = require("../middleware/adminAuth"); //Requiring Controllers

router.post("/create_new", valAdminToken, controller.createNew);
router.get("/get_home_pledges", controller.getHomePledges);
router.post("/get_indie_pledge", controller.getIndiePledge);
router.post("/pledges", controller.fetchPledges);
router.post("/update", valAdminToken, controller.update);

router.get("/launch", controller.launch);

module.exports = router;
